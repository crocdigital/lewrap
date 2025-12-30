'use client';

import React from 'react';

import Carousel from '../molecules/Carousel';
import type { SlideContent } from '../molecules/Carousel';

export default function CarouselExample() {
    // Example 1: Image Carousel
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

    // Example 2: Video Carousel
    const videoSlides: SlideContent[] = [
        {
            type: 'video',
            src: '/videos/sample1.mp4',
            controls: true,
            muted: true,
            loop: true,
        },
        {
            type: 'video',
            src: '/videos/sample2.mp4',
            controls: true,
            muted: true,
            loop: true,
        },
    ];

    // Example 3: Mixed Content (Images + HTML)
    const mixedSlides: SlideContent[] = [
        {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
            alt: 'Food image',
            objectFit: 'cover',
        },
        {
            type: 'html',
            content: (
                <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8">
                    <h2 className="text-4xl font-bold mb-4">Custom HTML Slide</h2>
                    <p className="text-xl text-center max-w-2xl">
                        You can add any React component or HTML content here!
                    </p>
                    <button className="mt-6 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Call to Action
                    </button>
                </div>
            ),
        },
        {
            type: 'html',
            content: (
                <div className="flex items-center justify-center h-full bg-black text-white">
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-2">Special Offer</h3>
                        <p className="text-xl">50% Off Today!</p>
                    </div>
                </div>
            ),
        },
    ];

    // Example 4: Multiple slides per view (responsive)
    const multipleSlides: SlideContent[] = Array.from({ length: 8 }, (_, i) => ({
        type: 'html' as const,
        content: (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-400 to-blue-500 text-white">
                <h3 className="text-2xl font-bold">Slide {i + 1}</h3>
            </div>
        ),
    }));

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Example 1: Basic Image Carousel */}
                <section>
                    <h2 className="text-3xl font-bold mb-4">1. Image Carousel (Full Width)</h2>
                    <p className="text-gray-600 mb-4">
                        Basic image carousel with navigation, pagination and autoplay
                    </p>
                    <Carousel
                        slides={imageSlides}
                        showPagination={true}
                        showNavigation={true}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        className="h-[75vh] rounded-2xl overflow-hidden"
                    />
                </section>

                {/* Example 2: Autoplay with No Navigation. THIS ONE LOOKS LIKE THE WINNER BRA! */}
                <section>
                    <h2 className="text-3xl font-bold mb-4">2. Autoplay (No Navigation)</h2>
                    <p className="text-gray-600 mb-4">
                        Auto-playing carousel with pagination only
                    </p>
                    <Carousel
                        slides={imageSlides}
                        showPagination={true}
                        showNavigation={false}
                        height="400px"
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="h-[75vh] rounded-2xl overflow-hidden"
                    />
                </section>

                {/* Example 3: Small Carousel (No Controls) */}
                <section>
                    <h2 className="text-3xl font-bold mb-4">3. Compact Carousel (No Controls)</h2>
                    <p className="text-gray-600 mb-4">
                        Smaller carousel without navigation or pagination
                    </p>
                    <div className="max-w-md mx-auto">
                        <Carousel
                            slides={imageSlides}
                            showPagination={false}
                            showNavigation={false}
                            height="300px"
                            width="100%"
                            loop={true}
                        />
                    </div>
                </section>

                {/* Example 4: Mixed Content */}
                <section>
                    <h2 className="text-3xl font-bold mb-4">4. Mixed Content (Images + HTML)</h2>
                    <p className="text-gray-600 mb-4">
                        Carousel with images and custom HTML slides
                    </p>
                    <Carousel
                        slides={mixedSlides}
                        showPagination={true}
                        showNavigation={true}
                        height="500px"
                        loop={true}
                        speed={500}
                    />
                </section>

                {/* Example 5: Multiple Slides Per View */}
                <section>
                    <h2 className="text-3xl font-bold mb-4">5. Multiple Slides (Responsive)</h2>
                    <p className="text-gray-600 mb-4">
                        Shows multiple slides at once with responsive breakpoints
                    </p>
                    <Carousel
                        slides={multipleSlides}
                        showPagination={true}
                        showNavigation={true}
                        height="300px"
                        slidesPerView={1}
                        spaceBetween={20}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                        loop={true}
                    />
                </section>

                {/* Example 6: Video Carousel (if you have videos) */}
                <section>
                    <h2 className="text-3xl font-bold mb-4">6. Video Carousel</h2>
                    <p className="text-gray-600 mb-4">
                        Carousel with video content (replace with your video URLs)
                    </p>
                    <div className="bg-gray-200 p-8 rounded-lg text-center">
                        <p className="text-gray-600">
                            To use video carousel, replace the video sources in the example code
                            with your actual video URLs
                        </p>
                        <pre className="mt-4 text-left bg-gray-800 text-white p-4 rounded overflow-x-auto">
                            {`const videoSlides: SlideContent[] = [
                                {
                                    type: 'video',
                                    src: '/videos/your-video.mp4',
                                    controls: true,
                                    muted: true,
                                    loop: true,
                                },
                            ];`
                            }
                        </pre>
                    </div>
                </section>

                {/* Usage Instructions */}
                <section className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-4">Usage Instructions</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Basic Import</h3>
                            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
                                {`import Carousel from '@/components/molecules/Carousel';
import type { SlideContent } from '@/components/molecules/Carousel';`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Image Slide</h3>
                            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
                                {`const slides: SlideContent[] = [
  {
    type: 'image',
    src: '/path/to/image.jpg',
    alt: 'Description',
    objectFit: 'cover', // 'cover' | 'contain' | 'fill'
  },
];`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Video Slide</h3>
                            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
                                {`const slides: SlideContent[] = [
  {
    type: 'video',
    src: '/path/to/video.mp4',
    controls: true,
    autoPlay: false,
    muted: true,
    loop: true,
  },
];`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">HTML Slide</h3>
                            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
                                {`const slides: SlideContent[] = [
  {
    type: 'html',
    content: (
      <div className="your-custom-content">
        <h2>Any React Component</h2>
      </div>
    ),
  },
];`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Props Reference</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><code className="bg-gray-100 px-2 py-1 rounded">slides</code> - Array of slide content (required)</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">showPagination</code> - Show/hide pagination dots (default: true)</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">showNavigation</code> - Show/hide arrow buttons (default: true)</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">width</code> - Carousel width (default: '100%')</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">height</code> - Carousel height (default: '400px')</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">slidesPerView</code> - Number of slides visible (default: 1)</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">spaceBetween</code> - Gap between slides in px (default: 0)</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">autoplay</code> - Enable autoplay (boolean or config object)</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">loop</code> - Enable infinite loop (default: false)</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">speed</code> - Transition speed in ms (default: 300)</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">breakpoints</code> - Responsive breakpoints configuration</li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
