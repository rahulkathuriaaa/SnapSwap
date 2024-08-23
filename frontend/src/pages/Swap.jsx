import React, { useEffect, useState } from "react";
import { WideCard } from "../components/WideCard";
import { TokenSwap } from "../components/TokenSwap";
import { Finalswap } from "../components/Finalswap";
import { Link } from "react-router-dom";
const WideCardToken = (props) =>{
  console.log(props.token)
  return(
    <>
      <div className="leading-12 flex min-h-[20vh]  min-w-[60vw] justify-between bg-gradient-to-r from-[#427A53] to-[#258C91] p-4 rounded-lg   font-serif text-sm text-white">
      <div className="flex">
        {props.img && (
          <div>
            <img src={props.img} className="h-20 w-20 rounded-lg" />
          </div>
        )}

        <div className="ml-4 flex flex-col justify-center gap-6">
          <div>
            <h1 className="text-xl font-medium">
              {props.token.name !== 0 ? props.token.name : "First Large Cap Mutual Fund"}
            </h1>
          </div>
          <div>
            <h1 className="font-small text-xs">
              {props.token.risk !== 0 ? props.token.risk : "Large"}| 5 star
            </h1>
          </div>
        </div>
      </div>

      <div className=" flex flex-col justify-center gap-6">
          {/* <div>
            <h1 className="text-xl font-medium">1 y Returns: 3%</h1>
          </div>
          <div>
            <h1 className="font-small text-xs">LOW/MODERATE RISK</h1>
          </div> */}
      </div>
    </div>
    </>
  )
}
export const Swap = (props) => {
  // console.log(props)
  const { poolerData, responseData } = props;
  const [tokenList, setTokenList] = useState([]);
  const [lowtokenList, setlowTokenList] = useState([]);
  const [midtokenList, setmidTokenList] = useState([]);
  const [hightokenList, sethighTokenList] = useState([]);
  const separateData = () => {
    // console.log(responseData)
    var l = [],
      m = [],
      h = [];
    Object.keys(responseData).map((coin) => {
      if (responseData[coin].risk == "low") {
        l.push({...responseData[coin], "name": coin});
      } else if (responseData[coin].risk == "mid") {
        // setmidTokenList(...midtokenList, {coin: coin, data: responseData[coin]})
        m.push({...responseData[coin], "name": coin});
      } else if (responseData[coin].risk == "high") {
        // sethighTokenList(...hightokenList, {coin: coin, data: responseData[coin]})
        h.push({...responseData[coin], "name": coin});
      }
    });
    // console.log(l,m,h)
    sethighTokenList(h);
    setmidTokenList(m);
    setlowTokenList(l);
    setTokenList(h)
  };
  useEffect(() => {
    separateData();
  }, [props]);
  const clicked = (fund) =>{
    // console.log(fund)
    setTokenList(fund.data)
  }
  const funds = [
    {
      text: "High Risk",
      img: "https://ik.imagekit.io/gourab18/Group%2032.png?updatedAt=1702158234594",
      data: hightokenList,
    },
    {
      text: "Mid Risk",
      img: "https://ik.imagekit.io/gourab18/Group%2031.png?updatedAt=1702158234690",
      data: midtokenList,
    },
    {
      text: "Low Risk",
      img: "https://ik.imagekit.io/gourab18/Group%2035.png?updatedAt=1702158255632",
      data: lowtokenList,
    },
  ];

  return (
    <div className="">
     

      <div className="flex ">
        <div className="flex  min-h-[100vh]  w-[20vw] flex-col items-center justify-center gap-8 border-r-[0.005px]  ">
          {funds.map((fund, index) => {
            return (
              <button
                className="active:border-2 active:rounded-3xl"
                onClick={() => {
                  clicked(fund)
                }}
              >
                <img src={fund.img} />
              </button>
            );
          })}
        </div>

        <div className=" flex  h-[100vh] w-4/5 flex-col items-center gap-8 py-6 mt-16">
          {tokenList.map((tokeninfo) => {
            var path = `/coins/${tokeninfo.name}`
            console.log(tokeninfo)
            return (
              <>
              <Link to={path}>
                <div>
                  <WideCardToken 
                    token = {tokeninfo}
                    img = "https://res.cloudinary.com/dzbdnlr0f/image/upload/v1702167509/image_processing20191028-22527-1rsv9eh_nkk8ed.png"
                  />
                </div>
              </Link>
              {/* {tokeninfo.risk} */}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
