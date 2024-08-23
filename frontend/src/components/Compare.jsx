import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios, { all } from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props) => {
  const [token1data, setToken1data] = useState([]);
  const [token2data, setToken2data] = useState([]);
  useEffect(() => {
    console.log(props);
    if (props.token1 && props.token2) {
      setToken1data(
        props.token1.map((item) => {
          return { y: item[props.parameter], label: item.epoch };
        })
      );
      setToken2data(
        props.token2.map((item) => {
          return { y: item[props.parameter], label: item.epoch };
        })
      );
    }
  }, [props]);

  const options = {
    animationEnabled: true,
    title: {
      text: "Comparison of Tokens",
    },
    axisY: {
      title: props.parameter,
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "area",
        name: props.name1,
        showInLegend: true,
        dataPoints: token1data,
      },
      {
        type: "area",
        name: props.name2,
        showInLegend: true,
        dataPoints: token2data,
      },
    ],
  };
  return (
    <>
      <CanvasJSChart options={options} />{" "}
    </>
  );
};

const Compare = (props) => {
  const [token1, setToken1] = useState("");
  const [token2, setToken2] = useState("");
  const [parameter, setParameter] = useState("price")
  const [token1data, setToken1data] = useState([]);
  const [token2data, setToken2data] = useState([]);

  const { poolerData, responseData } = props;
  // console.log(poolerData);

  const handleToken1 = (token) => {
    setToken1(token);
    for (var d in poolerData[token]) {
      // console.log({ y: poolerData[token][d]["price"], label: d });
    }
  };

  const handleToken2 = (token) => {
    setToken2(token);
    for (var d in poolerData[token]) {
    }
  };
  return (
    <>
      <div className=" mx-auto mt-4 flex h-[90vh] w-[90vw] flex-row justify-between rounded-lg bg-gradient-to-r from-[#427A53] to-[#258C91]	">
        <div className="w-1/3 h-full bg-black bg-opacity-10">
          {/* {token1data ? token1data[0].y : 0} */}
          <div className="w-full h-1/2 border-b flex flex-col justify-center items-center">
            <div className="w-1/2 ml-2 text-white text-xl mb-4">Select Token 1</div>
            <select
              className="w-[50%] p-2 border-1 border-[#000000] text-xl rounded-md"
              type="text"
              value={token1}
              onChange={(e) => {
                handleToken1(e.target.value);
                // console.log(token1data);
              }}
              placeholder="Select Token 1"
            >
              <option>Token 1</option>
              {Object.keys(responseData).map((coin) => {
                return <option value={coin}>{coin}</option>;
              })}
              {/* <option>Select Token 1</option> */}
            </select>
          </div>
          <div className="w-full h-1/2 border-b flex flex-col justify-center items-center ">
            <div className="w-1/2 ml-2 text-white text-xl mb-4">Select Token 2</div>
            <select
              className="w-[50%] p-2 border-1 border-[#000000] text-xl rounded-md"
              type="text"
              value={token2}
              onChange={(e) => {
                handleToken2(e.target.value);
              }}
              placeholder="Select Token 1"
            >
              <option>Token 2</option>
              {Object.keys(responseData).map((coin) => {
                return <option value={coin}>{coin}</option>;
              })}
              <option>Select Token 1</option>
            </select>
          </div>
        </div>
        <div className="w-full h-full px-4">
        <div className="w-full h-1/5 flex flex-row justify-evenly items-center text-xl text-white" onChange={(e)=>{setParameter(e.target.value)}} value={parameter}>
          Select Parameter
          <select className="w-[20%] p-2 border-1 border-[#000000] rounded-md text-black">
            <option value="price">Price</option>
            <option value="priceChange24h">Price Change</option>
            <option value="volume24h">Volume in 24h</option>
            <option value="liquidity">Liquidity</option>
          </select>
        </div>
        <div className="w-4/5 h-4/5 p-4  ml-24">
          {token1 && token2 ? (
            <>
              <Chart token1={poolerData[token1]} name1={token1} name2={token2} token2={poolerData[token2]} parameter={parameter} />
            </>
          ) : (
            <></>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default Compare;
