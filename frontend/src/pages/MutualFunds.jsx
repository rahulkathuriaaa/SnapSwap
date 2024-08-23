import React from "react";
import { MutualFundsExplore } from "../components/MutualFundsExplore";
import { MutualFundsDashboard } from "../components/MutualFundsDashboard";
import { response } from "../data/response";
import { useState, useEffect } from "react";
export const MutualFunds = ({ poolerData, responseData }) => {
  const [flag, setFlag] = useState(0);

  const data = [
    {
      header: "Explore",
      component: <MutualFundsExplore />,
    },
    {
      header: "Dashboard",
      component: <MutualFundsDashboard />,
    },
  ];
  return (
    <div className="mt-12">
      {/* <h1 className="text-3xl font-medium text-white text-center my-4	">Invest In Our Funds</h1> */}
      <div className="flex items-center justify-center gap-12">
        <div className="">
          {/* flag == 0 ? "text-[#18BB90]" : "text-white" */}
          <button
            className={`rounded-lg ${
              flag == 0
                ? "bg-gradient-to-r from-[#427A53] to-[#258C91]"
                : "bg-[#18BB90]"
            } px-4 py-2 text-center  text-sm font-medium uppercase text-white hover:opacity-80`}
            onClick={() => setFlag(0)}
          >
            Explore
          </button>
        </div>
        <div className="">
          <button
            className={`rounded-lg  ${
              flag == 1
                ? "bg-gradient-to-r from-[#427A53] to-[#258C91]"
                : "bg-[#18BB90]"
            }  px-4 py-2 text-center  text-sm font-medium uppercase text-white hover:opacity-80"`}
            onClick={() => setFlag(1)}
          >
            Dashboard
          </button>
        </div>
      </div>

      {flag === 0 ? (
        <MutualFundsExplore
          poolerData={poolerData}
          responseData={responseData}
        />
      ) : (
        <MutualFundsDashboard />
      )}
    </div>
  );
};
