import Image from "next/image";

export default function Home() {
  return (
    <main className="p-5 w-full">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold my-16 text-center">
          startups @ harvard
        </h1>

        <div className="section">
          <h2>About</h2>
          <p>
            We are a community of students at Harvard who are passionate about
            startups and tech products that will shape the future. Launched Fall
            2023, we hope to provide a space for CS students to learn about
            startups together and explore entrepreneurial careers. We are funded
            by Harvard Computer Society and Women in Computer Science.
          </p>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-2 section">
          <Image
            src="/discussion.jpg"
            alt="students discussing startups"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="shadow-md rounded"
          />
          <Image
            src="/trek_listening.jpg"
            alt="visiting a startup during trek"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="shadow-md rounded"
          />
          <Image
            src="/panel.jpg"
            alt="panel q&a about startups"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="shadow-md rounded"
          />
          <Image
            src="/trek.jpg"
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
          <h2>Events</h2>
          <ul className="list-disc ml-8">
            <li>
              <b>Startup Series</b>: We host a biweekly startup discussion group; each time, we choose an up-and-coming startup
              to read about and discuss together.
              {/* Some of the companies we&apos;ve learned about include Pinecone, Glean, Notion, and Vercel. */}
            </li>
            <li>
              <b>Startup Trek</b>: We organize an annual trip for Harvard students to visit high-growth
              tech startups and ecosystems in NYC. We took 12 students to NYC in Feb 2024 for the
              first Startup Trek!
            </li>
            <li>
              <b>And more</b>: Community socials, build sessions, and startup talks.
            </li>
          </ul>
        </div>
        <div className="section">
          <h2>Join us</h2>
          <p className="mb-2">
            If you&apos;re a student interested in joining our events, please
            fill out this{" "}
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
