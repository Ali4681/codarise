import { useEffect, useState } from "react";

const COLORS = [
  "rgba(59, 130, 246, 0.6)", // blue-500
  "rgba(139, 92, 246, 0.6)", // purple-500
  "rgba(99, 102, 241, 0.6)", // indigo-500
  "rgba(236, 72, 153, 0.5)", // pink-500
  "rgba(14, 165, 233, 0.5)", // sky-500
];

const FloatingParticles = () => {
  // To avoid performance issues, adjust count by window width
  const [count, setCount] = useState(50);
  useEffect(() => {
    const updateCount = () => setCount(window.innerWidth < 768 ? 25 : 50);
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  // Generate particles data on mount (position, size, color, delay, duration)
  const [particles] = useState(() =>
    Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 3, // 1px to 4px diameter
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      animationDelay: Math.random() * 5 + "s",
      animationDuration: 4 + Math.random() * 6 + "s",
      opacity: 0.2 + Math.random() * 0.6,
      translateXRange: Math.random() * 20 - 10, // -10 to +10 px drift
      translateYRange: Math.random() * 15 - 7.5, // -7.5 to +7.5 px drift
      rotateDirection: Math.random() > 0.5 ? 1 : -1,
      rotateSpeed: 10 + Math.random() * 20, // degrees per second
      scaleRange: 0.15 + Math.random() * 0.15,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            animation: `floatMove-${i} ${p.animationDuration} ease-in-out infinite`,
            animationDelay: p.animationDelay,
            willChange: "transform, opacity",
          }}
        >
          <style>{`
            @keyframes floatMove-${i} {
              0%, 100% {
                transform: translate(0, 0) rotate(0deg) scale(1);
                opacity: ${p.opacity};
              }
              25% {
                transform: translate(${p.translateXRange / 2}px, ${
            -p.translateYRange / 2
          }px) rotate(${(p.rotateDirection * p.rotateSpeed) / 4}deg) scale(${
            1 + p.scaleRange
          });
                opacity: ${p.opacity * 0.8};
              }
              50% {
                transform: translate(${p.translateXRange}px, ${
            p.translateYRange
          }px) rotate(${(p.rotateDirection * p.rotateSpeed) / 2}deg) scale(1);
                opacity: ${p.opacity};
              }
              75% {
                transform: translate(${p.translateXRange / 2}px, ${
            -p.translateYRange / 2
          }px) rotate(${(p.rotateDirection * p.rotateSpeed) / 4}deg) scale(${
            1 - p.scaleRange
          });
                opacity: ${p.opacity * 0.8};
              }
            }
          `}</style>
        </span>
      ))}
    </div>
  );
};

export default FloatingParticles;
