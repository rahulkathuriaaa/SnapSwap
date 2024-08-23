import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export const Landing = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const images = [
    "https://ik.imagekit.io/gourab18/image%208.png?updatedAt=1701609460323",
    "https://ik.imagekit.io/gourab18/image%2011.png?updatedAt=1701609460337",
    "https://ik.imagekit.io/gourab18/image%203.png?updatedAt=1701609460474",
    "https://ik.imagekit.io/gourab18/image%204.png?updatedAt=1701609460333",
    "https://ik.imagekit.io/gourab18/image%208.png?updatedAt=1701609460323",
    "https://ik.imagekit.io/gourab18/image%2011.png?updatedAt=1701609460337",
    "https://ik.imagekit.io/gourab18/image%203.png?updatedAt=1701609460474",
    "https://ik.imagekit.io/gourab18/image%204.png?updatedAt=1701609460333",
  ];
  return (
    <>
      <div className="mt-12 pb-4">
        <div className=" mx-auto flex h-[70vh] w-[80vw] rounded-lg bg-gradient-to-r  drop-shadow-[0_35px_35px_rgba(255,255,255,0.15)] from-[#427A53] to-[#258C91]	">
          <div className="ml-16 flex w-1/2  flex-col justify-center gap-6  ">
            <div>
              <h1 className="text-xl font-bold 	tracking-normal	text-[#FFF] text-[40px]	">
                Invest In Everything
              </h1>
            </div>
            <div className="w-[90%]">
              <span className="font-serif	 text-xl	tracking-normal	text-[#FFF]">
                Online platform to invest in stocks, derivatives, mutual funds,
                and more.
              </span>
            </div>

            <div>
              {isDisconnected && (
                <button className="  bg-[#132831]  rounded-xl px-4 py-2 text-center  text-sm font-medium uppercase text-white hover:opacity-80">
                  Connect Wallet
                </button>
              )}

              {/* { {isDisconnected && (
                <ConnectButton
                  showBalance={true}
                  chainStatus="icon"
                /> }
              )} */}
            </div>
          </div>

          <div className="h-[100%]  ">
            <img
              className="h-[100%] w-[100%] "
              src="https://ik.imagekit.io/gourab18/image%202.png?updatedAt=1701607922481"
            />
          </div>
        </div>

        <div className="mt-12 flex min-h-[10vh] w-screen items-center justify-around bg-[#141A28] ">
          {images.map((image, index) => {
            return (
              <section key={index}>
                <div className="h-[60%] w-[60%]  ">
                  <img className="" src={image} />
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <div className="mt-12  ">
        <div className="mb-10 ml-10 ">
          <h1 className="font-serif text-[30px] capitalize	font-bold	tracking-normal text-[#FFF]">
            EVERYTHING WE CAN DO FOR YOU
          </h1>
        </div>

        <div className="mx-4 flex justify-evenly  pl-4 ">
          <div className="flex w-[70vw] flex-col gap-4 ">
            <div className="flex gap-4  ">
              <div className="drop-shadow-[0_35px_35px_rgba(255,255,255,0.15)] ">
                <img src="https://ik.imagekit.io/gourab18/Group%2024.png?updatedAt=1702147945803" />
              </div>
              <div className="drop-shadow-[0_35px_35px_rgba(255,255,255,0.15)] ">
                <img src="https://ik.imagekit.io/gourab18/Group%2036.png?updatedAt=1702148305638" />
              </div>
            </div>

            <div className="flex gap-4   ">
              <div className="drop-shadow-[0_35px_35px_rgba(255,255,255,0.15)] ">
                <img src="https://ik.imagekit.io/gourab18/Group%2039.png?updatedAt=1702148315073" />
              </div>
              <div className="drop-shadow-[0_35px_35px_rgba(255,255,255,0.15)] ">
                <img src="https://ik.imagekit.io/gourab18/Group%2040.png?updatedAt=1702148321018" />
              </div>
            </div>
          </div>

          <div className=" drop-shadow-[0_35px_35px_rgba(255,255,255,0.15)]  ">
            <img
              className="h-[98%] w-[100%]"
              src="https://ik.imagekit.io/gourab18/Group%2037.png?updatedAt=1702148321065"
            />
          </div>
        </div>
      </div>
    </>
  );
};