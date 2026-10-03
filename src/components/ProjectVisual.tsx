import type { Project } from "@/data/profile";

/**
 * Small schematics drawn in SVG, one per project, based on how each project
 * actually works. They animate on card hover via `group-hover` classes.
 */
export function ProjectVisual({ kind, id }: { kind: Project["visual"]; id: string }) {
  const g = `wash-${id}`;
  const defs = (
    <defs>
      <linearGradient id={g} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#9d8cff" />
        <stop offset=".55" stopColor="#ee8db9" />
        <stop offset="1" stopColor="#f4c28c" />
      </linearGradient>
    </defs>
  );
  const node = "fill-ink-2 stroke-line transition-[stroke] duration-500";
  const label = "fill-mist text-[11px] font-[family-name:var(--font-display)]";

  if (kind === "career") {
    const outs = ["skills", "role fit", "gaps", "roadmap"];
    return (
      <svg viewBox="0 0 360 200" className="h-full w-full" role="img" aria-label="Resume flows into skill, role, gap and roadmap analysis">
        {defs}
        <rect x="24" y="44" width="78" height="104" rx="6" className={node} />
        {[64, 78, 92, 106, 120].map((y, i) => (
          <rect key={y} x="36" y={y} width={i % 2 ? 40 : 54} height="5" rx="2.5" className="fill-line" />
        ))}
        <text x="63" y="170" textAnchor="middle" className={label}>resume</text>
        <rect x="140" y="80" width="68" height="40" rx="20" className="fill-ink-2" stroke={`url(#${g})`} />
        <text x="174" y="104" textAnchor="middle" className="fill-paper text-[11px]">FastAPI</text>
        <path d="M102 96 H140" className="stroke-line" strokeWidth="1.5" />
        {outs.map((o, i) => {
          const y = 34 + i * 44;
          return (
            <g key={o}>
              <path
                d={`M208 100 C 240 100, 244 ${y}, 270 ${y}`}
                fill="none"
                stroke={`url(#${g})`}
                strokeWidth="1.5"
                strokeDasharray="120"
                data-draw=""
                style={{ transitionDelay: `${i * 80}ms` }}
              />
              <path d={`M208 100 C 240 100, 244 ${y}, 270 ${y}`} fill="none" className="stroke-line" strokeWidth="1" opacity=".6" />
              <circle cx="274" cy={y} r="4" className="fill-ink-3 stroke-line" />
              <text x="284" y={y + 4} className={label}>{o}</text>
            </g>
          );
        })}
      </svg>
    );
  }

  if (kind === "punar") {
    const steps = ["detect", "diagnose", "decide", "gate"];
    return (
      <svg viewBox="0 0 360 200" className="h-full w-full" role="img" aria-label="Failed payment moves through detect, diagnose, decide and a policy gate, then either acts or escalates">
        {defs}
        {steps.map((s, i) => (
          <g key={s}>
            <rect x={14 + i * 70} y="44" width="60" height="30" rx="5" className={node} />
            <text x={44 + i * 70} y="63" textAnchor="middle" className={label}>{s}</text>
            {i < 3 && <path d={`M${74 + i * 70} 59 H${84 + i * 70}`} className="stroke-line" strokeWidth="1.5" />}
          </g>
        ))}
        <path d="M254 74 V100 H124 V130" fill="none" className="stroke-line" strokeWidth="1.5" />
        <path
          d="M254 74 V100 H124 V130"
          fill="none"
          stroke={`url(#${g})`}
          strokeWidth="2"
          strokeDasharray="6 6"
          data-flow=""
        />
        <path d="M254 100 H290 V130" fill="none" className="stroke-line" strokeWidth="1.5" strokeDasharray="3 4" />
        <rect x="70" y="130" width="108" height="32" rx="16" className="fill-ink-2" stroke={`url(#${g})`} />
        <text x="124" y="150" textAnchor="middle" className="fill-paper text-[11px]">act + verify</text>
        <rect x="240" y="130" width="100" height="32" rx="16" className={node} />
        <text x="290" y="150" textAnchor="middle" className={label}>escalate</text>
        <text x="204" y="94" className="fill-dim text-[10px]">pass</text>
        <text x="296" y="94" className="fill-dim text-[10px]">block</text>
      </svg>
    );
  }

  // stream: a row of title tiles, and the synthesised waveform under it.
  return (
    <svg viewBox="0 0 360 200" className="h-full w-full" role="img" aria-label="A row of title tiles above a synthesised audio waveform">
      {defs}
      <g data-slide="">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={20 + i * 76} y="30" width="66" height="88" rx="5" className={i === 1 ? "fill-ink-3" : "fill-ink-2"} stroke={i === 1 ? `url(#${g})` : undefined} />
        ))}
        <rect x="102" y="104" width="44" height="3" rx="1.5" fill={`url(#${g})`} />
      </g>
      <path
        d="M20 160 L50 140 L50 180 L80 160 L110 140 L110 180 L140 160 L170 140 L200 180 L230 140 L260 180 L290 140 L320 180 L340 160"
        fill="none"
        stroke={`url(#${g})`}
        strokeWidth="1.5"
        strokeLinejoin="round"
        data-glow=""
      />
      <text x="20" y="196" className="fill-dim text-[10px]">sawtooth + triangle oscillators</text>
    </svg>
  );
}
