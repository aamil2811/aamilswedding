import { motion } from "motion/react";
import { FadeText } from "./FadeText";
import { useScrollContext } from "../context/ScrollContext";

interface DetailsBoxProps {
  date: string;
  time: string;
  place: string[];
}

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function DetailsBox({ date, time, place }: DetailsBoxProps) {
  const { scrollContainerRef, prefersReducedMotion } = useScrollContext();

  const rows = [
    { key: "date", icon: <CalendarIcon />, lines: [date] },
    { key: "time", icon: <ClockIcon />, lines: [time] },
    { key: "place", icon: <MapPinIcon />, lines: place },
  ];

  return (
    <FadeText className="details-outer">
      <div className="details-box">
        <svg
          className="details-border-svg"
          viewBox="0 0 300 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect
            className="details-border-rect"
            x="1"
            y="1"
            width="298"
            height="138"
            rx="10"
            ry="10"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="details-rows">
          {rows.map((row, idx) => (
            <motion.div
              key={row.key}
              className="details-row"
              initial={prefersReducedMotion ? false : { x: -16 }}
              whileInView={{ x: 0 }}
              viewport={{
                root: scrollContainerRef,
                once: false,
                amount: 0.2,
              }}
              transition={{
                duration: 0.45,
                delay: idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                className="details-icon"
                initial={prefersReducedMotion ? false : { scale: 0.4 }}
                whileInView={{ scale: 1 }}
                viewport={{
                  root: scrollContainerRef,
                  once: false,
                  amount: 0.2,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 14,
                  delay: idx * 0.06,
                }}
              >
                {row.icon}
              </motion.span>
              <span className="details-text">
                {row.lines.map((line, i) => (
                  <span key={i} className="details-line">
                    {line}
                  </span>
                ))}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeText>
  );
}

