import type { MetaFunction } from 'react-router';
import { CustomCursor } from '~/components/CustomCursor';
import { SmoothScroll } from '~/components/SmoothScroll';
import { ScrollProgress } from '~/components/ScrollProgress';
import { Nav } from '~/components/Nav';
import { Hero } from '~/components/Hero';
import { Work } from '~/components/Work';
import { About } from '~/components/About';
import { Experience } from '~/components/Experience';
import { Writing } from '~/components/Writing';
import { Contact } from '~/components/Contact';

export const meta: MetaFunction = () => [
  { title: 'Abdulsamad Portfolio' },
  {
    name: 'description',
    content:
      'Abdulsamad Ajao is a Senior Frontend Engineer working internationally, crafting fast, accessible interfaces for fintech, food-tech, and Web3 products. Five years shipping production React across two continents.',
  },
  { name: 'author', content: 'Abdulsamad Ajao' },
  { name: 'keywords', content: 'frontend engineer, React, TypeScript, remote, fintech, web3, UI engineer, portfolio' },

  { property: 'og:title', content: 'Abdulsamad Portfolio' },
  { property: 'og:description', content: 'Senior Frontend Engineer working internationally — building performant, pixel-precise interfaces for fintech, food-tech, and Web3.' },
  { property: 'og:type', content: 'website' },
  { property: 'og:image', content: '/images/profile.png' },
  { property: 'og:image:alt', content: 'Abdulsamad Ajao' },

  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'Abdulsamad Portfolio' },
  { name: 'twitter:description', content: 'Senior Frontend Engineer working internationally — building performant, pixel-precise interfaces for fintech, food-tech, and Web3.' },
  { name: 'twitter:image', content: '/images/profile.png' },
];

export default function Index() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Writing />
        <Contact />
      </main>
    </>
  );
}
