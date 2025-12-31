"use client";

import { useEffect, useState } from "react";

interface BackToTopProps {
    /** Scroll threshold in pixels before button appears (default: 300) */
    threshold?: number;
    /** Custom class name for styling the button */
    className?: string;
    /** Scroll behavior (default: "smooth") */
    behavior?: ScrollBehavior;
    /** Children to render inside the button (e.g., icon, text) */
    children?: React.ReactNode;
}

export default function BackToTop({
    threshold = 300,
    className = "",
    behavior = "smooth",
    children,
}: BackToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Check on mount
        toggleVisibility();

        // Add scroll listener
        window.addEventListener("scroll", toggleVisibility, { passive: true });

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, [threshold]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior,
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                visibility: isVisible ? "visible" : "hidden",
                transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
            }}
            aria-label="Back to top"
        >
            {children || "↑"}
        </button>
    );
}
