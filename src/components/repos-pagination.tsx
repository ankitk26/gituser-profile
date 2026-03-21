import { Link } from "react-router-dom";
import { CaretLeft as CaretLeftIcon, CaretRight as CaretRightIcon } from "@phosphor-icons/react";

interface Props {
  page: number;
  lastPage: number;
  user: string;
}

export default function ReposPagination({ page, lastPage, user }: Props) {
  return (
    <div className="flex items-center justify-center gap-5 mx-auto mt-10">
      <Link to={`/${user}/repos/${page - 1}`}>
        <button
          className="flex items-center p-1 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none disabled:opacity-20 disabled:cursor-not-allowed"
          disabled={page === 1}
        >
          <CaretLeftIcon size={24} />
        </button>
      </Link>

      {page}

      <Link to={`/${user}/repos/${page + 1}`}>
        <button
          className="flex items-center p-1 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none disabled:opacity-20 disabled:cursor-not-allowed"
          disabled={page === lastPage}
        >
          <CaretRightIcon size={24} />
        </button>
      </Link>
    </div>
  );
}
