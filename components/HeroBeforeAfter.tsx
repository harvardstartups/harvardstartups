"use client";

import { ReliableImage as Image } from "@/components/ReliableImage";
import { useEffect, useRef, useState } from "react";

import type { FounderStory } from "@/lib/hero-stories";

type HeroBeforeAfterProps = {
  stories: FounderStory[];
  duringLabel?: string;
};

// Keep navigation stationary while the photos and captions crossfade.
const NAME_ROW_HEIGHT_REM = 4;

export function HeroBeforeAfter({
  stories,
  duringLabel = "Then",
}: HeroBeforeAfterProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedPhoto, setExpandedPhoto] = useState<{src: string; alt: string} | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!expandedPhoto || !dialog) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, [expandedPhoto]);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const clickScrollUntilRef = useRef<number>(0);
  const clickTargetIndexRef = useRef<number>(0);

  // Derive the active story from a stable scroll range (RAF for smoothness).
  useEffect(() => {
    if (stories.length === 0) return;
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const scrollTravel = Math.max(1, section.offsetHeight - (stickyRef.current?.offsetHeight ?? window.innerHeight));
      const scrollY = window.scrollY;
      const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / scrollTravel));

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
    const targetScroll = sectionTop + targetProgress * scrollTravel;
    window.scrollTo({ top: targetScroll, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  if (stories.length === 0) return null;

  const current = stories[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#faf9f7]"
      style={{ height: `${stories.length * 100}svh` }}
      aria-label="Founder journeys"
    >
      {/* Sticky viewport */}
      <div ref={stickyRef} className="sticky top-0 min-h-[100svh] flex flex-col items-center justify-center px-4 py-4 md:py-12 z-10">
        {/* Desktop: 3-column (during | names | now) */}
        {/* Mobile: names on top, then stacked images */}
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
                  className={`w-11 h-11 flex items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#951929] ${
                    i === activeIndex ? "text-stone-800" : "text-stone-300"
                  }`}
                  aria-label={`Go to ${stories[i].name}`}
                  aria-pressed={i === activeIndex}
                ><span aria-hidden className="w-2 h-2 rounded-full bg-current" /></button>
              ))}
            </div>
          </div>

          {/* Desktop names: stable navigation in the center column */}
          <div className="hidden md:flex flex-col justify-center items-center py-4 order-2 w-48 lg:w-64 shrink-0">
            <div
              className="flex flex-col justify-center items-center w-full overflow-visible"
              style={{
                minHeight: `${stories.length * NAME_ROW_HEIGHT_REM}rem`,
              }}
            >
              <div
                className="flex flex-col justify-center items-center w-full"
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
                      alt={story.duringAlt ?? `${story.name} on the Startup Trek`}
                      style={story.duringCrop ? { transform: `scale(${story.duringCrop.scale})`, transformOrigin: story.duringCrop.origin } : undefined}
                      fill
                      className="object-cover"
                      sizes={story.duringCrop ? "(max-width: 768px) 240vw, 90vw" : "(max-width: 768px) 90vw, 33vw"}
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
                    <button type="button" tabIndex={i === activeIndex ? 0 : -1} aria-label={`Enlarge ${story.teamAlt}`} onClick={() => setExpandedPhoto({src: story.teamImage, alt: story.teamAlt})} className="absolute left-0 top-0 w-[78%] h-[72%] overflow-hidden rounded-lg shadow-md">
                      <Image src={story.teamImage} alt={story.teamAlt} fill className="object-cover" sizes="(max-width: 768px) 65vw, 26vw" />
                    </button>
                    {story.showPortrait !== false && <button type="button" tabIndex={i === activeIndex ? 0 : -1} aria-label={`Enlarge ${story.portraitAlt}`} onClick={() => setExpandedPhoto({src: story.portrait, alt: story.portraitAlt})} className="absolute right-0 top-[8%] w-[29%] h-[38%] overflow-hidden rounded-lg shadow-md ring-4 ring-[#faf9f7]">
                      <Image src={story.portrait} alt={story.portraitAlt} fill className="object-cover" style={{objectPosition: story.portraitPosition}} sizes="(max-width: 768px) 25vw, 10vw" />
                    </button>}
                    <button type="button" tabIndex={i === activeIndex ? 0 : -1} aria-label={`Enlarge ${`${story.company} website`}`} onClick={() => setExpandedPhoto({src: story.websiteImage, alt: `${story.company} website`})} className="absolute right-0 bottom-0 w-[67%] h-[51%] overflow-hidden rounded-lg shadow-md ring-4 ring-[#faf9f7]">
                      <Image src={story.websiteImage} alt={`${story.company} website`} fill className="object-cover object-top" sizes="(max-width: 768px) 55vw, 23vw" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All captions share a grid cell, reserving the tallest caption's height.
            Switching stories cannot resize the sticky panel or its scroll travel. */}
        <div className="mt-5 md:mt-8 grid w-full max-w-2xl text-center text-sm leading-relaxed text-stone-600">
          {stories.map((story, index) => (
            <p key={story.id} aria-hidden={index !== activeIndex}
              className={`col-start-1 row-start-1 transition-opacity duration-500 motion-reduce:transition-none ${index === activeIndex ? "opacity-100" : "invisible opacity-0 pointer-events-none"}`}>
              {story.trek}{" "}
              <a href={story.website} target="_blank" rel="noopener noreferrer" tabIndex={index === activeIndex ? 0 : -1} className="underline underline-offset-2">{story.company}</a>
              {story.metrics.length === 0 ? "." : story.metrics.map((metric, i) => <span key={metric.label}>
                {metric.label === "valuation" ? " It reached a " : i === 0 ? " has now raised " : " It has now raised "}<a href={metric.source} target="_blank" rel="noopener noreferrer" tabIndex={index === activeIndex ? 0 : -1} className="underline underline-offset-2">{metric.value}{metric.label === "seed funding" ? " seed funding" : metric.label === "valuation" ? " valuation" : ""}</a>
                {metric.label === "valuation" ? " in a " : ", "}{metric.detail.replace(/^(Led|Including)/, word => word.toLowerCase())}.
              </span>)}
              {story.announcement && <> {" "}<a href={story.announcement.url} target="_blank" rel="noopener noreferrer" tabIndex={index === activeIndex ? 0 : -1} className="underline underline-offset-2">{story.announcement.label} ↗</a></>}
            </p>
          ))}
        </div>

        <div aria-hidden className={`hidden md:block mt-8 text-stone-400 text-sm transition-opacity duration-300 motion-reduce:transition-none ${activeIndex < stories.length - 1 ? "opacity-100" : "opacity-0"}`}>
          <p className="text-center">Scroll to see more</p>
        </div>
      </div>
      <dialog ref={dialogRef} aria-label={expandedPhoto?.alt || "Expanded photo"}
        onCancel={() => setExpandedPhoto(null)} onClose={() => setExpandedPhoto(null)}
        onClick={event => { if (event.target === event.currentTarget) setExpandedPhoto(null); }}
        className="w-[94vw] max-w-5xl rounded-xl bg-[#faf9f7] p-4 backdrop:bg-black/70">
        {expandedPhoto && <>
          <div className="flex items-center justify-between gap-4 mb-3">
            <p className="text-sm text-stone-700">{expandedPhoto.alt}</p>
            <button autoFocus type="button" onClick={() => setExpandedPhoto(null)} className="min-h-11 px-4 rounded border border-stone-300">Close</button>
          </div>
          <div className="relative h-[70svh]"><Image src={expandedPhoto.src} alt={expandedPhoto.alt} fill sizes="90vw" className="object-contain" /></div>
        </>}
      </dialog>
    </section>
  );
}
