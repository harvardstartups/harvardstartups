"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type FounderStory = {
  companyName: string;
  duringImage: string;
  nowImage: string;
  duringCaption: string;
  nowCaption: string;
};

type HeroBeforeAfterProps = {
  stories: FounderStory[];
  duringLabel?: string;
};

// Row height for each name; also used so active name stays centered in the viewport
const NAME_ROW_HEIGHT_REM = 5;
// How much the list moves per unit scroll ( > 1 = faster )
const SCROLL_SPEED = 1.35;

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
  const sectionRef = useRef<HTMLElement>(null);
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
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const raw = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
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
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [stories.length]);

  const handleTransition = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    const section = sectionRef.current;
    if (!section) return;

    clickTargetIndexRef.current = nextIndex;
    clickScrollUntilRef.current = Date.now() + 1200;
    setActiveIndex(nextIndex);

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = section.offsetHeight;
    const targetProgress = (nextIndex + 0.5) / stories.length;
    const raw = rawScrollForProgress(targetProgress);
    const targetScroll = sectionTop + raw * sectionHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
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
      <div className="sticky top-0 min-h-screen flex items-start pt-12 md:items-center justify-center px-4 py-8 md:py-16 z-10 relative">
        {/* Desktop: 3-column (during | names | now) */}
        {/* Mobile: names on top, then two images side by side */}
        <div className="w-full max-w-6xl flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-16 lg:gap-20 items-center md:items-start">

          {/* Mobile names: compact – just the active name + dot indicators */}
          <div className="flex md:hidden flex-col items-center order-first w-full py-2">
            <p className="font-serif text-2xl font-semibold text-stone-900 transition-all duration-300">
              {current.companyName}
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
                  aria-label={`Go to ${stories[i].companyName}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop names: scroll-driven list in center column */}
          <div className="hidden md:flex flex-col justify-center items-center py-4 order-2 w-64 shrink-0">
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
                    key={story.companyName + i}
                    type="button"
                    onClick={() => handleTransition(i)}
                    className={`
                      w-full text-center transition-opacity duration-300 flex items-center justify-center shrink-0 font-serif text-3xl lg:text-4xl text-stone-900 whitespace-nowrap
                      ${i === activeIndex
                        ? "font-semibold"
                        : "font-normal text-stone-500 hover:text-stone-700"}
                    `}
                    style={{ minHeight: `${NAME_ROW_HEIGHT_REM}rem` }}
                  >
                    {story.companyName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Images: stacked on mobile, separate grid columns on desktop */}
          <div className="flex flex-col items-center gap-3 md:contents order-last">
            {/* During */}
            <div className="flex flex-col items-center text-center w-full min-w-0 md:order-1">
              <p className="text-sm md:text-lg text-stone-600 pb-2 md:pb-3">
                {duringLabel}
              </p>
              <div className="relative w-full max-w-sm md:max-w-md mx-auto aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden bg-stone-200 shadow-lg shrink-0">
                {stories.map((story, i) => (
                  <div
                    key={story.companyName + i}
                    className="absolute inset-0 transition-opacity duration-500 ease-out"
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      pointerEvents: i === activeIndex ? "auto" : "none",
                    }}
                  >
                    <Image
                      src={story.duringImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 33vw"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-1 md:mt-3 min-h-[1.5rem] md:min-h-[3.5rem] w-full max-w-sm md:max-w-md mx-auto flex items-start justify-center">
                <p className="text-xs md:text-sm text-stone-600 line-clamp-2">
                  {current.duringCaption}
                </p>
              </div>
            </div>

            {/* Now */}
            <div className="flex flex-col items-center text-center w-full min-w-0 md:order-3">
              <p className="text-sm md:text-lg text-stone-600 pb-2 md:pb-3">
                Now
              </p>
              <div className="relative w-full max-w-sm md:max-w-md mx-auto aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden bg-stone-200 shadow-lg shrink-0">
                {stories.map((story, i) => (
                  <div
                    key={story.companyName + "-now-" + i}
                    className="absolute inset-0 transition-opacity duration-500 ease-out"
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      pointerEvents: i === activeIndex ? "auto" : "none",
                    }}
                  >
                    <Image
                      src={story.nowImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 33vw"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-1 md:mt-3 min-h-[1.5rem] md:min-h-[3.5rem] w-full max-w-sm md:max-w-md mx-auto flex items-start justify-center">
                <p className="text-xs md:text-sm text-stone-600 line-clamp-2">
                  {current.nowCaption}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        {activeIndex < 2 && (
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-stone-400 text-xs md:text-sm transition-opacity duration-300">
            Scroll to see more
          </div>
        )}
      </div>
    </section>
  );
}
