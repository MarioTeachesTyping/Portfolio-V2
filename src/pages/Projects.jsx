// ======== //
// Projects //
// ======== //

import React from 'react';

import { FaUnity } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { RiTeamLine, RiGeminiFill } from "react-icons/ri";
import { TbBrandThreejs, TbBrandNextjs } from "react-icons/tb";
import { FaPython, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiOpencv, SiMediapipe, SiFlask, SiCplusplus, SiArduino, SiOllama, SiLangchain, SiTailwindcss, SiJavascript, SiTypescript, SiPrisma, SiBlender, SiWebgl, SiVite, SiTensorflow, SiNginx, SiMinio, SiPostman } from 'react-icons/si';

export default function Projects() 
{
  const projects = [
    {
      name: "Formify",
      image: "/images/formify.jpg",
      description: "Formify is a web-accessible program that can monitor a users motion in real time and provide haptic feedback to guide them through prescribed exercises.",
      tech: [<FaPython key="python" title="Python" />, <SiOpencv key="opencv" title="OpenCV" />, <SiMediapipe key="mediapipe" title="MediaPipe" />, 
             <SiFlask key="flask" title="Flask" />, <SiCplusplus key="cplusplus" title="C++" />, <SiArduino key="arduino" title="Arduino" />
      ],
      team: { icon: <RiTeamLine />, text: "Team Size: 4" },
      link: "https://devpost.com/software/formify-k8vl4r"
    },
    {
      name: "Potara",
      image: "/images/potara.gif",
      description: "Draw your heart out with our art assistance tool which breaks down reference images into simple shapes with live feedback courtesy of Art Mentor, Shelly.",
      tech: [<RiGeminiFill key="gemini" title="Google Gemini" />, <FaReact key="react" title="React" />, <SiNginx key="nginx" title="nginx" />,
             <SiMinio key="minio" title="MinIO" />, <SiPostman key="postman" title="Postman" />, <FaDocker key="docker" title="Docker" />
      ],
      team: { icon: <RiTeamLine />, text: "Team Size: 4" },
      link: "https://potara.art/"
    },
    {
      name: "MarioGPT",
      image: "/images/mario.png",
      description: "Full-stack AI chatbot focused on the Mario franchise. Supports conversational question & answer, and more.",
      tech: [<FaPython key="python" title="Python" />, <SiOllama key="llama" title="Llama" />, <SiLangchain key="langchain" title="LangChain" />, 
             <FaNodeJs key="nodejs" title="Node.js" />, <BiLogoPostgresql key="postgresql" title="PostgreSQL" />, <FaReact key="react" title="React" />
      ]
    },
    {
      name: "Fruit Slayer",
      image: "/images/fruit-slayer.gif",
      description: "Play Fruit Ninja in real life. Use your finger to slice the fruits and avoid the bombs to get a high score!",
      tech: [<FaPython key="python" title="Python" />, <SiOpencv key="opencv" title="OpenCV" />, <SiMediapipe key="mediapipe" title="MediaPipe" />, 
             <SiTensorflow key="tensorflow" title="TensorFlow" />, <FaReact key="react" title="React" />, <SiTypescript key="typescript" title="TypeScript" />
      ],
      link: "https://devpost.com/software/fruit-slayer"
    },
    {
      name: "MyGameList",
      image: "/images/mygamelist.jpg",
      description: "Interactive webpage enabling users to rank video games and share customizable profiles.",
      tech: [<TbBrandNextjs key="nextjs" title="Next.js" />, <FaReact key="react" title="React" />, <SiTailwindcss key="tailwindcss" title="Tailwind CSS" />, 
             <SiTypescript key="typescript" title="TypeScript" />, <BiLogoPostgresql key="postgresql" title="PostgreSQL" />, <SiPrisma key="prisma" title="Prisma" />
      ]
    },
    {
      name: "Portfolio-V2",
      image: "/images/portfolio.jpg",
      description: "You're looking at it.",
      tech: [<SiVite key="vite" title="Vite" />, <FaReact key="react" title="React" />, <SiTailwindcss key="tailwindcss" title="Tailwind CSS" />, 
             <SiJavascript key="javascript" title="JavaScript" />, <TbBrandThreejs key="threejs" title="Three.js" />, <SiBlender key="blender" title="Blender" />
      ],
      link: "https://github.com/MarioTeachesTyping/portfolio"
    },
    {
      name: "Paracosm",
      image: "/images/paracosm.jpg",
      description: "Web-accessible program that allows users to manipulate objects in Unity created 3D environment.",
      tech: [<FaUnity key="unity" title="Unity" />, <FaPython key="python" title="Python" />, <SiOpencv key="opencv" title="OpenCV" />, 
             <SiMediapipe key="mediapipe" title="MediaPipe" />, <SiFlask key="flask" title="Flask" />, <SiWebgl key="webgl" title="WebGL" />
      ],
      team: { icon: <RiTeamLine />, text: "Team Size: 3" },
      link: "https://devpost.com/software/paracosm"
    }
  ];

   return (
    <div>
      <h2 className="text-5xl font-bold mb-9 mt-3 text-center">My Projects</h2>
      <p className="text-xl text-center mb-11 mt-2">Always trying to improve. Thank you to anybody who worked, helped, or support any of these projects.</p>
      <div className="flex justify-center gap-6 flex-wrap">
        {projects.map((project, index) => (
          <a 
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-82 h-[450px] border-5 border-white-400 bg-black text-white p-4 flex flex-col justify-between project-card hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-bold text-center mb-4">{project.name}</h3>
            
            <div className="w-full h-65 bg-gray-700 mb-1 relative overflow-hidden">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            <p className="text-gray-300 text-md mb-4 mt-4 text-center">{project.description}</p>
            
            {project.team && (
              <div className="flex items-center justify-center gap-2 text-lg mb-6">
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