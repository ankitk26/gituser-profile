import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
import Avatar from "@/components/avatar";
import BasicInfo from "@/components/basic-info";
import Repo from "@/components/repo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import UserInputForm from "@/components/user-input-form";
import { useUserQuery, useReposQuery } from "@/hooks/use-github";
import ErrorMessage from "@/layouts/error-message";
import Loader from "@/layouts/loader";

function RepoSkeleton() {
	return (
		<Card>
			<CardContent className="flex gap-3.5">
				<Skeleton className="mt-0.5 size-[18px] shrink-0 rounded" />
				<div className="flex-1 space-y-2.5">
					<Skeleton className="h-4 w-2/3" />
					<Skeleton className="h-3 w-full" />
					<div className="flex gap-2">
						<Skeleton className="h-5 w-14 rounded-4xl" />
						<Skeleton className="h-5 w-12 rounded-4xl" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default function Home() {
	const [username, setUsername] = useState<string | null>(null);
	const [page, setPage] = useState(1);

	const {
		data: user,
		isLoading: userLoading,
		error: userError,
	} = useUserQuery(username);
	const { data: reposData, isLoading: reposLoading } = useReposQuery(
		username,
		page,
	);

	const handleSearch = (name: string) => {
		setUsername(name);
		setPage(1);
	};

	return (
		<>
			<UserInputForm onSearch={handleSearch} />

			{!username && (
				<p className="mx-auto mt-16 max-w-xs px-6 text-center text-sm text-muted-foreground">
					Search a GitHub username to view their profile and
					repositories.
				</p>
			)}

			{username && userLoading && <Loader />}

			{username && userError && (
				<ErrorMessage error={userError.message} />
			)}

			{username && user && (
				<div className="mx-auto mt-8 max-w-lg space-y-6 px-6 pb-16">
					<Card>
						<CardContent className="flex flex-col items-center gap-6 py-8">
							<Avatar user={user} />
							<Separator />
							<BasicInfo user={user} />
						</CardContent>
					</Card>

					{user.public_repos > 0 && (
						<div className="space-y-3">
							<div className="flex items-center justify-between px-1">
								<span className="text-xs font-medium tracking-tight text-muted-foreground">
									Repositories
								</span>
								<Badge
									variant="outline"
									className="font-mono text-[10px]"
								>
									{user.public_repos}
								</Badge>
							</div>

							{reposLoading ? (
								<div className="space-y-2.5">
									{[...Array(3)].map((_, i) => (
										<RepoSkeleton key={i} />
									))}
								</div>
							) : (
								<div className="space-y-2.5">
									{reposData?.repos.map((repo) => (
										<Repo key={repo.id} repo={repo} />
									))}

									{reposData?.lastPage &&
										reposData.lastPage > 1 && (
											<div className="flex items-center justify-center gap-3 pt-3">
												<Button
													variant="outline"
													size="icon-sm"
													disabled={page === 1}
													onClick={() =>
														setPage((p) => p - 1)
													}
												>
													<CaretLeftIcon size={14} />
												</Button>
												<span className="font-mono text-xs text-muted-foreground">
													{page} /{" "}
													{reposData.lastPage}
												</span>
												<Button
													variant="outline"
													size="icon-sm"
													disabled={
														page ===
														reposData.lastPage
													}
													onClick={() =>
														setPage((p) => p + 1)
													}
												>
													<CaretRightIcon size={14} />
												</Button>
											</div>
										)}
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</>
	);
}
