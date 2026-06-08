import { NextResponse } from 'next/server';

async function getToken(): Promise<string> {
    const credentials = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
        cache: 'no-store',
    });

    const data = await res.json();
    return data.access_token as string;
}

export async function GET() {
    try {
        const token = await getToken();

        const ids = (process.env.SPOTIFY_PLAYLIST_IDS ?? '')
            .split(',')
            .map(id => id.trim())
            .filter(Boolean);

        if (!ids.length) {
            return NextResponse.json({ error: 'No playlist IDs configured' }, { status: 500 });
        }

        const playlistId = ids[Math.floor(Math.random() * ids.length)];

        // Get total track count
        const infoRes = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}?fields=tracks(total)`,
            { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
        );
        const info = await infoRes.json();
        const total: number = info.tracks?.total ?? 0;

        if (!total) {
            return NextResponse.json({ error: 'Empty playlist' }, { status: 404 });
        }

        // Fetch a random window of 20 tracks from anywhere in the playlist
        const limit = Math.min(20, total);
        const offset = Math.floor(Math.random() * (total - limit + 1));

        const tracksRes = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}&fields=items(track(id,name,preview_url,artists(name),album(images)))`,
            { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
        );
        const tracksData = await tracksRes.json();

        // Only keep tracks that have a 30s preview URL
        const tracks = (tracksData.items ?? [])
            .map((item: any) => item?.track)
            .filter((t: any) => t?.id && t?.preview_url);

        if (!tracks.length) {
            return NextResponse.json({ error: 'No previewable tracks in window' }, { status: 404 });
        }

        const track = tracks[Math.floor(Math.random() * tracks.length)];

        return NextResponse.json({
            id: track.id,
            name: track.name,
            artist: track.artists[0]?.name ?? 'Unknown',
            albumArt: track.album.images[1]?.url ?? track.album.images[0]?.url ?? null,
            previewUrl: track.preview_url,
        });
    } catch {
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
