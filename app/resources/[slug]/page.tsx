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
	let views = 0;
	try {
		if (!process.env.REDIS_ENABLED) {
			console.log('Redis disabled, assuming build.')
			return
		}
		const redis = new Redis(process.env.REDIS_URL || 'localhost:6379', {
			lazyConnect: true,
			maxLoadingRetryTime: 100,
			maxRetriesPerRequest: 0,
			enableOfflineQueue: false,
		})
	
		redis.on('error', e => {
			const env = process.env.NODE_ENV
			if(env == "development"){
				console.log('[ioredis]', e.message)
			}
		})
		
		await redis.connect()
		views =
			Number(await redis.get(["pageviews", "projects", slug].join(":"))) ?? 0;
	} catch (e) {
		
	}

	return (
		<div className="min-h-screen bg-zinc-50">
			<Header project={project} views={views} />
			<ReportView slug={project.slug} />

			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<Mdx code={project.body.code} />
			</article>
		</div>
	);
}
