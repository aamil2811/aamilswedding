import { useEffect, useRef } from "react";
import { invite, type WeddingEvent } from "../data/invite";
import { useScrollContext } from "../context/ScrollContext";
import { type ActivePage } from "./Background";
import { Beat } from "./Beat";
import { FadeText } from "./FadeText";
import { Divider } from "./Divider";
import { DetailsBox } from "./DetailsBox";
import { SplitTitle } from "./SplitTitle";

interface ReadingBandProps {
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
}

function EventCard({ event, compact = false }: { event: WeddingEvent; compact?: boolean }) {
  return (
    <Beat id={`${event.id}-card`} className={compact ? "beat-card beat-card-arch" : "beat-card"}>
      <FadeText>
        <p className="couple-header">{event.header ?? invite.couple}</p>
      </FadeText>
      {event.bismillah && (
        <FadeText className="bismillah-wrap">
          <p
            className="bismillah bismillah-inner"
            lang="ar"
            dir="rtl"
            aria-label="Bismillahir Rahmanir Rahim"
          >
            {event.bismillah}
          </p>
        </FadeText>
      )}
      <FadeText>
        <p className="invited-line">
          {Array.isArray(event.invitedLine)
            ? event.invitedLine.map((line, i) => (
                <span key={i} className="line-break">
                  {line}
                </span>
              ))
            : event.invitedLine}
        </p>
      </FadeText>
      <SplitTitle lines={event.title} />
      {event.tagline && (
        <FadeText>
          <p className="event-tagline">
            {event.tagline.map((line, i) => (
              <span key={i} className="line-break">
                {line}
              </span>
            ))}
          </p>
        </FadeText>
      )}
      <DetailsBox date={event.date} time={event.time} place={event.place} />
      {event.note && (
        <FadeText>
          <p className="event-note">
            {event.note.map((line, i) => (
              <span key={i} className="line-break">
                {line}
              </span>
            ))}
          </p>
        </FadeText>
      )}
    </Beat>
  );
}

