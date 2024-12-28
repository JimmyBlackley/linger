/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
	className?: string;
}

function Timeline ({ className }: Props): JSX.Element {
	return (
		/* outer box */
		<div
			className={`h-200px p-[15px] relative ${className}`}
		>
			{/* // inner shadow box */}
			<div className="h-full w-full grow bg-white rounded-[14px] shadow-[inset_0px_4px_4px_#00000040] overflow-x-scroll" />
		</div>
	);
};
export default Timeline;