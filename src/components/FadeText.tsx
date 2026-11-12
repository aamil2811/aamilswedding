import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useScrollContext } from "../context/ScrollContext";

interface FadeTextProps {
  children: React.ReactNode;
  className?: string;
  isTitle?: boolean;
}

const INPUT_RANGE = [0.16, 0.28, 0.56, 0.72];

export function FadeText({
  children,
  className = "",
  isTitle = false,
}: FadeTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollContainerRef, prefersReducedMotion } = useScrollContext();

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, INPUT_RANGE, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, INPUT_RANGE, [34, 0, 0, -34]);
  const filter = useTransform(
    scrollYProgress,
    INPUT_RANGE,
    ["blur(5px)", "blur(0px)", "blur(0px)", "blur(5px)"]
  );
  const letterSpacing = useTransform(
    scrollYProgress,
    INPUT_RANGE,
    ["0.26em", "0.02em", "0.02em", "0.26em"]
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        isTitle
          ? { opacity, y, filter, letterSpacing }
          : { opacity, y }
      }
    >
      {children}
    </motion.div>
  );
}

