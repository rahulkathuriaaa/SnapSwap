import React from "react";

export const WideCard = ({
  img = "",
  width = "60vw",
  content = "",
  tag = "",
}) => {
  return (
    <div className="leading-12 flex min-h-[20vh]  min-w-[60vw] justify-between bg-gradient-to-r from-[#427A53] to-[#258C91] p-4 rounded-lg   font-serif text-sm text-white">
      <div className="flex">
        {img && (
          <div>
            <img src={img} />
          </div>
        )}

        <div className="ml-4 flex flex-col justify-center gap-6">
          <div>
            <h1 className="text-xl font-medium">
              {content.length !== 0 ? content : "First Large Cap Mutual Fund"}
            </h1>
          </div>
          <div>
            <h1 className="font-small text-xs">
              {tag.length !== 0 ? tag : "Large"}| 5 star
            </h1>
          </div>
        </div>
      </div>

      <div className=" flex flex-col justify-center gap-6">
        <div>
          <h1 className="text-xl font-medium">1 y Returns: 3%</h1>
        </div>
        <div>
          <h1 className="font-small text-xs">LOW/MODERATE RISK</h1>
        </div>
      </div>
    </div>
  );
};
