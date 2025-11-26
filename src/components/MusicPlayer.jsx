// ============ //
// Music Player //
// ============ //

import React, { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { MdLibraryMusic, MdSkipNext, MdSkipPrevious, MdVolumeUp, MdPlayArrow, MdPause } from "react-icons/md";
import Modal from "./Modal";

const MusicPlayer = forwardRef((
{
  isMuted = false,
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
  isModalOpen = false,
  onCloseModal = () => {},
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

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    nextTrack: handleNextTrack,
    prevTrack: handlePrevTrack,
    getCurrentTrack: () => {
      if (!queue.length) return null;
      const trackUrl = queue[idx];
      const trackName = trackUrl.replace(basePath, '').replace('.mp3', '');
      return trackName;
    },
    isPlaying: () => isPlaying,
    getAudioElement: () => audioRef.current,
    seek: (time) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
    },
    setVolume: (vol) => {
      if (audioRef.current) {
        audioRef.current.volume = Math.min(Math.max(vol, 0), 1);
      }
    },
  }));

  const handleNextTrack = () => {
    if (!queue.length) return;
    if (idx < queue.length - 1) {
      setIdx((i) => i + 1);
    } else {
      setIdx(0); // Loop back to start
    }
    // Keep the paused state - don't restore
  };

  const handlePrevTrack = () => {
    if (!queue.length) return;
    if (idx > 0) {
      setIdx((i) => i - 1);
    } else {
      setIdx(queue.length - 1);
    }
    // Keep the paused state - don't restore
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const togglePlayPause = () => {
    setLocalMuted((m) => !m);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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
    console.log('Track filename:', trackFileName);
    console.log('Artist from map:', trackArtists[trackFileName]);
    console.log('All artists:', trackArtists);
    return trackArtists[trackFileName] || "Artist Name";
  };

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
      setQueue(playlist);
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
    // Only play if not muted
    if (!localMuted) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
        // Will start after the first user interaction (clicking the mute button).
      });
    }
  }, [queue, idx, localMuted]);

  // Separate effect for mute/volume only; never touches src.
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = Math.min(Math.max(localVolume, 0), 1);

    // Control play/pause based on muted state
    if (localMuted) {
      audio.pause();
      setIsPlaying(false);
    } else if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      setIsPlaying(true);
    }
  }, [localMuted, localVolume]);

  // Update current time and duration
  useEffect(() => {
    if (!isModalOpen) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!audio.paused) {
        setCurrentTime(audio.currentTime);
      }
    };
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
    };
  }, [isModalOpen]);

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
    <>
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        // Headless element.
        style={{ display: "none" }}
      />

      {/* Music Player Modal */}
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <div className="flex flex-col items-center justify-center pt-4 px-8 pb-8">
          <h2 className="text-5xl text-center mb-7 font-bold">Jukebox</h2>
          <p className ="text-xl text-center mb-9">Enjoy some of my favorite tracks from different artists.</p>
          
          {/* Album Art */}
          <div className="w-74 h-74 bg-black border-4 border-white mb-8 flex items-center justify-center shadow-2xl overflow-hidden experience-card">
            {getCurrentTrackImage() ? (
              <img 
                src={getCurrentTrackImage()} 
                alt={getCurrentTrackName()}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Failed to load image:', getCurrentTrackImage());
                  e.target.style.display = 'none';
                }}
                onLoad={() => console.log('Image loaded:', getCurrentTrackImage())}
              />
            ) : (
              <MdLibraryMusic className="w-40 h-40 text-white/80" />
            )}
          </div>

          {/* Song Title */}
          <h3 className="text-2xl font-semibold mb-2 text-center px-4">
            {getCurrentTrackName()}
          </h3>
          <p className="text-gray-400 mb-6">{getCurrentArtist()}</p>

          {/* Seek Bar */}
          <div className="w-full max-w-md mb-2">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #fff ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-8 mb-8 mt-4">
            <button
              onClick={handlePrevTrack}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all active:scale-95"
            >
              <MdSkipPrevious className="w-10 h-10" />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-20 h-20 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-black"
            >
              {localMuted ? <MdPlayArrow className="w-10 h-10" /> : <MdPause className="w-10 h-10" />}
            </button>

            <button
              onClick={handleNextTrack}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all active:scale-95"
            >
              <MdSkipNext className="w-10 h-10" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <MdVolumeUp className="w-6 h-6 text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={localVolume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #fff ${localVolume * 100}%, #374151 ${localVolume * 100}%)`
              }}
            />
            <span className="text-sm text-gray-500 w-12 text-right">
              {Math.round(localVolume * 100)}%
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;