// ======= //
// Nav Bar //
// ======= //

import { useState, useMemo, useRef } from "react";
import { FaGithub, FaLinkedin, FaRegFileAlt } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";

import Modal from "./Modal";
import About from "../pages/About";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import MusicPlayer from "./MusicPlayer";

export default function NavBar() 
{
  const [showAbout, setShowAbout] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const musicPlayerRef = useRef(null);

  // Memoize the tracks array so it stays stable across re-renders.
  const TRACKS = useMemo(() => [
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
  ], []);

  const TRACK_IMAGES = useMemo(() => ({
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
  }), []);

  const TRACK_ARTISTS = useMemo(() => ({
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
  }), []);

  const openAbout = () => { setShowAbout(true); setMenuOpen(false); };
  const openExperience = () => { setShowExperience(true); setMenuOpen(false); };
  const openProjects = () => { setShowProjects(true); setMenuOpen(false); };
  const openMusicPlayer = () => { 
    setShowMusicPlayer(true); 
    setMenuOpen(false);
  };

  return (
    <>
      {/* Always-mounted, headless audio player. */}
      <MusicPlayer
        ref={musicPlayerRef}
        tracks={TRACKS}
        trackImages={TRACK_IMAGES}
        trackArtists={TRACK_ARTISTS}
        basePath="/music/"
        volume={1.0}
        isModalOpen={showMusicPlayer}
        onCloseModal={() => setShowMusicPlayer(false)}
      />

      <div className="w-full border-3 border-white fixed top-0 left-0 bg-black text-white flex justify-between items-center px-6 py-5 z-50">

        {/* Desktop */}
        <div className="flex items-center space-x-5">
          <img
            src="/images/icon.png"
            alt="Icon"
            className="w-12 h-12 hidden md:block wiggle-hover"
          />

          <div className="flex items-center gap-3">
            <div className="text-xl font-bold">Anthony Terry</div>

            <button
              type="button"
              className="hidden md:inline-flex items-center justify-center w-12 h-9 hover:opacity-80 active:opacity-80 transition"
              onClick={openMusicPlayer}
            >
              <MdLibraryMusic className="w-10 h-10" />
            </button>
          </div>
        </div>

        <div className="hidden md:flex space-x-8 text-lg items-center">
          <button className="hover:bg-white/10" onClick={() => setShowAbout(true)}>
            About
          </button>
          <button className="hover:bg-white/10" onClick={() => setShowExperience(true)}>
            Experience
          </button>
          <button className="hover:bg-white/10" onClick={() => setShowProjects(true)}>
            Projects
          </button>

          <a
            href="/images/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <FaRegFileAlt className="w-10 h-10 hover:opacity-80" />
          </a>
          <a
            href="https://github.com/MarioTeachesTyping"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <FaGithub className="w-10 h-10 hover:opacity-80" />
          </a>
          <a
            href="https://www.linkedin.com/in/aj-terry/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <FaLinkedin className="w-10 h-10 hover:opacity-80" />
          </a>
        </div>

        {/* Mobile */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-11 h-11 focus:outline-none wiggle-hover active:opacity-70"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <img src="/images/icon.png" alt="Menu" className="w-11 h-11" />
        </button>
      </div>

      <div
        className={`md:hidden fixed top-[72px] right-0 left-0 z-40
                    bg-black border-3 border-white shadow-lg
                    transition-all duration-300 ease-out overflow-hidden
                    ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-0'}`}
      >
        <div className="p-3 divide-y divide-white/10">
          <div className="flex flex-col py-2">
            <button className="text-center px-3 py-2 hover:bg-white/10" onClick={openAbout}>
              About
            </button>
            <button className="text-center px-3 py-2 hover:bg-white/10" onClick={openExperience}>
              Experience
            </button>
            <button className="text-center px-3 py-2 hover:bg-white/10" onClick={openProjects}>
              Projects
            </button>
          </div>

          <div className="flex items-center justify-center gap-5 py-3 px-3">
            <a
              href="/images/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <FaRegFileAlt className="w-10 h-10 hover:opacity-80" />
            </a>
            <a
              href="https://github.com/MarioTeachesTyping"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <FaGithub className="w-10 h-10 hover:opacity-80" />
            </a>
            <a
              href="https://www.linkedin.com/in/aj-terry/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <FaLinkedin className="w-10 h-10 hover:opacity-80" />
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 hover:opacity-80 active:opacity-80 transition"
              onClick={openMusicPlayer}
            >
              <MdLibraryMusic className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={showAbout} onClose={() => { setShowAbout(false); setMenuOpen(false); }}>
        <About />
      </Modal>

      <Modal isOpen={showExperience} onClose={() => { setShowExperience(false); setMenuOpen(false); }}>
        <Experience />
      </Modal>

      <Modal isOpen={showProjects} onClose={() => { setShowProjects(false); setMenuOpen(false); }}>
        <Projects />
      </Modal>
    </>
  );
}