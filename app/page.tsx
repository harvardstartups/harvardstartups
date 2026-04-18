"use client"; // Add this at the very top of your file

import Image from "next/image";
import { useState } from "react";
import { HeroBeforeAfter } from "@/components/HeroBeforeAfter";
import { SpotlightImages } from "@/components/SpotlightImages";
import { heroStories } from "@/lib/hero-stories";

export default function Home() {
  const trekImages = Array.from({ length: 18 }, (_, i) => ({
    src: `/startup_trek/${i + 1}.jpg`,
    alt: `Startup Trek Image ${i + 1}`,
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
      <section className="relative z-20 w-full min-h-[30vh] md:min-h-[40vh] flex items-end justify-center px-5 pt-10 pb-4 md:pt-12 md:pb-6">
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-thin">
            Where student builders meet, learn, and share
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-700 mt-3 md:mt-4">
            Startups at Harvard is a community of students who enjoy building products that people love.
          </p>
        </div>
        <div className="hidden lg:block">
          <SpotlightImages />
        </div>
      </section>

      <HeroBeforeAfter stories={heroStories} />

      <div className="p-5 max-w-xl mx-auto">
        <div className="section">
          <h2>About</h2>
          <p>
            We are a community of students at Harvard who are passionate about mission-driven startups and tech products that will shape the future. 
            Launched Fall 2023, we hope to provide a space for all students, regardless of background, to explore entrepreneurial careers together.
            <br />
            <br />
            We meet every Tuesday for 1 hour to discuss various topics related to building companies. 
            Former student members have founded startups with an aggregate valuation of over $X00m.
          </p>
        </div>
      </div>
      <div className="p-5 max-w-xl mx-auto">
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
      <div className="p-5 max-w-xl mx-auto">
        <div className="section">
          <h2>Startup Series</h2>
          <p>
            Every other Tuesday, we choose an up-and-coming startup to read about and discuss together. We focus on product, team construction, and market opportunity. Typically, we also invite a guest speaker from the company to join us for Q&A. 
            {/* Some of the startups we&apos;ve learned about include Suno, Glean, Pinecone, Notion, and Vercel. */}
          </p>
        </div>
        <div className="section">
          <h2>10-K Reading Club (New!)</h2>
          <p>
            On other Tuesdays, we dive deep into the annual reports (10-K/10-Q SEC filings) of publicly-traded companies. We compare companies within the same industry, focusing on financial performance. 
          </p>
        </div>
        <div className="section">
          <h2>Member Grants (New!)</h2>
          <p>
          We are piloting a non-dilutive funding program to support early-stage, pre-revenue startups formed by our members, made possible by our supporters at <a href="https://xfund.com/" target="_blank" className="underline">Xfund</a>.
          Selected companies may receive up to $10k in funding to support early experimentation and company formation. 
          Funds are provided without expectation of equity and may be used at the company&apos;s discretion.
          </p>
          <ul>
            <li>hardware expenses (e.g. CNC mills, 3D printers)</li>
            <li>model costs (e.g. API token credits, GPU credits)</li>
            <li>legal costs (e.g. C Corp formation, TOS agreements)</li>
            <li>advertising (e.g. Google Ads)</li>
          </ul>
          <p>
            Apply for a grant <a href="https://forms.gle/fotq1aWRD9hbEK7B7" target="_blank" className="underline">here</a>. Applications will be read on a rolling basis.          
          </p>
        </div>
        <div className="section">
          <h2>Startup Trek</h2>
          <p>
            Before second semester every year, we organize an annual trip for Harvard students to visit high-growth tech startups and ecosystems. 
            Several past participants have joined startups we&apos;ve visited postgrad.
            Applications for the Spring 2026 Trek have closed.
          </p>
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
              onClick={handlePrev}
            >
              {"<"}
            </button>

            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-800/70 active:bg-gray-800 text-white w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 flex items-center justify-center rounded-full md:rounded"
              onClick={handleNext}
            >
              {">"}
            </button>
          </div>

          {/* Caption */}
          <p className="text-center font-semibold mt-4">
            Photos from the 2024 Startup Trek in NYC
          </p>

          {/* Image counter */}
          <p className="text-center mt-2">
            {currentIndex + 1} / {trekImages.length}
          </p>
        </div>
        {/* <div className="section">
          <h2>And more</h2>
          <p>
            Community socials, build sessions, and startup talks.
          </p>
        </div> */}
        <div className="section">
          <h2>Join us</h2>
          <p className="mb-2">
            If you&apos;re a student interested in joining our events this semester, please fill out this {" "}
            <a
              href="https://forms.gle/QaEMsb7BAGcBN81y7"
              target="_blank"
              className="underline"
            >
              interest form
            </a>
            .
          </p>
          <p>
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
            <br />
            <p>
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
