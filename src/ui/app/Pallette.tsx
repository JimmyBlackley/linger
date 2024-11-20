/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { ModuleCard } from "./ModuleCard";

interface Props {
  className: any;
}

export const Pallette = ({ className }: Props): JSX.Element => {
  return (
    <div
      className={`flex flex-col w-[276px] items-start gap-2.5 p-[15px] relative h-[958px] border border-solid border-black ${className}`}
    >
      <div className="flex flex-col items-center gap-3.5 px-0 py-[15px] relative flex-1 self-stretch w-full grow bg-white rounded-[14px] overflow-hidden shadow-[inset_0px_4px_4px_#00000040]">
        <ModuleCard />
        <ModuleCard />
        <ModuleCard />
        <ModuleCard />
        <ModuleCard />
        <ModuleCard />
        <ModuleCard />
      </div>
    </div>
  );
};
