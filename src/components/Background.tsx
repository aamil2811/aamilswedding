import { useEffect, useRef } from "react";

interface BackgroundProps {
  prefersReducedMotion: boolean;
  showArch: boolean;
}

export function Background({
  prefersReducedMotion,
  showArch,
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

  return (
    <div className="bg-stage" aria-hidden="true">
      <div className="bg-column">
        <div ref={imageRef} className="bg-breath-layer">
          <div
            className="bg-image"
            style={{ backgroundImage: `url("${base}bg.jpg?v=7")` }}
          />
          <div
            className={`bg-image-rug ${showArch ? "is-visible" : ""}`}
            style={{ backgroundImage: `url("${base}bg-rug.jpg?v=2")` }}
          />
        </div>
      </div>
    </div>
  );
}
