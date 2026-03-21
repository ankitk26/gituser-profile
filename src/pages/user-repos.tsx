import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { GithubRepo } from "../context/user-context";
import { UserContext } from "../context/user-context";
import Repo from "../components/repo";
import ReposPagination from "../components/repos-pagination";
import Loader from "../layouts/loader";

interface LinkHeader {
  url: string;
  rel: string;
  page: string;
}

function parseLinkHeader(header: string | undefined): Record<string, LinkHeader> | null {
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

export default function UserRepos() {
  const params = useParams();
  const pageNumber = parseInt(params.pageNumber!);
  const user = params.username!;

  const [page, setPage] = useState(pageNumber);
  const [lastPage, setLastPage] = useState<number | null>(null);

  const context = useContext(UserContext);
  if (!context) throw new Error("UserRepos must be used within UserProvider");
  const { loading, repos, fetchRepos } = context;

  const REPOS_URL = `https://api.github.com/users/${user}/repos?page=${page}`;

  const getLastPage = async () => {
    const res = await axios.get<GithubRepo[]>(REPOS_URL);
    const parsed = parseLinkHeader(res.headers.link as string | undefined);
    setLastPage(parsed?.last ? parseInt(parsed.last.page) : null);
  };

  useEffect(() => {
    fetchRepos(user, page);

    if (page !== lastPage) {
      getLastPage();
    }

    setPage(pageNumber);
  }, [pageNumber]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {lastPage && (
        <ReposPagination
          user={user}
          page={page}
          setPage={setPage}
          lastPage={lastPage}
        />
      )}

      {repos && (
        <>
          <h4 className="w-1/2 mx-auto mt-8 text-lg text-center text-gray-900">
            {repos.length} results
          </h4>

          <div className="w-full mx-auto md:w-4/5">
            {repos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </div>
        </>
      )}

      <div className="mb-12">
        {lastPage && (
          <ReposPagination
            user={user}
            page={page}
            setPage={setPage}
            lastPage={lastPage}
          />
        )}
      </div>
    </div>
  );
}
