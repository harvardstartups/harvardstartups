export type FounderStory = {
  id: string;
  name: string;
  linkedin: string;
  company: string;
  website: string;
  websiteLabel: string;
  description: string;
  trek: string;
  trekSource?: string;
  announcement?: { label: string; url: string };
  duringImage: string;
  duringAlt?: string;
  duringCrop?: { scale: number; origin: string };
  showPortrait?: boolean;
  duringCaption: string;
  portrait: string;
  portraitAlt: string;
  portraitCaption: string;
  portraitPosition?: string;
  teamImage: string;
  teamAlt: string;
  careers: string;
  websiteImage: string;
  metrics: { value: string; label: string; detail: string; source: string; intro?: string }[];
};

// Public company / investor sources checked September 30, 2026.
// Trek participation and existing photos come from the original site.
export const heroStories: FounderStory[] = [
  {
    id: "ron",
    duringImage: "/founders/ron_2024.jpg",
    duringCaption: "On the first trek in 2024, Ron met Ali Partovi, who became Sapien’s first investor. Ron hosted the trek at Sapien in 2026.",
    name: "Ron Nachum",
    linkedin: "https://www.linkedin.com/in/ron-nachum/",
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
    linkedin: "https://www.linkedin.com/in/evatuecke/",
    company: "Altara",
    website: "https://altara.ai/",
    websiteLabel: "altara.ai",
    description: "AI for the physical sciences, helping scientists and engineers develop better products.",
    trek: "Eva met Neo on the 2024 trek and went on to cofound Altara, building AI for the physical sciences.",
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
    showPortrait: false,
    duringImage: "/founders/grace_2025.jpg",
    duringCaption: "Grace joined the 2025 trek. She now co-leads Intelligence, the company behind Design Arena.",
    name: "Grace Li",
    linkedin: "https://www.linkedin.com/in/grace-li-721a4017b/",
    company: "Intelligence / Design Arena",
    website: "https://www.designarena.ai/",
    websiteLabel: "designarena.ai",
    description: "The company behind Design Arena, now doing $60M ARR, where millions of people explore and compare what AI can create.",
    trek: "Grace joined the 2025 trek. She now co-leads",
    portrait: "/founders/grace_2026.jpg",
    portraitAlt: "Design Arena, cofounded by Grace Li",
    portraitCaption: "Grace Li",
    teamImage: "/alumni/intelligence-team.webp",
    teamAlt: "The Intelligence team gathered in their office kitchen",
    careers: "https://www.intelligence.ai/careers",
    websiteImage: "/alumni/design-arena-website.jpg",
    metrics: [
      { value: "$7.9M", intro: " which is doing $60M ARR and has now raised ", label: "seed funding", detail: "Led by Index Ventures", source: "https://techcrunch.com/2026/08/03/designarena-creators-raise-7-9-million-to-bring-taste-to-ai-models/" },
    ],
  },
  {
    id: "nim",
    name: "Nim Ravid",
    linkedin: "https://www.linkedin.com/in/nimravid/",
    company: "Sable",
    website: "https://withsable.com/",
    websiteLabel: "withsable.com",
    description: "AI employees that lead customer calls using real-time browser interaction and vision.",
    trek: "Nim joined the 2025 Startup Trek. He now leads Sable as cofounder and CEO.",
    announcement: {
      label: "Series A announcement",
      url: "https://sequoiacap.com/article/partnering-with-sable-closing-the-diffusion-gap",
    },
    duringImage: "/founders/nim_2025_v2.png",
    duringCrop: { scale: 4, origin: "27% 35%" },
    duringAlt: "Nim Ravid sharing a meal on the 2025 Startup Trek",
    duringCaption: "Nim joined the 2025 Startup Trek.",
    portrait: "/headshots/nim.jpg",
    portraitAlt: "Nim Ravid",
    portraitCaption: "Cofounder and CEO of Sable",
    showPortrait: false,
    teamImage: "/alumni/sable-team.webp",
    teamAlt: "Sable cofounders Leon Chen, Nim Ravid, Linda He and Itamar Rocha",
    careers: "https://jobs.ashbyhq.com/sable",
    websiteImage: "/alumni/sable-website.png",
    metrics: [
      { value: "$45M", label: "raised", detail: "Led by Sequoia Capital and 8VC", source: "https://www.newswire.com/news/sable-raises-45m-to-build-the-first-ai-employee-that-can-click-see-and-explain" },
    ],
  },
];
