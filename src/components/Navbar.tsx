"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { FileText, Menu, X } from "lucide-react";

const LINKS = [
  { id: "story", label: "Story" },
  { id: "projects", label: "Projects" },
  { id: "open-source", label: "Open source" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ resumeHref }: { resumeHref: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section that occupies the middle band of the viewport.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const top = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), { threshold: 0.4 });
    const hero = document.getElementById("top");
    if (hero) top.observe(hero);
    return () => {
      io.disconnect();
      top.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open
          ? "border-b border-line/70 bg-ink/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5 font-semibold tracking-tight" onClick={() => setOpen(false)}>
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[image:var(--wash)] transition-transform duration-500 group-hover:scale-125" />
          Nancy Verma
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-300 ${
                    isActive ? "text-paper" : "text-mist hover:text-paper"
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-px h-px origin-left bg-[image:var(--wash)] transition-transform duration-500 ease-[var(--ease-out-soft)] ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {resumeHref && (
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener"
              className="wash-border hidden items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm text-paper transition-colors hover:bg-ink-2 sm:inline-flex"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Resume
            </a>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="h-[calc(100dvh-4rem)] border-t border-line/70 bg-ink px-5 pb-10 pt-6 lg:hidden"
          >
            <ul className="flex flex-col">
              {LINKS.map((l, i) => (
                <m.li
                  key={l.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-line/60 py-4 text-2xl font-medium tracking-tight ${
                      active === l.id ? "text-paper" : "text-mist"
                    }`}
                  >
                    {l.label}
                  </a>
                </m.li>
              ))}
            </ul>
            {resumeHref && (
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 font-medium text-ink"
              >
                <FileText className="h-4 w-4" aria-hidden="true" /> Open resume
              </a>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
