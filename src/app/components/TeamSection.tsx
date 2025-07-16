"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "./ThemeProvider"; // Adjust import path as needed

const team = [
  {
    name: "Ali M Al-bayati",
    role: "Web Development | Ai | React Native",
    specialty: "Full-Stack Magic",
    image: "/ali.jpg",
    social: {
      github: "https://github.com/Ali4681",
      linkedin: "https://www.linkedin.com/in/ali-al-bayati-59b41b319",
    },
  },
  {
    name: "Beshr Sawas",
    role: "Flutter Developer",
    specialty: "Mobile App Wizardry",
    image: "/b.jpg",
    social: {
      github: "https://github.com/beshr-sawas-02",
      linkedin: "https://www.linkedin.com/in/beshr-sawas-45b023374",
    },
  },
  {
    name: "Mohammad Alm Al-awad",
    role: "Web Development | Ai | React Native",
    specialty: "Full-Stack Magic",
    image: "/awaaadffff.jpg",
    social: {
      github: "https://github.com/mohammedhfhgcm5",
      linkedin: "https://www.linkedin.com/in/mohammed-hfhgcm-abb656194",
    },
  },
  {
    name: "Mohammed Barouda",
    role: "Flutter Developer",
    specialty: "Mobile App Wizardry",
    image: "/z.jpg",
    social: {
      github: "https://github.com/zakaria-ba02",
      linkedin: "https://www.linkedin.com/in/mohmmed-barouda-867673374",
    },
  },
  {
    name: "Omar Haboub",
    role: "Web Development | Ai | React Native",
    specialty: "Full-Stack Magic",
    image: "/om.jpg",
    social: {
      github: "https://github.com/omarhabboub13",
      linkedin: "https://www.linkedin.com/in/omar-habboub-878163374/",
    },
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const TeamCard = ({ member }: { member: (typeof team)[0] }) => {
  const [imageError, setImageError] = useState(false);
  const { isDarkMode } = useTheme();

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div variants={cardVariants} className="flex">
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor={isDarkMode ? "#8b5cf6" : "#6366f1"}
        glarePosition="bottom"
        scale={1.05}
        transitionSpeed={400}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        className={`group cursor-pointer backdrop-blur-lg rounded-3xl p-6 border transition-all duration-500 shadow-lg w-full flex flex-col ${
          isDarkMode
            ? "bg-slate-800/50 border-transparent hover:border-purple-500/70 hover:shadow-purple-700/30"
            : "bg-white/70 border-gray-200 hover:border-indigo-500/70 hover:shadow-indigo-500/20"
        }`}
      >
        <div className="relative mb-6 flex justify-center">
          <div
            aria-hidden="true"
            className={`absolute inset-0 rounded-full animate-pulse-slow blur-xl opacity-70 ${
              isDarkMode
                ? "bg-gradient-to-r from-blue-500 to-purple-600"
                : "bg-gradient-to-r from-indigo-400 to-purple-500"
            }`}
          />
          <div
            className={`relative w-32 h-32 rounded-full flex items-center justify-center border-4 border-transparent group-hover:border-purple-500 transition-colors duration-500 shadow-lg overflow-hidden ${
              isDarkMode ? "bg-slate-900/70" : "bg-gray-100/90"
            }`}
          >
            {!imageError ? (
              <Image
                src={member.image}
                alt={member.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <span
                aria-label={`${member.name} initials`}
                role="img"
                className={`text-4xl font-extrabold text-transparent bg-clip-text drop-shadow-lg select-none ${
                  isDarkMode
                    ? "bg-gradient-to-r from-purple-400 to-blue-400"
                    : "bg-gradient-to-r from-indigo-500 to-purple-500"
                }`}
              >
                {initials}
              </span>
            )}
          </div>
        </div>

        <div className="flex-grow">
          <h3
            className={`text-xl font-bold mb-2 transition-colors duration-300 text-center ${
              isDarkMode
                ? "text-white group-hover:text-purple-400"
                : "text-gray-900 group-hover:text-indigo-600"
            }`}
          >
            {member.name}
          </h3>
          <p
            className={`mb-2 font-semibold tracking-wide text-center group-hover:underline decoration-2 transition-all duration-300 ${
              isDarkMode
                ? "text-purple-400 decoration-purple-600"
                : "text-indigo-600 decoration-indigo-600"
            }`}
          >
            {member.role}
          </p>
          <p
            className={`text-sm tracking-wide leading-relaxed text-center ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {member.specialty}
          </p>
        </div>

        <div className="mt-4 flex justify-center space-x-3">
          <motion.a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDarkMode
                ? "bg-slate-700/70 hover:bg-gray-700"
                : "bg-gray-200/70 hover:bg-gray-300"
            }`}
            whileHover={{ y: -2 }}
            aria-label={`${member.name}'s GitHub`}
          >
            <svg
              className={`w-4 h-4 ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </motion.a>

          <motion.a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors ${
              isDarkMode ? "bg-slate-700/70" : "bg-gray-200/70"
            }`}
            whileHover={{ y: -2 }}
            aria-label={`${member.name}'s LinkedIn`}
          >
            <svg
              className={`w-4 h-4 ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </motion.a>
        </div>
      </Tilt>
    </motion.div>
  );
};

const TeamSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="team"
      className={`py-20 relative ${isDarkMode ? "" : ""}`}
      aria-labelledby="team-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            id="team-title"
            className="text-5xl font-extrabold mb-6 inline-block leading-[1.2]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span
              className={`bg-clip-text text-transparent ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-400 to-purple-400"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600"
              }`}
            >
              Meet Our Team
            </span>
          </motion.h2>

          <motion.p
            className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Young, ambitious developers ready to turn your ideas into digital
            reality
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {team.map((member, idx) => (
            <TeamCard key={idx} member={member} />
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
