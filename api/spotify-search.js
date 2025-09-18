// ========= //
// API Route //
// ========= //

export default async function handler(req, res) 
{
  try 
  {
    const { q, artist } = req.query || {};

    if (!q || !artist) 
    {
      return res.status(400).json({ error: "Missing q or artist" });
    }

    const clientID = process.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientID || !clientSecret) 
    {
      return res.status(500).json({ error: "Missing Spotify env vars" });
    }

    // 1) Get access token (server-side).
    const tokenResp = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${clientID}:${clientSecret}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "client_credentials" }),
    });

    const tokenData = await tokenResp.json();
    const accessToken = tokenData?.access_token;

    if (!accessToken) 
    {
      return res.status(500).json({ error: "Failed to get access token" });
    }

    // 2) Search for the track.
    const searchParams = new URLSearchParams({
      q: `track:${q} artist:${artist}`,
      type: "track",
      limit: "1",
    });
    
    const searchResp = await fetch(
      `https://api.spotify.com/v1/search?${searchParams.toString()}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const searchData = await searchResp.json();
    const item = searchData?.tracks?.items?.[0];

    if (!item) return res.status(200).json(null);

    // Minimal payload back to the client.
    return res.status(200).json({
      url: item.external_urls?.spotify,
      image: item.album?.images?.[1]?.url || item.album?.images?.[0]?.url,
      name: item.name,
      artist: item.artists?.map((a) => a.name).join(", "),
    });
  } 
  catch (err) 
  {
    console.error("spotify-search error:", err);
    return res.status(500).json({ error: "Spotify proxy error" });
  }
}