export type FounderStory = {
  id: string;
  name: string;
  company: string;
  website: string;
  websiteLabel: string;
  description: string;
  trek: string;
  trekSource?: string;
  duringImage: string;
  duringCaption: string;
  portrait: string;
  portraitAlt: string;
  portraitCaption: string;
  portraitPosition?: string;
  teamImage: string;
  teamAlt: string;
  careers: string;
  websiteImage: string;
  metrics: { value: string; label: string; detail: string; source: string }[];
};

// Public company / investor sources checked September 30, 2026.
// Trek participation and existing photos come from the original site.
export const heroStories: FounderStory[] = [
  {
    id: "ron",
    duringImage: "/founders/ron_2024.jpg",
    duringCaption: "On the first trek in 2024, Ron met Ali Partovi, who became Sapien’s first investor. Ron hosted the trek at Sapien in 2026.",
    name: "Ron Nachum",
    company: "Sapien",
    website: "https://sapien.ai/",
    websiteLabel: "sapien.ai",
    description: "AI for finance and operations, helping companies understand what drives their performance.",
    trek: "Ron met Ali Partovi at a dinner on the first trek in 2024. Ali became Sapien’s first investor. In 2026, Ron welcomed the trek to Sapien’s own office.",
    trekSource: "https://www.linkedin.com/posts/ron-nachum_a-single-dinner-and-even-just-a-single-google-activity-7421971423528902656-gQQo",
    portrait: "/founders/ron_2026.jpg",
    portraitAlt: "Ron hosting the 2026 Startup Trek at Sapien",
    portraitCaption: "Hosting the 2026 trek",
    portraitPosition: "25% center",
    teamImage: "/alumni/sapien-team.webp",
    teamAlt: "The Sapien team in their Flatiron office",
    careers: "https://sapien.ai/careers",
    websiteImage: "/alumni/sapien-website-2026.jpg",
    metrics: [
      { value: "$15M+", label: "raised", detail: "Including a General Catalyst-led seed", source: "https://sapien.ai/careers" },
      { value: "$180M", label: "valuation", detail: "September 2026 round led by Neo", source: "https://fortune.com/2026/09/08/exclusive-ai-startup-sapien-raises-180m-valuation-companies-find-really-driving-profit-cfo/" },
    ],
  },
  {
    id: "eva",
    duringImage: "/founders/eva_2024.jpg",
    duringCaption: "Eva met Neo on the 2024 trek. Neo went on to participate in Altara’s seed round.",
    name: "Eva Tuecke",
    company: "Altara",
    website: "https://altara.ai/",
    websiteLabel: "altara.ai",
    description: "AI for the physical sciences, helping scientists and engineers develop better products.",
    trek: "Eva met Neo on the 2024 trek. Neo went on to participate in Altara’s seed round alongside lead investor Greylock.",
    portrait: "/founders/eva_2026.jpg",
    portraitAlt: "Eva and fellow founders at a dinner with Neo",
    portraitCaption: "At dinner with Neo",
    teamImage: "/alumni/altara-team.avif",
    teamAlt: "The Altara team gathered on their office couch",
    careers: "https://altara.ai/careers",
    websiteImage: "/alumni/altara-website.jpg",
    metrics: [
      { value: "$7M", label: "seed funding", detail: "Led by Greylock, with Neo participating", source: "https://greylock.com/blog/introducing-altara-ai-for-the-physical-sciences/" },
    ],
  },
  {
    id: "grace",
    duringImage: "/founders/grace_2025.jpg",
    duringCaption: "Grace joined the 2025 trek. She now co-leads Intelligence, the company behind Design Arena.",
    name: "Grace Li",
    company: "Intelligence / Design Arena",
    website: "https://www.designarena.ai/",
    websiteLabel: "designarena.ai",
    description: "The company behind Design Arena, where millions of people explore and compare what AI can create.",
    trek: "Grace joined the 2025 trek. She now co-leads Intelligence, building Design Arena and new ways to evaluate AI in the real world.",
    portrait: "/founders/grace_2026.jpg",
    portraitAlt: "Design Arena, cofounded by Grace Li",
    portraitCaption: "Grace Li",
    teamImage: "/alumni/intelligence-team.webp",
    teamAlt: "The Intelligence team gathered in their office kitchen",
    careers: "https://www.intelligence.ai/careers",
    websiteImage: "/alumni/design-arena-website.jpg",
    metrics: [
      { value: "$7.9M", label: "seed funding", detail: "Led by Index Ventures", source: "https://techcrunch.com/2026/08/03/designarena-creators-raise-7-9-million-to-bring-taste-to-ai-models/" },
    ],
  },
];
