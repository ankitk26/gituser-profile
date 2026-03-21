import { useUserQuery } from "@/hooks/use-github";
import ErrorMessage from "@/layouts/error-message";
import Loader from "@/layouts/loader";
import Avatar from "./avatar";
import BasicInfo from "./basic-info";

interface Props {
	username: string | null;
	onClear: () => void;
}

export default function UserInfo({ username, onClear }: Props) {
	const { data: user, isLoading, error } = useUserQuery(username);

	if (!username) return null;

	if (isLoading) return <Loader />;

	if (error) {
		return <ErrorMessage error={error.message} />;
	}

	if (!user) return null;

	return (
		<div className="mx-auto my-10 w-screen bg-gray-200 p-5 shadow-2xl md:w-10/12">
			<div className="md:grid md:grid-cols-2 md:gap-10">
				<Avatar user={user} />
				<hr className="h-px bg-gray-500 md:hidden" />
				<BasicInfo user={user} onClear={onClear} />
			</div>
		</div>
	);
}
