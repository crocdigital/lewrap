'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { SwiperOptions } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export type SlideContent =
    | { type: 'image'; src: string; alt: string; objectFit?: 'cover' | 'contain' | 'fill' }
    | { type: 'video'; src: string; controls?: boolean; autoPlay?: boolean; muted?: boolean; loop?: boolean }
    | { type: 'html'; content: React.ReactNode };

export interface CarouselProps {
    slides: SlideContent[];
    showPagination?: boolean;
    showNavigation?: boolean;
    width?: string;
    height?: string;
    slidesPerView?: number;
    spaceBetween?: number;
    autoplay?: boolean | {
        delay?: number;
        disableOnInteraction?: boolean;
        pauseOnMouseEnter?: boolean;
    };
    loop?: boolean;
    speed?: number;
    breakpoints?: SwiperOptions['breakpoints'];
    className?: string;
    slideClassName?: string;
    navigationClassName?: string;
    paginationClassName?: string;
    centeredSlides?: boolean;
    grabCursor?: boolean;
    onSlideChange?: (index: number) => void;
    onSwiper?: (swiper: any) => void;
    cta?: {
        text: string;
        href: string;
        newTab?: boolean;
        className?: string; // Additional classes for the button itself
    };
    cta2?: {
        text: string;
        href: string;
        newTab?: boolean;
        className?: string;
    };
    hasGradient?: boolean;
}

export default function Carousel({
    slides,
    showPagination = true,
    showNavigation = true,
    width = '100%',
    height = '400px',
    slidesPerView = 1,
    spaceBetween = 0,
    autoplay = false,
    loop = false,
    speed = 300,
    breakpoints,
    className = '',
    slideClassName = '',
    navigationClassName = '',
    paginationClassName = '',
    centeredSlides = false,
    grabCursor = true,
    hasGradient = false,
    onSlideChange,
    onSwiper,
    cta,
    cta2,
}: CarouselProps) {
    const modules = [A11y];

    if (showNavigation) modules.push(Navigation);
    if (showPagination) modules.push(Pagination);
    if (autoplay) modules.push(Autoplay);

    const autoplayConfig = typeof autoplay === 'boolean'
        ? (autoplay ? { delay: 3000, disableOnInteraction: false } : false)
        : autoplay;

    const swiperOptions: SwiperOptions = {
        modules,
        slidesPerView,
        spaceBetween,
        speed,
        loop,
        centeredSlides,
        grabCursor,
        navigation: showNavigation,
        pagination: showPagination ? { clickable: true } : false,
        autoplay: autoplayConfig,
        breakpoints,
    };

    const handleSlideChange = (swiper: SwiperType) => {
        if (onSlideChange) {
            onSlideChange(swiper.activeIndex);
        }
    };

    const handleSwiper = (swiper: SwiperType) => {
        if (onSwiper) {
            onSwiper(swiper);
        }
    };

    const renderSlide = (slide: SlideContent, index: number) => {
        switch (slide.type) {
            case 'image':
                return (
                    <img
                        src={slide.src}
                        alt={slide.alt}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: slide.objectFit || 'cover',
                        }}
                    />
                );

            case 'video':
                return (
                    <video
                        src={slide.src}
                        controls={slide.controls ?? true}
                        autoPlay={slide.autoPlay ?? false}
                        muted={slide.muted ?? true}
                        loop={slide.loop ?? false}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                );

            case 'html':
                return <div className="w-full h-full">{slide.content}</div>;

            default:
                return null;
        }
    };

    // Check if className contains Tailwind height or width classes
    const hasTailwindHeight = className.match(/\b(h-\[|h-\d|h-full|h-screen|h-min|h-max|h-fit)/);
    const hasTailwindWidth = className.match(/\b(w-\[|w-\d|w-full|w-screen|w-min|w-max|w-fit)/);

    // Only apply inline styles if Tailwind classes are not present
    const inlineStyles: React.CSSProperties = {};
    if (!hasTailwindWidth) inlineStyles.width = width;
    if (!hasTailwindHeight) inlineStyles.height = height;

    return (
        <div
            className={`carousel-container relative ${className}`}
            style={inlineStyles}
        >
            <Swiper
                {...swiperOptions}
                className={`h-full ${navigationClassName} ${paginationClassName}`}
                onSlideChange={handleSlideChange}
                onSwiper={handleSwiper}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className={`relative ${slideClassName}`}>
                        {renderSlide(slide, index)}
                        {hasGradient && (
                            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/40 pointer-events-none z-[1]" />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {(cta || cta2) && (
                <div className="absolute inset-0 z-10 flex items-end pb-14 justify-center pointer-events-none">
                    <div className="flex flex-col md:flex-row gap-4 items-center pointer-events-auto">
                        {cta && (
                            <Link
                                href={cta.href}
                                target={cta.newTab ? '_blank' : undefined}
                                className={`px-8 py-4 bg-[#789F3F] text-white rounded-full font-bold text-lg uppercase hover:bg-orange-600 transition-transform hover:scale-105 shadow-lg ${cta.className || ''}`}
                            >
                                {cta.text}
                            </Link>
                        )}
                        {cta2 && (
                            <Link
                                href={cta2.href}
                                target={cta2.newTab ? '_blank' : undefined}
                                className={`px-8 py-4 bg-[#789F3F] text-white rounded-full font-bold text-lg uppercase hover:bg-orange-600 transition-transform hover:scale-105 shadow-lg ${cta2.className || ''}`}
                            >
                                {cta2.text}
                            </Link>
                        )}
                    </div>
                </div>
            )}

            <style jsx global>{`
        .carousel-container .swiper {
          width: 100%;
          height: 100%;
        }

        .carousel-container .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }

        /* Navigation arrows styling */
        .carousel-container .swiper-button-next,
        .carousel-container .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.5);
          width: 44px;
          height: 44px;
          padding: 12px;
          margin: 0 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .carousel-container .swiper-button-next:hover,
        .carousel-container .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
        }

        .carousel-container .swiper-button-next::after,
        .carousel-container .swiper-button-prev::after {
          font-size: 20px;
        }

        /* Pagination styling */
        .carousel-container .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          opacity: 0.5;
          border-radius: 5px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .carousel-container .swiper-pagination-bullet-active {
          opacity: 1;
          background: white;
          width: 32px;
          border-radius: 5px;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .carousel-container .swiper-button-next,
          .carousel-container .swiper-button-prev {
            width: 36px;
            height: 36px;
          }

          .carousel-container .swiper-button-next::after,
          .carousel-container .swiper-button-prev::after {
            font-size: 16px;
          }
        }
      `}</style>
        </div>
    );
}
