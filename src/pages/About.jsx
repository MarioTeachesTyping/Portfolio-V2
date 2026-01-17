// ======== //
// About Me //
// ======== //

import React, { useEffect, useState } from "react";

import { SiBruno } from "react-icons/si"
import { FaUnity } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandThreejs, TbBrandNextjs } from "react-icons/tb";
import { FaPython, FaJava, FaReact, FaFigma, FaDocker, FaAws, FaLinux, FaNodeJs, FaSpotify } from "react-icons/fa";
import { SiC, SiJavascript, SiTypescript, SiTailwindcss, SiBlender, SiCplusplus, SiAndroidstudio, SiMongodb, SiRobloxstudio, SiFastapi } from "react-icons/si";

import { getLastFmTopTracks, getLastFmCurrentTrack, getLastFmTopAlbums } from "../scripts/lastfm";
import { searchSpotifyTrack } from "../scripts/spotify";

function CurrentlyPlaying() 
{
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    getLastFmCurrentTrack({ username: "AntJutsu" })
      .then(async (track) => {
        if (!track) 
        {
          console.error("No current track found");
          return;
        }

        try 
        {
          const sp = await searchSpotifyTrack(track.name, track.artist);
          setCurrentTrack({
            name: track.name,
            artist: track.artist,
            nowPlaying: track.nowPlaying,
            imgUrl: sp?.image,
          });
        } 
        catch (error) 
        {
          console.error("Could not get Spotify image:", error);
          setCurrentTrack({
            name: track.name,
            artist: track.artist,
            nowPlaying: track.nowPlaying,
            imgUrl: undefined,
          });
        }
      })
      .catch((error) => {
        console.log("Unable to get current track:", error);
      });
  }, []);

  if (!currentTrack) 
  {
    return (
      <div className="bg-black p-4 rounded-2xl w-full flex items-center justify-center">
        <p className="font-bold">Fetching...</p>
      </div>
    );
  }

  return (
    <div className="bg-red flex items-center flex-col justify-top animate-jump-in">
      {currentTrack.imgUrl ? (
        <img
          src={currentTrack.imgUrl}
          alt={`Cover of ${currentTrack.name}`}
          className="w-[160px] aspect-square object-cover"
        />
      ) : (
        <div className="w-[160px] aspect-square bg-neutral-800 grid place-items-center text-sm border border-white/20">
          No Art...
        </div>
      )}
      <div className="flex items-center gap-2 mt-2">
        {currentTrack.nowPlaying && (
          <span className="animate-pulse text-green-400">●</span>
        )}
        <p className="font-normal text-[0.9rem] text-gray-400">
          {currentTrack.nowPlaying ? "Now Playing" : "Last Played"}
        </p>
      </div>
      <p className="font-bold text-center text-[1rem] break-all px-2">
        {currentTrack.name}
      </p>
      <p className="text-gray-300 text-center text-[0.95rem] px-2 pb-2">{currentTrack.artist}</p>
    </div>
  );
}

function TopTracks() 
{
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    getLastFmTopTracks({ username: "AntJutsu", limit: 3 })
      .then(async (tracks) => {
        if (!tracks) 
        {
          console.error("Invalid LastFM response");
          return;
        }

        const withArt = await Promise.all(
          tracks.map(async (t) => {
            try 
            {
              const sp = await searchSpotifyTrack(t.name, t.artist);
              return {
                name: t.name,
                artist: t.artist,
                playcount: t.playcount,
                imgUrl: sp?.image,
              };
            } 
            catch (error) 
            {
              console.error("Could not get Spotify image:", error);
              return {
                name: t.name,
                artist: t.artist,
                playcount: t.playcount,
                imgUrl: undefined,
              };
            }
          })
        );

        const components = withArt.map((info, index) => (
          <div
            key={index}
            className="bg-red flex items-center flex-col justify-top animate-jump-in"
          >
            {info.imgUrl ? (
              <img
                src={info.imgUrl}
                alt={`Cover of ${info.name}`}
                className="w-[160px] aspect-square object-cover"
              />
            ) : (
              <div className="w-[160px] aspect-square bg-neutral-800 grid place-items-center text-sm border border-white/20">
                No Art...
              </div>
            )}
            <p className="font-bold text-center flex flex-col text-[1rem] break-all px-2 mt-2">
              <span className="font-normal text-[0.9rem] text-gray-400">#{index + 1}</span>
              {info.name}
            </p>
            <p className="text-gray-300 text-center text-[0.95rem] px-2">{info.artist}</p>
            <p className="text-gray-500 text-center text-[0.9rem] px-2 pb-2">{info.playcount} Plays</p>
          </div>
        ));

        setTopTracks(components);
      })
      .catch((error) => {
        console.log("Unable to generate track info:", error);
      });
  }, []);

  if (!topTracks) 
  {
    return (
      <>
        <div className="flex items-center justify-center font-bold bg-black p-4 rounded-2xl">
          Fetching...
        </div>
        <div className="hidden sm:block" />
        <div className="hidden sm:block" />
      </>
    );
  }

  return topTracks;
}

