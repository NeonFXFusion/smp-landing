import type { Resource } from "@/.contentlayer/generated";
import { EyeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
	resource: Resource;
	views: number;
};

export const Article: React.FC<Props> = ({ resource, views }) => {
	return (
		<Link href={`/resources/${resource.slug}`}>
			<article className="p-4 md:p-8">
				<div className="flex gap-2 justify-between items-center">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{resource.date ? (
							<time dateTime={new Date(resource.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(resource.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="flex gap-1 items-center text-xs text-zinc-500">
						<EyeIcon className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
					{resource.title}
				</h2>
				<p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{resource.description}
				</p>
			</article>
		</Link>
	);
};
