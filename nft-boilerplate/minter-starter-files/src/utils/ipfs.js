
const IPFS = require('ipfs-http-client');

const ipfs = IPFS.create({
  host: 'localhost', // IPFS daemon address
  port: 5001, // IPFS daemon port
  protocol: 'http' // IPFS protocol
});

async function uploadToIPFS(jsonData) {
  try {
    const data = JSON.stringify(jsonData);
    const file = await ipfs.add(data);
    console.log('Successfully uploaded, CID:', file.path);

    // IPFS gateway URL to access the data
    const url = `https://ipfs.io/ipfs/${file.path}`;
    console.log('Access your data at:', url);

    return url;
  } catch (error) {
    console.error('Error uploading data: ', error);
  }
}

// Use the function
const myData = { key: "value" };
uploadToIPFS(myData);