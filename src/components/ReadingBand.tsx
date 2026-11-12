import { useEffect, useState } from "react";
import { invite, type WeddingEvent } from "../data/invite";
import { useScrollContext } from "../context/ScrollContext";
import { DetailsBox } from "./DetailsBox";

interface ReadingBandProps {
  onPageChange: (page: number) => void;
}

function EventSection({
  pageNumber,
  event,
  isVisible,
}: {
  pageNumber: number;
  event: WeddingEvent;
  isVisible: boolean;
}) {
  return (
    <section
      data-page={pageNumber}
      className={`snap-page snap-page-arch ${isVisible ? "is-visible" : ""}`}
    >
      <div className="page-card page-card-arch">
        <p className="couple-header">{event.header ?? invite.couple}</p>

        {event.bismillah && (
          <p
            className="bismillah"
            lang="ar"
            dir="rtl"
            aria-label="Bismillahir Rahmanir Rahim"
          >
            {event.bismillah}
          </p>
        )}

        <p className="invited-line">
          {Array.isArray(event.invitedLine)
            ? event.invitedLine.join(" ")
            : event.invitedLine}
        </p>

        <h2 className="event-title">{event.title.join(" ")}</h2>

        {event.tagline && (
          <p className="event-tagline">{event.tagline.join(" ")}</p>
        )}

        <DetailsBox
          date={event.date}
          time={event.time}
          place={event.place}
        />

        {event.note && (
          <p className="event-note">{event.note.join(" ")}</p>
        )}
      </div>
    </section>
  );
}

export function ReadingBand({ onPageChange }: ReadingBandProps) {
  const { scrollContainerRef } = useScrollContext();
  const [visiblePages, setVisiblePages] = useState<Set<number>>(
    () => new Set([1])
  );

  const byId = (id: string) =>
    invite.events.find((e) => e.id === id) as WeddingEvent;

  const nikah = byId("nikah");
  const mameru = byId("mameru");
  const haldi = byId("haldi");
  const barat = byId("barat");
  const walima = byId("walima");

  useEffect(() => {
    const scroller = scrollContainerRef.current;
    if (!scroller) return;

    const sections = scroller.querySelectorAll<HTMLElement>("[data-page]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const pageNum = Number(
            (entry.target as HTMLElement).dataset.page || "1"
          );
          if (entry.isIntersecting) {
            onPageChange(pageNum);
            setVisiblePages((prev) => {
              if (prev.has(pageNum)) return prev;
              const next = new Set(prev);
              next.add(pageNum);
              return next;
            });
          }
        });
      },
      {
        root: scroller,
        threshold: 0.5,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [scrollContainerRef, onPageChange]);

  const isVisible = (p: number) => visiblePages.has(p);

  return (
    <div
      ref={scrollContainerRef}
      className="scroll-container"
      tabIndex={0}
      aria-label="Wedding Invitation"
    >
      <main className="snap-column">
        {/* PAGE 1: Introduction */}
        <section
          data-page={1}
          className={`snap-page snap-page-intro ${isVisible(1) ? "is-visible" : ""}`}
        >
          <div className="page-card page-card-intro">
            <p
              className="bismillah"
              lang="ar"
              dir="rtl"
              aria-label="Bismillahir Rahmanir Rahim"
            >
              {invite.cover.bismillah}
            </p>
            <p className="cover-tagline">{invite.cover.line1}</p>
            <p className="intro-blessing">{invite.cover.blessing}</p>
            <h1 className="cover-names">{invite.cover.names}</h1>
          </div>
        </section>

        {/* PAGE 2: Nikah Ceremony */}
        <EventSection pageNumber={2} event={nikah} isVisible={isVisible(2)} />

        {/* PAGE 3: Mameru Celebration */}
        <EventSection pageNumber={3} event={mameru} isVisible={isVisible(3)} />

        {/* PAGE 4: Haldi Celebration */}
        <EventSection pageNumber={4} event={haldi} isVisible={isVisible(4)} />

        {/* PAGE 5: Barat */}
        <EventSection pageNumber={5} event={barat} isVisible={isVisible(5)} />

        {/* PAGE 6: Dawat-E-Walima */}
        <EventSection pageNumber={6} event={walima} isVisible={isVisible(6)} />

        {/* PAGE 7: Thank You */}
        <section
          data-page={7}
          className={`snap-page snap-page-arch ${isVisible(7) ? "is-visible" : ""}`}
        >
          <div className="page-card page-card-arch">
            <p className="couple-header">{invite.couple}</p>
            <h2 className="event-title">{invite.thankYou.title}</h2>
            <p className="event-tagline">
              {invite.thankYou.line1.join(" ")}
            </p>
            <p className="body-copy">{invite.thankYou.line2.join(" ")}</p>
            <p className="signoff">{invite.thankYou.signoff}</p>
            <p className="cover-names">{invite.thankYou.signature}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
