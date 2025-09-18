// ========== //
// LastFM API //
// ========== //

import axios from "axios";

// Returns [{ name, artist, playcount }] for last 30 days.
export async function getLastFmTopTracks({ username, limit = 3 }) 
{
  try 
  {
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;

    const params = {
      method: "user.gettoptracks",
      period: "30day",
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