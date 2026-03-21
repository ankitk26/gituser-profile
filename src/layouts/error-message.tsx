interface Props {
	error: string;
}

export default function ErrorMessage({ error }: Props) {
	return (
		<p className="mx-auto mt-10 w-10/12 rounded bg-red-500 p-2 text-center text-lg text-white lg:w-1/3">
			{error}
		</p>
	);
}
