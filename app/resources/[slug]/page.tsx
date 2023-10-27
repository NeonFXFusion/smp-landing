import { notFound } from "next/navigation";
import { allResources } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "ioredis";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allResources
		.filter((r) => r.published)
		.map((r) => ({
			slug: r.slug,
		}));
}

export default async function PostPage({ params }: Props) {
	const slug = params.slug;
	const project = allResources.find((project) => project.slug === slug);

	if (!project) {
		notFound();
	}
	const redis = new Redis(process.env.REDIS_URL |)
	
	const views =
		(await redis.get(["pageviews", "projects", slug].join(":"))) ?? 0;

	return (
		<div className="min-h-screen bg-zinc-50">
			<Header project={project} views={Number(views)} />
			<ReportView slug={project.slug} />

			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<Mdx code={project.body.code} />
			</article>
		</div>
	);
}
