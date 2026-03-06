// ======== //
// Projects //
// ======== //

import React from 'react';

import { FaUnity } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandThreejs, TbBrandNextjs } from "react-icons/tb";
import { RiTeamLine, RiGeminiFill, RiSupabaseFill } from "react-icons/ri";
import { FaPython, FaReact, FaNodeJs, FaDocker, FaGoogle, FaMedal, FaJava, FaAws, FaLastfmSquare } from 'react-icons/fa';
import { SiOpencv, SiMediapipe, SiFlask, SiCplusplus, SiArduino, SiOllama, SiLangchain, SiTailwindcss, SiJavascript, SiTypescript, SiPrisma, SiBlender, SiWebgl, SiVite, 
         SiNginx, SiMinio, SiExpress, SiMongodb, SiFastapi, SiPosthog, SiMapbox, SiLeaflet, SiNvidia, SiAndroidstudio, SiShadcnui, SiLeetcode } from 'react-icons/si';

import Tooltip from "../components/Tooltip";

export default function Projects() 
{
  const projects = [
    {
      name: "CareerWise",
      image: "/videos/projects/careerwise.mp4",
      is_video: true,
      badge: "JPMC Code for Good Winner",
      badge_color: "border-blue-200 text-blue-200",
      description: "All-in-one data visualization dashboard displaying multi-county statistics, autonomous report updates, and more to improve economic mobility.",
      tech: [<Tooltip text="Supabase"><RiSupabaseFill key="supabase" /></Tooltip>, <Tooltip text="FastAPI"><SiFastapi key="fastapi" /></Tooltip>, <Tooltip text="PostHog"><SiPosthog key="posthog" /></Tooltip>, 
             <Tooltip text="React"><FaReact key="react" /></Tooltip>, <Tooltip text="Mapbox"><SiMapbox key="mapbox" /></Tooltip>, <Tooltip text="Leaflet"><SiLeaflet key="leaflet" /></Tooltip>
      ],
      team: { icon: <RiTeamLine />, text: "Team Size: 7" },
      link: "https://github.com/MarioTeachesTyping/CareerWise"
    },
    {
      name: "Formify",
      image: "/images/projects/formify.jpg",
      badge: "Knight Hacks VII Winner",
      badge_color: "border-yellow-200 text-yellow-200",
      description: "Formify is a web-accessible program that can monitor a users motion in real time and provide haptic feedback to guide them through prescribed exercises.",
      tech: [<Tooltip text="Python"><FaPython key="python" /></Tooltip>, <Tooltip text="OpenCV"><SiOpencv key="opencv" /></Tooltip>, <Tooltip text="MediaPipe"><SiMediapipe key="mediapipe" /></Tooltip>, 
             <Tooltip text="Flask"><SiFlask key="flask" /></Tooltip>, <Tooltip text="C++"><SiCplusplus key="cplusplus" /></Tooltip>, <Tooltip text="Arduino"><SiArduino key="arduino" /></Tooltip>
      ],
      team: { icon: <RiTeamLine />, text: "Team Size: 4" },
      link: "https://devpost.com/software/formify-k8vl4r"
    },
    {
      name: "CivicLens",
      image: "/videos/projects/civiclens.mp4",
      is_video: true,
      // badge: "ColorStack Winter Winner",
      // badge_color: "border-orange-200 text-orange-200",
      description: "Built a civic transparency platform aggregating data for congressional representatives using reliable government sources, and responsible AI.",
      tech: [<Tooltip text="Google Gemini"><RiGeminiFill key="gemini" /></Tooltip>, <Tooltip text="Supabase"><RiSupabaseFill key="supabase" /></Tooltip>, <Tooltip text="PostgreSQL"><BiLogoPostgresql key="postgresql" /></Tooltip>, 
             <Tooltip text="FastAPI"><SiFastapi key="fastapi" /></Tooltip>, <Tooltip text="Next.js"><TbBrandNextjs key="nextjs" /></Tooltip>, <Tooltip text="Mapbox"><SiMapbox key="mapbox" /></Tooltip>
      ],
      team: { icon: <RiTeamLine />, text: "Team Size: 4" },
      link: "https://devpost.com/software/civiclens-xhi3ym"
    },
    {
      name: "Potara",
      image: "/videos/projects/potara.mp4",
      is_video: true,
      description: "Draw your heart out with our art assistance tool which breaks down reference images into simple shapes with live feedback courtesy of Art Mentor, Shelly.",
      tech: [<Tooltip text="Google Gemini"><RiGeminiFill key="gemini" /></Tooltip>, <Tooltip text="React"><FaReact key="react" /></Tooltip>, <Tooltip text="NGINX"><SiNginx key="nginx" /></Tooltip>,
             <Tooltip text="MinIO"><SiMinio key="minio" /></Tooltip>, <Tooltip text="Express.js"><SiExpress key="express" /></Tooltip>, <Tooltip text="Docker"><FaDocker key="docker" /></Tooltip>
      ],
      team: { icon: <RiTeamLine />, text: "Team Size: 4" },
      link: "https://devpost.com/software/potara"
    },
    {
      name: "Tamagario",
      image: "/videos/projects/tamagario.mp4",
      is_video: true,
      description: "Take care of a pet Mario inspired by Tamagotchi. Play, feed, clean, or rest with Mario and evolve him to his invincible super star form!",
      tech: [<Tooltip text="Android Studio"><SiAndroidstudio key="androidstudio" /></Tooltip>,
             <Tooltip text="Java"><FaJava key="java" /></Tooltip>,
      ],
      link: "https://github.com/MarioTeachesTyping/Tamagario"
    },
    {
      name: "Hot Dog",
      image: "/videos/projects/hot-dog.mp4",
      is_video: true,
      description: "Hot Dog can complete open-ended tasks using his multi-agent autonomous robot system and YOLOE vision to plan, sense, and act in real time.",
      tech: [<Tooltip text="NVIDIA"><SiNvidia key="nvidia" /></Tooltip>, <Tooltip text="Google ADK"><FaGoogle key="google" /></Tooltip>,
             <Tooltip text="Python"><FaPython key="python" /></Tooltip>, <Tooltip text="C++"><SiCplusplus key="cplusplus" /></Tooltip>, <Tooltip text="Next.js"><TbBrandNextjs key="nextjs" /></Tooltip>
      ],
      team: { icon: <RiTeamLine />, text: "Team Size: 4" },
      link: "https://github.com/ENG4060-C/final-project"
    },
    {
      name: "MarioGPT",
      image: "/images/projects/mario.png",
      description: "Full-stack AI chatbot focused on the Mario franchise. Supports conversational question & answer, and more.",
      tech: [<Tooltip text="Python"><FaPython key="python" /></Tooltip>, <Tooltip text="Llama"><SiOllama key="llama" /></Tooltip>, <Tooltip text="LangChain"><SiLangchain key="langchain" /></Tooltip>, 
             <Tooltip text="FastAPI"><SiFastapi key="fastapi" /></Tooltip>, <Tooltip text="MongoDB"><SiMongodb key="mongodb" /></Tooltip>, <Tooltip text="Next.js"><TbBrandNextjs key="nextjs" /></Tooltip>
      ],
      link: "https://github.com/MarioTeachesTyping/MarioGPT"
    },
    {
      name: "Fruit Slayer",
      image: "/videos/projects/fruit-slayer.mp4",
      is_video: true,
      description: "Play Fruit Ninja in real life. Use your finger to slice the fruits and avoid the bombs to get a high score!",
      tech: [<Tooltip text="Python"><FaPython key="python" /></Tooltip>, <Tooltip text="OpenCV"><SiOpencv key="opencv" /></Tooltip>, <Tooltip text="MediaPipe"><SiMediapipe key="mediapipe" /></Tooltip>, 
             <Tooltip text="React"><FaReact key="react" /></Tooltip>, <Tooltip text="TypeScript"><SiTypescript key="typescript" /></Tooltip>
      ],
      link: "https://devpost.com/software/fruit-slayer"
    },
    {
      name: "MyGameList",
      image: "/images/projects/mygamelist.jpg",
      description: "Interactive webpage enabling users to rank video games and share customizable profiles.",
      tech: [<Tooltip text="Next.js"><TbBrandNextjs key="nextjs" /></Tooltip>, <Tooltip text="TypeScript"><SiTypescript key="typescript" /></Tooltip>, 
             <Tooltip text="PostgreSQL"><BiLogoPostgresql key="postgresql" /></Tooltip>, <Tooltip text="AWS"><FaAws key="aws" /></Tooltip>, <Tooltip text="Prisma"><SiPrisma key="prisma" /></Tooltip>
      ]
    },
    {
      name: "Portfolio-V2",
      image: "/videos/projects/portfolio.mp4",
      is_video: true,
      description: "You're looking at it.",
      tech: [<Tooltip text="React"><FaReact key="react" /></Tooltip>, <Tooltip text="Tailwind CSS"><SiTailwindcss key="tailwindcss" /></Tooltip>, <Tooltip text="JavaScript"><SiJavascript key="javascript" /></Tooltip>, 
             <Tooltip text="Three.js"><TbBrandThreejs key="threejs" /></Tooltip>, <Tooltip text="Blender"><SiBlender key="blender" /></Tooltip>, <Tooltip text="Last.fm"><FaLastfmSquare key="lastfm" /></Tooltip>
      ],
      link: "https://github.com/MarioTeachesTyping/portfolio"
    },
  ];

   return (
    <div>
      <h2 className="text-5xl font-bold mb-9 mt-3 text-center" style={{ fontFamily: 'MinecraftFont' }}>My Projects</h2>
      <p className="text-xl text-center mb-11 mt-2">Always trying to improve. Thank you to anybody who worked, helped, or support any of these projects.</p>
      <div className="flex justify-center gap-6 flex-wrap">
        {projects.map((project, index) => (
          <a 
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-82 h-[500px] border-5 border-white-400 bg-black text-white p-4 flex flex-col project-card hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-bold text-center mb-5">{project.name}</h3>
            
            <div className="w-full h-60 bg-gray-700 mb-5 relative overflow-hidden border border-white">
              {project.is_video ? (
                <video
                  src={project.image}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
            
            {project.badge && (
              <div className="flex justify-center mb-5">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border-2 ${project.badge_color || 'border-blue-500 text-blue-500'}`}>
                  <FaMedal />
                  {project.badge}
                </span>
              </div>
            )}
            
            <p className="text-gray-300 text-md mb-5 text-center">{project.description}</p>
            
            {project.team && (
              <div className="flex items-center justify-center gap-2 text-md mb-6">
                <span className="text-2xl">{project.team.icon}</span>
                <span>{project.team.text}</span>
              </div>
            )}

            <div className="flex justify-center gap-3 text-4xl">
              {project.tech.map((icon, i) => (
                <span key={i} className="wiggle-hover">{icon}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}