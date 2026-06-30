import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import Logo from "../../../public/logo.png";
import { MenuStudyPlan } from "./-components/menu-studyplan";

export const Route = createFileRoute("/_app/")({ component: Home });

function Home() {
	return (
		<>
			<div className="bg-zinc-900/40 w-full h-20 px-6 py-8 flex items-center">
				<div className="flex items-center">
					<Link to="/">
						<img
							src={Logo}
							alt="prumometria.logo"
							className="h-18 w-auto block"
						/>
					</Link>

				</div>
				<div className="flex items-center gap-4">
					<div className="shrink-0 bg-zinc-800 w-px h-6" />
					<MenuStudyPlan />
				</div>
			</div>

			<Outlet />
		</>
	);
}
