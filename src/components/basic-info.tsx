import {
	BuildingsIcon,
	MapPinIcon,
	EnvelopeSimpleIcon,
	UserFocusIcon,
	ListIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type { GithubUser } from "@/lib/api";

interface Props {
	user: GithubUser;
	onClear: () => void;
}

export default function BasicInfo({ user }: Props) {
	return (
		<div className="align-self-start mx-auto mt-5 flex w-full flex-col items-center px-3 text-lg leading-9 md:items-start md:px-0">
			<h1 className="text-2xl text-blue-600">{user.login}</h1>

			{user.bio && (
				<p className="mt-3 leading-6 text-gray-600 md:text-left">
					{user.bio}
				</p>
			)}

			{user.company && (
				<div className="mt-10 flex items-center gap-3">
					<BuildingsIcon size={24} className="text-gray-700" />
					<span className="md:text-sm">{user.company}</span>
				</div>
			)}

			{user.location && (
				<div className="mt-4 flex items-center gap-3">
					<MapPinIcon size={24} className="text-gray-700" />
					<span className="md:text-sm">{user.location}</span>
				</div>
			)}

			{user.blog && (
				<div className="mt-4 flex items-center gap-3">
					<EnvelopeSimpleIcon size={24} className="text-gray-700" />
					<a
						href={`//${user.blog}`}
						className="font-bold text-blue-600 hover:underline md:text-sm"
						target="_blank"
						rel="noopener noreferrer"
					>
						{user.blog}
					</a>
				</div>
			)}

			<div className="mt-4 flex items-center gap-3">
				<UserFocusIcon size={24} className="text-gray-700" />
				<strong
					className={`md:text-sm ${user.hireable ? "text-green-600" : "text-red-600"}`}
				>
					{user.hireable ? "Hireable" : "Not hireable"}
				</strong>
			</div>

			<div className="mt-4 flex items-center gap-4 text-base">
				<ListIcon size={24} />
				<Link
					to={`/${user.login}/repos/1`}
					className="font-bold text-blue-600 hover:underline"
				>
					<span>{user.public_repos} repos</span>
				</Link>
			</div>
		</div>
	);
}
