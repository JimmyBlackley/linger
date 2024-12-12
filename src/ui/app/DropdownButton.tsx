import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DropdownContainer from "./DropdownContainer";

interface Props {
	children?: React.ReactNode;
	className?: string;
	currentActiveButton?: string;
	setCurrentActiveButton?: React.Dispatch<React.SetStateAction<string>>;
}

function DropdownButton({ children, className, currentActiveButton, setCurrentActiveButton }: Props): JSX.Element {
	const [isActive, setIsActive] = useState(false);
	const id = useRef(uuidv4());
	useEffect(() => {
		if (currentActiveButton !== id.current) {
			setIsActive(false);
		}
	}, [currentActiveButton]);
	return (
		<div className="relative">
			<motion.button
				variants={{
					hover: { backgroundColor: "#f5f5f5" },
					active: { backgroundColor: "#ffffff", rotate: 45 },
					default: { backgroundColor: "var(--variable-collection-bg-grey)" },
				}}
				initial="default"
				whileHover={isActive ? "active" : "hover"}
				animate={isActive ? "active" : "default"}
				onClick={() => {
					if (setCurrentActiveButton) {
						setCurrentActiveButton(id.current);
					}
					setIsActive(!isActive);
				}}
				className={`relative text-black rounded-md ${className}`}
			>
				{children}
			</motion.button>
			<AnimatePresence>{isActive && <DropdownContainer></DropdownContainer>}</AnimatePresence>
		</div>
	);
}

export default DropdownButton;
