// import { Code } from "lucide-react";
// import { motion, useAnimation } from "framer-motion";
// import Tilt from "react-parallax-tilt";
// import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";

// const projects = [
//   {
//     title: "E-Commerce Portal",
//     description: "Modern shopping experience with AI recommendations",
//     tech: ["React", "Node.js", "MongoDB"],
//   },
//   {
//     title: "Healthcare App",
//     description: "Digital health platform with telemedicine features",
//     tech: ["React Native", "Firebase", "WebRTC"],
//   },
//   {
//     title: "FinTech Dashboard",
//     description: "Real-time financial analytics and trading platform",
//     tech: ["Next.js", "Python", "PostgreSQL"],
//   },
// ];

// const ProjectsSection = () => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { staggerChildren: 0.15, ease: "easeOut", duration: 0.7 },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.95 },
//     visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
//   };

//   return (
//     <section
//       id="projects"
//       className="py-24 relative scroll-mt-28 bg-gradient-to-b "
//       ref={ref}
//     >
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <motion.div
//           initial="hidden"
//           animate={controls}
//           variants={containerVariants}
//           className="text-center mb-20"
//         >
//           <h2 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
//             Featured Projects
//           </h2>
//           <p className="text-xl max-w-3xl mx-auto text-gray-300 font-light tracking-wide">
//             Showcasing our magical creations and digital innovations
//           </p>
//         </motion.div>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={controls}
//           className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//         >
//           {projects.map((project, index) => (
//             <motion.div
//               key={index}
//               variants={cardVariants}
//               whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
//               whileFocus={{ scale: 1.05 }}
//               tabIndex={0}
//             >
//               <Tilt
//                 glareEnable={true}
//                 glareMaxOpacity={0.3}
//                 glareColor="#9f7aea"
//                 glarePosition="all"
//                 tiltMaxAngleX={15}
//                 tiltMaxAngleY={15}
//                 transitionSpeed={400}
//                 className="bg-slate-800/60 backdrop-blur-md rounded-3xl border border-purple-600/50 shadow-xl hover:shadow-purple-600/40 focus:outline-none focus:ring-4 focus:ring-purple-500/60"
//               >
//                 <div className="relative overflow-hidden rounded-3xl">
//                   <div className="h-52 flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-900 shadow-inner">
//                     <Code className="text-white w-20 h-20 drop-shadow-lg" />
//                     {/* Decorative animated border */}
//                     <span
//                       aria-hidden="true"
//                       className="absolute inset-0 rounded-3xl border-4 border-transparent border-gradient-animated pointer-events-none"
//                     />
//                   </div>
//                   <div className="p-7">
//                     <h3 className="text-2xl font-semibold text-white mb-2 tracking-wide">
//                       {project.title}
//                     </h3>
//                     <p className="text-gray-300 mb-5 font-light leading-relaxed">
//                       {project.description}
//                     </p>
//                     <div className="flex flex-wrap gap-3">
//                       {project.tech.map((tech, techIndex) => (
//                         <span
//                           key={techIndex}
//                           className="px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:brightness-110 transition"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </Tilt>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Custom styles for animated gradient border */}
//       <style jsx>{`
//         .border-gradient-animated {
//           border-image-slice: 1;
//           border-width: 4px;
//           border-image-source: linear-gradient(
//             270deg,
//             #7f00ff,
//             #e100ff,
//             #7f00ff,
//             #e100ff
//           );
//           animation: borderShift 4s ease infinite;
//         }

//         @keyframes borderShift {
//           0% {
//             border-image-source: linear-gradient(
//               270deg,
//               #7f00ff,
//               #e100ff,
//               #7f00ff,
//               #e100ff
//             );
//           }
//           50% {
//             border-image-source: linear-gradient(
//               90deg,
//               #7f00ff,
//               #e100ff,
//               #7f00ff,
//               #e100ff
//             );
//           }
//           100% {
//             border-image-source: linear-gradient(
//               270deg,
//               #7f00ff,
//               #e100ff,
//               #7f00ff,
//               #e100ff
//             );
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default ProjectsSection;
