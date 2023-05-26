import { ur } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact";
import Web3 from "web3";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
 
  const [balance, setBalance] = useState("");

  useEffect(() => {
    async function initialize() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);

      addWalletListener();

      // Fetch and update the account balance
      const balance = await getAccountBalance(address);
      setBalance(balance);
    }

    initialize();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
          // Fetch and update the account balance
          const balance =  getAccountBalance(accounts[0]);
          setBalance(balance);

        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
          setBalance("");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  
  useEffect(async () => { //TODO: implement react hook
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);

    addWalletListener();

    // Fetch and update the account balance
    const balance = await getAccountBalance(address);
    setBalance(balance);

  }, []);

  async function getAccountBalance(address) {
    const web3 = new Web3(window.ethereum);
    const balanceInWei = await web3.eth.getBalance(address);
    const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
    return balanceInEther;
  }

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    
    // Fetch and update the account balance
    const balance = await getAccountBalance(walletResponse.address);
    setBalance(balance);
   
  };

  const onMintPressed = async () => { //TODO: implement
    const {status} = await mintNFT(url, name, description);
    setStatus(status);
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          <>
          <span>
            Connected: {String(walletAddress).substring(0, 6)}...
            {String(walletAddress).substring(38)}
          </span>
          <br />
          <span>Balance: {balance}</span> {/* Display account balance */}
        </>

        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title"> Quadrant.io NFT Assignment</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
      <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />

        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />

        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. http://localhost:8080/ipfs/QmSimUVgZxkQ4vK2Qh2kcMruebQ9kyWdWNBE88CyXRnu5n"
          onChange={(event) => setURL(event.target.value)}
        />
        
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;