function TopAlbums() 
{
  const [topAlbums, setTopAlbums] = useState(null);

  useEffect(() => {
    getLastFmTopAlbums({ username: "AntJutsu", period: "1month", limit: 5 })
      .then((albums) => {
        if (!albums) 
        {
          console.error("Invalid LastFM response");
          return;
        }

        const components = albums.map((info, index) => (
          <div
            key={index}
            className="bg-red flex items-center flex-col justify-top animate-jump-in"
          >
            {info.image ? (
              <img
                src={info.image}
                alt={`Cover of ${info.name}`}
                className="w-[140px] aspect-square object-cover"
              />
            ) : (
              <div className="w-[140px] aspect-square bg-neutral-800 grid place-items-center text-sm border border-white/20">
                No Art...
              </div>
            )}
            <p className="font-bold text-center flex flex-col text-[0.95rem] break-all px-2 mt-2">
              <span className="font-normal text-[0.85rem] text-gray-400">#{index + 1}</span>
              {info.name}
            </p>
            <p className="text-gray-300 text-center text-[0.9rem] px-2">{info.artist}</p>
            <p className="text-gray-500 text-center text-[0.85rem] px-2 pb-2">{info.playcount} Plays</p>
          </div>
        ));

        setTopAlbums(components);
      })
      .catch((error) => {
        console.log("Unable to generate album info:", error);
      });
  }, []);

  const placeholder = (
    <p className="flex items-center justify-center font-bold bg-black p-4 rounded-2xl w-full">
      Fetching...
    </p>
  );

  const topAlbumsGrid = (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
      {topAlbums}
    </div>
  );

  return (
    <div className="rounded-2xl mt-12 mb-6 max-w-[100%] sm:max-w-[90%] lg:max-w-[90%] flex items-center justify-center flex-col mx-auto">
      <h3 className="flex items-center justify-center gap-2 text-[1.5rem] mb-4 text-red-400 bg-black font-bold rounded-2xl px-6 py-2">
        Top Albums This Month:
      </h3>
      {topAlbums ? topAlbumsGrid : placeholder}
    </div>
  );
}

export default function About() 
{
  return (
    <div>
      <h2 className="text-2xl mb-4 text-center">Hi! My Name is...</h2>
      <img
        src="/images/pfp.jpg"
        alt="PFP"
        className="w-78 h-80 border-12 border-white mx-auto block mb-6 mt-6 experience-card"
      />
      <h2 className="text-6xl mb-10 text-center font-normal" style={{ fontFamily: 'MinecraftFont' }}>
        Anthony Terry
      </h2>
      <p className="text-xl text-gray-300 mx-auto text-center">
        I'm a Computer Science student at the University of Central Florida.
        Growing up, I was always fascinated on how video games were made.
        While right now I don't specifically make games, I want to use my
        Software Engineer skills to create projects others and I can love and
        benefit from!
      </p>

      <div className="mt-10">
        <h3 className="text-3xl text-center mb-6">What I Like to Build with:</h3>
        <div className="flex flex-wrap justify-center gap-8 text-white">
          <FaPython className="w-16 h-16 wiggle-hover" title="Python" />
          <FaJava className="w-16 h-16 wiggle-hover" title="Java" />
          <SiC className="w-16 h-16 wiggle-hover" title="C" />
          <SiCplusplus className="w-16 h-16 wiggle-hover" title="C++" />
          <SiJavascript className="w-16 h-16 wiggle-hover" title="JavaScript" />
          <SiTypescript className="w-16 h-16 wiggle-hover" title="TypeScript" />
          <FaReact className="w-16 h-16 wiggle-hover" title="React" />
          <SiTailwindcss className="w-16 h-16 wiggle-hover" title="Tailwind CSS" />
          <BiLogoPostgresql className="w-16 h-16 wiggle-hover" title="PostgreSQL" />
          <FaDocker className="w-16 h-16 wiggle-hover" title="Docker" />
          <SiFastapi className="w-16 h-16 wiggle-hover" title="FastAPI" />
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-3xl text-center mb-6">Learning and Getting Better at:</h3>
        <div className="flex flex-wrap justify-center gap-8 text-white">
          <FaLinux className="w-16 h-16 wiggle-hover" title="Linux" />
          <FaNodeJs className="w-16 h-16 wiggle-hover" title="Node.js" />
          <TbBrandNextjs className="w-16 h-16 wiggle-hover" title="Next.js" />
          <SiMongodb className="w-16 h-16 wiggle-hover" title="MongoDB" />
          <FaFigma className="w-16 h-16 wiggle-hover" title="Figma" />
          <FaAws className="w-16 h-16 wiggle-hover" title="Amazon Web Services" />
          <TbBrandThreejs className="w-16 h-16 wiggle-hover" title="Three.js" />
          <SiBlender className="w-16 h-16 wiggle-hover" title="Blender" />
          <FaUnity className="w-16 h-16 wiggle-hover" title="Unity" />
          <SiRobloxstudio className="w-16 h-16 wiggle-hover" title="Roblox Studio" />
          <SiAndroidstudio className="w-16 h-16 wiggle-hover" title="Android Studio" />
        </div>
      </div>

      {/* Music Section */}
      <div className="rounded-2xl mt-12 mb-6 max-w-[100%] sm:max-w-[90%] lg:max-w-[90%] mx-auto">
        <h3 className="flex items-center justify-center gap-2 text-[1.5rem] mb-4 text-green-400 bg-black font-bold rounded-2xl px-6 py-2 mx-auto w-fit">
          Top Tracks This Week:
        </h3>
        
        {/* Currently Playing + Top Tracks in Single Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
          <CurrentlyPlaying />
          <TopTracks />
        </div>
      </div>

      {/* Top Albums */}
      <TopAlbums />
    </div>
  );
}