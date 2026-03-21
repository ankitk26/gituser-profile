import { UsersIcon } from "@phosphor-icons/react";
import type { GithubUser } from "@/lib/api";

interface Props {
	user: GithubUser;
}

export default function Avatar({ user }: Props) {
	return (
		<div className="py-5 md:px-10">
			<img
				src={user.avatar_url}
				alt="avatar"
				className="mx-auto mb-5 h-52 w-52 rounded-full object-contain shadow-lg"
			/>

			<h2 className="my-2 text-center text-xl text-gray-900">
				{user.name}
			</h2>

			<div className="mx-auto flex w-10/12 flex-col justify-center gap-2 text-center md:w-auto md:flex-row md:gap-8">
				<div className="flex flex-col items-center gap-1">
					<strong className="text-blue-700">Following</strong>
					<div className="flex items-center">
						<UsersIcon size={24} className="mr-2 text-gray-900" />
						<span>{user.following}</span>
					</div>
				</div>

				<div className="flex flex-col items-center gap-1">
					<strong className="text-blue-700">Followers</strong>
					<div className="flex items-center">
						<UsersIcon size={24} className="mr-2 text-gray-900" />
						<span>{user.followers}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
