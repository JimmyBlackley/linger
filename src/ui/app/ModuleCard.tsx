/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const ModuleCard = (): JSX.Element => {
  return (
    <div className="flex w-[200px] h-[100px] items-center relative bg-[#d3cd85] rounded-[20px] overflow-hidden">
      <div className="flex w-[100px] items-center justify-center relative self-stretch">
        <div className="relative w-20 h-20 bg-[#989898]" />
      </div>

      <div className="flex items-center justify-center relative flex-1 self-stretch grow">
        <div className="relative w-fit font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-black text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap [font-style:var(--single-line-body-base-font-style)]">
          HEADING
        </div>
      </div>
    </div>
  );
};
