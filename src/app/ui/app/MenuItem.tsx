import { motion } from "motion/react";
import React from "react";

interface Props {
	children?: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

export function MenuItem({ children, className, onClick}: Props): JSX.Element {
	const [isActive, setIsActive] = React.useState(false);

	return (
		<button
			type="button"
			/* set to active on click */
			onMouseDown={() => {
				setIsActive(true);
			}}
			onMouseUp={() => {
				setIsActive(false);
			}}
			onClick={onClick}
			className={`relative ${className}`}
		>
			<motion.div
				variants={{
					default: { opacity: 0 },
					hover: { opacity: 0.16 },
					active: { opacity: 0.22 },
				}}
				initial="default"
				whileHover={isActive ? "active" : "hover"}
				animate={isActive ? "active" : "default"}
				className={`absolute z-30 top-0 left-0 w-full h-full rounded-[inherit] bg-white`}
			></motion.div>
			{children}
		</button>
	);
}
