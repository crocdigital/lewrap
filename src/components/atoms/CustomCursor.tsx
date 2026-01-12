"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Physics state
    const mouse = useRef({ x: 0, y: 0 });
    const cursor = useRef({ x: 0, y: 0 });
    // Add separate ref for current animated scale
    const cursorScale = useRef(0.444);
    const requestRef = useRef<number>(0);
    const isHoveringRef = useRef(false);

    useEffect(() => {
        // Check if device supports touch
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchDevice) return;

        // Initialize cursor position to avoid jump if persisted
        if (cursor.current.x === 0 && cursor.current.y === 0) {
            // We can't know mouse pos until event, but if persisted it keeps old pos.
            // If completely new load, it starts at 0,0.
            // We'll let the first mousemove set the initial pos to jump current there.
        }

        const animate = () => {
            // Spring physics for Position
            const distX = mouse.current.x - cursor.current.x;
            const distY = mouse.current.y - cursor.current.y;

            // Ease factors (higher = faster/stiffer)
            // 0.4 for very snappy tracking
            cursor.current.x = cursor.current.x + distX * 0.4;
            cursor.current.y = cursor.current.y + distY * 0.4;

            // Physics for Scale (Lerp)
            // Scale down from 36px (w-9) to 16px (0.444)
            const targetScale = isHoveringRef.current ? 1 : 0.444;
            // Lower factor for scale makes it feel smoother/elastic compared to position
            cursorScale.current = cursorScale.current + (targetScale - cursorScale.current) * 0.15;

            if (cursorRef.current) {
                const x = cursor.current.x - 18; // Center offset (half of 36px)
                const y = cursor.current.y - 18;
                // Use interpolated scale
                cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${cursorScale.current})`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        const updateMousePosition = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            // If this is the very first move and cursor is at 0,0, snap it immediately
            if (!isVisible) {
                setIsVisible(true);
                cursor.current.x = e.clientX;
                cursor.current.y = e.clientY;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.getAttribute("role") === "button"
            ) {
                isHoveringRef.current = true;
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.getAttribute("role") === "button"
            ) {
                isHoveringRef.current = false;
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
            cancelAnimationFrame(requestRef.current);
        };
    }, []); // Run once on mount

    if (!isVisible) return null;

    return (
        <div
            ref={cursorRef}
            className={`fixed top-0 left-0 w-9 h-9 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference`}
            style={{
                // Using transform for performance, opacity avoids flash
                willChange: "transform"
            }}
        />
    );
}
