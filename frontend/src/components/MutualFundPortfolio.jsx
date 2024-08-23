import React from "react";
import { SmallWideCard } from "./SmallWideCard";
export const MutualFundPortfolio = () => {
  return (
    <>
      <div className=" flex flex-col">
        <div className="mt-6 flex items-center justify-center">
          <img
            className="h-[50vh] w-[40vw]"
            src="https://ik.imagekit.io/gourab18/image%2026.png?updatedAt=1701621835205"
          />
        </div>

        <div className="gap mt-12 flex justify-around  w-[50vw]">
          <div className="">
            <div>
              <h1 className=" my-4 text-center text-sm font-medium text-white ">
                Coin Distribution
              </h1>
            </div>

            <div className="flex items-center justify-center ">
              <img
                className="h-[30vh]"
                src="https://ik.imagekit.io/gourab18/image%2028.png?updatedAt=1701621958782"
              />
            </div>

            <div className=" mt-6 w-[20vw] ">
              <SmallWideCard />
            </div>
            <div className=" mt-6 w-[20vw] ">
              <SmallWideCard />
            </div>
            <div className=" mt-6 w-[20vw] ">
              <SmallWideCard />
            </div>
            <div className=" mt-6 w-[20vw] ">
              <SmallWideCard />
            </div>
          </div>
          <div className="">
            <div>
              <h1 className=" my-4 text-center text-sm font-medium text-white ">
                Coin Distribution
              </h1>
            </div>

            <div className="flex items-center justify-center ">
              <img
                className="h-[30vh]"
                src="https://ik.imagekit.io/gourab18/image%2028.png?updatedAt=1701621958782"
              />
            </div>

            <div className=" mt-6 w-[20vw] ">
              <SmallWideCard />
            </div>
            <div className=" mt-6 w-[20vw] ">
              <SmallWideCard />
            </div>
            <div className=" mt-6 w-[20vw] ">
              <SmallWideCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
