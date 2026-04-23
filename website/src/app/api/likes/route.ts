import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

const hasRedisEnv = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;
const hasKvEnv = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

const redis = hasRedisEnv ? Redis.fromEnv() : null;

// rate limiter: 5 requests per minute per IP using sliding window
const ratelimit = redis ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true, // enable analytics for monitoring
    prefix: "ratelimit:likes",
}) : null;

export async function GET() {
    try {
        if (!hasKvEnv) {
            return NextResponse.json({ count: 0 }); // Fallback for local development
        }

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
        if (!hasKvEnv || !hasRedisEnv || !ratelimit) {
            return NextResponse.json({
                count: 1, // Fallback for local development
                success: true,
                message: "Thank you for liking! (Local Database Disabled)"
            });
        }

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
