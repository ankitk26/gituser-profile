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

export interface LinkHeader {
	url: string;
	rel: string;
	page: string;
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
	const res = await fetch(`${BASE_URL}/${username}/repos?page=${page}`);
	if (!res.ok) throw new Error("Failed to fetch repos");
	const repos: GithubRepo[] = await res.json();
	const lastPage = parseLinkHeader(res.headers.get("link") ?? undefined)?.last
		? parseInt(
				parseLinkHeader(res.headers.get("link") ?? undefined)!.last
					.page,
			)
		: null;
	return { repos, lastPage };
}

function parseLinkHeader(
	header: string | undefined,
): Record<string, LinkHeader> | null {
	if (!header) return null;
	const result: Record<string, LinkHeader> = {};
	for (const part of header.split(",")) {
		const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
		if (match) {
			const url = match[1];
			const rel = match[2];
			const page = new URL(url).searchParams.get("page") ?? "";
			result[rel] = { url, rel, page };
		}
	}
	return Object.keys(result).length ? result : null;
}
