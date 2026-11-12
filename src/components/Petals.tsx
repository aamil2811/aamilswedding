import { useEffect, useRef } from "react";

interface PetalsProps {
  prefersReducedMotion: boolean;
}

const PETAL_CONFIG = [
  { left: "12%", size: 10, color: "#7A1230", opacity: 0.24, duration: 19, delay: 0 },
  { left: "26%", size: 8, color: "#EADFCF", opacity: 0.45, duration: 23, delay: 3 },
  { left: "41%", size: 11, color: "#5C1424", opacity: 0.2, duration: 21, delay: 6 },
  { left: "58%", size: 9, color: "#EADFCF", opacity: 0.4, duration: 25, delay: 2 },
  { left: "74%", size: 10, color: "#7A1230", opacity: 0.22, duration: 20, delay: 8 },
  { left: "86%", size: 8, color: "#EADFCF", opacity: 0.42, duration: 24, delay: 4 },
  { left: "18%", size: 9, color: "#5C1424", opacity: 0.18, duration: 26, delay: 11 },
  { left: "65%", size: 11, color: "#7A1230", opacity: 0.2, duration: 22, delay: 9 },
];

export function Petals({ prefersReducedMotion }: PetalsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    document.fonts.ready.then(async () => {
      if (cancelled || !containerRef.current) return;
      const { gsap } = await import("gsap");
      if (cancelled || !containerRef.current) return;

      ctx = gsap.context(() => {
        const nodes = containerRef.current?.querySelectorAll<HTMLElement>(".petal");
        if (!nodes) return;

        nodes.forEach((node, idx) => {
          const cfg = PETAL_CONFIG[idx];
          const driftX = (idx % 2 === 0 ? 1 : -1) * (24 + (idx % 3) * 14);
          const rot = (idx % 2 === 0 ? 1 : -1) * 180;

          gsap.set(node, {
            y: "-8svh",
            x: 0,
            rotation: idx * 35,
            opacity: 0,
          });

          const tl = gsap.timeline({
            repeat: -1,
            delay: cfg.delay,
          });

          tl.to(node, {
            opacity: cfg.opacity,
            duration: 2.2,
            ease: "sine.inOut",
          })
            .to(
              node,
              {
                y: "108svh",
                x: driftX,
                rotation: `+=${rot}`,
                duration: cfg.duration,
                ease: "none",
                force3D: true,
              },
              0
            )
            .to(
              node,
              {
                opacity: 0,
                duration: 2.5,
                ease: "sine.inOut",
              },
              cfg.duration - 2.5
            );
        });
      }, containerRef);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div ref={containerRef} className="petals-layer" aria-hidden="true">
      {PETAL_CONFIG.map((p, idx) => (
        <span
          key={idx}
          className="petal"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${Math.round(p.size * 1.45)}px`,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

