const AWS = require('aws-sdk');
const { URL } = require('url');
const HttpProvider = require('web3-providers-http');
const XHR2 = require('xhr2');

const SignedHttpProvider = HttpProvider;

/**
 * Used to make async request
 *
 * @method send
 * @param {Object} payload
 * @param {Function} callback triggered on end with (err, result)
 */
SignedHttpProvider.prototype.send = function (payload, callback) {
    const xhReq = new XHR2();
    const timout = this.timeout;
    const endpoint = this.host;
    const method = "POST";
    const servicename = "managedblockchain"

    xhReq.timeout = timout;
    xhReq.open(method, endpoint, true);
    xhReq.setRequestHeader("Content-Type", "application/json");

    xhReq.onreadystatechange = () => {
        if (xhReq.readyState === 4 && xhReq.timeout !== 1) {
            let response = xhReq.responseText;
            let error = null;

            try {
                response = JSON.parse(response);
            } catch (err) {

                if (!!response.error) {
                    error = new Error(
                        !!response.error.message ? response.error.message : response.error
                    );
                    error.code = response.error.code;
                    callback(error);
                }
            }

            callback(error, response);
        }
    };

    xhReq.ontimeout = () => callback(new Error(`Connection timed out after ${timout} ms`), null);

    try {
        const body = JSON.stringify(payload);

        //get variables for signing and construct HTTP request
        const region =
            process.env.AMB_REGION ?? process.env.AWS_REGION ?? "us-east-1";
        const credentials = new AWS.EnvironmentCredentials("AMB");
        const awsEndpoint = new AWS.Endpoint(endpoint);
        const httpReq = new AWS.HttpRequest(awsEndpoint, region);

        httpReq.headers["host"] = new URL(endpoint).host;
        httpReq.method = method;
        httpReq.body = body;

        //create sigv4 signed request
        const signer = new AWS.Signers.V4(httpReq, servicename);
        signer.addAuthorization(credentials, new Date());

        //add signed auth header to XHR request
        xhReq.setRequestHeader("Authorization", httpReq.headers["Authorization"]);
        xhReq.setRequestHeader("X-Amz-Date", httpReq.headers["X-Amz-Date"]);
        xhReq.send(body);
    } catch (err) {
        callback(err, null);
    }
};

module.exports = SignedHttpProvider;