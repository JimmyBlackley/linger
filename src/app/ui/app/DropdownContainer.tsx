import { motion } from "motion/react";

interface Props {
	className?: string;
	children?: React.ReactNode;
}
function DropdownContainer({ className, children }: Props): JSX.Element {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: "-0.5rem" },
				visible: { opacity: 1, y: 0 },
			}}
			initial="hidden"
			animate="visible"
			exit="hidden"
			className={`w-[10rem] h-[20rem] absolute z-50 top-12 left-1/2 bg-white shadow-md rounded-md ${className}`}
			style={{ x: "-50%" }}
		>
			{children}
		</motion.div>
	);
}

export default DropdownContainer;
