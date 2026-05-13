"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useDirection } from "./useDirection";

type SoundState = {
  muted: boolean;
  ready: boolean;
};

let audio: HTMLAudioElement | null = null;
let hasTriedPlay = false;
let soundState: SoundState = {
  muted: true,
  ready: false,
};

const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((listener) => listener());
};

const setSoundState = (next: Partial<SoundState>) => {
  soundState = { ...soundState, ...next };
  emit();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => soundState;

const getServerSnapshot = () => soundState;

const ensureAudio = () => {
  if (audio) {
    return audio;
  }

  audio = new Audio("/sounds/music-quiet.mp3");
  audio.preload = "none";
  audio.volume = 0.18;
  audio.loop = true;
  audio.muted = soundState.muted;

  return audio;
};

const tryPlayAudio = () => {
  const currentAudio = ensureAudio();

  if (hasTriedPlay) {
    return;
  }

  hasTriedPlay = true;
  currentAudio.volume = 0.18;
  currentAudio
    .play()
    .then(() => setSoundState({ ready: true }))
    .catch(() => {
      hasTriedPlay = false;
    });
};

function useSoundIntro() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (audio) {
      audio.muted = soundState.muted;
    }
  }, []);

  useEffect(() => {
    const handleFirstClick = () => {
      const currentAudio = ensureAudio();
      currentAudio.muted = false;
      setSoundState({ muted: false });
      tryPlayAudio();

      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
    };
  }, []);

  const toggleMute = useCallback(() => {
    const currentAudio = ensureAudio();
    const muted = !soundState.muted;

    currentAudio.muted = muted;
    setSoundState({ muted });

    if (!muted) {
      tryPlayAudio();
    }
  }, []);

  return {
    ...state,
    toggleMute,
  };
}

type SoundToggleButtonProps = {
  placement?: "floating" | "drawer";
};

export function SoundToggleButton({
  placement = "floating",
}: SoundToggleButtonProps) {
  const { dir, language } = useDirection();
  const { muted, ready, toggleMute } = useSoundIntro();
  const isArabic = language?.startsWith("ar");
  const label = isArabic
    ? muted
      ? "\u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0635\u0648\u062a"
      : "\u0643\u062a\u0645 \u0627\u0644\u0635\u0648\u062a"
    : muted
      ? "Unmute sound"
      : "Mute sound";
  const Icon = muted ? VolumeX : Volume2;

  return (
    <button
      type="button"
      onClick={toggleMute}
      className={`sound-intro-button sound-intro-button--${placement}`}
      aria-label={label}
      aria-pressed={muted}
      title={label}
      dir={dir}
      data-ready={ready}
      data-muted={muted}
    >
      <span className="sound-intro-pulse" aria-hidden="true" />
      <span className="sound-intro-glow" aria-hidden="true" />
      <Icon className="sound-intro-icon" size={21} strokeWidth={2.2} />
      {placement === "drawer" ? (
        <span className="sound-intro-label">{label}</span>
      ) : null}
    </button>
  );
}

export default function SoundIntro() {
  return <SoundToggleButton placement="floating" />;
}
