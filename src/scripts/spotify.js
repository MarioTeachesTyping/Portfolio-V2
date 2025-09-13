// =========== //
// Spotify API //
// =========== //

import axios from "axios";

async function getSpotifyAccessToken() 
{
  const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  try 
  {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: "Basic " + btoa(`${clientID}:${clientSecret}`),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } 
  catch (error) 
  {
    console.error("Error fetching Spotify token:", error);
    return null;
  }
}

// Returns { url, image, name, artist } for the best-matching track.
export async function searchSpotifyTrack(trackName, artistName) 
{
  const accessToken = await getSpotifyAccessToken();

  if (!accessToken) return null;

  try 
  {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        q: `track:${trackName} artist:${artistName}`,
        type: "track",
        limit: 1,
      },
    });

    const item = response.data?.tracks?.items?.[0];
    
    if (!item) return null;

    return {
      url: item.external_urls?.spotify,
      image: item.album?.images?.[1]?.url || item.album?.images?.[0]?.url,
      name: item.name,
      artist: item.artists?.map((a) => a.name).join(", "),
    };
  } 
  catch (error) 
  {
    console.error("Error querying Spotify:", error);
    return null;
  }
}