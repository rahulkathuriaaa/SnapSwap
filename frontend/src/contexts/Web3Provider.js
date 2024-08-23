/* eslint-disable */
import React, { useState } from 'react';
import NFTPort from '../contracts/SnapSwap.json';
import Web3Context from './index';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState({
    accounts: null,
    currentAccount: null,
  });
  const [Contract, setContract] = useState('');
  const navigate=useNavigate();
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts =  await ethereum.request({
        method: 'eth_requestAccounts',
      });
      localStorage.setItem('currAccount',accounts[0]);
      navigate('/main');
      //window.location.href = `/main`;
      console.log('Connected', accounts);
    } catch (error) {
      console.log("Hi I am  the error");
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
       console.log('We have the ethereum object');
    }
    var web3 = new Web3(window.ethereum);
    
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const chain =  await web3.eth.getChainId();
    console.log("Chain Id",chain);
    console.log("Accounts",accounts);
    setAccount({
      accounts: accounts,
      currentAccount: accounts[0],
    });

    if (accounts.length !== 0) {
      getContract(chain,accounts);
    } else {
      console.log('No authorized account found');
    }
  };
  const getContract = (chain,account) => {
    var web3 = new Web3(window.ethereum);

    const deployedNetwork = SnapSwap.networks[chain];

    const instance = new web3.eth.Contract(
      NFTPort.abi,
      deployedNetwork && deployedNetwork.address);
      console.log("Contract instance",instance);
      setContract(instance);
  };


  
   
  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        checkIfWalletIsConnected,
        account,
        Contract,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
