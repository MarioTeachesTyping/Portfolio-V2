// =========== //
// Experiences //
// =========== //

import React from "react";

export default function Experience() 
{
  const experiences = [
    {
      company: "Florida Blue",
      role: "Software Engineer Intern",
      date: "May 2025 - Present",
      location: "Jacksonville, FL",
      description: [
        "Built QueryGPT core features with Python, LangChain, and SQL, boosting Q&A accuracy and speed.",
        "Automated 60% of regression tests with Playwright, reducing manual effort and speeding releases.",
        "Validated and optimized LLM Q&A with HTTP testing in Bruno, enhancing performance and query handling.",
      ],
      note: "Extended my internship!",
      logo: "/images/florida-blue.jpg",
    },
    {
      company: "Knight Hacks",
      role: "Workshop Director",
      date: "Aug 2024 - Present",
      location: "Orlando, FL",
      description: [
        "Managed a team of 12 to teach 300+ students professional and software development skills in workshops.",
        "Organized workshops with sponsor companies and clubs to create internship opportunities for students.",
        "Collaborated in organizing the 2024 Hackathon where 600+ hackers and 9+ sponsors attended.",
      ],
      note: "The start of it all. Taught me so much and got me so far.",
      logo: "/images/knight-hacks.jpg",
    },
    {
      company: "ISUE Lab",
      role: "Undergraduate Researcher",
      date: "Aug 2024 - Present",
      location: "Orlando, FL",
      description: [
        "Conducted Human-Computer Interaction-related user studies to assist in research.",
        "Helped develop study participant-facing VR systems in Unity, dealing with modeling and simulation.",
        "Collaborated with researchers on papers, optimizing workflow, and enhancing VR systems for user studies.",
      ],
      note: "Amazing research and amazing people!",
      logo: "/images/ucf-eng.jpg",
    },
    {
      company: "PERL Lab",
      role: "Undergraduate Researcher",
      date: "Jan 2025 - May 2025",
      location: "Orlando, FL",
      description: [
        "Researched AI integration for Physics-Informed Neural Networks to improve computational efficiency.",
        "Improved PINNs training performance by over 8% through integration of tailored AI/ML techniques.",
        "Assisted in jet engine experiments, gathering turbulence, vector field, and velocity magnitude data.",
      ],
      note: "I love rocket ships. Easily, my most unique and difficult research as of right now.",
      logo: "/images/ucf-mec.jpg",
    },
    {
      company: "Walgreens",
      role: "Customer Service Associate",
      date: "Aug 2022 - Dec 2022",
      location: "Orlando, FL",
      description: [
        "Stocking and organizing shelves, display cases, end caps, and providing assistance with customers' needs.",
        "Assisted with store resets, various marketing campaigns, and worked with a team to meet daily goals.",
      ],
      note: "Yeah.",
      logo: "/images/walgreens.jpg",
    },
  ];

  return (
    <div>
      <h2 className="text-5xl text-center mb-9 mt-3 font-bold">My Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="border-2 border-white bg-black text-white p-6 shadow-lg flex justify-between experience-card"
          >
            {/* Left Side */}

            <div className="flex-1 pr-6">
              <div className="mb-2">
                <h3 className="text-3xl font-bold">{exp.company}</h3>
                <p className="text-xl">{exp.role}</p>
              </div>

              <div className="mt-4">
                <p className="font-semibold mb-2">I worked on:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-lg">
                  {exp.description.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>

              {exp.note && (
                <p className="mt-4 text-gray-400 text-sm">{exp.note}</p>
              )}
            </div>

            {/* Right Side */}

            <div className="flex flex-col items-center w-38">
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="w-40 h-38 object-cover border-3 border-white mb-2"
              />
              <div className="text-sm text-center">
                <p>{exp.date}</p>
                <p>{exp.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}