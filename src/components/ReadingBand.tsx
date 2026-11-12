import { useEffect, useState } from "react";
import { invite, type WeddingEvent } from "../data/invite";
import { useScrollContext } from "../context/ScrollContext";
import { DetailsBox } from "./DetailsBox";

interface ReadingBandProps {
  onPageChange: (page: number) => void;
}

function EventPage({ event }: { event: WeddingEvent }) {
  return (
    <>
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

      <DetailsBox date={event.date} time={event.time} place={event.place} />

      {event.note && (
        <p className="event-note">{event.note.join(" ")}</p>
      )}
    </>
  );
}

export function ReadingBand({ onPageChange }: ReadingBandProps) {
  const { scrollContainerRef } = useScrollContext();
  const [visiblePages, setVisiblePages] = useState<Set<number>>(
    () => new Set([1])
  );

  const byId = (id: string) =>
    invite.events.find((e) => e.id === id) as WeddingEvent;

  const nikah  = byId("nikah");
  const mameru = byId("mameru");
  const haldi  = byId("haldi");
  const barat  = byId("barat");
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
      { root: scroller, threshold: 0.4 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [scrollContainerRef, onPageChange]);

  const isV = (p: number) => visiblePages.has(p);

  return (
    <div
      ref={scrollContainerRef}
      className="scroll-container"
      tabIndex={0}
      aria-label="Wedding Invitation"
    >
      <main className="snap-column">

        {/* ── SLIDE GROUP 1: Introduction (bg.jpg) ── */}

        {/* Paragraph 1 */}
        <section
          data-page={1}
          className={`snap-page snap-page-intro ${isV(1) ? "is-visible" : ""}`}
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

        {/* Paragraph 2: Nikah Ceremony (still bg.jpg) */}
        <section
          data-page={2}
          className={`snap-page snap-page-arch ${isV(2) ? "is-visible" : ""}`}
        >
          <div className="page-card page-card-arch">
            <EventPage event={nikah} />
          </div>
        </section>

        {/* ── SLIDE GROUP 2: Mameru / Haldi / Barat (bg-page3.jpg) ── */}

        {/* Paragraph 3: Mameru */}
        <section
          data-page={3}
          className={`snap-page snap-page-arch ${isV(3) ? "is-visible" : ""}`}
        >
          <div className="page-card page-card-arch">
            <EventPage event={mameru} />
          </div>
        </section>

        {/* Paragraph 4: Haldi */}
        <section
          data-page={4}
          className={`snap-page snap-page-arch ${isV(4) ? "is-visible" : ""}`}
        >
          <div className="page-card page-card-arch">
            <EventPage event={haldi} />
          </div>
        </section>

        {/* Paragraph 5: Barat */}
        <section
          data-page={5}
          className={`snap-page snap-page-arch ${isV(5) ? "is-visible" : ""}`}
        >
          <div className="page-card page-card-arch">
            <EventPage event={barat} />
          </div>
        </section>

        {/* ── SLIDE GROUP 3: Walima / Thank You (bg-rug.jpg) ── */}

        {/* Paragraph 6: Dawat-E-Walima */}
        <section
          data-page={6}
          className={`snap-page snap-page-arch ${isV(6) ? "is-visible" : ""}`}
        >
          <div className="page-card page-card-arch">
            <EventPage event={walima} />
          </div>
        </section>

        {/* Paragraph 7: Thank You */}
        <section
          data-page={7}
          className={`snap-page snap-page-arch ${isV(7) ? "is-visible" : ""}`}
        >
          <div className="page-card page-card-arch">
            <p className="couple-header">{invite.couple}</p>
            <h2 className="event-title">{invite.thankYou.title}</h2>
            <p className="event-tagline">{invite.thankYou.line1.join(" ")}</p>
            <p className="body-copy">{invite.thankYou.line2.join(" ")}</p>
            <p className="signoff">{invite.thankYou.signoff}</p>
            <p className="cover-names">{invite.thankYou.signature}</p>
          </div>
        </section>

      </main>
    </div>
  );
}
