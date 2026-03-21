import { GithubLogoIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<nav className="w-full bg-blue-500 py-3 text-3xl text-white md:px-5">
			<Link
				to="/"
				className="flex items-center justify-center gap-4 px-10 md:mt-0"
			>
				<GithubLogoIcon size={28} weight="fill" />
				<h1>Github User Finder</h1>
			</Link>
		</nav>
	);
}
