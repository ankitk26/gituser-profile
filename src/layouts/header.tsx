import { GithubLogoIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
			<div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
				<Link
					to="/"
					className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
				>
					<GithubLogoIcon size={22} weight="duotone" />
					<span className="text-sm font-medium tracking-tight">
						gituser-profile
					</span>
				</Link>
			</div>
			<Separator />
		</header>
	);
}
