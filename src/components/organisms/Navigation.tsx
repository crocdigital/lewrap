"use client";

import { useState, useEffect, useRef } from "react";

// TikTok
const TikTok = ({ className }: { className?: string }) => (
    <svg className={className} width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5778 4.20913C14.4467 3.47161 13.6306 2.29118 13.3759 0.915984C13.3209 0.618941 13.2903 0.312934 13.2903 0H9.68018L9.67407 14.4687C9.61376 16.0892 8.28012 17.3894 6.64537 17.3894C6.13726 17.3894 5.65889 17.2627 5.23757 17.0406C4.27147 16.5325 3.61015 15.52 3.61015 14.355C3.61015 12.6816 4.9719 11.3198 6.64496 11.3198C6.95749 11.3198 7.25698 11.3716 7.54017 11.46V7.77446C7.24679 7.73412 6.94893 7.70967 6.64496 7.70967C2.98102 7.70967 0 10.6903 0 14.355C0 16.603 1.12298 18.5927 2.83719 19.7955C3.91616 20.5538 5.22942 21 6.64537 21C10.3097 21 13.2903 18.019 13.2903 14.355V7.01779C14.7063 8.03401 16.4413 8.63299 18.3136 8.63299V5.02243C17.3051 5.02243 16.3659 4.72294 15.5778 4.20913Z" fill="black" />
    </svg>
);
// Instagram
const Instagram = ({ className }: { className?: string }) => (
    <svg className={className} width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_4_53)">
            <path d="M11.0021 5.11587C8.01892 5.11587 5.61271 7.51975 5.61271 10.5C5.61271 13.4803 8.01892 15.8841 11.0021 15.8841C13.9852 15.8841 16.3914 13.4803 16.3914 10.5C16.3914 7.51975 13.9852 5.11587 11.0021 5.11587ZM11.0021 14.0004C9.07427 14.0004 7.49828 12.4306 7.49828 10.5C7.49828 8.5694 9.06958 6.99961 11.0021 6.99961C12.9345 6.99961 14.5058 8.5694 14.5058 10.5C14.5058 12.4306 12.9298 14.0004 11.0021 14.0004ZM17.8689 4.89563C17.8689 5.59383 17.306 6.15146 16.6118 6.15146C15.913 6.15146 15.3548 5.58914 15.3548 4.89563C15.3548 4.20211 15.9177 3.6398 16.6118 3.6398C17.306 3.6398 17.8689 4.20211 17.8689 4.89563ZM21.4383 6.1702C21.3586 4.48795 20.974 2.99782 19.7404 1.77011C18.5115 0.542397 17.0199 0.15815 15.336 0.0738034C13.6006 -0.0246011 8.39885 -0.0246011 6.66338 0.0738034C4.98419 0.153464 3.49263 0.537711 2.25904 1.76542C1.02545 2.99314 0.645518 4.48326 0.56109 6.16551C0.46259 7.89931 0.46259 13.096 0.56109 14.8298C0.640828 16.512 1.02545 18.0022 2.25904 19.2299C3.49263 20.4576 4.9795 20.8418 6.66338 20.9262C8.39885 21.0246 13.6006 21.0246 15.336 20.9262C17.0199 20.8465 18.5115 20.4623 19.7404 19.2299C20.9693 18.0022 21.3539 16.512 21.4383 14.8298C21.5368 13.096 21.5368 7.90399 21.4383 6.1702ZM19.1963 16.6901C18.8304 17.6086 18.1222 18.3161 17.1981 18.6863C15.8145 19.2346 12.5311 19.1081 11.0021 19.1081C9.47296 19.1081 6.18495 19.2299 4.80596 18.6863C3.88663 18.3208 3.17837 17.6132 2.80782 16.6901C2.25904 15.3078 2.38568 12.0276 2.38568 10.5C2.38568 8.97239 2.26373 5.68755 2.80782 4.30988C3.17368 3.39144 3.88193 2.68387 4.80596 2.31368C6.18964 1.76542 9.47296 1.89194 11.0021 1.89194C12.5311 1.89194 15.8192 1.77011 17.1981 2.31368C18.1175 2.67918 18.8257 3.38676 19.1963 4.30988C19.7451 5.69223 19.6184 8.97239 19.6184 10.5C19.6184 12.0276 19.7451 15.3124 19.1963 16.6901Z" fill="black" />
        </g>
        <defs>
            <clipPath id="clip0_4_53">
                <rect width="21.5122" height="21" fill="white" />
            </clipPath>
        </defs>
    </svg>
);
// Facebook
const Facebook = ({ className }: { className?: string }) => (
    <svg className={className} width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_4_48)">
            <path d="M10.4015 11.8125L10.9787 8.01199H7.36971V5.54572C7.36971 4.50598 7.87385 3.49248 9.49019 3.49248H11.1309V0.256758C11.1309 0.256758 9.642 0 8.21847 0C5.24639 0 3.30371 1.82027 3.30371 5.11547V8.01199H0V11.8125H3.30371V21H7.36971V11.8125H10.4015Z" fill="black" />
        </g>
        <defs>
            <clipPath id="clip0_4_48">
                <rect width="11.2683" height="21" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default function Navigation() {
    const [pathname, setPathname] = useState("");

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [expandedWidth, setExpandedWidth] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Set pathname
        setPathname(window.location.pathname);

        const updateWidths = () => {
            if (navRef.current) {
                // Check if mobile (768px is the md breakpoint in Tailwind)
                const mobile = window.innerWidth < 768;
                setIsMobile(mobile);

                // Calculate the natural content width by measuring the children
                // Get all direct children except the spacer
                const children = Array.from(navRef.current.children).filter(
                    child => !child.classList.contains('flex-grow')
                );

                // Sum up the widths of actual content
                const childrenWidth = children.reduce((total, child) => {
                    return total + (child as HTMLElement).offsetWidth;
                }, 0);

                // Add padding (for e.g. px-8 = 2rem on each side = 4rem total = 64px)
                const padding = 150;
                setContentWidth(childrenWidth + padding);

                // Calculate 95% of viewport width
                const ninetyFivePercent = window.innerWidth * 0.95;
                const maxAllowed = 1400;
                setExpandedWidth(Math.min(ninetyFivePercent, maxAllowed));

                // Mark as ready once widths are calculated
                setIsReady(true);
            }
        };

        // Initial calculation
        setTimeout(updateWidths, 100);

        window.addEventListener('resize', updateWidths);
        return () => window.removeEventListener('resize', updateWidths);
    }, []);

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Width calculation
    const currentWidth = isMobile ? expandedWidth : (isScrolled ? contentWidth : expandedWidth);

    return (
        <>
            <div className="fixed top-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
                <nav
                    ref={navRef}
                    style={{
                        width: isReady ? currentWidth : 'auto',
                        opacity: isReady ? 1 : 0,
                        transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease"
                    }}
                    className="relative bg-white text-lewrap-off-black rounded-full px-8 py-6 flex items-center shadow-lg pointer-events-auto max-w-screen-2xl md:justify-start justify-between box-border overflow-hidden"
                >
                    {/* Logo */}
                    <a href="/" className="shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                        <img
                            src="/brand/lewrap.svg"
                            alt="LeWrap"
                            className="w-[82px] md:w-[102px] h-auto"
                        />
                    </a>

                    {/* Social Icons - Desktop: next to logo, Mobile: centered with equal spacing */}
                    <div className="hidden md:flex items-center gap-3 shrink-0 ml-5">
                        <a href="https://www.instagram.com/lewrap_official" target="_blank" className="hover:opacity-70 transition-opacity"><Instagram className="w-5 h-5" /></a>
                        <a href="https://www.tiktok.com/@lewrap" target="_blank" className="hover:opacity-70 transition-opacity"><TikTok className="w-5 h-5" /></a>
                        <a href="https://www.facebook.com/lewrapaus" target="_blank" className="hover:opacity-70 transition-opacity"><Facebook className="w-5 h-5" /></a>
                    </div>

                    {/* Social Icons - Mobile: centered absolutely */}
                    <div className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-5">
                        <a href="https://www.instagram.com/lewrap_official" target="_blank" className="hover:opacity-70 transition-opacity"><Instagram className="w-5 h-5" /></a>
                        <a href="https://www.tiktok.com/@lewrap" target="_blank" className="hover:opacity-70 transition-opacity"><TikTok className="w-5 h-5" /></a>
                        <a href="https://www.facebook.com/lewrapaus" target="_blank" className="hover:opacity-70 transition-opacity"><Facebook className="w-5 h-5" /></a>
                    </div>

                    {/* Spacer - Desktop only */}
                    <div className="hidden md:flex flex-grow" />

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-5 shrink-0 whitespace-nowrap">
                        <a
                            href="/our-story"
                            className={`${pathname === "/our-story" ? "text-lewrap-green pointer-events-none" : "hover:text-lewrap-green"} duration-200`}
                        >
                            Our story
                        </a>
                        <a
                            href="/locations"
                            className={`${pathname === "/locations" ? "text-lewrap-green pointer-events-none" : "hover:text-lewrap-green"} duration-200`}
                        >
                            Locations
                        </a>
                        <a
                            href="/our-food"
                            className={`${pathname === "/our-food" ? "text-lewrap-green pointer-events-none" : "hover:text-lewrap-green"} duration-200`}
                        >
                            Our food
                        </a>
                        <a
                            href="/nutrition"
                            className={`${pathname === "/nutrition" ? "text-lewrap-green pointer-events-none" : "hover:text-lewrap-green"} duration-200`}
                        >
                            Nutrition
                        </a>
                        <a
                            href="#"
                            className={`${pathname === "#" ? "text-lewrap-green pointer-events-none" : "hover:text-lewrap-green"} duration-200`}
                        >
                            Catering
                        </a>
                        <a
                            href="#"
                            className={`${pathname === "#" ? "text-lewrap-green pointer-events-none" : "hover:text-lewrap-green"} font-helvetica-condensed font-bold duration-200`}
                        >
                            Newsroom
                        </a>
                        <a
                            href="#"
                            className={`${pathname === "#" ? "text-lewrap-green pointer-events-none" : "hover:text-lewrap-green"} font-helvetica-condensed font-black duration-200`}
                        >
                            Own a store
                        </a>
                        <a
                            href="#"
                            className={`${pathname === "#" ? "text-lewrap-green pointer-events-none" : "hover:text-white hover:bg-lewrap-green"} px-6 py-3 bg-lewrap-green-dark rounded-full text-white font-cocogoose uppercase duration-200`}
                        >
                            Order now
                        </a>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-end shrink-0"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`w-full h-0.5 bg-lewrap-off-black block transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}
                        />
                        <span
                            className={`w-full h-0.5 bg-lewrap-off-black block transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                        />
                        <span
                            className={`h-0.5 bg-lewrap-off-black block transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px] w-full' : 'w-[80%]'}`}
                        />
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Dropdown - Full Screen */}
            <div
                className={`md:hidden fixed inset-0 z-40 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="flex flex-col items-center justify-center h-full px-8 gap-6 pt-24">
                    <a
                        href="/our-story"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`${pathname === "/our-story" ? "text-lewrap-green" : "text-lewrap-off-black hover:text-lewrap-green"} duration-200 text-xl font-medium`}
                    >
                        Our story
                    </a>
                    <a
                        href="/locations"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`${pathname === "/locations" ? "text-lewrap-green" : "text-lewrap-off-black hover:text-lewrap-green"} duration-200 text-xl font-medium`}
                    >
                        Locations
                    </a>
                    <a
                        href="/our-food"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`${pathname === "/our-food" ? "text-lewrap-green" : "text-lewrap-off-black hover:text-lewrap-green"} duration-200 text-xl font-medium`}
                    >
                        Our food
                    </a>
                    <a
                        href="/nutrition"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`${pathname === "/nutrition" ? "text-lewrap-green" : "text-lewrap-off-black hover:text-lewrap-green"} duration-200 text-xl font-medium`}
                    >
                        Nutrition
                    </a>
                    <a
                        href="#"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lewrap-off-black hover:text-lewrap-green duration-200 text-xl font-medium"
                    >
                        Catering
                    </a>
                    <a
                        href="#"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lewrap-off-black hover:text-lewrap-green duration-200 text-xl font-medium"
                    >
                        Newsroom
                    </a>
                    <a
                        href="#"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lewrap-off-black hover:text-lewrap-green duration-200 text-xl font-helvetica-condensed font-black"
                    >
                        Own a store
                    </a>

                    {/* Order Now Button */}
                    <a
                        href="#"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-8 py-4 bg-lewrap-green-dark rounded-full w-full text-white font-cocogoose uppercase duration-200 text-xl hover:bg-lewrap-green text-center mt-4"
                    >
                        Order now
                    </a>
                </div>
            </div>
        </>
    );
}
