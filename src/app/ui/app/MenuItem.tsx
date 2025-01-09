import React from "react";

interface Props {
	children?: React.ReactNode;
	className?: string;
}

export function MenuItem({ children, className}: Props): JSX.Element {
	return <button className={`w-8 h-8 rounded-md ${className}`}>{children}</button>;
}
