"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, XIcon } from "./icons";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

const SOCIALS = [
  { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: profile.links.github, Icon: GitHubIcon },
  { label: "X", href: profile.links.x, Icon: XIcon },
  { label: "LeetCode", href: profile.links.leetcode, Icon: LeetCodeIcon },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_80%_at_20%_100%,rgba(157,140,255,0.14),transparent_70%),radial-gradient(50%_70%_at_80%_100%,rgba(244,194,140,0.08),transparent_70%)]" />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-24 pt-24 sm:px-8 md:pb-32 md:pt-36 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 id="contact-title" className="text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
              Have something interesting to build?
            </h2>
            <p className="mt-6 max-w-md font-serif text-xl leading-relaxed text-mist">
              I&apos;m open to internships, open-source collaborations, and hackathon teams. Leave a note here, or reach me directly.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-paper transition-colors hover:bg-ink-2"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="wash-border inline-flex items-center justify-center gap-2 rounded-full border border-line px-4 py-3 text-sm text-mist transition-colors hover:bg-ink-2 hover:text-paper"
            >
              {copied ? <Check className="h-4 w-4 text-apricot" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </button>
          </Reveal>

          <Reveal delay={0.16}>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-4">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-mist transition-colors hover:text-paper">
                    <Icon className="h-4 w-4" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
