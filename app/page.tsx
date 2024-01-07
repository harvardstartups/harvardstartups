import Image from "next/image";

export default function Home() {
  return (
    <main className="m-2 w-full">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold my-16 text-center">
          startups @ harvard
        </h1>

        <div className="section">
          <h2>About us</h2>
          <p>
            startups @ harvard is a community of students who are passionate
            about startups and the products that will shape the future. We
            launched in Fall 2023 to bridge the gap between joining big tech or
            quant and dropping out to start your own company. We are funded by
            Harvard Computer Society and Women in Computer Science.
          </p>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        <div className="grid grid-cols-2 gap-2 section">
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
            src="/panel.jpg"
            alt="students discussing startups"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="shadow-md rounded"
          />
        </div>
      </div>
      <div className="max-w-lg mx-auto">
        <div className="section">
          <h2>Events</h2>
          <ul className="list-disc ml-8">
            <li>
              Discussion: we host bi-weekly discussions where we read and
              discuss up-and-coming startups. Some of the companies we&apos;ve
              learned about include Pinecone, Glean, Notion, and Vercel.
            </li>
            <li>
              Startup Trek: we will be visiting NYC in February 2024 to visit
              high-growth startups.
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
          </p>
          <p>
            If you&apos;re part of a startup interested in engaging with our
            group, please reach out to us at{" "}
            <a href="mailto:startupsatharvard@gmail.com" className="underline">
              startupsatharvard@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
