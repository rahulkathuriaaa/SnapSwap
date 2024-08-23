import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { useToken } from "wagmi";

// import { ethers } from "ethers";
import Web3 from 'web3';
// const { MNEMONIC, INFURA_API_KEY } = require('./secrets.js'); // Import your secrets

// Set up the web3 provider
// const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/s2682Miu79bPHBPdz7caGXHut5rbqwUq');
// const privateKey = "d32333fe6627cebdacf6d77917a60fd905fbdab3d59429560133a82a1ad4d0ad"
// const wallet = new ethers.Wallet(privateKey, provider);


// const web3 = new Web3(`https://polygon-mumbai.g.alchemy.com/v2/s2682Miu79bPHBPdz7caGXHut5rbqwUq`); // Replace with your actual Infura API key

// Connect to the deployed contract
// const contractAddress = '0xA0074119A15C777642Eb98522F30211b61BA6A1C'; // Replace with your actual contract address
// const abi = require('../contracts/SnapSwap.json'); // Replace with your actual ABI path
// const contract = new web3.eth.Contract(abi, contractAddress);
// const contract = new web3.eth.Contract(abi, contractAddress);
// console.log("contract", contract.methods)
// const { Alchemy, Network } = require("alchemy-sdk");
// import { Alchemy, Network } from "alchemy-sdk";


export const Navbar = () => {
  const [activeButton, setActiveButton] = useState("Button1");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const { address, isConnecting, isDisconnected } = useAccount();

  const [tokens, setTokens] = useState([]);

  // const config = {
  //   apiKey: process.env.ALCHEMY_API_KEY,
  //   network: Network.MATIC_MUMBAI,
  // };
  // // const alchemy = new Alchemy(config);

  // const main = async () => {
  //   // Wallet address
  //   const address = "0x02413120940F73Ca22249FDa88bde585823F8E02";

  //   // Get token balances
  //   const balances = await alchemy.core.getTokenBalances(address);

  //   // Remove tokens with zero balance
  //   const nonZeroBalances = balances.tokenBalances.filter((token) => {
  //     return token.tokenBalance !== "0";
  //   });

  //   // Counter for SNo of final output
  //   let i = 1;

  //   // Loop through all tokens with non-zero balance
  //   for (let token of nonZeroBalances) {
  //     // Get balance of token
  //     let balance = token.tokenBalance;

  //     // Get metadata of token
  //     const metadata = await alchemy.core.getTokenMetadata(
  //       token.contractAddress
  //     );

  //     // Compute token balance in human-readable format
  //     balance = balance / Math.pow(10, metadata.decimals);
  //     balance = Number(balance).toFixed(2);

  //     // Print name, balance, and symbol of token

  //     const obj = {
  //       name: metadata.name,
  //       symbol: metadata.symbol,
  //       balance: balance,
  //     };

  //     setTokens([...tokens, obj]);
  //   }
  // };

  // const runMain = async () => {
  //   try {
  //     await main();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   runMain();
  // }, []);

  // console.log(tokens);

  return (
    <div className="flex  w-screen  items-center justify-between border-b-[0.005px] border-[#868686] px-12  py-2   text-white  md:text-[25px]">
      <div>
        <Link to="/">
          <h1 onClick={() => handleButtonClick("Button1")}>SNAPSWAP </h1>
        </Link>
      </div>
      <div className="flex gap-6 justify-center items-center">
        {!isDisconnected && (
          <>
            <div>
              <Link to="/invest">
                <h1
                  className={`text-sm font-medium text-[#18BB90] hover:opacity-60 cursor:pointer active:text-black ${
                    activeButton === "Button2" ? "text-[#18BB90]" : "text-white"
                  }`}
                  onClick={() => handleButtonClick("Button2")}
                >
                  Bit Baskets
                </h1>
              </Link>
            </div>
            <div>
              <Link to="/token">
                <h1
                  className={`text-sm font-medium text-[#18BB90] hover:opacity-60 cursor:pointer active:text-black ${
                    activeButton === "Button3" ? "text-[#18BB90]" : "text-white"
                  }`}
                  onClick={() => handleButtonClick("Button3")}
                >
                  Token
                </h1>
              </Link>
            </div>
            <div>
              <Link to="/compare">
                <h1
                  className={`text-sm font-medium text-[#18BB90] hover:opacity-60 cursor:pointer active:text-black ${
                    activeButton === "Button4" ? "text-[#18BB90]" : "text-white"
                  }`}
                  onClick={() => handleButtonClick("Button4")}
                >
                  Compare
                </h1>
              </Link>
            </div>
          </>
        )}

        {/* <button
          type="submit"
          className="  rounded-lg bg-[#18BB90]  px-4 py-2 text-center  text-sm font-medium uppercase text-white hover:opacity-80"
          // onClick={() => toast.loading(" Connecting")}
          // onClick={connectWallet}
        >
          Connect Wallet
        </button> */}
        <ConnectButton
          showBalance={true}
          chainStatus="icon"
          className="rounded-lg bg-[#18BB90]  px-4 py-2 text-center  text-sm font-medium uppercase text-white hover:opacity-80"
        />
      </div>
    </div>
  );
};
