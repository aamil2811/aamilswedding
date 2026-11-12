import { FadeText } from "./FadeText";

export function Divider({ className = "" }: { className?: string }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <FadeText className={`divider-wrap ${className}`}>
      <div className="divider" aria-hidden="true">
        <svg
          className="divider-svg"
          viewBox="0 0 220 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            className="divider-line-left"
            x1="12"
            y1="10"
            x2="94"
            y2="10"
            stroke="var(--gold)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <g className="divider-flower" transform="translate(110 10)">
            {petals.map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-4.2"
                rx="1.6"
                ry="3.4"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="0.85"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="1.4" fill="var(--gold)" />
          </g>
          <line
            className="divider-line-right"
            x1="126"
            y1="10"
            x2="208"
            y2="10"
            stroke="var(--gold)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </FadeText>
  );
}

