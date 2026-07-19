"use client";

import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

// smallest angle you'd need to turn to go from one direction to another, in radians
function angleDelta(from: number, to: number) {
    let delta = (to - from) % TAU;
    if (delta > Math.PI) delta -= TAU;
    if (delta < -Math.PI) delta += TAU;
    return delta;
}

export default function CustomCursor() {
    const rootRef = useRef<HTMLDivElement>(null);
    const planeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!canHover || reduceMotion) return;

        const root = rootRef.current;
        const plane = planeRef.current;
        if (!root || !plane) return;

        document.body.classList.add("custom-cursor-active");

        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const target = { ...pos };
        const velocity = { x: 0, y: 0 };

        let heading = 0; // radians, 0 means the nose points right
        let headingKnown = false;
        let prevHeading = 0;
        let roll = 0;
        let lastTime = performance.now();
        let visible = false;
        let overText = false;
        let overInteractive = false;
        let pressed = false;
        let stateScale = 1; // eases toward the hover/press size each frame
        let lastTarget: EventTarget | null = null;
        let raf = 0;

        const show = () => {
            if (!visible) {
                visible = true;
                root.style.opacity = "1";
            }
        };
        const hide = () => {
            if (visible) {
                visible = false;
                root.style.opacity = "0";
            }
        };

        // stuff a normal cursor would turn into a pointer over. this codebase
        // uses inline style={{ cursor: 'pointer' }} and tailwind's cursor-pointer
        // class a lot, and since we hide the real cursor we can't read the
        // computed style, so we just check for those patterns by hand
        const INTERACTIVE =
            'a, button, [role="button"], select, summary, label, .cursor-pointer, ' +
            '[style*="cursor: pointer"], [style*="cursor:pointer"], [onclick]';
        const EDITABLE = 'input, textarea, [contenteditable="true"]';

        const classifyTarget = (el: HTMLElement | null) => {
            const editable = !!el?.closest(EDITABLE);
            if (editable !== overText) {
                overText = editable;
                document.body.classList.toggle("custom-cursor-text", overText);
            }

            const interactive = !editable && !!el?.closest(INTERACTIVE);
            if (interactive !== overInteractive) {
                overInteractive = interactive;
                root.classList.toggle("paper-cursor-hover", overInteractive);
            }
        };

        const onMove = (e: PointerEvent) => {
            target.x = e.clientX;
            target.y = e.clientY;
            show();

            if (e.target !== lastTarget) {
                lastTarget = e.target;
                classifyTarget(e.target as HTMLElement | null);
            }
        };

        const onDown = (e: PointerEvent) => {
            if (e.button !== 0) return;
            pressed = true;
            root.classList.add("paper-cursor-down");
        };

        const onUp = () => {
            pressed = false;
            root.classList.remove("paper-cursor-down");
        };

        const onLeaveWindow = () => hide();

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("pointerup", onUp, { passive: true });
        window.addEventListener("blur", onUp);
        document.addEventListener("mouseleave", onLeaveWindow);

        const tick = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.05) || 0.016;
            lastTime = now;

            // follow the real cursor, with a bit of smoothing so it doesn't teleport
            const posFactor = 1 - Math.exp(-dt * 22);
            const dx = target.x - pos.x;
            const dy = target.y - pos.y;
            pos.x += dx * posFactor;
            pos.y += dy * posFactor;

            // smooth the velocity too, so tiny jitters don't spin the nose around
            const velFactor = 1 - Math.exp(-dt * 14);
            velocity.x += (dx - velocity.x) * velFactor;
            velocity.y += (dy - velocity.y) * velFactor;

            const speed = Math.hypot(velocity.x, velocity.y);

            if (speed > 0.12) {
                const desired = Math.atan2(velocity.y, velocity.x);
                if (!headingKnown) {
                    heading = desired;
                    prevHeading = desired;
                    headingKnown = true;
                } else {
                    const headingFactor = 1 - Math.exp(-dt * 16);
                    heading += angleDelta(heading, desired) * headingFactor;
                }
            }
            // if the mouse stops, just keep pointing the same way as before

            // tilt into turns based on how fast we're turning
            const turnRate = angleDelta(prevHeading, heading) / dt; // rad/s
            prevHeading = heading;
            const targetRollDeg = Math.max(-30, Math.min(30, (turnRate * 180) / Math.PI * -0.16));
            const rollFactor = 1 - Math.exp(-dt * 9);
            roll += (targetRollDeg - roll) * rollFactor;

            // grow a little on hover, squash down on click, same idea as a
            // normal cursor switching to its pointer or active look
            const stateTarget = pressed ? 0.8 : overInteractive ? 1.18 : 1;
            stateScale += (stateTarget - stateScale) * (1 - Math.exp(-dt * 18));

            const scale = Math.min(1.12, 1 + speed * 0.01) * stateScale;

            // using a plain 2D transform here. the 3D rotateX/preserve-3d/perspective
            // setup wasn't rendering in some browsers, so we fake the bank by
            // squashing the plane vertically instead
            const bank = Math.cos((roll * Math.PI) / 180);

            root.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
            plane.style.transform = `rotate(${(heading * 180) / Math.PI}deg) scale(${scale}) scaleY(${bank})`;

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("blur", onUp);
            document.removeEventListener("mouseleave", onLeaveWindow);
            document.body.classList.remove("custom-cursor-active", "custom-cursor-text");
        };
    }, []);

    return (
        <div ref={rootRef} className="paper-cursor-root" aria-hidden="true">
            {/* the plane sits centered on the mouse and just spins in place as the heading changes */}
            <div ref={planeRef} className="paper-cursor-plane">
                <svg viewBox="-19 -15 38 30">
                    {/* two triangles meeting at the nose, with a notch cut into the tail */}
                    <polygon className="paper-cursor-body" points="17,0 -17,-13 -10,0" />
                    <polygon className="paper-cursor-body" points="17,0 -10,0 -17,13" />
                </svg>
            </div>
        </div>
    );
}
