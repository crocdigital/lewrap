'use client';

import Carousel from '@/components/molecules/Carousel';
import type { SlideContent } from '@/components/molecules/Carousel';
import ScrollReveal from '@/components/molecules/ScrollReveal';

import Link from "next/link";

export default function Home() {
  // Homepage carousel (above the fold)
  const imageSlides: SlideContent[] = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      alt: 'Food image 1',
      objectFit: 'cover',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      alt: 'Food image 2',
      objectFit: 'cover',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
      alt: 'Food image 3',
      objectFit: 'cover',
    },
  ];

  return (
    <div className="bg-gray-900 text-white">


      <div className="min-h-screen flex flex-col items-center justify-center gap-8 mx-10">
        {/* Hero slider */}
        <section className="mt-10 md:mt-15">
          <Carousel
            slides={imageSlides}
            showPagination={true}
            showNavigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-[95vw] mx-auto h-[62vh] md:h-[75vh] rounded-2xl overflow-hidden"
          />
        </section>

        <h1 className="text-4xl font-bold">Home Page</h1>
        <p className="text-xl">Check out these cool page transitions. Website on another level.</p>
        <p className="text-xl">Plus our customised cursor for added bougieness.</p>
        <ScrollReveal className="flex gap-4 flex-wrap justify-center"> {/* Potenitally only apply this to major CTA buttons? */}
          <Link href="/locations" className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-opacity-90 transition">
            Go to Locations
          </Link>
          <Link href="/our-food" className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-opacity-90 transition">
            Go to Our Food
          </Link>
          <Link href="/nutrition" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-opacity-90 transition">
            Go to Nutrition
          </Link>
        </ScrollReveal>
      </div>

      <div className="h-[150vh] w-full flex items-center justify-center mt-20">
        <p className="text-gray-500">Keep scrolling to see the nav shrink...</p>
      </div>
    </div>
  );
}
