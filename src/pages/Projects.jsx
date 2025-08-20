// ======== //
// Projects //
// ======== //

import React from 'react';
import { FaPython, FaReact, FaNodeJs } from 'react-icons/fa';
import { FaUnity } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandThreejs, TbBrandNextjs } from "react-icons/tb";
import { SiOpencv, SiMediapipe, SiFlask, SiCplusplus, SiArduino,
         SiOpenai, SiLangchain, SiTailwindcss, SiJavascript, 
         SiTypescript, SiPrisma, SiBlender, SiWebgl
} from 'react-icons/si';

export default function Projects() 
{
  const projects = [
    {
      name: "Formify",
      image: "/images/formify.jpg",
      description: "Formify is a web-accessible program that can monitor a users motion in real time and provide haptic feedback to guide them through prescribed exercises.",
      tech: [<FaPython key="python" />, <SiOpencv key="opencv" />,
             <SiMediapipe key="mediapipe" />, <SiFlask key="flask" />,
             <SiCplusplus key="cplusplus" />, <SiArduino key="arduino" />
      ]
    },
    {
      name: "MarioGPT",
      image: "/images/mario.png",
      description: "Full-stack AI chatbot focused on the Mario franchise. Supports conversational question & answer, and more.",
      tech: [<FaPython key="python" />, <SiOpenai key="openai" />,
             <BiLogoPostgresql key="postgresql" />, <FaNodeJs key="nodejs" />,
             <SiLangchain key="langchain" />, <FaReact key="react" />
      ]
    },
    {
      name: "MyGameList",
      image: "/images/mygamelist.jpg",
      description: "Interactive webpage enabling users to rank video games and share customizable profiles.",
      tech: [<FaReact key="react" />, <SiTailwindcss key="tailwindcss" />,
             <SiTypescript key="typescript" />, <TbBrandNextjs key="nextjs" />,
             <SiPrisma key="prisma" />
      ]
    },
    {
      name: "Portfolio-V2",
      image: "/images/portfolio.jpg",
      description: "Your looking at it.",
      tech: [<FaReact key="react" />, <SiTailwindcss key="tailwindcss" />,
             <SiJavascript key="javascript" />, <TbBrandThreejs key="threejs" />,
             <SiBlender key="blender" />
      ]
    },
    {
      name: "Paracosm",
      image: "/images/paracosm.jpg",
      description: "Web-accessible program that allows users to manipulate objects in Unity created 3D environment.",
      tech: [<FaUnity key="unity" />, <FaPython key="python" />, 
             <SiOpencv key="opencv" />, <SiMediapipe key="mediapipe" />, 
             <SiFlask key="flask" />, <SiWebgl key="webgl" />
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-5xl font-bold mb-9 mt-3 text-center">My Projects</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="w-82 h-[450px] border-5 border-white-400 bg-black text-white p-4 flex flex-col justify-between project-card"
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
            
            <div className="flex justify-center gap-3 text-4xl">
              {project.tech.map((icon, i) => (
                <span key={i} className="wiggle-hover">{icon}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}