import { useParams } from "react-router-dom";
import Repo from "@/components/repo";
import ReposPagination from "@/components/repos-pagination";
import { useReposQuery } from "@/hooks/use-github";
import Loader from "@/layouts/loader";

export default function UserRepos() {
	const params = useParams();
	const pageNumber = parseInt(params.pageNumber!);
	const username = params.username!;

	const { data, isLoading } = useReposQuery(username, pageNumber);

	if (isLoading) return <Loader />;

	const repos = data?.repos ?? [];
	const lastPage = data?.lastPage ?? null;

	return (
		<div>
			{lastPage && (
				<ReposPagination
					user={username}
					page={pageNumber}
					lastPage={lastPage}
				/>
			)}

			{repos.length > 0 && (
				<>
					<h4 className="mx-auto mt-8 w-1/2 text-center text-lg text-gray-900">
						{repos.length} results
					</h4>

					<div className="mx-auto w-full md:w-4/5">
						{repos.map((repo) => (
							<Repo key={repo.id} repo={repo} />
						))}
					</div>
				</>
			)}

			<div className="mb-12">
				{lastPage && (
					<ReposPagination
						user={username}
						page={pageNumber}
						lastPage={lastPage}
					/>
				)}
			</div>
		</div>
	);
}
