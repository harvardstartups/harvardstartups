"use client"; // Add this at the very top of your file

import Image from "next/image";
import { useState } from "react";

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
    <main className="p-5 w-full">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold my-16 text-center">
          startups @ harvard
        </h1>

        <div className="section">
          <h2>About</h2>
          <p>
            We are a community of students at Harvard who are passionate about mission-driven startups and tech products that will shape the future. Launched Fall 2023, we hope to provide a space for all students, regardless of background, to explore entrepreneurial careers together.
          </p>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
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
      <div className="max-w-xl mx-auto">
        <div className="section">
          <h2>Startup Series</h2>
          <p>
            We host a biweekly startup discussion group; each discussion, we choose an up-and-coming startup to read about and discuss together. Typically, we also invite a guest speaker from the company to join us for Q&A. Applications for the Fall 2024 semester have closed, but please email us at <a href="mailto:startupsatharvard@gmail.com" className="underline">startupsatharvard@gmail.com</a> if you would still like to join.
            {/* Some of the companies we&apos;ve learned about include Pinecone, Glean, Notion, and Vercel. */}
          </p>
        </div>
        <div className="section">
          <h2>Startup Trek</h2>
          <p>
            We organize an annual trip for Harvard students to visit high-growth tech startups and ecosystems.
            We took 12 students to NYC in Feb 2024 for the first Startup Trek! Applications for the Spring 2025 Trek have closed, but please fill out our <a href="https://forms.gle/PWyX5wE6bjxaHaiW9" target="_blank" className="underline">interest form</a> to be notified for future treks.
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

            {/* Left arrow */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded"
              onClick={handlePrev}
            >
              {"<"}
            </button>

            {/* Right arrow */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded"
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
            If you&apos;re a student interested in joining our events, please
            fill out the relevant applications above. If you&apos;d like to be notified of future events, please fill out this {" "}
            <a
              href="https://forms.gle/PWyX5wE6bjxaHaiW9"
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
