"use server"
import { Redis } from "ioredis";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { headers } from 'next/headers'

/*export const config = {
	runtime: "edge",
}*/

export async function POST(req: NextRequest): Promise<NextResponse> {
	if (headers().get("Content-Type") !== "application/json") {
		return new NextResponse("Must be json", { status: 400 });
	}

	const body = await req.json()
	let slug: string | undefined = undefined;
	if ("slug" in body) {
		slug = body.slug;
	}
	if (!slug) {
		return new NextResponse("Slug not found", { status: 400 });
	}

	try {
		const redis = new Redis(process.env.REDIS_URL || 'localhost:6379', {
			lazyConnect: true,
			enableOfflineQueue: false,
			maxRetriesPerRequest: 0,
		})
	
		redis.on('error', e => {
			const env = process.env.NODE_ENV
			if(env == "development"){
				console.log('[ioredis]', e.message)
			}
		})

		redis.connect()

		const ip = headers().get("X-Forwarded-For")
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
	} catch {
		return new NextResponse("Redis is down", { status: 500 });
	}
}
