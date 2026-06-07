"use client";

import { useEffect, useRef } from "react";


export default function InteractiveGrid() {
    const gridRef = useRef<HTMLDivElement>(null);
    const bloomRef = useRef<HTMLDivElement>(null);
    const rippleLayerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isTouch || reduce) return;

        const grid = gridRef.current;
        const bloom = bloomRef.current;
        if (!grid || !bloom) return;

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        // The bloom lags
        let bx = x;
        let by = y;
        let raf = 0;
        let active = false;

        const render = () => {
            bx += (x - bx) * 0.18;
            by += (y - by) * 0.18;

            grid.style.setProperty("--cursor-x", `${x}px`);
            grid.style.setProperty("--cursor-y", `${y}px`);
            bloom.style.setProperty("--cursor-x", `${bx}px`);
            bloom.style.setProperty("--cursor-y", `${by}px`);

            // Keep animating 
            if (Math.abs(x - bx) > 0.5 || Math.abs(y - by) > 0.5) {
                raf = requestAnimationFrame(render);
            } else {
                raf = 0;
            }
        };

        const schedule = () => {
            if (!raf) raf = requestAnimationFrame(render);
        };

        const onMove = (e: PointerEvent) => {
            x = e.clientX;
            y = e.clientY;
            if (!active) {
                active = true;
                document.body.classList.add("cursor-grid-active");
            }
            schedule();
        };

        const onLeave = () => {
            active = false;
            document.body.classList.remove("cursor-grid-active");
        };

        const onDown = (e: PointerEvent) => {
            if (e.button !== 0) return;
            const layer = rippleLayerRef.current;
            if (!layer) return;
            const ripple = document.createElement("span");
            ripple.className = "cursor-ripple";
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            layer.appendChild(ripple);
            window.setTimeout(() => ripple.remove(), 700);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        document.addEventListener("mouseleave", onLeave);

        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            document.removeEventListener("mouseleave", onLeave);
            if (raf) cancelAnimationFrame(raf);
            document.body.classList.remove("cursor-grid-active");
        };
    }, []);

    return (
        <>
            <div ref={gridRef} className="cursor-grid" aria-hidden="true" />
            <div ref={bloomRef} className="cursor-bloom" aria-hidden="true" />
            <div ref={rippleLayerRef} className="cursor-ripple-layer" aria-hidden="true" />
        </>
    );
}
