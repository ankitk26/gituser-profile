import { UsersIcon } from "@phosphor-icons/react";
import type { GithubUser } from "@/lib/api";

interface Props {
	user: GithubUser;
}

export default function Avatar({ user }: Props) {
	return (
		<div className="flex flex-col items-center gap-4">
			<img
				src={user.avatar_url}
				alt={user.login}
				className="size-28 rounded-full ring-1 ring-border"
			/>
			<div className="text-center">
				{user.name && (
					<h2 className="text-lg font-semibold tracking-tight">
						{user.name}
					</h2>
				)}
				<div className="mt-1.5 flex items-center justify-center gap-4 text-xs text-muted-foreground">
					<span className="flex items-center gap-1">
						<UsersIcon size={13} weight="fill" />
						{user.followers} followers
					</span>
					<span className="text-border">·</span>
					<span className="flex items-center gap-1">
						<UsersIcon size={13} />
						{user.following} following
					</span>
				</div>
			</div>
		</div>
	);
}
