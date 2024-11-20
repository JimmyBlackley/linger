/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  className: any;
}

export const Timeline = ({ className }: Props): JSX.Element => {
  return (
    // outer box
    <div
      className={`flex flex-col h-200px items-start justify-center gap-2.5 p-[15px] relative border border-solid border-black ${className}`}
    >
        {/* // inner shadow box */}
      <div className="relative flex-1 self-stretch w-full grow bg-white rounded-[14px] shadow-[inset_0px_4px_4px_#00000040] overflow-x-scroll" />

      <div className="flex h-px items-center justify-end pl-0 pr-[26px] pt-0 pb-[158px] relative self-stretch w-full mb-[-1.00px]">
        <div className="relative w-[50px] h-[50px] mt-[-104.00px] mb-[-103.00px] bg-[#c8c8c8] rounded-[80px]" />
      </div>
    </div>
  );
};
