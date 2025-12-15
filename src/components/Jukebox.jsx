// ====================== //
// Jukebox (Music Player) //
// ====================== //

import React, { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";

const Jukebox = forwardRef((
{
  tracks = [
    "Space Junk Road.mp3",
    "Space Trip Steps.mp3",
    "Beneath the Mask -rain-.mp3",
    "Darkness Time.mp3",
    "SIMPLE AND CLEAN -PLANITb Remix-.mp3",
    "Pause Menu (Pico).mp3",
    "Fell In Luv.mp3",
    "Nintendo (Remix).mp3",
    "how to sleep.mp3",
    "HARMONIC SOLIDIFICATION.mp3",
  ],
  trackImages = {
    "Space Junk Road.mp3": "/images/albums/mario_galaxy_ost.jpg",
    "Space Trip Steps.mp3": "/images/albums/sa2_ost.jpg",
    "Beneath the Mask -rain-.mp3": "/images/albums/p5_ost.jpg",
    "Darkness Time.mp3": "/images/albums/dgrv3_ost_white.jpg",
    "SIMPLE AND CLEAN -PLANITb Remix-.mp3": "/images/albums/kh1.5_ost.jpg",
    "Pause Menu (Pico).mp3": "/images/albums/fnf_vol3_ost.jpg",
    "Fell In Luv.mp3": "/images/albums/die_lit.png",
    "Nintendo (Remix).mp3": "/images/albums/nintendo_remix.jpg",
    "how to sleep.mp3": "/images/albums/deathbrain.jpg",
    "HARMONIC SOLIDIFICATION.mp3": "/images/albums/harmonic_solidification.jpg",
  },
  trackArtists = {
    "Space Junk Road.mp3": "Mahito Yokota",
    "Space Trip Steps.mp3": "SEGA SOUND TEAM, Tomoya Ohtani",
    "Beneath the Mask -rain-.mp3": "Lyn",
    "Darkness Time.mp3": "Masafumi Takada",
    "SIMPLE AND CLEAN -PLANITb Remix-.mp3": "Utada Hikaru",
    "Pause Menu (Pico).mp3": "Funkin' Sound Team, Kawai Sprite",
    "Fell In Luv.mp3": "Playboi Carti, Bryson Tiller",
    "Nintendo (Remix).mp3": "jalenrekt, QKReign, perfect!",
    "how to sleep.mp3": "Deathbrain",
    "HARMONIC SOLIDIFICATION.mp3": "BONESAW",
  },
  basePath = "/music/",
  volume = 1.0,
  onTrackChange = () => {},
  onPlayStateChange = () => {},
  onTimeUpdate = () => {},
}, ref) => {
  const audioRef = useRef(null);
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [localVolume, setLocalVolume] = useState(volume);
  const [localMuted, setLocalMuted] = useState(true);

  // Build absolute URLs once per content change.
  const playlist = useMemo(
    () => (tracks || []).map((name) => `${basePath}${name}`),
    [tracks, basePath]
  );

  const getCurrentTrackName = () => {
    if (!queue.length) return "Loading...";
    const trackUrl = queue[idx];
    return trackUrl.replace(basePath, '').replace('.mp3', '');
  };

  const getCurrentTrackImage = () => {
    if (!queue.length) return null;
    const trackUrl = queue[idx];
    const trackFileName = trackUrl.replace(basePath, '');
    return trackImages[trackFileName] || null;
  };

  const getCurrentArtist = () => {
    if (!queue.length) return "Artist Name";
    const trackUrl = queue[idx];
    const trackFileName = trackUrl.replace(basePath, '');
    return trackArtists[trackFileName] || "Artist Name";
  };

  const handleNextTrack = () => {
    if (!queue.length) return;
    if (idx < queue.length - 1) {
      setIdx((i) => i + 1);
    } else {
      setIdx(0); // Loop back to start
    }
  };

  const handlePrevTrack = () => {
    if (!queue.length) return;
    if (idx > 0) {
      setIdx((i) => i - 1);
    } else {
      setIdx(queue.length - 1);
    }
  };

  const togglePlayPause = () => {
    setLocalMuted((m) => !m);
  };

  const handleSeek = (time) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (newVolume) => {
    setLocalVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    nextTrack: handleNextTrack,
    prevTrack: handlePrevTrack,
    togglePlayPause,
    seek: handleSeek,
    setVolume: handleVolumeChange,
    getCurrentTrack: () => {
      if (!queue.length) return null;
      const trackUrl = queue[idx];
      const trackName = trackUrl.replace(basePath, '').replace('.mp3', '');
      return trackName;
    },
    getCurrentTrackName,
    getCurrentTrackImage,
    getCurrentArtist,
    isPlaying: () => isPlaying,
    getAudioElement: () => audioRef.current,
    getState: () => ({
      isPlaying,
      currentTime,
      duration,
      volume: localVolume,
      isMuted: localMuted,
      trackName: getCurrentTrackName(),
      trackImage: getCurrentTrackImage(),
      artist: getCurrentArtist(),
    }),
  }));

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
      setQueue(playlist);
      setIdx(0);
      prevPlaylistRef.current = playlist.slice();
    }
  }, [playlist]);

  // Core effect: set/keep the current track.
  // Only runs when track changes (queue or idx), not when muting/unmuting
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !queue.length) return;

    // Only set src if it's actually different to avoid resetting playback.
    if (audio.src !== queue[idx]) 
    {
      audio.src = queue[idx];
      // Try to play when a new track is loaded (if not muted)
      if (!localMuted) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [queue, idx]);

  // Separate effect for mute/volume only; never touches src.
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = Math.min(Math.max(localVolume, 0), 1);

    // Control play/pause based on muted state
    if (localMuted) 
    {
      audio.pause();
      setIsPlaying(false);
    } 
    else if (audio.paused) 
    {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } 
    else 
    {
      setIsPlaying(true);
    }
  }, [localMuted, localVolume]);

  // Update current time and duration - always active
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      onTimeUpdate(audio.currentTime, audio.duration);
    };
    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Notify parent of track changes
  useEffect(() => {
    if (queue.length > 0) 
    {
      const trackUrl = queue[idx];
      const trackFileName = trackUrl.replace(basePath, '');
      const trackName = trackFileName.replace('.mp3', '');
      
      onTrackChange({
        trackName,
        trackImage: trackImages[trackFileName] || null,
        artist: trackArtists[trackFileName] || "Artist Name",
        index: idx,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, queue]);

  // Notify parent of play state changes
  useEffect(() => {
    onPlayStateChange(isPlaying, localMuted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, localMuted]);

  // When a track ends, move to the next; loop back to start when we reach the end.
  const handleEnded = () => {
    if (!queue.length) return;
    
    if (idx < queue.length - 1) 
    {
      setIdx((i) => i + 1);
    } 
    else 
    {
      // Loop back to the beginning
      setIdx(0);
    }
  };

  if (!playlist.length) return null;

  return (
    <audio
      ref={audioRef}
      preload="auto"
      onEnded={handleEnded}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      style={{ display: "none" }}
    />
  );
});

Jukebox.displayName = 'Jukebox';

export default Jukebox;