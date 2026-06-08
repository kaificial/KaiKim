"use client";

import { useEffect, useRef } from "react";


export default function InteractiveGrid() {
    const bgGridRef = useRef<HTMLDivElement>(null);
    const bloomRef = useRef<HTMLDivElement>(null);
    const rippleLayerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isTouch || reduce) return;

        const bgGrid = bgGridRef.current;
        const bloom = bloomRef.current;
        if (!bgGrid || !bloom) return;

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let bx = x, by = y;
        let tx = 0, ty = 0;
        let raf = 0;
        let active = false;

        const MAX_TILT = 7;
        const PERSP = 650;

        const render = () => {
            bx += (x - bx) * 0.12;
            by += (y - by) * 0.12;

            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const targetTX = active ? ((y - cy) / cy) * MAX_TILT : 0;
            const targetTY = active ? -((x - cx) / cx) * MAX_TILT : 0;

            tx += (targetTX - tx) * 0.055;
            ty += (targetTY - ty) * 0.055;

            bgGrid.style.transform = `perspective(${PERSP}px) rotateX(${tx}deg) rotateY(${ty}deg) scale(1.14)`;

            bloom.style.setProperty("--cursor-x", `${bx}px`);
            bloom.style.setProperty("--cursor-y", `${by}px`);

            const settled = Math.abs(tx) < 0.02 && Math.abs(ty) < 0.02
                && Math.abs(x - bx) < 0.5 && Math.abs(y - by) < 0.5;

            if (!settled || active) {
                raf = requestAnimationFrame(render);
            } else {
                bgGrid.style.transform = "";
                raf = 0;
            }
        };

        const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };

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
            schedule();
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
            <div ref={bgGridRef} className="bg-grid" aria-hidden="true" />
            <div ref={bloomRef} className="cursor-bloom" aria-hidden="true" />
            <div ref={rippleLayerRef} className="cursor-ripple-layer" aria-hidden="true" />
        </>
    );
}
