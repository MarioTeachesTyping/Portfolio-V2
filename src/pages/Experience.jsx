// =========== //
// Experiences //
// =========== //

import React from "react";

export default function Experience() 
{
  const experiences = [
    {
      company: "The Walt Disney Company",
      role: "Software Engineer Intern",
      date: "Jan 2026 - Present",
      location: "Lake Buena Vista, FL",
      description: [
        "Incoming Software Engineer Intern for the GET SS-W-Attractions Systems Team at Disney Experiences.",
        "I will have something here soon.",
        "Give me some time and there will be more.",
      ],
      note: "I don't know how I got this opportunity...",
      logo: "/images/experiences/disney.jpg",
      link: "https://thewaltdisneycompany.com/",
    },
    {
      company: "Florida Blue",
      role: "Software Engineer Intern",
      date: "May 2025 - Dec 2025",
      location: "Jacksonville, FL",
      description: [
        "Built 20% of behavior-driven development functional test cases for the Sales website using Cucumber and Playwright, accelerating release cycles.",
        "Automated 60% of smoke test cases for the Preferences & Consents website using Playwright, cutting manual testing time for 14+ million users.",
        "Implemented core QueryGPT features with Python, LangChain, and SQL to improve LLM Q&A accuracy and speed by 23%.",
        "Validated and optimized LLM Q&A with HTTP testing in Bruno, enhancing performance and query handling.",
      ],
      note: "Extended my internship! Thank you P360 and Sales Team!",
      logo: "/images/experiences/florida-blue.jpg",
      link: "https://www.floridablue.com/",
    },
    {
      company: "Knight Hacks",
      role: "Workshop Director",
      date: "Aug 2024 - Present",
      location: "Orlando, FL",
      description: [
        "Managed a team of 13 to teach 500+ students professional and software development skills in workshops.",
        "Organized 40+ workshops with sponsor companies and clubs to create internship opportunities for students.",
        "Introduced new workshop formats that increased participant engagement by 30% compared to previous semesters.",
        "Collaborated in organizing the 2025 Hackathon where 1500+ registrants, 1000+ hackers, and 15+ sponsors attended.",
      ],
      note: "The start of it all. Taught me so much and got me so far.",
      logo: "/images/experiences/knight-hacks.jpg",
      link: "https://club.knighthacks.org/",
    },
    {
      company: "ISUE Lab",
      role: "Undergraduate Researcher",
      date: "Aug 2024 - May 2025",
      location: "Orlando, FL",
      description: [
        "Conducted Human-Computer Interaction-related user studies to assist in research.",
        "Helped develop study participant-facing VR systems in Unity, dealing with modeling and simulation.",
        "Collaborated with researchers on papers, optimizing workflow, and enhancing VR systems for user studies.",
      ],
      note: "Amazing research and amazing people!",
      logo: "/images/experiences/ucf-eng.jpg",
      link: "https://www.eecs.ucf.edu/isuelab/",
    },
    {
      company: "PERL Lab",
      role: "Undergraduate Researcher",
      date: "Jan 2025 - May 2025",
      location: "Orlando, FL",
      description: [
        "Researched AI integration for Physics-Informed Neural Networks to improve computational efficiency.",
        "Improved PINNs training performance by over 8% through integration of tailored AI/ML techniques in PyTorch.",
        "Assisted in jet engine experiments, gathering turbulence, vector field, and velocity magnitude data.",
      ],
      note: "I love rocket ships.",
      logo: "/images/experiences/ucf-mec.jpg",
      link: "https://mae.ucf.edu/PERL/",
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
      logo: "/images/experiences/walgreens.jpg",
      link: "https://www.walgreens.com/",
    },
  ];

  return (
    <div>
      <h2 className="text-5xl text-center mb-9 mt-3 font-bold" style={{ fontFamily: 'MinecraftFont' }}>My Experience</h2>
      <p className="text-xl text-center mb-11 mt-2">
        Thank you to everybody who has supported me along the way in achieving opportunities like this. Especially my family and friends.
      </p>

      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="border-2 border-white bg-black text-white p-6 shadow-lg flex flex-col md:flex-row md:justify-between experience-card cursor-pointer"
            onClick={() => {
              if (exp.link) window.open(exp.link, "_blank", "noopener,noreferrer");
            }}
          >
            {/* Left Side */}
            <div className="md:flex-1 md:pr-6">
              <div className="mb-2 text-center md:text-left">
                <h3 className="text-3xl font-bold">{exp.company}</h3>
                <p className="text-xl">{exp.role}</p>
              </div>

              {/* Desktop bullets */}
              <div className="hidden md:block mt-4">
                <p className="font-semibold mb-2">I worked on:</p>
                <ul className="list-disc space-y-1 text-gray-300 text-lg ml-5">
                  {exp.description.map((item, j) => (
                    <li key={j} className="pl-2">{item}</li>
                  ))}
                </ul>

                {exp.note && (
                  <p className="mt-4 text-gray-400 text-sm">{exp.note}</p>
                )}
              </div>
            </div>

            {/* Right Side */}
            <div className="md:w-42 flex flex-col items-center mt-4 md:mt-0">
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="w-44 h-42 object-cover border-3 border-white mb-2"
              />
              <div className="text-md text-center">
                <p>{exp.date}</p>
                <p>{exp.location}</p>
              </div>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden mt-4">
              <p className="font-semibold mb-2">I worked on:</p>
              <ul className="list-disc space-y-1 text-gray-300 text-lg ml-5">
                {exp.description.map((item, j) => (
                  <li key={j} className="pl-2">{item}</li>
                ))}
              </ul>

              {exp.note && (
                <p className="mt-4 text-gray-400 text-sm text-center">{exp.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}