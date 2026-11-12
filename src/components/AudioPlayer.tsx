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
    setTimeout(() => setSplashGone(true), 700);
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

  const base = import.meta.env.BASE_URL;

  // 8 flowers alternating red/white around a circle
  const flowerPositions = [
    { angle: 0,   type: "red" },
    { angle: 45,  type: "white" },
    { angle: 90,  type: "red" },
    { angle: 135, type: "white" },
    { angle: 180, type: "red" },
    { angle: 225, type: "white" },
    { angle: 270, type: "red" },
    { angle: 315, type: "white" },
  ];

  return (
    <>
      <audio ref={audioRef} src={`${base}bg-music.mp3`} loop preload="auto" />

      {/* Floral circle splash screen */}
      {!splashGone && (
        <div
          className={`splash-screen ${!showSplash ? "splash-screen--out" : ""}`}
          onClick={dismissSplash}
          role="button"
          aria-label="Tap to open invitation"
        >
          <div className="splash-circle-wrap">
            {/* Flower ring */}
            {flowerPositions.map((f, i) => {
              const radius = 46; // % from center
              const rad = (f.angle * Math.PI) / 180;
              const x = 50 + radius * Math.cos(rad);
              const y = 50 + radius * Math.sin(rad);
              const src = f.type === "red"
                ? `${base}flower-red.png`
                : `${base}flower-white.png`;
              const size = f.type === "red" ? 52 : 48;
              return (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="splash-flower-img"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: `translate(-50%, -50%) rotate(${f.angle + 20}deg)`,
                  }}
                />
              );
            })}

            {/* Gold circle border */}
            <div className="splash-gold-ring" />

            {/* Text content in center */}
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
