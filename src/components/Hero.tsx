"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowDown, FileText } from "lucide-react";
import { hero, profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { NameToggle } from "./NameToggle";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="-mt-[0.18em] block overflow-hidden pb-[0.08em] pt-[0.18em]">
      <m.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </m.span>
    </span>
  );
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export function Hero({ resumeHref }: { resumeHref: string | null }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const washY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [first, last] = profile.name.split(" ");

  return (
    <section
      id="top"
      ref={ref}
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* Watercolor wash: two soft blooms, drifting slowly, moving a little slower than the page. */}
      <m.div aria-hidden="true" style={{ y: washY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute -right-[18%] top-[6%] h-[62vmax] w-[62vmax] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(157,140,255,0.32),rgba(238,141,185,0.18)_42%,transparent_68%)] blur-2xl" />
        <div
          className="animate-drift absolute -right-[4%] top-[34%] h-[38vmax] w-[38vmax] rounded-full bg-[radial-gradient(circle,rgba(244,194,140,0.16),transparent_65%)] blur-2xl"
          style={{ animationDelay: "-9s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </m.div>

      <m.div style={{ y: textY, opacity: fadeOut }} className="mx-auto w-full max-w-6xl px-5 pb-20 pt-32 sm:px-8 md:pb-28">
        <m.p {...fade(0.1)} className="mb-6 text-sm text-mist sm:text-base">
          {profile.location} <span className="mx-2 text-dim" aria-hidden="true">/</span> second-year B.Tech, CSE (AI &amp; ML)
        </m.p>

        <h1 className="text-[clamp(3.75rem,13vw,10.5rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
          <Line delay={0.15}>
            <NameToggle en={first} hi={profile.nameHindi} />
          </Line>
          <Line delay={0.27}>
            <span className="text-wash">{last}</span>
          </Line>
        </h1>

        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-xl">
            <m.p {...fade(0.55)} className="text-xl font-medium leading-snug tracking-tight text-paper sm:text-2xl">
              {profile.identity}
            </m.p>
            <m.p {...fade(0.68)} className="mt-4 font-serif text-lg leading-relaxed text-mist">
              {hero.intro}
            </m.p>
          </div>

          <m.div {...fade(0.82)} className="flex flex-col gap-5 md:items-end">
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                View my work
              </a>
              {resumeHref && (
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener"
                  className="wash-border inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:bg-ink-2"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  View resume
                </a>
              )}
              <a
                href="#contact"
                className="wash-border inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:bg-ink-2"
              >
                Let&apos;s connect
              </a>
            </div>
            <div className="flex items-center gap-1 text-mist">
              <a href={profile.links.github} target="_blank" rel="noopener" aria-label="GitHub profile" className="rounded-full p-2 transition-colors hover:text-paper">
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn profile" className="rounded-full p-2 transition-colors hover:text-paper">
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </m.div>
        </div>

        <m.a
          href="#story"
          {...fade(1.1)}
          className="mt-16 inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-mist"
        >
          <ArrowDown className="h-4 w-4 motion-safe:animate-bounce" aria-hidden="true" />
          How I got here
        </m.a>
      </m.div>
    </section>
  );
}
