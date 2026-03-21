import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
	onSearch: (username: string) => void;
}

export default function UserInputForm({ onSearch }: Props) {
	const [input, setInput] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (input.trim()) {
			onSearch(input.trim());
		}
		setInput("");
	};

	const handleClear = () => {
		setInput("");
		onSearch("");
	};

	return (
		<form
			className="mx-auto mt-16 flex max-w-sm items-center gap-2 px-6"
			onSubmit={handleSubmit}
		>
			<Input
				type="text"
				placeholder="GitHub username"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				className="h-9"
			/>
			<Button type="submit" size="sm">
				Search
			</Button>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				onClick={handleClear}
			>
				Clear
			</Button>
		</form>
	);
}
