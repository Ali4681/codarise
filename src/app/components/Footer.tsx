import { Code } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative py-10 border-t border-purple-500/20 bg-gradient-to-t from-slate-900/90 to-slate-950/40 shadow-inner backdrop-blur-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          {/* Logo + Name */}
          <div className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 p-0.5 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-purple-500/40">
              <div className="w-full h-full bg-slate-800/50 rounded-xl flex items-center justify-center">
                <Image
                  src="/logo 2.PNG"
                  alt="Codarise Logo"
                  width={40}
                  height={40}
                  className="object-contain w-10 h-10 transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
            <div className="text-2xl font-extrabold tracking-wider">
              <span className="text-white">CODAR</span>
              <span className="text-cyan-400">ISE</span>
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm uppercase tracking-widest font-medium">
              © 2025 Codarise. All rights reserved.
            </p>
            <p className="text-purple-400 italic text-xs mt-1 tracking-wide animate-pulse">
              Rising through code.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Glow Line */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-400/10 via-purple-500/30 to-cyan-400/10 blur-sm animate-gradient-x" />

      {/* Extra Animation Keyframe */}
      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;

// import { Code } from "lucide-react";
// import Image from "next/image";

// const Footer = () => {
//   return (
//     <footer className="relative overflow-hidden border-t border-purple-500/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900">
//       {/* Glowing orb effects */}
//       <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
//       <div className="absolute -bottom-40 -right-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

//       {/* Grid pattern overlay */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-transparent via-slate-900/80 to-slate-900 pointer-events-none"></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex flex-col items-center justify-center gap-8">
//           {/* Enhanced logo with animated border */}
//           <div className="group relative">
//             <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 opacity-75 blur transition-all duration-300 group-hover:opacity-100 group-hover:blur-sm"></div>
//             <div className="relative flex items-center gap-3 rounded-lg bg-slate-900/80 px-4 py-3 ring-1 ring-purple-500/30 backdrop-blur-sm">
//               <div className="relative h-10 w-10 overflow-hidden rounded-md">
//                 <Image
//                   src="/logo 2.PNG"
//                   alt="Codarise Logo"
//                   width={40}
//                   height={40}
//                   className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
//                   priority
//                 />
//               </div>
//               <div className="text-xl font-bold tracking-tight">
//                 <span className="text-white">CODAR</span>
//                 <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">ISE</span>
//               </div>
//             </div>
//           </div>

//           {/* Copyright text with animated underline */}
//           <div className="relative">
//             <p className="text-center text-sm font-medium uppercase tracking-wider text-gray-400">
//               © {new Date().getFullYear()} Codarise. All rights reserved.{" "}
//               <span className="relative inline-block">
//                 <span className="italic text-purple-400">Rising through code.</span>
//                 <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-purple-600 transition-transform duration-500 hover:scale-x-100"></span>
//               </span>
//             </p>
//           </div>

//           {/* Subtle code icon decoration */}
//           <div className="mt-4 opacity-30 hover:opacity-70 transition-opacity duration-300">
//             <Code className="h-6 w-6 text-purple-400" />
//           </div>
//         </div>
//       </div>

//       {/* Animated border top */}
//       <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent overflow-hidden">
//         <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent to-white animate-[shimmer_2s_infinite]"></div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
