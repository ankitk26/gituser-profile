import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
	return (
		<div className="mx-auto mt-8 max-w-lg px-6">
			<Card>
				<CardContent className="flex flex-col items-center gap-4 py-8">
					<Skeleton className="size-28 rounded-full" />
					<Skeleton className="h-5 w-32" />
					<div className="flex gap-3">
						<Skeleton className="h-3 w-20" />
						<Skeleton className="h-3 w-20" />
					</div>
					<div className="mt-2 w-full space-y-2">
						<Skeleton className="mx-auto h-3 w-48" />
						<Skeleton className="mx-auto h-3 w-40" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
