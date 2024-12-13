import React from "react";

interface Props {
	className?: string;
	children?: React.ReactNode;
}

function ModuleCard ({ className, children }: Props): JSX.Element {
	return (
		<div className={`flex w-[90%] h-[100px] items-center p-4 bg-[#d3cd85] rounded-[20px] gap-1 ${className}`}>
			<div className="w-20 h-20 bg-[#989898]" />
			<p className="text-black text-lg flex-1 text-center">{children}</p>
		</div>
	);
};
export default ModuleCard;
