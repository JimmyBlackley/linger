import React from "react";
import { NavPill } from "@/ui/app/NavPill";
import { Pallette } from "@/ui/app/Pallette";
import { Timeline } from "@/ui/app/Timeline";

const App = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen items-start justify-center relative bg-variable-collection-bg-grey">
      <div className="flex h-[66px] items-start gap-2.5 p-2.5 relative self-stretch w-full">
        <div className="gap-2.5 pl-0 pr-[59px] py-0 self-stretch inline-flex items-center relative flex-[0_0_auto]">
          <NavPill
            className="!flex-[0_0_auto]"
            label="Products"
            state="active"
          />
          <NavPill
            className="!flex-[0_0_auto]"
            label="Solutions"
            state="default"
          />
          <NavPill
            className="!flex-[0_0_auto]"
            label="Community"
            state="default"
          />
          <NavPill
            className="!flex-[0_0_auto]"
            label="Resources"
            state="default"
          />
        </div>

        <div className="relative flex-1 self-stretch grow" />

        <div className="relative self-stretch w-[264px] bg-white rounded-[27px]" />
      </div>

      <div className="flex items-start relative flex-1 self-stretch w-full grow">
        <Pallette className="!self-stretch !h-[unset]" />
        <div className="flex flex-col items-start relative flex-1 self-stretch grow">
          <div className="relative flex-1 self-stretch w-full grow border border-solid border-black" />

          <Timeline className="!self-stretch !w-full" />
        </div>
      </div>
    </div>
  );
};

export default App;
