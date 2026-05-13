"use client";

import { useEffect, useRef } from "react";

export default function SoundIntro() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const played = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/music.mp3");
    audioRef.current.loop = true;

    const tryPlay = () => {
      if (played.current) return;
      played.current = true;
      audioRef.current?.play().catch(() => {});
    };

    // try autoplay first
    audioRef.current
      .play()
      .then(() => {
        played.current = true;
      })
      .catch(() => {
        // fallback: play on first user interaction
        document.addEventListener("click", tryPlay, { once: true });
        document.addEventListener("touchstart", tryPlay, { once: true });
      });

    return () => {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  return null;
}
