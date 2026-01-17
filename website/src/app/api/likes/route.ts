import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

// initialize redis client from environment variables
const redis = Redis.fromEnv();

// configure rate limiter: 5 requests per minute per IP using sliding window
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true, // enable analytics for monitoring
    prefix: "ratelimit:likes",
});

// GET endpoint - public read access for like count
export async function GET() {
    try {
        const count = await kv.get<number>("love-count") || 0;
        return NextResponse.json({ count });
    } catch (error) {
        console.error("Failed to fetch count:", error);
        return NextResponse.json(
            { error: "server_error", message: "Failed to fetch like count" },
            { status: 500 }
        );
    }
}

// POST endpoint - increment like count with security measures
export async function POST(request: Request) {
    try {
        // extract client IP from headers (vercel provides x-forwarded-for)
        const forwarded = request.headers.get("x-forwarded-for");
        const realIp = request.headers.get("x-real-ip");
        const ip = forwarded?.split(",")[0].trim() || realIp || "anonymous";

        // rate limiting check
        const { success, limit, remaining, reset } = await ratelimit.limit(ip);

        if (!success) {
            const resetDate = new Date(reset);
            console.warn(`Rate limit exceeded for IP: ${ip}`);

            return NextResponse.json(
                {
                    error: "rate_limit",
                    message: "Too many requests. Please try again later.",
                    resetAt: resetDate.toISOString()
                },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": limit.toString(),
                        "X-RateLimit-Remaining": remaining.toString(),
                        "X-RateLimit-Reset": reset.toString(),
                    }
                }
            );
        }

        // optional: CORS validation (uncomment if needed)
        // const origin = request.headers.get("origin");
        // const allowedOrigins = [
        //     process.env.NEXT_PUBLIC_SITE_URL,
        //     "http://localhost:3000",
        //     "http://localhost:3001"
        // ].filter(Boolean);
        // 
        // if (origin && !allowedOrigins.includes(origin)) {
        //     console.warn(`Blocked request from unauthorized origin: ${origin}`);
        //     return NextResponse.json(
        //         { error: "forbidden", message: "Unauthorized origin" },
        //         { status: 403 }
        //     );
        // }

        // check if this IP has already liked (24 hour expiration)
        const likeKey = `liked:${ip}`;
        const hasLiked = await kv.get(likeKey);

        if (hasLiked) {
            console.info(`Duplicate like attempt from IP: ${ip}`);
            return NextResponse.json(
                {
                    error: "already_liked",
                    message: "You've already liked this site!"
                },
                { status: 400 }
            );
        }

        // increment the global like count
        const count = await kv.incr("love-count");

        // mark this IP as having liked (expires in 24 hours = 86400 seconds)
        await kv.set(likeKey, true, { ex: 86400 });

        console.info(`New like from IP: ${ip}. Total count: ${count}`);

        return NextResponse.json({
            count,
            success: true,
            message: "Thank you for liking!"
        });

    } catch (error) {
        console.error("Failed to process like:", error);
        return NextResponse.json(
            {
                error: "server_error",
                message: "Failed to process your like. Please try again later."
            },
            { status: 500 }
        );
    }
}
