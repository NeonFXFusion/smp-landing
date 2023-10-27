"use server"
import { Redis } from "ioredis";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { headers } from 'next/headers'

const redis = new Redis(process.env.REDIS_URL || 'localhost:6379')

/*export const config = {
	runtime: "edge",
}*/

export async function POST(req: NextRequest): Promise<NextResponse> {
	/*if (headers().get("Content-Type") !== "application/json") {
		return new NextResponse("must be json", { status: 400 });
	}*/

	const body = await req.json()
	let slug: string | undefined = undefined;
	if ("slug" in body) {
		slug = body.slug;
	}
	if (!slug) {
		return new NextResponse("Slug not found", { status: 400 });
	}
	const ip = req.ip;
  const agent = userAgent(req)
	if (ip) {
		// Hash the IP in order to not store it directly in your db.
		const buf = await crypto.subtle.digest(
			"SHA-256",
			new TextEncoder().encode(ip+':'+agent),
		);
		const hash = Array.from(new Uint8Array(buf))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");

		// deduplicate the ip for each slug
		const isNew = await redis.setnx(["deduplicate", hash, slug].join(":"), 1);
		if (!isNew) {
			new NextResponse(null, { status: 202 });
		}
		redis.setex(["deduplicate", hash, slug].join(":"), 24*60*60, 1)
	}
	await redis.incr(["pageviews", "projects", slug].join(":"));
	return new NextResponse(null, { status: 202 });
}
