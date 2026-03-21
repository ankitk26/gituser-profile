import { Link } from "react-router-dom";
import { CaretLeft, CaretRight } from "phosphor-react";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number;
  user: string;
}

export default function ReposPagination({ page, setPage, lastPage, user }: Props) {
  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const decrementPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-5 mx-auto mt-10">
        <Link to={`/${user}/repos/${page - 1}`}>
          <button
            className="flex items-center p-1 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none disabled:opacity-20 disabled:cursor-not-allowed"
            onClick={decrementPage}
            disabled={page === 1}
          >
            <CaretLeft size={24} />
          </button>
        </Link>

        {page}

        <Link to={`/${user}/repos/${page + 1}`}>
          <button
            className="flex items-center p-1 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none disabled:opacity-20 disabled:cursor-not-allowed"
            onClick={incrementPage}
            disabled={page === lastPage}
          >
            <CaretRight size={24} />
          </button>
        </Link>
      </div>
    </>
  );
}
