import { Link } from "react-router-dom";
import { useUser } from "../context/user-context";

const BasicInfo = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="flex flex-col items-center w-full px-3 mx-auto mt-5 text-lg leading-9 md:items-start align-self-start md:px-0">
      <h1 className="text-2xl text-blue-600">{user.login}</h1>

      {user.bio && (
        <p className="mt-3 leading-6 text-gray-600 md:text-left">{user.bio}</p>
      )}

      {user.company && (
        <div className="flex items-center gap-3 mt-10">
          <i className="text-gray-700 material-icons">corporate_fare</i>
          <span className="md:text-sm">{user.company}</span>
        </div>
      )}

      {user.location && (
        <div className="flex items-center gap-3 mt-4">
          <i className="text-gray-700 material-icons">place</i>
          <span className="md:text-sm">{user.location}</span>
        </div>
      )}

      {user.blog && (
        <div className="flex items-center gap-3 mt-4">
          <i className="text-gray-700 material-icons">email</i>
          <a
            href={`//${user.blog}`}
            className="font-bold text-blue-600 md:text-sm hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.blog}
          </a>
        </div>
      )}

      <div className="flex items-center gap-3 mt-4">
        <i className="text-gray-700 material-icons">person_search</i>
        <strong
          className={`md:text-sm ${
            user.hireable ? "text-green-600" : "text-red-600"
          }`}
        >
          {user.hireable ? "Hireable" : "Not hireable"}
        </strong>
      </div>

      <div className="flex items-center gap-4 mt-4 text-base">
        <i className="material-icons">list</i>
        <Link
          to={`/${user.login}/repos/1`}
          className="font-bold text-blue-600 hover:underline"
        >
          <span>{user.public_repos} repos</span>
        </Link>
      </div>
    </div>
  );
};

export default BasicInfo;
