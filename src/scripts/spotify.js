// =========== //
// Spotify API //
// =========== //

import axios from "axios";

// I hate APIs.
export async function searchSpotifyTrack(trackName, artistName) 
{
  try 
  {
    const res = await axios.get("/api/spotify-search", {
      params: { q: trackName, artist: artistName },
    });
    
    return res.data;
  } 
  catch 
  {
    return null;
  }
}