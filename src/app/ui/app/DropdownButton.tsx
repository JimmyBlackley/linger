import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DropdownContainer from "./DropdownContainer";

interface Props {
	children?: React.ReactNode;
	className?: string;
	currentActiveButtonId?: string;
	setCurrentActiveButtonId?: React.Dispatch<React.SetStateAction<string>>;
}

export function DropdownButton({ children, className, currentActiveButtonId, setCurrentActiveButtonId }: Props): JSX.Element {
	const [isActive, setIsActive] = useState(false);
	const id = useRef(uuidv4());
	const dropdownAreaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (currentActiveButtonId !== id.current) {
			setIsActive(false);
		}
	}, [currentActiveButtonId]);

	useEffect(() => {
		function outsideClickHandler(event: MouseEvent) {
			if (dropdownAreaRef.current && !dropdownAreaRef.current.contains(event.target as Node)) {
				setIsActive(false);
			}
		}
		document.addEventListener("mousedown", outsideClickHandler);
		return () => {
			document.removeEventListener("mousedown", outsideClickHandler);
		};
	}, [dropdownAreaRef]);

	return (
		<div className="relative" ref={dropdownAreaRef}>
			<motion.button
				variants={{
					hover: { backgroundColor: "#f5f5f5" },
					active: { backgroundColor: "#ffffff" },
					default: { backgroundColor: "var(--variable-collection-bg-grey)" },
				}}
				initial="default"
				whileHover={isActive ? "active" : "hover"}
				animate={isActive ? "active" : "default"}
				onClick={() => {
					if (setCurrentActiveButtonId) {
						setCurrentActiveButtonId(id.current);
					}
					setIsActive(!isActive);
				}}
				className={`relative text-black rounded-md ${className}`}
			>
				<motion.div animate={isActive ? { rotate: 45 } : ""}>{children}</motion.div>
			</motion.button>
			<AnimatePresence>{isActive && <DropdownContainer></DropdownContainer>}</AnimatePresence>
		</div>
	);
}