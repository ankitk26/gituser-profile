import { Link } from "react-router-dom";

interface ReposPaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number;
  user: string;
}

const ReposPagination = ({ page, setPage, lastPage, user }: ReposPaginationProps) => {
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
            className="btn-pagination"
            onClick={decrementPage}
            disabled={page === 1}
          >
            <i className="material-icons">keyboard_arrow_left</i>
          </button>
        </Link>

        {page}

        <Link to={`/${user}/repos/${page + 1}`}>
          <button
            className="btn-pagination"
            onClick={incrementPage}
            disabled={page === lastPage}
          >
            <i className="material-icons">keyboard_arrow_right</i>
          </button>
        </Link>
      </div>
    </>
  );
};

export default ReposPagination;
