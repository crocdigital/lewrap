'use client';

import Carousel from '@/components/molecules/Carousel';
import type { SlideContent } from '@/components/molecules/Carousel';
import ScrollReveal from '@/components/molecules/ScrollReveal';
import LeftScrollReveal from '@/components/molecules/LeftScrollReveal';
// import RightScrollReveal from '@/components/molecules/RightScrollReveal';

import Link from "next/link";

export default function Home() {
  // Hero slides (above the fold)
  const heroSlides: SlideContent[] = [
    // Testing video slide inclusion in main slider
    // {
    //   type: 'video',
    //   src: '/path/to/video.mp4',
    //   controls: false,
    //   autoPlay: true,
    //   muted: true,
    //   loop: true,
    // },
    // END // Testing video slide inclusion in main slider
    {
      type: 'image',
      src: 'home/home-slider-01.webp',
      alt: 'Food image 1',
      objectFit: 'cover',
    },
    {
      type: 'image',
      src: 'home/home-slider-01.webp',
      alt: 'Food image 2',
      objectFit: 'cover',
    },
    {
      type: 'image',
      src: 'home/home-slider-01.webp',
      alt: 'Food image 3',
      objectFit: 'cover',
    },
  ];

  return (
    <main className="text-lewrap-off-black">
      <div className="max-w-screen-2xl w-full mx-auto flex flex-col gap-16">
        {/* Hero slider */}
        <section className="mt-10 md:mt-15">
          <Carousel
            slides={heroSlides}
            showPagination={true}
            showNavigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            cta={{
              text: "Our food",
              href: "/our-food"
            }}
            cta2={{
              text: "Order now",
              href: "/order",
              className: "text-lewrap-green"
            }}
            loop={true}
            // Show / hide gradient overlay
            hasGradient={true}
            className="w-[95%] mx-auto h-[62vh] md:h-[75vh] rounded-2xl overflow-hidden"
          />
        </section>

        <div className="flex flex-col items-center gap-4 px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold">Home Page</h1>
          <p className="text-xl">Check out these cool page transitions. Website on another level.</p>
          <p className="text-xl">Plus our customised cursor for added bougieness.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 justify-center pb-20">
          <ScrollReveal delay={0}> {/* Scroll reveal with delay so 3 buttons appear in sequence */}
            <Link href="/locations" className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-opacity-90 transition">
              Go to Locations
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.2}> {/* Scroll reveal with delay so 3 buttons appear in sequence */}
            <Link href="/our-food" className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-opacity-90 transition">
              Go to Our Food
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.4}> {/* Scroll reveal with delay so 3 buttons appear in sequence */}
            <Link href="/nutrition" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-opacity-90 transition">
              Go to Nutrition
            </Link>
          </ScrollReveal>
        </div>

        <div className="h-[150vh] w-full flex items-center justify-center mt-20 bg-gray-50">
          <LeftScrollReveal>
            <p className="text-gray-500">Keep scrolling to see the nav shrink...</p>
          </LeftScrollReveal>
        </div>
      </div>
    </main>
  );
}
