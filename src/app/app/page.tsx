import React from "react";
import { NavPill } from "@/ui/app/NavPill";
import { Pallette } from "@/ui/app/Pallette";
import { Timeline } from "@/ui/app/Timeline";

const App = (): JSX.Element => {
	return (
		<div className="grid grid-cols-[30vw_1fr] grid-rows-[8vh_72vh_20vh] h-screen bg-variable-collection-bg-grey border">
			{/* header container*/}
			<div className="flex justify-between items-stretch gap-2.5 p-2.5  w-full col-span-2 border-b border-black ">
				<div className="gap-2.5 pl-0 py-0 inline-flex items-center relative flex-[0_0_auto]">
					<NavPill className="!flex-[0_0_auto]" label="Products" state="active" />
					<NavPill className="!flex-[0_0_auto]" label="Solutions" state="default" />
					<NavPill className="!flex-[0_0_auto]" label="Community" state="default" />
					<NavPill className="!flex-[0_0_auto]" label="Resources" state="default" />
				</div>
				{/* place holder for search bar */}
				<div className="w-[264px] bg-white rounded-[27px]" />
			</div>
			<Pallette className="w-full row-span-2 border-r border-black" />
			{/* place holder for working area */}
			<div className="h-full w-full" />
			<Timeline className="!self-stretch !w-full border-t border-black" />
		</div>
	);
};

export default App;
