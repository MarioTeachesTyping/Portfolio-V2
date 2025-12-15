// ===== //
// Music //
// ===== //

import React, { useRef, useState } from "react";
import { MdLibraryMusic, MdVolumeUp } from "react-icons/md";
import { CgPlayButtonR, CgPlayPauseR } from "react-icons/cg";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";

import Jukebox from "../components/Jukebox";
import Modal from "../components/Modal";

const Music = ({ isModalOpen = false, onCloseModal = () => {} }) => {
  const jukeboxRef = useRef(null);
  const [trackInfo, setTrackInfo] = useState({
    trackName: "Loading...",
    trackImage: null,
    artist: "Artist Name",
  });
  const [playState, setPlayState] = useState({
    isPlaying: false,
    isMuted: true,
  });
  const [timeInfo, setTimeInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [volume, setVolume] = useState(1.0);

  const handleTrackChange = React.useCallback((info) => {
    setTrackInfo(info);
  }, []);

  const handlePlayStateChange = React.useCallback((isPlaying, isMuted) => {
    setPlayState({ isPlaying, isMuted });
  }, []);

  const handleTimeUpdate = React.useCallback((currentTime, duration) => {
    setTimeInfo({ currentTime, duration });
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (jukeboxRef.current) {
      jukeboxRef.current.seek(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (jukeboxRef.current) {
      jukeboxRef.current.setVolume(newVolume);
    }
  };

  const handleTogglePlayPause = () => {
    if (jukeboxRef.current) {
      jukeboxRef.current.togglePlayPause();
    }
  };

  const handleNextTrack = () => {
    if (jukeboxRef.current) {
      jukeboxRef.current.nextTrack();
    }
  };

  const handlePrevTrack = () => {
    if (jukeboxRef.current) {
      jukeboxRef.current.prevTrack();
    }
  };

  return (
    <>
      {/* Jukebox - Always mounted, plays in background */}
      <Jukebox
        ref={jukeboxRef}
        onTrackChange={handleTrackChange}
        onPlayStateChange={handlePlayStateChange}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Music Player Modal */}
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <div className="flex flex-col items-center justify-center pt-4 px-8 pb-8">
          <h2 className="text-5xl text-center mb-7 font-bold" style={{ fontFamily: 'MinecraftFont' }}>Jukebox</h2>
          <p className="text-xl text-center mb-9">Enjoy some of my favorite tracks from different artists.</p>
          
          {/* Album Art */}
          <div className="w-74 h-74 bg-black border-4 border-white mb-8 flex items-center justify-center shadow-2xl overflow-hidden experience-card">
            {trackInfo.trackImage ? (
              <img 
                src={trackInfo.trackImage} 
                alt={trackInfo.trackName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Failed to load image:', trackInfo.trackImage);
                  e.target.style.display = 'none';
                }}
                onLoad={() => console.log('Image loaded:', trackInfo.trackImage)}
              />
            ) : (
              <MdLibraryMusic className="w-40 h-40 text-white/80" />
            )}
          </div>

          {/* Song Title */}
          <h3 className="text-2xl font-semibold mb-2 text-center px-4">
            {trackInfo.trackName}
          </h3>
          <p className="text-gray-400 mb-6">{trackInfo.artist}</p>

          {/* Seek Bar */}
          <div className="w-full max-w-md mb-2">
            <input
              type="range"
              min="0"
              max={timeInfo.duration || 100}
              value={timeInfo.currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #fff ${(timeInfo.currentTime / timeInfo.duration) * 100}%, #374151 ${(timeInfo.currentTime / timeInfo.duration) * 100}%)`
              }}
            />
            <div className="flex justify-between text-sm text-white mt-1">
              <span>{formatTime(timeInfo.currentTime)}</span>
              <span>{formatTime(timeInfo.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-8 mb-8 mt-4">
            <button
              onClick={handlePrevTrack}
              className="w-16 h-16 flex items-center justify-center transition-all active:scale-95 text-white hover:opacity-60"
            >
              <IoIosSkipBackward className="w-10 h-10" />
            </button>

            <button
              onClick={handleTogglePlayPause}
              className="hover:opacity-60 flex items-center justify-center transition-all active:scale-95 text-white"
            >
              {playState.isMuted ? <CgPlayButtonR className="w-20 h-20" /> : <CgPlayPauseR className="w-20 h-20" />}
            </button>

            <button
              onClick={handleNextTrack}
              className="w-16 h-16 flex items-center justify-center transition-all active:scale-95 text-white hover:opacity-60"
            >
              <IoIosSkipForward className="w-10 h-10" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <MdVolumeUp className="w-6 h-6 text-white" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #fff ${volume * 100}%, #374151 ${volume * 100}%)`
              }}
            />
            <span className="text-sm text-white w-12 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Music;