import { FadeText } from "./FadeText";

interface SplitTitleProps {
  lines: string[];
  className?: string;
}

export function SplitTitle({ lines, className = "" }: SplitTitleProps) {
  return (
    <FadeText isTitle className={`title-outer ${className}`}>
      <h2 className="event-title title-skew">
        {lines.map((line, lineIdx) => (
          <span key={lineIdx} className="title-line">
            {line.split(" ").map((word, wordIdx, words) => (
              <span key={wordIdx} className="title-word">
                {Array.from(word).map((char, charIdx) => (
                  <span key={charIdx} className="title-char">
                    {char}
                  </span>
                ))}
                {wordIdx < words.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </span>
        ))}
      </h2>
    </FadeText>
  );
}
