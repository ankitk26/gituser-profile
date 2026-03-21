import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface Props {
	page: number;
	lastPage: number;
	user: string;
}

export default function ReposPagination({ page, lastPage, user }: Props) {
	return (
		<div className="mx-auto mt-10 flex items-center justify-center gap-5">
			<Link to={`/${user}/repos/${page - 1}`}>
				<button
					className="flex items-center rounded bg-blue-500 p-1 text-white hover:bg-blue-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-20"
					disabled={page === 1}
				>
					<CaretLeftIcon size={24} />
				</button>
			</Link>

			{page}

			<Link to={`/${user}/repos/${page + 1}`}>
				<button
					className="flex items-center rounded bg-blue-500 p-1 text-white hover:bg-blue-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-20"
					disabled={page === lastPage}
				>
					<CaretRightIcon size={24} />
				</button>
			</Link>
		</div>
	);
}
