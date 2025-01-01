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