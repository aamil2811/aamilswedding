interface DetailsBoxProps {
  date: string;
  time: string;
  place: string[];
}

function CalendarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.6"
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
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.6"
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
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.6"
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
  return (
    <div className="details-box">
      <div className="details-row">
        <span className="details-icon">
          <CalendarIcon />
        </span>
        <span className="details-text">{date}</span>
      </div>
      <div className="details-row">
        <span className="details-icon">
          <ClockIcon />
        </span>
        <span className="details-text">{time}</span>
      </div>
      <div className="details-row">
        <span className="details-icon">
          <MapPinIcon />
        </span>
        <span className="details-text">{place.join(" ")}</span>
      </div>
    </div>
  );
}
