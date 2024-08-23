import React from "react";
import { WideCard } from "./WideCard";
import { MutualFundPortfolio } from "./MutualFundPortfolio";
import { useState } from "react";

export const MutualFundsDashboard = () => {
  const [flag, setFlag] = useState(0);

  const data = [
    {
      header: "YOUR HOLDINGS",
      component: <Holdings />,
    },
    {
      header: "PORTFOLIO ANALYSIS",
      component: <MutualFundPortfolio />,
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="my-5 flex w-[60vw]  flex-col  py-4">
          <div>
            <WideCard />
          </div>
        </div>

        <div className="flex items-center justify-center gap-12">
          <div className="flex  ">
            <button
              className={`text-xl font-medium  ${
                flag == 0 ? "text-[#18BB90]" : "text-white"
              }`}
              onClick={() => setFlag(0)}
            >
              YOUR HOLDINGS
            </button>
          </div>
          <div className="">
            <button
              className={`text-xl font-medium  ${
                flag == 1 ? "text-[#18BB90]" : "text-white"
              }`}
              onClick={() => setFlag(1)}
            >
              PORTFOLIO ANALYSIS
            </button>
          </div>
        </div>

        {flag == 0 ? <Holdings /> : <MutualFundPortfolio />}
      </div>
    </>
  );
};

const Holdings = () => {
  return (
    <>
      <div className="mt-4">
        <WideCard img="https://ik.imagekit.io/gourab18/image%2025.png?updatedAt=170161637239" />
      </div>
      <div className="mt-4">
        <WideCard img="https://ik.imagekit.io/gourab18/image%2025.png?updatedAt=170161637239" />
      </div>
    </>
  );
};
