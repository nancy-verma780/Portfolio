"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

/** Split into user-perceived letters, so Devanagari clusters (नैं, सी) stay whole. */
function graphemes(text: string) {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

const INTERVAL = 3800;

/**
 * Flips the first name between English and Devanagari, letter by letter.
 * Cycles on its own (paused on hover/focus and for reduced motion); click or tap to flip.
 */
export function NameToggle({ en, hi, startDelay = 1600 }: { en: string; hi: string; startDelay?: number }) {
  const [hindi, setHindi] = useState(false);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setAuto(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!auto || paused || reduce) return;
    const t = setInterval(() => setHindi((h) => !h), INTERVAL);
    return () => clearInterval(t);
  }, [auto, paused, reduce]);

  const text = hindi ? hi : en;
  const letters = useMemo(() => graphemes(text), [text]);

  return (
    <button
      type="button"
      onClick={() => setHindi((h) => !h)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label={en}
      aria-pressed={hindi}
      title={hindi ? "Show in English" : "Show in Hindi"}
      className="group/name relative block cursor-pointer text-left [perspective:900px] focus-visible:outline-offset-8"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={text}
          aria-hidden="true"
          lang={hindi ? "hi" : "en"}
          className={`flex ${hindi ? "font-[family-name:var(--font-deva)] text-[0.86em] font-bold leading-[1.0465]" : ""}`}
        >
          {letters.map((ch, i) => (
            <m.span
              key={`${ch}-${i}`}
              className="inline-block origin-bottom will-change-transform"
              initial={{ rotateX: -95, y: "28%", opacity: 0, filter: "blur(6px)" }}
              animate={{ rotateX: 0, y: "0%", opacity: 1, filter: "blur(0px)" }}
              exit={{ rotateX: 95, y: "-28%", opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </m.span>
          ))}
        </m.span>
      </AnimatePresence>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 top-[0.18em] translate-x-full rounded-full border border-line bg-ink-2/80 px-2.5 py-1 font-[family-name:var(--font-display)] text-[0.75rem] font-medium leading-none tracking-normal text-mist opacity-0 backdrop-blur transition-opacity duration-300 group-hover/name:opacity-100 group-focus-visible/name:opacity-100"
      >
        {hindi ? "English" : "हिन्दी"}
      </span>
    </button>
  );
}
