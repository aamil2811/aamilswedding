import { motion, useScroll } from "motion/react";
import { useScrollContext } from "../context/ScrollContext";

export function ProgressLine() {
  const { scrollContainerRef, prefersReducedMotion } = useScrollContext();
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });

  return (
    <div className="progress-track-frame" aria-hidden="true">
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          style={
            prefersReducedMotion
              ? { scaleY: 1, transformOrigin: "top" }
              : { scaleY: scrollYProgress, transformOrigin: "top" }
          }
        />
      </div>
    </div>
  );
}

