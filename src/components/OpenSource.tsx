"use client";

import { useMemo, useRef } from "react";
import { useInView } from "motion/react";
import { ArrowUpRight, GitMerge } from "lucide-react";
import github from "@/data/github.json";
import { notablePRs, profile } from "@/data/profile";
import { GitHubIcon } from "./icons";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Section } from "./Section";

const LEVEL_FILL = [
  "var(--color-ink-3)",
  "rgba(157,140,255,0.45)",
  "rgba(157,140,255,0.9)",
  "var(--color-rose)",
  "var(--color-apricot)",
];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtDate(iso: string) {
  const [y, mth, d] = iso.split("-").map(Number);
  return `${MONTHS[mth - 1]} ${d}, ${y}`;
}

function Heatmap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const { weeks, monthLabels } = useMemo(() => {
    const weeks: (typeof github.days)[] = [];
    let current: typeof github.days = [];
    github.days.forEach((d) => {
      const dow = new Date(`${d.date}T00:00:00Z`).getUTCDay();
      if (dow === 0 && current.length) {
        weeks.push(current);
        current = [];
      }
      current.push(d);
    });
    if (current.length) weeks.push(current);

    const monthLabels: { x: number; label: string }[] = [];
    let last = -1;
    weeks.forEach((w, i) => {
      const mth = Number(w[0].date.slice(5, 7)) - 1;
      // Skip a label that would collide with the previous one (e.g. a partial first month).
      const prev = monthLabels[monthLabels.length - 1];
      if (mth !== last && i < weeks.length - 2) {
        if (prev && i - prev.x < 3) monthLabels.pop();
        monthLabels.push({ x: i, label: MONTHS[mth] });
        last = mth;
      }
    });
    return { weeks, monthLabels };
  }, []);

  const cell = 11;
  const gap = 3;
  const width = weeks.length * (cell + gap);
  const height = 7 * (cell + gap) + 18;

  return (
    <div ref={ref} data-on={inView || undefined} className="overflow-x-auto pb-2 [scrollbar-width:thin]">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[720px]"
        role="img"
        aria-label={`GitHub contribution calendar: ${github.contributionsLastYear} contributions in the year up to ${fmtDate(github.fetchedAt)}, concentrated between May and August 2026.`}
      >
        {monthLabels.map((mo) => (
          <text key={`${mo.label}-${mo.x}`} x={mo.x * (cell + gap)} y={10} className="fill-dim text-[9px]">
            {mo.label}
          </text>
        ))}
        {weeks.map((w, wi) => (
          <g key={wi} transform={`translate(${wi * (cell + gap)}, 18)`}>
            {w.map((d) => {
              const dow = new Date(`${d.date}T00:00:00Z`).getUTCDay();
              return (
                <rect
                  key={d.date}
                  y={dow * (cell + gap)}
                  width={cell}
                  height={cell}
                  rx={2.5}
                  fill={LEVEL_FILL[d.level]}
                  className="heat-cell"
                  style={{ transitionDelay: `${wi * 14}ms` }}
                >
                  <title>{`${d.count} contribution${d.count === 1 ? "" : "s"} on ${fmtDate(d.date)}`}</title>
                </rect>
              );
            })}
          </g>
        ))}
      </svg>
      <style>{`
        .heat-cell { opacity: 0; transition: opacity 500ms ease; }
        [data-on] .heat-cell { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .heat-cell { opacity: 1; transition: none; } }
      `}</style>
    </div>
  );
}

export function OpenSource() {
  const pr = github.pullRequests;
  const top = pr.mergedByRepo.slice(0, 8);
  const max = top[0]?.count ?? 1;

  return (
    <Section
      id="open-source"
      title="Open source"
      dek="Most of what I've learned about real codebases came from other people's repositories."
    >
      <Reveal>
        <p className="max-w-3xl text-2xl font-medium leading-snug tracking-tight text-paper/90 md:text-3xl">
          In the last year: <span className="text-wash">{github.contributionsLastYear} contributions</span>,{" "}
          {pr.opened} pull requests to {pr.repos} projects I don&apos;t own, and{" "}
          <span className="text-wash">{pr.merged} merged</span> across {pr.reposWithMerged} of them.
        </p>
        <p className="mt-3 text-sm text-dim">Synced from GitHub on {fmtDate(github.fetchedAt)}.</p>
      </Reveal>

      <Reveal className="mt-12 rounded-2xl border border-line bg-ink-2/50 p-5 sm:p-7">
        <Heatmap />
        <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-dim" aria-hidden="true">
          Less
          {LEVEL_FILL.map((f) => (
            <span key={f} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: f }} />
          ))}
          More
        </div>
      </Reveal>

      <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="mb-6 text-lg font-semibold tracking-tight">Where my merged PRs landed</h3>
          <RevealGroup as="ul" className="space-y-3.5">
            {top.map((r) => (
              <RevealItem as="li" key={r.repo}>
                <a href={`https://github.com/${r.repo}/pulls?q=is%3Apr+author%3A${github.user}+is%3Amerged`} target="_blank" rel="noopener" className="group block">
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="truncate text-paper/90 transition-colors group-hover:text-paper">{r.repo.split("/")[1]}</span>
                    <span className="tabular-nums text-mist">{r.count}</span>
                  </div>
                  <div className="mt-1.5 h-[3px] rounded-full bg-ink-3">
                    <div className="h-full rounded-full bg-[image:var(--wash)] opacity-70 transition-opacity group-hover:opacity-100" style={{ width: `${(r.count / max) * 100}%` }} />
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-semibold tracking-tight">A few I&apos;m proud of</h3>
          <RevealGroup as="ul" className="divide-y divide-line/70 border-y border-line/70">
            {notablePRs.map((p) => (
              <RevealItem as="li" key={p.title}>
                <a
                  href={`https://github.com/${p.repo}/pulls?q=is%3Apr+author%3A${github.user}`}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-start gap-3 py-3.5"
                >
                  <GitMerge className="mt-0.5 h-4 w-4 shrink-0 text-violet" aria-hidden="true" />
                  <span className="flex-1">
                    <span className="block text-[0.95rem] text-paper/90 group-hover:text-paper">{p.title}</span>
                    <span className="block text-xs text-dim">{p.repo}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-dim transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" aria-hidden="true" />
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      <Reveal className="mt-14">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2.5 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
        >
          <GitHubIcon className="h-4 w-4" /> View GitHub
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </Reveal>
    </Section>
  );
}
