// ============ //
// Music Player //
// ============ //

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function MusicPlayer
({
  isMuted = false,
  tracks = [
    "Space Junk Road.mp3",
    "Stardust Speedway (G).mp3",
    "Simpsons Hotline.mp3",
    "Beneath the Mask -rain-.mp3",
    "Darkness Time.mp3",
    "Fresh (Chill Mix).mp3",
    "Nintendo (Remix).mp3",
    "how to sleep.mp3",
  ],
  basePath = "/music/",
  volume = 1.0,
}) 
{
  const audioRef = useRef(null);
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);

  // Build absolute URLs once per content change.
  const playlist = useMemo(
    () => (tracks || []).map((name) => `${basePath}${name}`),
    [tracks, basePath]
  );

  // Shuffle the tracks.
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) 
    {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const prevPlaylistRef = useRef([]);
  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  };

  // Initialize/refresh the queue when playlist content changes.
  useEffect(() => {
    if (!playlist.length) return;
    if (!arraysEqual(prevPlaylistRef.current, playlist)) 
    {
      const next = shuffle(playlist);
      setQueue(next);
      setIdx(0);
      prevPlaylistRef.current = playlist.slice();
    }
  }, [playlist]);

  // Core effect: set/keep the current track and play.
  // IMPORTANT: this does NOT depend on isMuted — so toggling mute won't reset src.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !queue.length) return;

    // Only set src if it's actually different to avoid resetting playback.
    if (audio.src !== queue[idx]) 
    {
      audio.src = queue[idx];
    }

    // Try to play (autoplay may be blocked until user gesture).
    audio.play().catch(() => {
      // Will start after the first user interaction (clicking the mute button).
    });
  }, [queue, idx]);

  // Separate effect for mute/volume only; never touches src.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = Math.min(Math.max(volume, 0), 1);
    audio.muted = !!isMuted;

    // If unmuting and playback is paused (e.g., due to autoplay policy), try resuming.
    if (!isMuted && audio.paused) 
    {
      audio.play().catch(() => {});
    }
  }, [isMuted, volume]);

  // When a track ends, move to the next; reshuffle when we reach the end.
  const handleEnded = () => {
    if (!queue.length) return;
    if (idx < queue.length - 1) 
    {
      setIdx((i) => i + 1);
    } 
    else 
    {
      const next = shuffle(queue);
      // Avoid immediate back-to-back duplicate if possible.
      if (queue.length > 1 && next[0] === queue[queue.length - 1]) 
      {
        [next[0], next[1]] = [next[1], next[0]];
      }
      setQueue(next);
      setIdx(0);
    }
  };

  if (!playlist.length) return null;

  return (
    <audio
      ref={audioRef}
      preload="auto"
      onEnded={handleEnded}
      // Headless element.
      style={{ display: "none" }}
    />
  );
}