"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { FounderStory } from "@/lib/hero-stories";

type HeroBeforeAfterProps = {
  stories: FounderStory[];
  duringLabel?: string;
};

// Row height for each name; also used so active name stays centered in the viewport
const NAME_ROW_HEIGHT_REM = 5;
// Keep the moving names below the section heading.
const SCROLL_SPEED = 0.2;

// Progress curve: scroll share per story (Ron less, Grace more)
const SCROLL_SHARE_0 = 0.15; // Ron Nachum: 18%
const SCROLL_SHARE_1 = 0.35; // middle story: 27%
// Story 2 (Grace Li) gets the rest: 55%
const N_STORIES = 3;

const FIRST_END = SCROLL_SHARE_0;
const SECOND_END = SCROLL_SHARE_0 + SCROLL_SHARE_1;

function scrollProgressCurve(t: number): number {
  const raw = Math.max(0, Math.min(1, t));
  if (raw <= FIRST_END) return (raw / FIRST_END) * (1 / N_STORIES);
  if (raw <= SECOND_END) return (1 / N_STORIES) + ((raw - FIRST_END) / (SECOND_END - FIRST_END)) * (1 / N_STORIES);
  return (2 / N_STORIES) + ((raw - SECOND_END) / (1 - SECOND_END)) * (1 / N_STORIES);
}

function rawScrollForProgress(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 1 / N_STORIES) return (p / (1 / N_STORIES)) * FIRST_END;
  if (p <= 2 / N_STORIES) return FIRST_END + ((p - 1 / N_STORIES) / (1 / N_STORIES)) * (SECOND_END - FIRST_END);
  return SECOND_END + ((p - 2 / N_STORIES) / (1 / N_STORIES)) * (1 - SECOND_END);
}

