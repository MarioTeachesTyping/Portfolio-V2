// ========== //
// LastFM API //
// ========== //

import axios from "axios";

// Returns [{ name, artist, playcount }] for last 7 days.
export async function getLastFmTopTracks({ username, limit = 3 }) 
{
  try 
  {
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;

    const params = {
      method: "user.gettoptracks",
      period: "7day",
      user: username,
      api_key: apiKey,
      limit,
      format: "json",
    };

    const response = await axios.get("https://ws.audioscrobbler.com/2.0/", { params });

    return (response.data?.toptracks?.track || []).map((t) => ({
      name: t?.name,
      artist: t?.artist?.name,
      playcount: t?.playcount,
    }));
  } 
  catch (error) 
  {
    console.error("Error getting Last.fm top tracks:", error);
    return null;
  }
}

// Returns the currently playing or most recent track.
// Returns { name, artist, nowPlaying, timestamp }
export async function getLastFmCurrentTrack({ username }) 
{
  try 
  {
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;

    const params = {
      method: "user.getrecenttracks",
      user: username,
      api_key: apiKey,
      limit: 1,
      format: "json",
    };

    const response = await axios.get("https://ws.audioscrobbler.com/2.0/", { params });
    const track = response.data?.recenttracks?.track?.[0];

    if (!track) return null;

    return {
      name: track?.name,
      artist: track?.artist?.["#text"] || track?.artist?.name,
      nowPlaying: track?.["@attr"]?.nowplaying === "true",
      timestamp: track?.date?.uts,
    };
  } 
  catch (error) 
  {
    console.error("Error getting Last.fm current track:", error);
    return null;
  }
}

// Returns [{ name, artist, playcount }] for top albums.
export async function getLastFmTopAlbums({ username, period = "1month", limit = 5 }) 
{
  try 
  {
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;

    const params = {
      method: "user.gettopalbums",
      period,
      user: username,
      api_key: apiKey,
      limit,
      format: "json",
    };

    const response = await axios.get("https://ws.audioscrobbler.com/2.0/", { params });

    return (response.data?.topalbums?.album || []).map((a) => ({
      name: a?.name,
      artist: a?.artist?.name,
      playcount: a?.playcount,
      image: a?.image?.find((img) => img.size === "large")?.["#text"] || 
             a?.image?.find((img) => img.size === "extralarge")?.["#text"],
    }));
  } 
  catch (error) 
  {
    console.error("Error getting Last.fm top albums:", error);
    return null;
  }
}