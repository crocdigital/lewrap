'use client';

// import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { SwiperOptions } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/carousel.css';

export type SlideContent =
    | { type: 'image'; src: string | any; alt: string; objectFit?: 'cover' | 'contain' | 'fill' }
    | { type: 'video'; src: string; controls?: boolean; autoPlay?: boolean; muted?: boolean; loop?: boolean }
    | { type: 'html'; content: string };

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
    children?: React.ReactNode;
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
    grabCursor = false,
    hasGradient = false,
    onSlideChange,
    onSwiper,
    cta,
    cta2,
    children,
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
                const imageSrc = typeof slide.src === 'string' ? slide.src : (slide.src.src || slide.src);
                return (
                    <img
                        src={imageSrc}
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
                return (
                    <div
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: slide.content }}
                    />
                );

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

            {children && (
                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                    {children}
                </div>
            )}

            {(cta || cta2) && (
                <div className="absolute inset-0 z-10 flex items-end pb-14 justify-center pointer-events-none">
                    <div className="flex flex-row gap-4 items-center pointer-events-auto">
                        {cta && (
                            <a
                                href={cta.href}
                                target={cta.newTab ? '_blank' : undefined}
                                className={`btn-lewrap md:text-2xl ${cta.className || ''}`}
                            >
                                {cta.text}
                            </a>

                        )}
                        {cta2 && (
                            <a
                                href={cta2.href}
                                target={cta2.newTab ? '_blank' : undefined}
                                className={`btn-lewrap-secondary ${cta2.className || ''}`}
                            >
                                {cta2.text}
                            </a>

                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
