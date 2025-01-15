import React from "react";

interface Props {
	className?: string;
	children?: React.ReactNode;
}

export function DragOverlayCard({ className, children}: Props): JSX.Element {
	return (
		<div
			className={`flex w-[90%] h-[100px] items-center p-4 bg-[#FFF3B0] shadow-lg rounded-[20px] gap-1 ${className}`}
		>
			<div className="w-20 h-20 bg-[#E6DAFF]" />
			<p className="text-black text-lg flex-1 text-center">{children}</p>
		</div>
	);
}
