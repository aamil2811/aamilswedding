import { useEffect, useRef } from "react";

export type ActivePage = 1 | 2 | 3;

interface BackgroundProps {
  prefersReducedMotion: boolean;
  activePage: ActivePage;
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

  return (
    <div className="bg-stage" aria-hidden="true">
      <div className="bg-column">
        <div ref={imageRef} className="bg-breath-layer">
          <div className="bg-image" />
          <div className={`bg-image-rug ${activePage === 2 ? "is-visible" : ""}`} />
          <div
            className={`bg-image-page3 ${activePage === 3 ? "is-visible" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}