export function ReadingBand({ activePage, onPageChange }: ReadingBandProps) {
  const { scrollContainerRef, prefersReducedMotion } = useScrollContext();
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);

  const byId = (id: string) =>
    invite.events.find((e) => e.id === id) as WeddingEvent;

  const walima = byId("walima");
  const haldi = byId("haldi");
  const mameru = byId("mameru");
  const barat = byId("barat");
  const nikah = byId("nikah");

  useEffect(() => {
    const scroller = scrollContainerRef.current;
    const p2 = page2Ref.current;
    const p3 = page3Ref.current;
    if (!scroller || !p2 || !p3) return;

    let p2Visible = false;
    let p3Visible = false;

    const update = () => {
      if (p3Visible) onPageChange(3);
      else if (p2Visible) onPageChange(2);
      else onPageChange(1);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === p2) p2Visible = entry.isIntersecting;
          if (entry.target === p3) p3Visible = entry.isIntersecting;
        });
        update();
      },
      {
        root: scroller,
        rootMargin: "-42% 0px -42% 0px",
        threshold: 0,
      }
    );

    observer.observe(p2);
    observer.observe(p3);
    return () => observer.disconnect();
  }, [scrollContainerRef, onPageChange]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    let resetSkewTimer: number | undefined;

    document.fonts.ready.then(async () => {
      if (cancelled || !scrollContainerRef.current) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !scrollContainerRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const scroller = scrollContainerRef.current;

      ctx = gsap.context(() => {
        // 1. Bismillah right-to-left reveal (first on load, others on scroll)
        const bismillahEls =
          scroller.querySelectorAll<HTMLElement>(".bismillah-inner");
        bismillahEls.forEach((el, idx) => {
          if (idx === 0) {
            gsap.fromTo(
              el,
              { clipPath: "inset(0 0 0 100%)" },
              {
                clipPath: "inset(0 0 0 0%)",
                duration: 1.25,
                ease: "power2.out",
                delay: 0.15,
              }
            );
          } else {
            gsap.fromTo(
              el,
              { clipPath: "inset(0 0 0 100%)" },
              {
                clipPath: "inset(0 0 0 0%)",
                duration: 1.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  scroller,
                  start: "top 78%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });

        // 2. Dividers draw from center outward
        const dividers = scroller.querySelectorAll<HTMLElement>(".divider");
        dividers.forEach((div) => {
          const leftLine = div.querySelector(".divider-line-left");
          const rightLine = div.querySelector(".divider-line-right");
          const flower = div.querySelector(".divider-flower");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: div,
              scroller,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });

          if (flower) {
            tl.fromTo(
              flower,
              { scale: 0.3, rotation: -30, transformOrigin: "center center" },
              { scale: 1, rotation: 0, duration: 0.55, ease: "back.out(1.6)" },
              0
            );
          }
          if (leftLine) {
            tl.fromTo(
              leftLine,
              { scaleX: 0, transformOrigin: "right center" },
              { scaleX: 1, duration: 0.65, ease: "power2.out" },
              0.08
            );
          }
          if (rightLine) {
            tl.fromTo(
              rightLine,
              { scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: 0.65, ease: "power2.out" },
              0.08
            );
          }
        });

        // 3. Details box border draws itself
        const rects = scroller.querySelectorAll<SVGRectElement>(
          ".details-border-rect"
        );
        rects.forEach((rect) => {
          const length = rect.getTotalLength();
          gsap.set(rect, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(rect, {
            strokeDashoffset: 0,
            duration: 0.95,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: rect.closest(".details-box"),
              scroller,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // 4. Titles split into letters that stagger in when their beat enters
        const titles = scroller.querySelectorAll<HTMLElement>(".event-title");
        titles.forEach((title) => {
          const chars = title.querySelectorAll<HTMLElement>(".title-char");
          if (!chars.length) return;

          gsap.fromTo(
            chars,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.02,
              ease: "power2.out",
              scrollTrigger: {
                trigger: title,
                scroller,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // 5. Velocity skew on titles (up to ±3deg)
        const skewTargets =
          scroller.querySelectorAll<HTMLElement>(".title-skew");
        const setSkew = gsap.quickTo(skewTargets, "skewY", {
          duration: 0.28,
          ease: "power2.out",
        });

        ScrollTrigger.create({
          scroller,
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const vel = self.getVelocity();
            const clamped = gsap.utils.clamp(-3, 3, (vel / 1800) * 3);
            setSkew(clamped);

            window.clearTimeout(resetSkewTimer);
            resetSkewTimer = window.setTimeout(() => {
              setSkew(0);
            }, 90);
          },
        });

        ScrollTrigger.refresh();
      }, scroller);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(resetSkewTimer);
      ctx?.revert();
    };
  }, [scrollContainerRef, prefersReducedMotion]);

  const maskClass =
    activePage === 2
      ? "is-page-2"
      : activePage === 3
        ? "is-page-3"
        : "";

  return (
    <div className={`reading-band-mask ${maskClass}`}>
      <div
        ref={scrollContainerRef}
        className="scroll-container"
        tabIndex={0}
        aria-label="Wedding Invitation"
      >
        <main className="reading-column">
          <div className="spacer-top" aria-hidden="true" />

          {/* PAGE 1: INTRODUCTION (fits together inside the frame box) */}
          <Beat id="page-1-intro" className="beat-intro">
            <FadeText className="bismillah-wrap">
              <p
                className="bismillah bismillah-inner"
                lang="ar"
                dir="rtl"
                aria-label="Bismillahir Rahmanir Rahim"
              >
                {invite.cover.bismillah}
              </p>
            </FadeText>
            <FadeText>
              <p className="cover-tagline">{invite.cover.line1}</p>
            </FadeText>
            <FadeText>
              <p className="body-copy intro-blessing">{invite.cover.blessing}</p>
            </FadeText>
            <FadeText isTitle className="cover-names-wrap">
              <h1 className="cover-names title-skew">{invite.cover.names}</h1>
            </FadeText>
          </Beat>

          {/* PAGE 2: DAWAT-E-WALIMA (centered inside the Persian rug velvet arch) */}
          <div ref={page2Ref} className="page-2-theme">
            <EventCard event={walima} compact />
          </div>

          {/* PAGE 3+: CREAM DAMASK TAPESTRY + BURGUNDY FLOWERS */}
          <div ref={page3Ref} className="page-3-section">
            {/* HALDI CELEBRATION */}
            <EventCard event={haldi} />

            {/* MAMERU CELEBRATION */}
            <EventCard event={mameru} />

            {/* BARAT */}
            <EventCard event={barat} />

            {/* NIKAH CEREMONY */}
            <EventCard event={nikah} />

            {/* A WEDDING CELEBRATION */}
            <Beat id="wedding-celebration" className="beat-card">
              <FadeText className="bismillah-wrap">
                <p
                  className="bismillah bismillah-inner"
                  lang="ar"
                  dir="rtl"
                  aria-label="Bismillahir Rahmanir Rahim"
                >
                  {invite.weddingCelebration.bismillah}
                </p>
              </FadeText>
              <SplitTitle lines={invite.weddingCelebration.title} />
              <FadeText isTitle className="cover-names-wrap">
                <p className="cover-names title-skew">
                  {invite.weddingCelebration.names}
                </p>
              </FadeText>
              <FadeText>
                <p className="body-copy">{invite.weddingCelebration.line}</p>
              </FadeText>
              <Divider />
            </Beat>

            {/* THANK YOU */}
            <Beat id="thank-you" className="beat-card beat-signature">
              <FadeText>
                <p className="couple-header">{invite.couple}</p>
              </FadeText>
              <SplitTitle lines={[invite.thankYou.title]} />
              <FadeText>
                <p className="event-tagline">
                  {invite.thankYou.line1.map((line, i) => (
                    <span key={i} className="line-break">
                      {line}
                    </span>
                  ))}
                </p>
              </FadeText>
              <FadeText>
                <p className="body-copy">
                  {invite.thankYou.line2.map((line, i) => (
                    <span key={i} className="line-break">
                      {line}
                    </span>
                  ))}
                </p>
              </FadeText>
              <FadeText>
                <p className="signoff">{invite.thankYou.signoff}</p>
              </FadeText>
              <FadeText>
                <p className="signature-script">{invite.thankYou.signature}</p>
              </FadeText>
            </Beat>
          </div>

          <div className="spacer-bottom" aria-hidden="true" />
        </main>
      </div>
    </div>
  );
}
