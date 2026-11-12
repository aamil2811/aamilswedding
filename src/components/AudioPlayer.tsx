import { useEffect, useRef, useState } from "react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  // Try to autoplay on first user interaction with the page
  useEffect(() => {
    const tryPlay = () => {
      if (started) return;
      const audio = audioRef.current;
      if (!audio) return;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setStarted(true);
        })
        .catch(() => {
          // Autoplay blocked — user will need to tap the button
        });
    };

    window.addEventListener("click", tryPlay, { once: true });
    window.addEventListener("touchstart", tryPlay, { once: true });
    window.addEventListener("scroll", tryPlay, { once: true });

    return () => {
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("scroll", tryPlay);
    };
  }, [started]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => {
        setPlaying(true);
        setStarted(true);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src="./bg-music.mp3" loop preload="none" />
      <button
        className={`audio-btn ${playing ? "audio-btn--playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          /* Pause icon */
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none" />
          </svg>
        ) : (
          /* Music note icon */
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>
    </>
  );
}
