import Link from "next/link";
import React from "react";
import { allResources } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { EyeIcon } from "@heroicons/react/20/solid";
import Redis from "ioredis";

export const revalidate = 60;
export default async function ResourcesPage() {

	const redis = new Redis(process.env.REDIS_URL || 'localhost:6379')

	const views = (
		await redis.mget(
			...allResources.map((p) => ["pageviews", "projects", p.slug].join(":")),
		)
	).reduce((acc, v, i) => {
		acc[allResources[i].slug] = Number(v) ?? 0;
		return acc;
	}, {} as Record<string, number>);

	const featured = allResources.find((resource) => resource.slug === "registering")!;
	const top2 = allResources.find((resource) => resource.slug === "treecapitator")!;
	const top3 = allResources.find((resource) => resource.slug === "autocrafting")!;
	const sorted = allResources
		.filter((r) => r.published)
		.filter(
			(resource) =>
				resource.slug !== featured?.slug &&
				resource.slug !== top2?.slug &&
				resource.slug !== top3?.slug,
		)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-white text-outline sm:text-4xl">
						Resources
					</h2>
					<p className="mt-4 text-zinc-400">
						Guides to using extended gameplay features on the SMP aswell as showcases of user created structures.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-100" />

				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
					{featured?
					<Card>
						<Link href={`/resources/${featured.slug}`}>
							<article className="relative p-4 w-full h-full md:p-8">
								<div className="flex gap-2 justify-between items-center">
									<div className="text-xs text-zinc-400">
										{featured.date ? (
											<time dateTime={new Date(featured.date).toISOString()}>
												{Intl.DateTimeFormat(undefined, {
													dateStyle: "medium",
												}).format(new Date(featured.date))}
											</time>
										) : (
											<span>SOON</span>
										)}
									</div>
									<span className="flex gap-1 items-center text-xs text-zinc-400">
										<EyeIcon className="w-4 h-4" />{" "}
										{Intl.NumberFormat("en-US", { notation: "compact" }).format(
											views[featured.slug] ?? 0,
										)}
									</span>
								</div>

								<h2
									id="featured-post"
									className="mt-4 text-3xl font-bold text-white group-hover:text-white sm:text-4xl font-display"
								>
									{featured.title}
								</h2>
								<p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
									{featured.description}
								</p>
								<div className="absolute bottom-4 md:bottom-8">
									<p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
										Read more <span aria-hidden="true">&rarr;</span>
									</p>
								</div>
							</article>
						</Link>
					</Card>: 
					''}

					<div className="flex flex-col gap-8 mx-auto w-full border-t border-gray-900/10 lg:mx-0 lg:border-t-0">
						{[top2, top3].map((resource) => (
							<>
							{resource?
							<Card key={resource.slug}>
								<Article
									resource={resource}
									views={views[resource.slug] ?? 0}
								/>
							</Card>
							: ''}
							</>
						))}
					</div>
				</div>
				<div className="hidden w-full h-px md:block bg-zinc-100" />

				<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 0)
							.map((resource) => (
								<Card key={resource.slug}>
									<Article
										resource={resource}
										views={views[resource.slug] ?? 0}
									/>
								</Card>
							))}
					</div>
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 1)
							.map((resource) => (
								<Card key={resource.slug}>
									<Article
										resource={resource}
										views={views[resource.slug] ?? 0}
									/>
								</Card>
							))}
					</div>
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 2)
							.map((resource) => (
								<Card key={resource.slug}>
									<Article
										resource={resource}
										views={views[resource.slug] ?? 0}
									/>
								</Card>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
