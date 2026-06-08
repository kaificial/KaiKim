import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    const error = req.nextUrl.searchParams.get('error');

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: 'No code received' }, { status: 400 });
    }

    // Exchange code for tokens
    const credentials = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'https://www.kaikim.ca/api/spotify/callback',
        }),
    });

    const data = await res.json();

    return NextResponse.json({
        refresh_token: data.refresh_token,
        access_token: data.access_token,
        instructions: 'Copy the refresh_token and add it to .env.local as SPOTIFY_REFRESH_TOKEN',
    });
}
