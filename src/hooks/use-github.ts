import { useQuery } from "@tanstack/react-query";
import { fetchRepos, fetchUser } from "@/lib/api";

export function useUserQuery(username: string | null) {
	return useQuery({
		queryKey: ["user", username],
		queryFn: () => fetchUser(username!),
		enabled: !!username,
	});
}

export function useReposQuery(username: string, page: number) {
	return useQuery({
		queryKey: ["repos", username, page],
		queryFn: () => fetchRepos(username, page),
	});
}
