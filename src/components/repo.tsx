import { GitBranchIcon } from "@phosphor-icons/react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import type { GithubRepo } from "@/lib/api";

interface Props {
	repo: GithubRepo;
}

export default function Repo({ repo }: Props) {
	const [copy] = useCopyToClipboard();

	const copyUrl = () => {
		copy(repo.clone_url);
	};

	return (
		<div className="text-md my-6 w-full bg-gray-200 p-5" key={repo.id}>
			<div className="mt-2 flex max-w-full items-center gap-12">
				<GitBranchIcon
					size={80}
					className="hidden text-gray-800 md:block"
				/>
				<div className="flex w-full max-w-full flex-col">
					<h1 className="text-2xl font-semibold break-words text-blue-500 hover:underline">
						<a
							href={`https://github.com/${repo.owner.login}/${repo.name}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{repo.name}
						</a>
					</h1>

					<p className="">{repo.description}</p>

					<div className="my-3 flex w-1/2 items-start justify-start gap-4 text-sm">
						<div className="flex gap-2 rounded-full bg-gray-800 px-3 py-0.5 text-white md:px-5">
							<span className="text-gray-100">
								{repo.watchers}
							</span>{" "}
							watchers
						</div>
						<div className="flex gap-2 rounded-full bg-gray-800 px-3 py-0.5 text-white md:px-5">
							<span className="text-gray-100">{repo.forks}</span>{" "}
							forks
						</div>
					</div>

					<div>
						<span className="font-semibold text-gray-900">
							Clone URL:{" "}
						</span>
						<button
							className="text-left break-words text-gray-600 hover:underline"
							type="button"
							onClick={copyUrl}
						>
							{repo.clone_url}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
