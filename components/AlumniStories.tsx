import Image from "next/image";
import type { FounderStory } from "@/lib/hero-stories";

export function AlumniStories({ stories }: { stories: FounderStory[] }) {
  return (
    <section aria-labelledby="alumni-heading" className="max-w-6xl mx-auto px-5 pt-20 pb-12 md:pt-28 md:pb-20">
      <header className="max-w-2xl mx-auto text-center mb-14 md:mb-20">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-4">From the trek to what&apos;s next</p>
        <h2 id="alumni-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl font-thin leading-tight mb-4">
          Where builders see new possibilities.
        </h2>
        <p className="text-stone-600 text-base md:text-lg">
          Meet former members who joined us on Startup Trek, and see what they&apos;re building today.
        </p>
      </header>

      <div className="space-y-20 md:space-y-28">
        {stories.map((story, index) => (
          <article key={story.id} id={`alumni-${story.id}`} aria-labelledby={`${story.id}-heading`} className={`alumni-story ${index % 2 ? "alumni-story-reversed" : ""}`}>
            <div className={`alumni-copy ${index % 2 ? "alumni-copy-right" : ""}`}>
              <p className="text-xs uppercase tracking-[0.16em] text-stone-500 mb-3">{story.company}</p>
              <h3 id={`${story.id}-heading`} className="font-serif text-3xl md:text-4xl italic mb-4">{story.name}</h3>
              <p className="text-stone-700 leading-relaxed">{story.description}</p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 my-6">
                {story.metrics.map((metric) => (
                  <div key={metric.label} className="max-w-[13rem]">
                    <dt className="text-sm text-stone-600">{metric.label}</dt>
                    <dd className="font-serif text-4xl mt-1 mb-2">{metric.value}</dd>
                    <dd className="text-sm leading-relaxed">
                      <a href={metric.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-stone-300 hover:decoration-current">{metric.detail}</a>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-sm text-stone-600 leading-relaxed border-l border-stone-300 pl-4 mb-5">
                {story.trek}
                {story.trekSource && <> <a href={story.trekSource} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Ron&apos;s story</a></>}
              </p>
              <a href={story.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm underline underline-offset-4">
                Visit {story.websiteLabel} <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className={`alumni-collage ${index % 2 ? "alumni-collage-left" : ""}`}>
              <figure className="alumni-team">
                <a href={story.careers} target="_blank" rel="noopener noreferrer" aria-label={`Meet the ${story.company} team`}>
                  <Image src={story.teamImage} alt={story.teamAlt} width={1400} height={1050} sizes="(max-width: 767px) 70vw, 40vw" className="w-full h-auto rounded-lg shadow-md" />
                </a>
                <figcaption className="mt-2 text-xs text-stone-500">The team today</figcaption>
              </figure>
              <figure className="alumni-portrait">
                <a href={story.portrait} target="_blank" rel="noopener noreferrer" aria-label={`View ${story.name} photo`}>
                  <Image src={story.portrait} alt={story.portraitAlt} width={400} height={400} sizes="(max-width: 767px) 25vw, 14vw" className="w-full aspect-square object-cover rounded-lg shadow-md" style={{ objectPosition: story.portraitPosition }} />
                </a>
                <figcaption className="mt-2 text-xs text-stone-500">{story.portraitCaption}</figcaption>
              </figure>
              <figure className="alumni-website">
                <a href={story.website} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${story.company} website`} className="block rounded-lg overflow-hidden shadow-lg border-[5px] border-[#faf9f7] bg-white">
                  <Image src={story.websiteImage} alt={`${story.company} website preview`} width={1280} height={720} sizes="(max-width: 767px) 65vw, 35vw" className="w-full h-auto" />
                </a>
                <figcaption className="text-right mt-2 text-xs text-stone-500">{story.websiteLabel} <span aria-hidden="true">↗</span></figcaption>
              </figure>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
