"use client"; // Add this at the very top of your file

import { ReliableImage as Image } from "@/components/ReliableImage";
import { LinkArrow } from "@/components/LinkArrow";
import { useState } from "react";
import { JoinActions } from "@/components/JoinActions";
import { GRANT_APPLICATION_URL, JOIN_FORM_URL, TREK_APPLICATION_URL } from "@/lib/links";
import { HeroBeforeAfter } from "@/components/HeroBeforeAfter";
import { SpotlightImages } from "@/components/SpotlightImages";
import { heroStories } from "@/lib/hero-stories";

export default function Home() {
  const trekImages = Array.from({ length: 8 }, (_, i) => ({
    src: `/startup_trek_2026/${i + 1}.jpg`,
    alt: `2026 Startup Trek photo ${i + 1}`,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? trekImages.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === trekImages.length - 1 ? 0 : prevIndex + 1));
  };
  return (
    <main className="w-full">
      <section className="relative z-20 w-full min-h-[30vh] md:min-h-[40vh] flex flex-col items-center justify-end px-5 pt-10 pb-4 md:pt-12 md:pb-6">
        <div className="hero-copy relative z-10 w-full text-center max-w-[460px] lg:max-w-2xl">
          <h1>
            Where student builders meet, learn, and share
          </h1>
          <p className="text-stone-700">
            Startups at Harvard is a community of students who enjoy building products that people love.
          </p>
          <JoinActions variant="hero" />
        </div>
        <SpotlightImages />
      </section>

      <HeroBeforeAfter stories={heroStories} />

      <div className="p-5 max-w-xl mx-auto">
        <div className="section">
          <h2>About</h2>
          <p>
            We are a community of students at Harvard who are passionate about mission-driven startups and tech products that will shape the future. 
            Launched Fall 2023, we hope to provide a space for all students, regardless of background, to explore entrepreneurial careers together.
          </p>
          <p className="mt-4">
            We meet every Tuesday for 1 hour to discuss various topics related to building companies. 
            Our members have gone on to found companies and join early startup teams.
          </p>
        </div>
      </div>
      <div className="p-5 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-2 section">
          <Image
            src="/about_us/discussion.jpg"
            alt="students discussing startups"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="shadow-md rounded"
          />
          <Image
            src="/about_us/trek_listening.jpg"
            alt="visiting a startup during trek"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="shadow-md rounded"
          />
          <Image
            src="/about_us/panel.jpg"
            alt="panel q&a about startups"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="shadow-md rounded"
          />
          <Image
            src="/about_us/trek.jpg"
            alt="leaving boston for startup trek"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="shadow-md rounded"
          />
        </div>
      </div>
      <section aria-labelledby="programs-heading" className="px-5 py-10 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <h2 id="programs-heading" className="text-center mb-8">What we do</h2>
        <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10">
          <article className="border-t border-stone-300 pt-4">
            <h3>Startup Series</h3>
            <p>Every other Tuesday, we explore an up-and-coming startup: its product, team, and market. We also invite founders and operators to join us for Q&amp;A.</p>
            <a href={JOIN_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-action"><span>Get event updates</span><LinkArrow /></a>
          </article>
          <article className="border-t border-stone-300 pt-4">
            <h3>10-K Reading Club</h3>
            <p>On alternating Tuesdays, we read public companies’ annual and quarterly reports, comparing businesses in the same industry and learning what drives their performance.</p>
          </article>
          <article className="border-t border-stone-300 pt-4">
            <h3>Member Grants</h3>
            <p>With support from <a href="https://xfund.com/" target="_blank" rel="noopener noreferrer" className="underline">Xfund</a>, we are piloting grants of up to $10k for early-stage, pre-revenue startups founded by members. No equity required. Applications are reviewed on a rolling basis.</p>
            <a href={GRANT_APPLICATION_URL} target="_blank" rel="noopener noreferrer" className="text-action"><span>Apply for a grant</span><LinkArrow /></a>
          </article>
          <article className="border-t border-stone-300 pt-4">
            <h3>Startup Trek</h3>
            <p>A fully funded, five-day trip to New York City in early 2027. Visit startups and VC firms, meet the people building them, and explore what you could build next. Apply by October 10. Grace period through October 12.</p>
            <a href={TREK_APPLICATION_URL} target="_blank" rel="noopener noreferrer" className="text-action"><span>Apply for Startup Trek 2027</span><LinkArrow /></a>
          </article>
        </div>
      </section>
      <div className="p-5 max-w-xl mx-auto">
        <section aria-label="Photos from the 2026 Startup Trek" className="section">
          <div className="relative mt-4">
            <div className="relative w-full h-auto">
              <Image
                src={trekImages[currentIndex].src}
                alt={trekImages[currentIndex].alt}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="shadow-md rounded"
              />
            </div>

            <button
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-gray-800/70 active:bg-gray-800 text-white w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 flex items-center justify-center rounded-full md:rounded"
              aria-label="Previous trek photo"
              onClick={handlePrev}
            >
              {"<"}
            </button>

            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-800/70 active:bg-gray-800 text-white w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 flex items-center justify-center rounded-full md:rounded"
              aria-label="Next trek photo"
              onClick={handleNext}
            >
              {">"}
            </button>
          </div>

          {/* Caption */}
          <p className="text-center font-semibold mt-4">
            Photos from the 2026 Startup Trek
          </p>

          {/* Image counter */}
          <p className="text-center mt-2">
            {currentIndex + 1} / {trekImages.length}
          </p>
        </section>
        <div className="section">
          <h2 id="join-us">Join Us</h2>
          <p>
            If you&apos;re a student interested in joining our events this semester, please fill out this{" "}
            <a href={JOIN_FORM_URL} target="_blank" rel="noopener noreferrer" className="underline">interest form</a>.
          </p>
          <p className="mt-4">
            If you&apos;re part of a startup interested in engaging with our
            group, please reach out to us at{" "}
            <a href="mailto:startupsatharvard@gmail.com" className="underline">
              startupsatharvard@gmail.com
            </a>
            .
          </p>
        </div>
        <div className="section">
          <h2>Supporters</h2>
            <p>Our supporters fund our events and connect our members to leading startups. 
              We&apos;re grateful for the generous support of, in no particular order, {" "}
              <a href="https://xfund.com/" target="_blank" className="underline">Xfund</a>,{' '}
              <a href="https://www.benchmark.com/" target="_blank" className="underline">Benchmark</a>,{' '}
              <a href="https://thrivecap.com/" target="_blank" className="underline">Thrive</a>,{' '}
              <a href="https://nebular.vc/" target="_blank" className="underline">Nebular</a>,{' '}
              <a href="https://hofcapital.com/" target="_blank" className="underline">HOF Capital</a>,{' '}
              <a href="https://neo.com/" target="_blank" className="underline">Neo</a>,{' '}
              <a href="https://felicis.com/" target="_blank" className="underline">Felicis</a>, {' '}
              <a href="https://boxgroup.com/" target="_blank" className="underline">Box Group</a>, {' '}
              <a href="https://linkventures.com/" target="_blank" className="underline">Link Ventures</a>, {' '}
              <a href="https://a16z.com/" target="_blank" className="underline">Andreessen Horowitz</a>, {' '}
               and others.
            </p>
            <p className="mt-4">
              As a 501(c)(3) nonprofit organization, your contributions are tax-deductible to the extent allowable by law. 
              We accept donations via a variety of methods, flexible to your personal or corporate tax situation. Email us at <a href="mailto:startupsatharvard@gmail.com" className="underline">startupsatharvard@gmail.com</a> to arrange a donation.
            </p>
        </div>
        {/* <div className="section">
          <h2>Board</h2>
          <div className="mt-5 grid sm:grid-cols-5 section gap-x-8 gap-y-4">
            <div>
              <Image
                src="/headshots/cynthia.jpg"
                alt="cynthia"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", marginBottom: "0.4rem" }}
                objectFit="cover"
                className="shadow-md rounded-full"
              />
              <div className="text-center">
                Cynthia C.
              </div>
            </div>
            <div>
              <Image
                src="/headshots/eric.jpg"
                alt="eric"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", marginBottom: "0.4rem" }}
                objectFit="cover"
                className="shadow-md rounded-full"
              />
              <div className="text-center">
                Eric L.
              </div>
            </div>
            <div>
              <Image
                src="/headshots/karen.jpg"
                alt="karen"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", marginBottom: "0.4rem" }}
                objectFit="cover"
                className="shadow-md rounded-full"
              />
              <div className="text-center">
                Karen L.
              </div>
            </div>
            <div>
              <Image
                src="/headshots/ron.jpg"
                alt="ron"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", marginBottom: "0.4rem" }}
                objectFit="cover"
                className="shadow-md rounded-full"
              />
              <div className="text-center">
                Ron N.
              </div>
            </div>
            <div>

            </div>
            <div>
              <Image
                src="/headshots/nim.jpg"
                alt="nim"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", marginBottom: "0.4rem" }}
                objectFit="cover"
                className="shadow-md rounded-full"
              />
              <div className="text-center">
                Nim R.
              </div>
            </div>
            <div>
              <Image
                src="/headshots/ethan.jpg"
                alt="ethan"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", marginBottom: "0.4rem" }}
                objectFit="cover"
                className="shadow-md rounded-full"
              />
              <div className="text-center">
                Ethan S.
              </div>
            </div>
            <div>
              <Image
                src="/headshots/tex.jpg"
                alt="tex"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", marginBottom: "0.4rem" }}
                objectFit="cover"
                className="shadow-md rounded-full"
              />
              <div className="text-center">
                Tex X.
              </div>
            </div>
            <div>
              <Image
                src="/headshots/eric.jpg"
                alt="derek"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", marginBottom: "0.4rem" }}
                objectFit="cover"
                className="shadow-md rounded-full"
              />
              <div className="text-center">
                Derek Z.
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}
