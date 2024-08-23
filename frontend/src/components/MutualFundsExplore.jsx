import React from "react";
import { WideCard } from "./WideCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export const MutualFundsExplore = (props) => {
  const [tag, setTag] = useState("largeCap");

  const { responseData, poolerData } = props;

  const [largeCap, setLargeCap] = useState([]);
  const [midCap, setMidCap] = useState([]);
  const [smallCap, setSmallCap] = useState([]);

  const [activeButton, setActiveButton] = useState("LargeCap");

  console.log("Pooler", poolerData);
  console.log("Response", responseData);

  const separateData = () => {
    var l = [],
      m = [],
      h = [];
    Object.keys(responseData).map((coin) => {
      if (responseData[coin].risk == "low") {
        l.push({ ...responseData[coin], name: coin });
      } else if (responseData[coin].risk == "mid") {
        // setmidTokenList(...midtokenList, {coin: coin, data: responseData[coin]})
        m.push({ ...responseData[coin], name: coin });
      } else if (responseData[coin].risk == "high") {
        // sethighTokenList(...hightokenList, {coin: coin, data: responseData[coin]})
        h.push({ ...responseData[coin], name: coin });
      }
    });
    // console.log(l,m,h)
    setLargeCap(h);
    setMidCap(m);
    setSmallCap(l);
  };
  useEffect(() => {
    separateData();
  }, [props]);

  console.log("lg", largeCap);
  console.log("mid", midCap);
  console.log("small", smallCap);

  const funds = [
    {
      text: "LargeCap",

      funds: [
        {
          name: "Doxy",
          img: "https://ik.imagekit.io/gourab18/image%2025.png?updatedAt=170161637239",
          data: [largeCap[0], largeCap[1], midCap[0], smallCap[0]],
        },
      ],

      img: "https://ik.imagekit.io/gourab18/Group%2025.png?updatedAt=1702149267467",
    },
    {
      text: "MidCap",
      funds: [
        {
          name: "Steradium",
          img: "https://ik.imagekit.io/gourab18/image%2025.png?updatedAt=170161637239",
          data: [largeCap[0], midCap[1], midCap[0], smallCap[0]],
        },
      ],
      img: "https://ik.imagekit.io/gourab18/Group%2026.png?updatedAt=1702149267754",
    },
    {
      text: "SmallCap",
      funds: [
        {
          name: "Capex",
          img: "https://ik.imagekit.io/gourab18/image%2025.png?updatedAt=170161637239",
          data: [largeCap[0], midCap[1], smallCap[0], smallCap[1]],
        },
      ],
      img: "https://ik.imagekit.io/gourab18/Group%2027.png?updatedAt=1702149267577",
    },
  ];

  const [fundData, setFundData] = useState(funds[0].funds);

  const decideFund = (data) => {
    const arr = funds.filter((a) => a.text === data);
    setTag(data);
    // console.log(data);
    setFundData(arr[0].funds);
    setActiveButton(data);
  };
  return (
    <>
      <div className="flex">
        <div
          className={`flex  min-h-[100vh]  w-[20vw] flex-col items-center justify-center gap-8 border-r-[0.005px]  `}
        >
          {funds.map((fund, index) => {
            return (
              <div>
                <button
                  onClick={() => decideFund(fund.text)}
                  className={`${
                    activeButton === fund.text ? "transform scale-110" : ""
                  }`}
                >
                  <img src={fund.img} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="ml-4 flex  min-h-[100vh] flex-col items-center gap-8 py-6 mt-6">
          {fundData.map((data) => {
            return (
              <>
                <Link to={`/invest/${data.name}`}>
                  <WideCard
                    img="https://ik.imagekit.io/gourab18/image%2025.png?updatedAt=170161637239"
                    content={data.name}
                    tag={tag}
                  />
                </Link>
              </>
            );
          })}

          {/* <Link to="/invest/cn">
            <div>
              <WideCard img="https://ik.imagekit.io/gourab18/image%2025.png?updatedAt=170161637239" />
            </div>
          </Link>
          <Link to="/invest/in">
            <div>
              <WideCard img="https://ik.imagekit.io/gourab18/image%2025.png?updatedAt=170161637239" />
            </div>
          </Link>
          <Link to="/invest/dn">
            <div>
              <WideCard img="https://ik.imagekit.io/gourab18/image%2025.png?updatedAt=170161637239" />
            </div>
          </Link>  */}
        </div>
      </div>
    </>
  );
};
