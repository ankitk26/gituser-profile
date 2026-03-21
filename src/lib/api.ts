const BASE_URL = "https://api.github.com/users";

export interface GithubUser {
	login: string;
	name: string;
	avatar_url: string;
	bio: string | null;
	company: string | null;
	location: string | null;
	blog: string;
	hireable: boolean;
	public_repos: number;
	followers: number;
	following: number;
}

export interface GithubRepo {
	id: number;
	name: string;
	description: string | null;
	clone_url: string;
	watchers: number;
	forks: number;
	owner: { login: string };
}

export async function fetchUser(username: string): Promise<GithubUser> {
	const res = await fetch(`${BASE_URL}/${username}`);
	if (!res.ok) throw new Error("No user found");
	return res.json();
}

export async function fetchRepos(
	username: string,
	page: number,
): Promise<{ repos: GithubRepo[]; lastPage: number | null }> {
	const [reposRes, userRes] = await Promise.all([
		fetch(`${BASE_URL}/${username}/repos?page=${page}`),
		fetch(`${BASE_URL}/${username}`),
	]);
	if (!reposRes.ok) throw new Error("Failed to fetch repos");
	if (!userRes.ok) throw new Error("Failed to fetch user");
	const repos: GithubRepo[] = await reposRes.json();
	const user: GithubUser = await userRes.json();
	const lastPage = Math.ceil(user.public_repos / 30) || null;
	return { repos, lastPage };
}
