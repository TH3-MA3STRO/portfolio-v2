import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not refresh Spotify access token.");
  }

  const data = await response.json();
  return data.access_token;
};

export async function GET() {
  try {
    const access_token = await getAccessToken();

    const nowPlaying = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (nowPlaying.status === 204 || nowPlaying.status > 400) {
      return NextResponse.json({ isPlaying: false }, { status: 200 });
    }

    const song = await nowPlaying.json();
    return NextResponse.json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((a: { name: string }) => a.name).join(", "),
      albumImageUrl: song.item.album.images[0].url,
      songUrl: song.item.external_urls.spotify,
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
