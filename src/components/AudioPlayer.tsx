import { useEffect, useRef, useState, useCallback } from "react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [splashGone, setSplashGone] = useState(false);

  // Pause when user leaves the browser tab / switches app
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
        setPlaying(false);
      } else if (started) {
        audio.play().then(() => setPlaying(true)).catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [started]);

  const dismissSplash = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => {
      setPlaying(true);
      setStarted(true);
    }).catch(() => {});
    setShowSplash(false);
    setTimeout(() => setSplashGone(true), 650);
  }, []);

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
      }).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="./bg-music.mp3" loop preload="auto" />

      {/* Floral circle splash screen */}
      {!splashGone && (
        <div
          className={`splash-screen ${!showSplash ? "splash-screen--out" : ""}`}
          onClick={dismissSplash}
          role="button"
          aria-label="Tap to open invitation"
        >
          {/* Decorative floral ring */}
          <div className="splash-floral-ring">
            {/* Top-right cluster */}
            <div className="splash-flower splash-flower--tr" />
            {/* Bottom-left cluster */}
            <div className="splash-flower splash-flower--bl" />
            {/* Top-left accent */}
            <div className="splash-flower splash-flower--tl" />
            {/* Bottom-right accent */}
            <div className="splash-flower splash-flower--br" />

            <div className="splash-inner">
              <p className="splash-bismillah" lang="ar" dir="rtl">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
              <p className="splash-names">Dr. Kamil &amp; Aatika</p>
              <p className="splash-subtitle">Wedding Invitation</p>
              <div className="splash-tap-hint">
                <span className="splash-tap-pulse" />
                Tap to open
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating mute / unmute button */}
      <button
        className={`audio-btn ${playing ? "audio-btn--playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
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
