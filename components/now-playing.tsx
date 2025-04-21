import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function SpotifyNowPlayingCard() {
  interface SpotifyData {
    isPlaying: boolean;
    albumImageUrl?: string;
    title?: string;
    artist?: string;
    songUrl?: string;
  }

  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/spotify");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 120000); // Update every 30 sec
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-black  mx-auto md:mx-0  text-gray-900 dark:text-white rounded-lg p-6 shadow-lg w-full max-w-[16rem] md:max-w-md flex items-center justify-center border border-gray-200 dark:border-gray-800">
        <Loader2 className="h-10 w-10 text-green-500 animate-spin" />
      </div>
    );
  }

  if (!data || !data.isPlaying) {
    return (
      <div className="bg-white dark:bg-black  mx-auto md:mx-0  text-gray-700 dark:text-gray-300 rounded-lg p-6 shadow-lg w-full max-w-[16rem] md:max-w-md border border-gray-200 dark:border-gray-800">
        <div className="text-center flex flex-row items-center">
          <Image src={'/logos/spotify.svg'} width={128} height={128} alt="spotify logo"/>
          <p className="text-lg font-medium">Not playing anything right now</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br py-4 px-6 from-gray-100 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white rounded-lg shadow-lg w-full max-w-[16rem] md:max-w-md overflow-hidden mx-auto md:mx-0 border-2 border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Album Cover */}
        <div className="md:w-1/3 relative group">
          <img
            src={data.albumImageUrl || "/api/placeholder/300/300"}
            alt={`${data.title} album art`}
            className="w-full h-full max-h-[200px] object-cover"
          />
        </div>

        {/* Track Info */}
        <div className="p-4 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <p className="text-sm text-green-500 font-medium">
                Currently vibing to ...
              </p>
            </div>

            <h2 className="text-xl font-bold mb-1">{data.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {data.artist}
            </p>
          </div>

          <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full text-sm font-medium text-center transition-colors duration-300"
          >
            Play on Spotify
          </a>
        </div>
      </div>
    </div>
  );
}
