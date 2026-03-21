import { useState } from "react";

interface Props {
	onSearch: (username: string) => void;
}

export default function UserInputForm({ onSearch }: Props) {
	const [input, setInput] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInput(e.target.value);

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
			className="mx-auto mt-10 flex w-4/5 flex-col items-center justify-center text-center text-base md:flex-row md:items-center md:justify-center md:gap-8"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				placeholder="Enter User's GitHub username"
				className="w-full border-b-2 border-gray-300 p-2 text-gray-600 focus:border-blue-400 focus:outline-none md:w-1/4"
				value={input}
				onChange={handleInputChange}
			/>

			<div className="flex w-full items-center justify-center gap-4 md:w-auto">
				<button
					type="submit"
					className="mt-5 rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 focus:outline-none md:mt-0 md:w-auto md:text-sm"
				>
					Find user
				</button>

				<button
					type="button"
					className="mt-5 rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 focus:outline-none md:mt-0 md:w-auto md:text-sm"
					onClick={handleClear}
				>
					Clear all
				</button>
			</div>
		</form>
	);
}
