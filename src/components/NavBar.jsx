// ======= //
// Nav Bar //
// ======= //

import { useState } from "react";
import { FaGithub, FaLinkedin, FaRegFileAlt } from "react-icons/fa";

import Modal from "./Modal";
import About from "../pages/About";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";

export default function NavBar() 
{
  const [showAbout, setShowAbout] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openAbout = () => { setShowAbout(true); setMenuOpen(false); };
  const openExperience = () => { setShowExperience(true); setMenuOpen(false); };
  const openProjects = () => { setShowProjects(true); setMenuOpen(false); };

  return (
    <>
      <div className="w-full border-3 border-white fixed top-0 left-0 bg-black text-white flex justify-between items-center px-6 py-5 z-50">

        {/* Desktop */}

        <div className="flex items-center space-x-5">
          <img
            src="/images/icon.png"
            alt="Icon"
            className="w-12 h-12 hidden md:block wiggle-hover"
          />
          <div className="text-xl font-bold">Anthony Terry</div>
        </div>

        <div className="hidden md:flex space-x-9 text-lg items-center">
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
        className={`md:hidden fixed top-[72px] right-0 left-0 z-50 origin-top
                    bg-black border-3 border-white shadow-lg
                    transition-transform transition-opacity duration-200
                    ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <div className="p-3 divide-y divide-white/10">
          <div className="flex flex-col py-2">
            <button className="text-left px-3 py-2 hover:bg-white/10" onClick={openAbout}>
              About
            </button>
            <button className="text-left px-3 py-2 hover:bg-white/10" onClick={openExperience}>
              Experience
            </button>
            <button className="text-left px-3 py-2 hover:bg-white/10" onClick={openProjects}>
              Projects
            </button>
          </div>

          <div className="flex items-center gap-4 py-3 px-3">
            <a
              href="/images/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <FaRegFileAlt className="w-8 h-8 hover:opacity-80" />
            </a>
            <a
              href="https://github.com/MarioTeachesTyping"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <FaGithub className="w-8 h-8 hover:opacity-80" />
            </a>
            <a
              href="https://www.linkedin.com/in/aj-terry/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <FaLinkedin className="w-8 h-8 hover:opacity-80" />
            </a>
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