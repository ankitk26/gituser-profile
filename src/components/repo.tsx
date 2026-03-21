import {
	GitBranchIcon,
	StarIcon,
	ForkKnifeIcon,
	CopyIcon,
	CheckIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { GithubRepo } from "@/lib/api";

interface Props {
	repo: GithubRepo;
}

export default function Repo({ repo }: Props) {
	const [copied, setCopied] = useState(false);

	const copyUrl = async () => {
		try {
			await navigator.clipboard.writeText(repo.clone_url);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// clipboard not available
		}
	};

	return (
		<Card className="transition-colors hover:bg-muted/30">
			<CardContent className="flex gap-3.5">
				<GitBranchIcon
					size={18}
					className="mt-0.5 shrink-0 text-muted-foreground/60"
				/>
				<div className="flex min-w-0 flex-1 flex-col gap-2.5">
					<a
						href={`https://github.com/${repo.owner.login}/${repo.name}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm font-medium text-primary hover:underline"
					>
						{repo.name}
					</a>

					{repo.description && (
						<p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
							{repo.description}
						</p>
					)}

					<div className="flex items-center gap-3">
						<Badge variant="outline" className="gap-1 text-[10px]">
							<StarIcon weight="fill" />
							{repo.watchers}
						</Badge>
						<Badge variant="outline" className="gap-1 text-[10px]">
							<ForkKnifeIcon weight="duotone" />
							{repo.forks}
						</Badge>
						<button
							type="button"
							onClick={copyUrl}
							className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
						>
							{copied ? (
								<CheckIcon size={11} className="text-primary" />
							) : (
								<CopyIcon size={11} />
							)}
							{copied ? "copied" : "clone url"}
						</button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
