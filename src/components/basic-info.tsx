import {
	BuildingsIcon,
	MapPinIcon,
	LinkIcon,
	UserFocusIcon,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import type { GithubUser } from "@/lib/api";

interface Props {
	user: GithubUser;
}

export default function BasicInfo({ user }: Props) {
	return (
		<div className="flex flex-col gap-3">
			<p className="font-mono text-sm font-medium text-primary">
				@{user.login}
			</p>

			{user.bio && (
				<p className="text-sm leading-relaxed text-muted-foreground">
					{user.bio}
				</p>
			)}

			<div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
				{user.company && (
					<span className="flex items-center gap-1.5">
						<BuildingsIcon size={13} weight="duotone" />
						{user.company}
					</span>
				)}
				{user.location && (
					<span className="flex items-center gap-1.5">
						<MapPinIcon size={13} weight="duotone" />
						{user.location}
					</span>
				)}
				{user.blog && (
					<a
						href={
							user.blog.toLowerCase().startsWith("http")
								? user.blog
								: `https://${user.blog}`
						}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 truncate text-primary hover:underline"
					>
						<LinkIcon size={13} weight="duotone" />
						{user.blog}
					</a>
				)}
			</div>

			{user.hireable !== null && (
				<div>
					<Badge variant={user.hireable ? "default" : "secondary"}>
						<UserFocusIcon weight="duotone" />
						{user.hireable ? "Hireable" : "Not hireable"}
					</Badge>
				</div>
			)}
		</div>
	);
}
