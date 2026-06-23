export interface Metric {
  v: string;
  k: string;
}

export interface Outcome {
  v: string;
  k: string;
}

export interface Project {
  id: string;
  n: string;
  cat: string;
  name: string;
  year: string;
  role: string;
  stack: string[];
  desc: string;
  tagline: string;
  problem: string;
  approach: string;
  outcomes: Outcome[];
  highlights: string[];
  url: string;
  images?: {
    logo?: string;
    hero?: string;
    detail?: string[];
  };
}

export interface ExperienceItem {
  role: string;
  co: string;
  loc: string;
  dates: string;
  bullets: string[];
  productUrl?: string;
}

export interface Post {
  d: string;
  t: string;
  read: string;
}

export const portfolio = {
  name: 'Abdulsamad',
  fullName: 'Abdulsamad Ajao',
  role: 'Senior Frontend Engineer',
  location: 'Remote · Worldwide',
  email: 'ajaoabdulsamad2000@gmail.com',
  phone: '+234 706 869 2728',
  socials: {
    github: 'https://github.com/ajaoseyi',
    linkedin: 'https://linkedin.com/in/abdulsamad-ajao-9279a11b8',
    twitter: 'https://x.com/Abdulsamad_O',
    devto: 'https://dev.to/ajaoseyi',
  },
  resume: '/Abdulsamad_Ajao_Resume.pdf',
  available: 'Available · Full-time & Freelance',
  bio: 'Frontend engineer building performant, accessible interfaces for fintech, food-tech, and Web3 platforms. Five years shipping production React across two continents.',

  metrics: [
    { v: '40%', k: 'avg perf uplift' },
    { v: '99.8%', k: 'payment success' },
    { v: '90+', k: 'Lighthouse score' },
    { v: '80%', k: 'test coverage' },
  ] satisfies Metric[],

  stack: [
    'React', 'TypeScript', 'Next.js', 'React Native',
    'TailwindCSS', 'Socket.IO', 'Ethers.js', 'GraphQL', 'Node.js', 'Jest', 'WordPress',
  ],

  projects: [
    {
      id: 'soundturf',
      n: '01',
      cat: 'Music / Entertainment',
      name: 'Soundturf',
      year: '2023',
      role: 'Frontend Engineer',
      stack: ['React', 'TypeScript', 'Socket.IO', 'REST API', 'Geolocation API'],
      desc: 'Interactive party experience where the crowd is in control of the music. Real-time song voting, geolocation-based venue detection, and smart search algorithms keep the dance floor moving.',
      tagline: 'The crowd controls the playlist — live, every song.',
      problem: 'At parties and events, the DJ or a single host always controlled the music — leaving the crowd no voice. Finding a venue or discovering what was playing nearby was impossible without being physically inside.',
      approach: 'Built a real-time voting and queue system on Socket.IO so every attendee can influence what plays next. Geolocation ties users to their venue automatically, and search algorithms surface songs by popularity, tempo, and crowd preference without manual curation.',
      outcomes: [
        { v: 'Real-time', k: 'crowd song voting' },
        { v: '<100ms', k: 'socket event latency' },
        { v: 'Live', k: 'geolocation venue detection' },
        { v: 'Zero', k: 'manual DJ interventions needed' },
      ],
      highlights: [
        'Implemented real-time song voting and queue management using Socket.IO with optimistic UI updates.',
        'Built geolocation features for automatic venue detection and proximity-based event discovery.',
        'Designed search algorithms that surface songs by crowd votes, tempo, and listening patterns.',
      ],
      url: 'sound-turf.com',
      images: {
        hero: '/images/soundturf-hero.jpg',
        logo: '/images/soundturf-logo.svg',
        detail: [
          '/images/soundturf-detail-1.jpg',
          '/images/soundturf-detail-2.jpg',
        ],
      },
    },
      {
      id: 'refine',
      n: '05',
      cat: 'AI / Productivity Tools',
      name: 'Refine',
      year: '2026',
      role: 'Full-Stack Engineer · Solo Build',
      stack: ['React', 'TypeScript', 'Vite', 'TipTap', 'Node.js', 'Express', 'LangChain', 'Socket.IO', 'Groq (Llama 3)', 'Google Docs API'],
      desc: 'An AI-powered writing assistant that merges grammar and style correction with self-hosted SEO auditing and readability scoring, so writers can polish prose and optimize it for search without juggling separate tools.',
      tagline: 'Write, polish, and rank — without leaving the editor.',
      problem: 'Writers had to bounce between a grammar checker, a separate SEO auditing tool, and Google Docs to ship a piece that was both well-written and search-ready — every round trip risked edits falling out of sync between the source doc and whatever tool was open.',
      approach: 'I built the editor in TipTap and wired it to a Node/Express backend where LangChain orchestrates a Groq-hosted Llama 3 model for grammar, sentence-structure, and keyword/heading analysis, alongside a self-hosted Flesch/Fog readability scorer. A Socket.IO layer keeps the editor and the Google Docs API in sync bidirectionally, so edits made in either surface update the other in real time.',
      outcomes: [
        { v: 'Single pass', k: 'grammar + SEO + readability' },
        { v: 'Real-time', k: 'bidirectional Google Docs sync' },
        { v: 'Llama 3', k: 'Groq-accelerated inference' },
        { v: 'Zero', k: 'tool-switching to ship a draft' },
      ],
      highlights: [
        'Built a LangChain-orchestrated backend that runs grammar, sentence-structure, and keyword-density analysis through a Groq-hosted Llama 3 model.',
        'Implemented a self-hosted SEO and readability auditor — keyword density, heading hierarchy, and Flesch/Fog scoring — without relying on third-party SEO APIs.',
        'Wired a Socket.IO-driven bidirectional sync with the Google Docs API so edits in the TipTap editor or the source doc never fall out of sync.',
      ],
      url: 'my-writing-assistant-production.up.railway.app',
      images: {
        hero: '/images/refine-mockup-one.png',
        detail: [
          '/images/refine-mockup-two.png',
          '/images/refine-mockup-three.png',
          '/images/refine-mockup-four.png',
          '/images/refine-mockup-five.png',
        ],
      },
    },
    {
      id: 'lingo',
      n: '02',
      cat: 'Design Tools',
      name: 'Lingo',
      year: '2023',
      role: 'Maker · Open source',
      stack: ['Preact', 'TailwindCSS', 'Node.js', 'Docker', 'VPS'],
      desc: 'Lingo is an open-source design tool that helps designers and developers efficiently create and manage multiple language versions of their products. Lingo integrates directly into the Figma workflow, allowing designers to translate text elements without leaving their design environment.',
      tagline: 'Translate your designs without leaving Figma.',
      problem: 'Localising a Figma file for a new market meant manually duplicating frames and replacing every text layer — a process that broke as soon as copy changed, and kept design and translation teams permanently out of sync.',
      approach: 'Built a Figma plugin in Preact that surfaces a translation panel inline, hooks into the Figma Plugin API to read and write text nodes, and sends strings through a Node.js translation service on VPS. Docker keeps the translation model portable across environments.',
      outcomes: [
        { v: '8.4K', k: 'plugin installs' },
        { v: '320', k: 'GitHub stars' },
        { v: 'Zero', k: 'context switching for designers' },
        { v: '23', k: 'open-source contributors' },
      ],
      highlights: [
        'Built the Figma plugin in Preact with a translation panel that reads and writes text nodes without leaving Figma.',
        'Shipped a Node.js translation service containerised with Docker and deployed on VPS for language model inference.',
        'Maintained an open-source repo with 23 contributors and 320 GitHub stars.',
      ],
      url: 'figma.com/community/plugin/ajao',
      images: {
        hero: '/images/lingo-hero.png',
        logo: '/images/lingo-logo.png',
      },
    },
    {
      id: 'buybox',
      n: '03',
      cat: 'Tech Marketplace',
      name: 'Buybox',
      year: '2024',
      role: 'Mobile Engineer · Vendor Dashboard Lead',
      stack: ['Next.js', 'React Native', 'React', 'REST APIs', 'Payment Gateway', 'TypeScript', 'TailwindCSS', 'SSR'],
      desc: 'A better way to buy, request, repair & upgrade your tech. BuyBox brings trusted vendors for new and renewed electronics into one app — discover devices, send custom requests, book a repair, or trade-in, with same-day delivery on eligible products.',
      tagline: 'One app for every stage of your device lifecycle.',
      problem: 'Consumers had no reliable way to discover certified vendors, request custom device orders, book repairs, or manage trade-ins without juggling three separate platforms. Vendor onboarding was manual and slow.',
      approach: 'I led development of the cross-platform mobile app in React Native, giving users a unified flow for browsing, requesting, and booking — then built the vendor dashboard in React so vendors could manage listings, repair slots, and same-day delivery queues from a single interface.',
      outcomes: [
        { v: '500+', k: 'verified vendors onboarded' },
        { v: '< 3 min', k: 'average request-to-quote' },
        { v: '4.8★', k: 'app store rating' },
        { v: '60%', k: 'repeat order rate' },
      ],
      highlights: [
        'Built the React Native mobile app from scratch — browsing, custom requests, repair booking, and trade-in flows.',
        'Designed and shipped a vendor dashboard for real-time order, inventory, and repair slot management.',
        'Integrated same-day delivery scheduling with live order-tracking UI.',
      ],
      url: 'buybox.ng',
      images: {
        hero: '/images/buybox-mockup.jpeg',
        logo: '/images/buybox-logo.png',
      },    },
    {
      id: 'void',
      n: '04',
      cat: 'Media Agency',
      name: 'The Void',
      year: '2025',
      role: 'Frontend Engineer · SEO Lead',
      stack: ['Next.js', 'CSS', 'HLS / DASH', 'Vercel', 'WordPress'],
      desc: 'SEO-optimised landing page for Void Media Group — a creative media agency. Built to establish their digital footprint with adaptive video, pixel-perfect styling, and a 90+ Lighthouse score across all categories.',
      tagline: 'A digital footprint built to be found — and felt.',
      problem: 'Void Media Group had no web presence to match their creative reputation. They needed a landing page that communicated their identity instantly, ranked well on search engines from day one, and loaded fast enough not to lose the visitors it earned.',
      approach: 'I built the site in Next.js for SSR-first SEO, structured every page with semantic HTML and schema markup so search engines could parse intent immediately. The hero video uses HLS/DASH-based adaptive bitrate streaming — the browser negotiates the best quality for the available bandwidth, keeping the experience cinematic on any connection. All styling was hand-crafted in CSS with no UI framework overhead, which contributed directly to sub-second LCP and a clean 90+ across all four Lighthouse categories.',
      outcomes: [
        { v: '90+', k: 'Lighthouse score all categories' },
        { v: 'Sub-1s', k: 'Largest Contentful Paint' },
        { v: 'ABR', k: 'adaptive video via HLS/DASH' },
        { v: 'SSR', k: 'search-indexed from first crawl' },
      ],
      highlights: [
        'Achieved 90+ Lighthouse scores across Performance, Accessibility, Best Practices, and SEO with zero third-party UI frameworks.',
        'Implemented adaptive bitrate video streaming (HLS/DASH) so the hero reel plays at the highest quality the viewer\'s bandwidth supports.',
        'Structured the entire site with semantic HTML and JSON-LD schema to ensure correct indexing and rich search results from the first crawl.',
      ],
      url: 'www.voidmediagrp.com',
      images: {
        logo: '/images/the-void-logo.png',
      },
    },
  
  ] satisfies Project[],

  experience: [
    {
      role: 'Senior Frontend Engineer',
      co: 'Foodcourt',
      loc: 'Remote',
      dates: 'Apr 2022 — Present',
      bullets: [
        'Improved app performance by 40% through modern React patterns and TypeScript.',
        'Architected real-time order management system using Socket.IO.',
        'Achieved 99.8% payment success rate with Paystack integration.',
      ],
      productUrl: 'https://www.getfoodcourt.com',
    },
    {
      role: 'Frontend Engineer',
      co: 'Zerotech Agency',
      loc: 'Remote',
      dates: 'Jan 2024 — Apr 2025',
      bullets: [
        'Built the frontend for VibesMeet, unifying digital content monetisation with physical and virtual event ticketing on one platform.',
        'Shipped gated content, paid community access, and 1-on-1 experience flows so creators could monetise their following beyond a single revenue stream.',
        'Implemented ticketing for meetups, workshops, and large conferences, turning an audience into real-world events.',
      ],
      productUrl: 'https://www.vibesmeet.com/',
    },
    {
      role: 'Mobile & Dashboard Engineer',
      co: 'Buybox',
      loc: 'Remote',
      dates: 'Apr 2021 — Apr 2025',
      bullets: [
        'Built the React Native mobile app covering device discovery, custom requests, repair booking, and trade-in.',
        'Developed the vendor dashboard in React — inventory, repair slot management, and same-day delivery queues.',
        'Collaborated with product and design to ship end-to-end device lifecycle features for 500+ verified vendors.',
      ],
      productUrl: 'https://buybox.ng',
    },
  ] satisfies ExperienceItem[],

  writing: [
    { d: 'Mar 2026', t: 'On the cost of premature abstraction in React', read: '6 min' },
    { d: 'Jan 2026', t: 'Building a 99.8% reliable payment flow', read: '11 min' },
    { d: 'Nov 2025', t: 'Why TypeScript saved my Socket.IO architecture', read: '8 min' },
  ] satisfies Post[],
};
