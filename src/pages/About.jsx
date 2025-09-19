// ======== //
// About Me //
// ======== //

import React, { useEffect, useState } from "react";

import { FaUnity } from "react-icons/fa6";
import { TbBrandThreejs } from "react-icons/tb";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaPython, FaJava, FaReact, FaNodeJs, FaFigma, FaMusic } from "react-icons/fa";
import { SiC, SiJavascript, SiTypescript, SiTailwindcss, SiBlender, SiCplusplus, SiAndroidstudio, SiPytorch, SiTensorflow } from "react-icons/si";

import { getLastFmTopTracks } from "../scripts/lastfm";
import { searchSpotifyTrack } from "../scripts/spotify";

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
            className="bg-red p-4 flex items-center flex-col justify-top rounded-2xl gap-2 animate-jump-in"
          >
            {info.imgUrl ? (
              <img
                src={info.imgUrl}
                alt={`Cover of ${info.name}`}
                className="w-[160px] aspect-square rounded-lg object-cover"
              />
            ) : (
              <div className="w-[160px] aspect-square rounded-lg bg-neutral-800 grid place-items-center text-sm border border-white/20">
                No Art...
              </div>
            )}
            <p className="font-bold text-center flex flex-col text-[1rem] break-all">
              <span className="font-normal text-[0.9rem] text-gray-400">#{index + 1}</span>
              {info.name}
            </p>
            <p className="text-gray-300 text-center text-[0.95rem]">{info.artist}</p>
            <p className="text-gray-500 text-center text-[0.9rem]">{info.playcount} Plays</p>
          </div>
        ));

        setTopTracks(components);
      })
      .catch((error) => {
        console.log("Unable to generate track info:", error);
      });
  }, []);

  const placeholder = (
    <p className="flex items-center justify-center font-bold bg-black p-4 rounded-2xl w-full">
      Fetching...
    </p>
  );

  const topTracksGrid = (
    <div className="grid grid-cols-3 auto-rows gap-4">
      {topTracks}
    </div>
  );

  return (
    <div className="rounded-2xl mt-12 mb-6 max-w-[100%] sm:max-w-[90%] lg:max-w-[75%] flex items-center justify-center flex-col mx-auto">
      <h3 className="flex items-center justify-center gap-2 text-[1.5rem] mb-4 text-green-400 bg-black font-bold rounded-2xl px-6 py-2">
        AJ's On Repeat... <FaMusic />
      </h3>
      {topTracks ? topTracksGrid : placeholder}
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
      <h2 className="text-6xl mb-10 text-center font-normal" style={{ fontFamily: 'MarioFont' }}>
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
          <FaUnity className="w-16 h-16 wiggle-hover" title="Unity" />
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-3xl text-center mb-6">Learning and Getting Better at:</h3>
        <div className="flex flex-wrap justify-center gap-8 text-white">
          <FaNodeJs className="w-16 h-16 wiggle-hover" title="Node.js" />
          <SiBlender className="w-16 h-16 wiggle-hover" title="Blender" />
          <SiPytorch className="w-16 h-16 wiggle-hover" title="PyTorch" />
          <SiTensorflow className="w-16 h-16 wiggle-hover" title="TensorFlow" />
          <FaFigma className="w-16 h-16 wiggle-hover" title="Figma" />
          <TbBrandThreejs className="w-16 h-16 wiggle-hover" title="Three.js" />
          <SiAndroidstudio className="w-16 h-16 wiggle-hover" title="Android Studio" />
        </div>
      </div>

      <TopTracks />
    </div>
  );
}