export function HeroBeforeAfter({
  stories,
  duringLabel = "Then",
}: HeroBeforeAfterProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const clickScrollUntilRef = useRef<number>(0);
  const clickTargetIndexRef = useRef<number>(0);

  // Scroll-driven: update progress and active index from scroll position (RAF for smoothness)
  useEffect(() => {
    if (stories.length === 0) return;
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const scrollTravel = Math.max(1, section.offsetHeight - (stickyRef.current?.offsetHeight ?? window.innerHeight));
      const scrollY = window.scrollY;
      const raw = Math.max(0, Math.min(1, (scrollY - sectionTop) / scrollTravel));
      const progress = scrollProgressCurve(raw);
      setScrollProgress(progress);

      const now = Date.now();
      if (now < clickScrollUntilRef.current) {
        setActiveIndex(clickTargetIndexRef.current);
      } else {
        const index = Math.min(
          Math.floor(progress * stories.length),
          stories.length - 1
        );
        setActiveIndex(index);
      }
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [stories.length]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleTransition = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    const section = sectionRef.current;
    if (!section) return;

    clickTargetIndexRef.current = nextIndex;
    clickScrollUntilRef.current = Date.now() + 1200;
    setActiveIndex(nextIndex);

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollTravel = Math.max(1, section.offsetHeight - (stickyRef.current?.offsetHeight ?? window.innerHeight));
    const targetProgress = (nextIndex + 0.5) / stories.length;
    const raw = rawScrollForProgress(targetProgress);
    const targetScroll = sectionTop + raw * scrollTravel;
    window.scrollTo({ top: targetScroll, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  if (stories.length === 0) return null;

  const current = stories[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#faf9f7]"
      style={{ height: `${stories.length * 100}vh` }}
      aria-label="Founder journeys"
    >
      {/* Scroll sentinels: create height so scrolling triggers active index */}
      <div className="absolute inset-0 pointer-events-none flex flex-col" aria-hidden>
        {stories.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              sentinelRefs.current[i] = el;
            }}
            className="flex-shrink-0 w-full h-screen"
          />
        ))}
      </div>

      {/* Sticky viewport */}
      <div ref={stickyRef} className="sticky top-0 min-h-screen flex flex-col items-center justify-center px-4 py-4 md:py-16 z-10">
        <header className="text-center max-w-xl mx-auto mb-3 md:mb-10">
          <h2 id="alumni-heading">Former Members</h2>
          <p className="text-sm text-stone-600">Previous trek members, and what they’re building now.</p>
        </header>
        {/* Desktop: 3-column (during | names | now) */}
        {/* Mobile: names on top, then two images side by side */}
        <div className="w-full max-w-6xl flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 lg:gap-16 items-center md:items-start">

          {/* Mobile names: compact – just the active name + dot indicators */}
          <div className="flex md:hidden flex-col items-center order-first w-full py-2">
            <p className="font-serif text-2xl italic text-stone-900 transition-all duration-300">
              {current.name}
            </p>
            <div className="flex gap-2 mt-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleTransition(i)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i === activeIndex ? "bg-stone-800" : "bg-stone-300"
                  }`}
                  aria-label={`Go to ${stories[i].name}`}
                  aria-pressed={i === activeIndex}
                />
              ))}
            </div>
          </div>

          {/* Desktop names: scroll-driven list in center column */}
          <div className="hidden md:flex flex-col justify-center items-center py-4 order-2 w-48 lg:w-64 shrink-0">
            <div
              className="flex flex-col justify-center items-center w-full overflow-visible"
              style={{
                minHeight: `${stories.length * NAME_ROW_HEIGHT_REM}rem`,
              }}
            >
              <div
                className="flex flex-col justify-center items-center w-full"
                style={{
                  transform: `translateY(-${scrollProgress * (stories.length - 1) * SCROLL_SPEED * NAME_ROW_HEIGHT_REM}rem)`,
                }}
              >
                {stories.map((story, i) => (
                  <button
                    key={story.name + i}
                    aria-pressed={i === activeIndex}
                    type="button"
                    onClick={() => handleTransition(i)}
                    className={`
                      w-full text-center transition-opacity duration-300 flex items-center justify-center shrink-0 font-serif italic text-2xl lg:text-3xl text-stone-900 whitespace-nowrap
                      ${i === activeIndex
                        ? "font-normal"
                        : "font-normal opacity-40 hover:opacity-75"}
                    `}
                    style={{ minHeight: `${NAME_ROW_HEIGHT_REM}rem` }}
                  >
                    {story.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Images: stacked on mobile, separate grid columns on desktop */}
          <div className="flex flex-col items-center gap-2 w-4/5 md:w-full md:contents order-last">
            {/* During */}
            <div className="flex flex-col items-center text-center w-full min-w-0 md:order-1">
              <p className="text-xs md:text-lg text-stone-600 pb-1 md:pb-3">
                {duringLabel}
              </p>
              <div className="relative w-full max-w-sm md:max-w-md mx-auto aspect-[4/3] max-h-[24svh] md:max-h-none rounded-lg md:rounded-xl overflow-hidden bg-stone-200 shadow-lg shrink-0">
                {stories.map((story, i) => (
                  <div
                    key={story.name + i}
                    className="absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none"
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      pointerEvents: i === activeIndex ? "auto" : "none",
                    }}
                  >
                    <Image
                      src={story.duringImage}
                      alt={`${story.name} on the Startup Trek`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 33vw"
                    />
                  </div>
                ))}
              </div>

            </div>

            {/* Now */}
            <div className="flex flex-col items-center text-center w-full min-w-0 md:order-3">
              <p className="text-xs md:text-lg text-stone-600 pb-1 md:pb-3">
                Now
              </p>
              <div className="relative w-full max-w-md mx-auto aspect-[4/3] max-h-[24svh] md:max-h-none">
                {stories.map((story, i) => (
                  <div key={story.id} aria-hidden={i !== activeIndex}
                    className="absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none"
                    style={{ opacity: i === activeIndex ? 1 : 0, pointerEvents: i === activeIndex ? "auto" : "none" }}>
                    <div className="absolute left-0 top-0 w-[78%] h-[72%] overflow-hidden rounded-lg shadow-md">
                      <Image src={story.teamImage} alt={story.teamAlt} fill className="object-cover" sizes="(max-width: 768px) 65vw, 26vw" />
                    </div>
                    {story.id !== "grace" && <div className="absolute right-0 top-[8%] w-[29%] h-[38%] overflow-hidden rounded-lg shadow-md ring-4 ring-[#faf9f7]">
                      <Image src={story.portrait} alt={story.portraitAlt} fill className="object-cover" style={{objectPosition: story.portraitPosition}} sizes="(max-width: 768px) 25vw, 10vw" />
                    </div>}
                    <div className="absolute right-0 bottom-0 w-[67%] h-[51%] overflow-hidden rounded-lg shadow-md ring-4 ring-[#faf9f7]">
                      <Image src={story.websiteImage} alt={`${story.company} website`} fill className="object-cover object-top" sizes="(max-width: 768px) 55vw, 23vw" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 md:mt-8 max-w-2xl text-center text-xs md:text-sm leading-relaxed text-stone-600">
          <p>
            {current.trek}{" "}
            <a href={current.website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{current.company}</a>
            {current.metrics.map((metric, i) => <span key={metric.label}>
              {i === 0 ? " — " : " "}<a href={metric.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{metric.value} {metric.label}</a>
              {", "}{metric.detail.charAt(0).toLowerCase() + metric.detail.slice(1)}.
            </span>)}
          </p>
        </div>

        {/* Scroll hint (desktop only) */}
        {isDesktop && activeIndex < 2 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-400 text-sm transition-opacity duration-300">
            <p className="text-center">Scroll to see more</p>
          </div>
        )}
      </div>
    </section>
  );
}
