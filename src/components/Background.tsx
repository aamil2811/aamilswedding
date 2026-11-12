import { useEffect, useRef } from "react";

interface BackgroundProps {
  prefersReducedMotion: boolean;
  activePage: number;
}

export function Background({
  prefersReducedMotion,
  activePage,
}: BackgroundProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    let tween: { kill: () => void } | undefined;

    document.fonts.ready.then(async () => {
      if (cancelled || !imageRef.current) return;
      const { gsap } = await import("gsap");
      if (cancelled || !imageRef.current) return;

      tween = gsap.fromTo(
        imageRef.current,
        { scale: 1 },
        {
          scale: 1.015,
          duration: 14,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          force3D: true,
        }
      );
    });

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [prefersReducedMotion]);

  const base = import.meta.env.BASE_URL;
  const showRug = activePage === 3;
  const showPage3Bg = activePage === 2 || activePage === 4;

  return (
    <div className="bg-stage" aria-hidden="true">
      <div className="bg-column">
        <div ref={imageRef} className="bg-breath-layer">
          <div
            className="bg-image"
            style={{ backgroundImage: `url("${base}bg.jpg?v=7")` }}
          />
          <div
            className={`bg-image-page3 ${showPage3Bg ? "is-visible" : ""}`}
            style={{ backgroundImage: `url("${base}bg-page3.jpg?v=1")` }}
          />
          <div
            className={`bg-image-rug ${showRug ? "is-visible" : ""}`}
            style={{ backgroundImage: `url("${base}bg-rug.jpg?v=2")` }}
          />
        </div>
      </div>
    </div>
  );
}
