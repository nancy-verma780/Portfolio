"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { m } from "motion/react";
import { ArrowUpRight, ExternalLink, MousePointerClick, X } from "lucide-react";
import { earlyBuilds, projects, upcoming, type Project } from "@/data/profile";
import { GitHubIcon } from "./icons";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const demoLoading = () => <div className="h-48 animate-pulse rounded-xl bg-ink" />;
const DEMOS = {
  career: dynamic(() => import("./demos/CareerDemo").then((m) => m.CareerDemo), { ssr: false, loading: demoLoading }),
  punar: dynamic(() => import("./demos/PunarDemo").then((m) => m.PunarDemo), { ssr: false, loading: demoLoading }),
  tudum: dynamic(() => import("./demos/TudumDemo").then((m) => m.TudumDemo), { ssr: false, loading: demoLoading }),
};
const DEMO_TITLE: Record<Project["demo"], string> = {
  career: "Try the analysis pipeline",
  punar: "Run a failed payment through the gate",
  tudum: "Hear the synthesised intro",
};

/** Real screenshots in a quiet browser frame; the second one fades in on hover. */
function ScreenStack({ screens, wide }: { screens: NonNullable<Project["screens"]>; wide?: boolean }) {
  const [a, b] = screens;
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full overflow-hidden rounded-lg border border-line bg-ink shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.025]">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-ink-3" />
          <span className="h-2 w-2 rounded-full bg-ink-3" />
          <span className="h-2 w-2 rounded-full bg-ink-3" />
        </div>
        <div className="relative aspect-[16/10]">
          <Image src={a.src} alt={a.alt} fill sizes={wide ? "(min-width: 768px) 520px, 100vw" : "(min-width: 768px) 560px, 100vw"} className="object-cover object-top" />
          {b && (
            <Image src={b.src} alt="" aria-hidden="true" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover object-top opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, onOpen, wide }: { p: Project; onOpen: (p: Project) => void; wide?: boolean }) {
  return (
    <article
      className={`wash-border group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-2/60 transition-[transform,background-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:bg-ink-2 ${
        wide ? "md:grid md:grid-cols-[1.1fr_1fr]" : ""
      }`}
    >
      <div
        className={`relative aspect-[9/5] border-b border-line bg-[radial-gradient(120%_90%_at_80%_0%,rgba(157,140,255,0.08),transparent_60%)] p-4 transition-[background-color] duration-700 group-hover:bg-ink-3/50 ${
          wide ? "md:order-2 md:aspect-auto md:border-b-0 md:border-l md:p-8" : ""
        }`}
      >
        {p.screens?.length ? <ScreenStack screens={p.screens} wide={wide} /> : <ProjectVisual kind={p.visual} id={p.slug} />}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-ink/80 px-2.5 py-1 text-[11px] text-mist backdrop-blur">
          <MousePointerClick className="h-3 w-3" aria-hidden="true" /> Interactive demo inside
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${wide ? "md:p-10" : ""}`}>
        <p className="text-xs text-mist">{p.status}</p>
        <h3 className={`mt-2 font-semibold tracking-[-0.02em] text-paper ${wide ? "text-3xl md:text-4xl" : "text-2xl"}`}>
          {p.name}
        </h3>
        <p className="mt-3 font-serif text-lg leading-snug text-paper/85">{p.oneLiner}</p>

        <dl className="mt-5 space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="text-dim">Problem</dt>
            <dd className="text-mist">{p.problem}</dd>
          </div>
          <div>
            <dt className="text-dim">My role</dt>
            <dd className="text-mist">{p.role}</dd>
          </div>
        </dl>

        {wide && (
          <ul className="mt-5 space-y-1.5 text-sm text-mist">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {p.stack.map((t) => (
            <li key={t} className="rounded-md border border-line px-2 py-0.5 text-xs text-mist transition-colors duration-300 group-hover:border-ink-3 group-hover:bg-ink-3 group-hover:text-paper/90">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-7">
          {/* Stretched button: the whole card opens the breakdown; links below sit above it. */}
          <button
            type="button"
            onClick={() => onOpen(p)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-paper after:absolute after:inset-0 after:content-['']"
            aria-haspopup="dialog"
          >
            Read the breakdown
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
          <a href={p.links.github} target="_blank" rel="noopener" className="relative z-[2] inline-flex items-center gap-1.5 text-sm text-mist hover:text-paper">
            <GitHubIcon className="h-4 w-4" /> Code
          </a>
          {p.links.live && (
            <a href={p.links.live} target="_blank" rel="noopener" className="relative z-[2] inline-flex items-center gap-1.5 text-sm text-mist hover:text-paper">
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function DetailBlock({ title, items, list }: { title: string; items: string[]; list?: boolean }) {
  return (
    <section className="border-t border-line py-7">
      <h4 className="mb-3 text-sm font-medium text-mist">{title}</h4>
      {list ? (
        <ul className="space-y-2 text-[0.95rem] text-paper/85">
          {items.map((t) => (
            <li key={t} className="flex gap-3">
              <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-rose" />
              {t}
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-3 font-serif text-[1.075rem] leading-[1.7] text-paper/85">
          {items.map((t) => (
            <p key={t.slice(0, 30)}>{t}</p>
          ))}
        </div>
      )}
    </section>
  );
}

function Demo({ kind }: { kind: Project["demo"] }) {
  const D = DEMOS[kind];
  return <D />;
}

function Gallery({ screens }: { screens: NonNullable<Project["screens"]> }) {
  const [i, setI] = useState(0);
  const cur = screens[i];
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-line bg-ink">
        <div className="relative aspect-[16/10]">
          <Image key={cur.src} src={cur.src} alt={cur.alt} fill sizes="(min-width: 640px) 700px, 100vw" className="object-cover object-top motion-safe:animate-[fadein_400ms_ease]" />
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-mist">{cur.caption}</figcaption>
      {screens.length > 1 && (
        <div className="mt-3 flex gap-2" role="group" aria-label="Screenshots">
          {screens.map((sc, j) => (
            <button
              key={sc.src}
              type="button"
              onClick={() => setI(j)}
              aria-label={`Show screenshot ${j + 1}: ${sc.caption}`}
              aria-current={i === j}
              className={`relative aspect-[16/10] w-24 overflow-hidden rounded-md border transition-opacity ${i === j ? "border-rose opacity-100" : "border-line opacity-60 hover:opacity-100"}`}
            >
              <Image src={sc.src} alt="" fill sizes="96px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Move focus into the dialog once its content has rendered.
  useEffect(() => {
    if (project) requestAnimationFrame(() => closeRef.current?.focus());
  }, [project]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!project && d.open) d.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="project-dialog-title"
      className="m-0 h-[100dvh] max-h-none w-full max-w-none bg-transparent p-0 sm:m-auto sm:h-auto sm:max-h-[90dvh] sm:max-w-3xl sm:rounded-2xl"
    >
      {project && (
        <m.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="relative h-full overflow-y-auto border-line bg-ink-2 sm:max-h-[90dvh] sm:rounded-2xl sm:border"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink-2/90 px-6 py-4 backdrop-blur sm:px-10">
            <p className="text-sm text-mist">{project.status}</p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-paper hover:bg-ink-3"
              aria-label="Close project details"
              ref={closeRef}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-6 pb-10 pt-8 sm:px-10">
            <h3 id="project-dialog-title" className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
              {project.name}
            </h3>
            <p className="mt-3 max-w-[60ch] font-serif text-xl leading-snug text-paper/85">{project.oneLiner}</p>

            {project.screens?.length ? <Gallery screens={project.screens} /> : null}

            <section className="my-8 rounded-xl border border-line bg-ink-3/40 p-5 sm:p-6">
              <h4 className="mb-4 flex items-center gap-2 text-base font-semibold tracking-tight">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[image:var(--wash)]" />
                {DEMO_TITLE[project.demo]}
              </h4>
              <Demo kind={project.demo} />
            </section>

            <section className="mb-8">
              <h4 className="mb-3 text-sm font-medium text-mist">How it fits together</h4>
              <div className="aspect-[9/5] rounded-xl border border-line bg-ink p-4 sm:p-6" data-vis-active>
                <ProjectVisual kind={project.visual} id={`${project.slug}-dlg`} />
              </div>
            </section>

            <DetailBlock title="Problem" items={[project.problem]} />
            <DetailBlock title="Approach" items={project.detail.approach} />
            <DetailBlock title="Architecture" items={project.detail.architecture} list />
            <section className="border-t border-line py-7">
              <h4 className="mb-3 text-sm font-medium text-mist">Technologies</h4>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <li key={t} className="rounded-md border border-line bg-ink px-2.5 py-1 text-sm text-paper/85">
                    {t}
                  </li>
                ))}
              </ul>
            </section>
            <DetailBlock title="Challenges" items={project.detail.challenges} />
            <DetailBlock title="Outcome" items={project.detail.outcome} />

            <div className="flex flex-wrap gap-3 border-t border-line pt-7">
              <a href={project.links.github} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink">
                <GitHubIcon className="h-4 w-4" /> View the code
              </a>
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener" className="wash-border inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" /> Open live demo
                </a>
              )}
            </div>
          </div>
        </m.div>
      )}
    </dialog>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const [featured, ...rest] = projects;

  return (
    <Section
      id="projects"
      title="Things I've built"
      dek="Three projects I'd walk you through in an interview, one I'm about to start, and where it all began."
    >
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <Reveal className="md:col-span-2">
          <ProjectCard p={featured} onOpen={setOpen} wide />
        </Reveal>
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08} className="flex">
            <ProjectCard p={p} onOpen={setOpen} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-[1fr_1.1fr] md:gap-6">
        <Reveal>
          <a
            href={upcoming.github}
            target="_blank"
            rel="noopener"
            className="wash-border group block h-full rounded-2xl border border-dashed border-line p-6 transition-colors hover:bg-ink-2/60 sm:p-7"
          >
            <p className="text-xs text-mist">Up next</p>
            <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold tracking-tight">
              {upcoming.name}
              <ArrowUpRight className="h-4 w-4 text-mist transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </h3>
            <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-paper/80">{upcoming.oneLiner}</p>
            <p className="mt-4 text-sm text-mist">{upcoming.status}</p>
            <p className="mt-2 text-sm text-dim">Planned stack: {upcoming.stack.join(", ")}</p>
          </a>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-2xl border border-line p-6 sm:p-7">
            <p className="text-xs text-mist">Where it started, 2025</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">Early Python builds</h3>
            <ul className="mt-4 divide-y divide-line/70">
              {earlyBuilds.map((b) => (
                <li key={b.name}>
                  <a href={b.href} target="_blank" rel="noopener" className="group flex items-baseline justify-between gap-4 py-2.5 text-sm">
                    <span className="text-paper transition-colors group-hover:text-rose">{b.name}</span>
                    <span className="text-right text-mist">{b.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <ProjectDialog project={open} onClose={close} />
    </Section>
  );
}
