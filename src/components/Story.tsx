"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { profile, story } from "@/data/profile";
import { Section } from "./Section";

export function Story() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <Section
      id="story"
      title="How I got here"
      dek="If we were meeting for the first time and you asked me to introduce myself, this is roughly what I'd say."
      aside={
        <m.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.9 }}
          className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-3"
        >
          <div className="relative h-24 w-24 overflow-hidden rounded-full p-[2px] sm:h-36 sm:w-36 md:h-40 md:w-40">
            <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[image:var(--wash)] opacity-80" />
            <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-ink">
              <Image
                src={profile.photo}
                alt="Nancy Verma"
                fill
                sizes="(min-width: 768px) 160px, (min-width: 640px) 144px, 96px"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
          <figcaption className="font-serif text-lg text-mist">Hi, I&apos;m Nancy.</figcaption>
        </m.figure>
      }
    >
      <ol ref={listRef} className="relative">
        {/* Track and the wash that paints down it as you scroll. */}
        <div aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:left-[calc(9rem+7px)]" />
        <m.div
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="absolute bottom-2 left-[6px] top-2 w-[3px] origin-top rounded-full bg-[linear-gradient(180deg,var(--color-violet),var(--color-rose)_55%,var(--color-apricot))] md:left-[calc(9rem+6px)]"
        />

        {story.map((c, i) => (
          <li key={c.title} className="relative grid gap-3 pb-16 pl-10 last:pb-0 md:grid-cols-[9rem_1fr] md:gap-0 md:pl-0">
            <m.span
              aria-hidden="true"
              className="absolute left-0 top-[0.4rem] h-[15px] w-[15px] rounded-full border border-line bg-ink md:left-36"
              initial={{ scale: 0.6, backgroundColor: "#0d0e14" }}
              whileInView={{ scale: 1, backgroundColor: i === story.length - 1 ? "#f4c28c" : "#ee8db9" }}
              viewport={{ once: true, margin: "0px 0px -40% 0px" }}
              transition={{ duration: 0.5 }}
            />
            <m.p
              className="text-sm font-medium text-mist md:pr-8 md:pt-1 md:text-right"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -30% 0px" }}
            >
              {c.when}
            </m.p>
            <m.div
              className="md:pl-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -25% 0px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold tracking-[-0.015em] text-paper md:text-[1.75rem]">{c.title}</h3>
              <div className="mt-4 max-w-[62ch] space-y-4 font-serif text-[1.125rem] leading-[1.7] text-paper/80">
                {c.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              {(c.tags || c.refs) && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {c.tags?.map((t) => (
                    <span key={t} className="rounded-md border border-line bg-ink-2 px-2 py-1 text-xs text-mist">
                      {t}
                    </span>
                  ))}
                  {c.refs?.map((r) => (
                    <a
                      key={r.href}
                      href={r.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1 px-1 text-xs text-mist underline decoration-line underline-offset-4 transition-colors hover:text-paper hover:decoration-rose"
                    >
                      {r.label}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </m.div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
