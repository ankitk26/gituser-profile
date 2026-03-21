import { useUser } from "../context/user-context";
import ErrorMessage from "../layouts/error-message";
import Loader from "../layouts/loader";
import Avatar from "./avatar";
import BasicInfo from "./basic-info";

const UserInfo = () => {
  const { error, loading, user } = useUser();

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="w-screen p-5 mx-auto my-10 bg-gray-200 shadow-2xl md:w-10/12">
      <div className="md:grid md:grid-cols-2 md:gap-10">
        <Avatar />
        <hr className="h-px bg-gray-500 md:hidden" />
        <BasicInfo />
      </div>
    </div>
  );
};

export default UserInfo;
