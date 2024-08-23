import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePublicClient } from "wagmi";
import { useAccount } from "wagmi";
import axios from "axios";

export const Finalswap = () => {
  const {swap} = useParams()
  console.log(swap)

  const { address, isConnecting, isDisconnected } = useAccount();
  const [tokenlist, setTokenlist] = useState([]);
  const [fromAddress, setFromAddress] = useState(
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  );
  const [toAddress, setToAddress] = useState(
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  );
  const [fromAmount, setFromAmount] = useState(0);
  const [exchange, setExchange] = useState(0);
  const [toAmount, setToAmount] = useState();
  const gettokenlist = async () => {
    const response = await axios.get("http://localhost:8080/gettokenlist");
    console.log(response.data.tokens);
    setTokenlist(response.data.tokens);
    Object.keys(response.data.tokens).map(token=>{
      if(response.data.tokens[token].symbol===swap){
        setToAddress(token)
      }
    })
  };
  useEffect(() => {
    gettokenlist();
  }, []);
  const getexchangerate = async (e) => {
    console.log("getting exchange");
    const response = await axios.post("http://localhost:8080/getexchangerate", {
      src: fromAddress,
      dst: toAddress,
      chain: 1
    });   
    console.log(response);
    setExchange(Number(response.data.toAmount));
  };
  // console.log("Huu", isDisconnected);

  return (
    <div className=" mx-auto mt-12 flex h-[60vh] w-[50vw] flex-col justify-between rounded-lg bg-gradient-to-r from-[#427A53] to-[#258C91]	">
      <div className="flex justify-evenly items-center flex-col w-full h-4/5 ">
        <div className="flex flex-col w-full  justify-center items-center">
          <div className="w-full pl-32 mb-2">
            <h1 className="text-xl font-small text-white ">From</h1>
          </div>

          <div className=" flex w-[60%] ">
            <div className="w-[60%] ">
              <input
                className="w-[100%] p-2 border-1 border-[#000000] rounded-l-xl"
                type="text"
                placeholder="Enter swap amount"
                value={fromAmount}
                onChange={(e) => {
                  setFromAmount(e.target.value);
                  setToAmount((e.target.value * exchange) / 100000000000000);
                }}
              />
            </div>

            <div className="w-[40%]  ">
              <select
                id=""
                className=" w-[100%]  border  p-2  rounded-r-xl "
                onChange={(e) => {
                  setFromAddress(e.target.value);
                  getexchangerate();
                }}
                value={fromAddress}
              >
                {Object.keys(tokenlist).map((token) => {
                  return (
                    <option value={tokenlist[token].address}>
                      {tokenlist[token].symbol}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full  justify-center items-center ">
          <div className="w-full pl-32 mb-2">
            <h1 className="text-xl font-small text-white">To</h1>
          </div>

          <div className=" flex w-[60%] rounded-lg ">
            <div className="w-[60%] ">
              <input
                className="w-[100%] p-2 border-1 border-[#000000] rounded-l-xl"
                type="text"
                placeholder="0"
                value={toAmount}
                readonly="true"
              />
            </div>

            <div className="w-[40%] ">
              <select
                id=""
                className=" w-[100%]   border  p-2 rounded-r-xl "
                onChange={(e) => {
                  setToAddress(e.target.value);
                  getexchangerate();
                }}
                disabled="true"
                value={toAddress}
              >
                {Object.keys(tokenlist).map((token) => {
                  return (
                    <option value={tokenlist[token].address}>
                      {tokenlist[token].symbol}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className=" mb-6 flex items-center justify-center">
        <Link to="/congrats">
          <button className=" rounded-sm bg-[#132831]  px-4 py-2 text-center  text-sm font-medium uppercase text-white hover:opacity-80">
            Swap Token
          </button>
        </Link>
      </div>
    </div>
  );
};
