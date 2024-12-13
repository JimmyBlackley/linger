import { useState } from "react";
import ModuleCard from "./ModuleCard";
import { v4 as uuidv4 } from "uuid";

interface Props {
	children?: React.ReactNode;
}

function ContentArea({ children }: Props): JSX.Element {
	const [content, setContent] = useState([
		{ id: uuidv4(), name: "This is a module filled with content" },
		{ id: uuidv4(), name: "Test content" },
		{ id: uuidv4(), name: "Another test content" },
		{ id: uuidv4(), name: "Yet another test content"}
	]);
	return (
		<div className="grid grid-cols-3 auto-rows-min gap-3 p-3 overflow-y-auto">
			{content.map((item) => {
				return <ModuleCard key={item.id} className={`w-full`}>{item.name}</ModuleCard>;
			})}
			{children}
		</div>
	);
}

export default ContentArea;
