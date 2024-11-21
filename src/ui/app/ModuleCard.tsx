import React from "react";

interface Props {
	className?: string;
}

export const ModuleCard = ({ className }: Props): JSX.Element => {
	return (
		<div className={`flex w-[90%] h-[100px] items-center pl-4 bg-[#d3cd85] rounded-[20px] ${className}`}>
			<div className="w-20 h-20 bg-[#989898]" />
			<p className="text-black text-lg flex-1 text-center">Name</p>
		</div>
	);
};
