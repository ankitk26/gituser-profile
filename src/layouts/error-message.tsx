interface Props {
	error: string;
}

export default function ErrorMessage({ error }: Props) {
	return (
		<p className="mx-auto mt-12 max-w-sm px-6 text-center text-sm text-destructive">
			{error}
		</p>
	);
}
