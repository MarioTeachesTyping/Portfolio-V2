// ======== //
// About Me //
// ======== //

import React from "react";
import { FaPython, FaJava, FaReact, FaNodeJs, FaFigma } from "react-icons/fa";
import { FaUnity } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandThreejs } from "react-icons/tb";
import { SiC, SiJavascript, SiTypescript, SiTailwindcss, SiBlender,
         SiCplusplus, SiAndroidstudio, SiPytorch, SiTensorflow
} from "react-icons/si";

export default function About() 
{
  return (
    <div>
      <h2 className="text-2xl mb-4 text-center">Hi! My Name is...</h2>
      <img
        src="/images/pfp.jpg"
        alt="PFP"
        className="w-78 h-80 border-12 border-white mx-auto block mb-6 mt-6"
      />
      <h2 className="text-5xl mb-10 text-center font-normal" 
          style={{ fontFamily: 'MarioFont' }}>
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
          <FaPython className="w-16 h-16 wiggle-hover" />
          <FaJava className="w-16 h-16 wiggle-hover" />
          <SiC className="w-16 h-16 wiggle-hover" />
          <SiCplusplus className="w-16 h-16 wiggle-hover" />
          <SiJavascript className="w-16 h-16 wiggle-hover" />
          <SiTypescript className="w-16 h-16 wiggle-hover" />
          <FaReact className="w-16 h-16 wiggle-hover" />
          <SiTailwindcss className="w-16 h-16 wiggle-hover" />
          <SiBlender className="w-16 h-16 wiggle-hover" />
          <FaUnity className="w-16 h-16 wiggle-hover" />
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-3xl text-center mb-6">Learning and getting Better at:</h3>

        <div className="flex flex-wrap justify-center gap-8 text-white">
          <FaNodeJs className="w-16 h-16 wiggle-hover" />
          <BiLogoPostgresql className="w-16 h-16 wiggle-hover" />
          <SiPytorch className="w-16 h-16 wiggle-hover" />
          <SiTensorflow className="w-16 h-16 wiggle-hover" />
          <FaFigma className="w-16 h-16 wiggle-hover" />
          <TbBrandThreejs className="w-16 h-16 wiggle-hover" />
          <SiAndroidstudio className="w-16 h-16 wiggle-hover" />
        </div>
      </div>
    </div>
  );
}