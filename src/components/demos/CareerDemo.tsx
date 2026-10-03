"use client";

import { useMemo, useState } from "react";

/*
 * Direct port of CareerAI/backend/ai_models/*.py. Same vocabularies, same
 * scoring, same quirks, so this demo shows what the real backend returns.
 */

// skill_extractor.py: the skills the extractor can currently detect.
const VOCAB = ["python", "java", "react", "machine learning", "sql", "tensorflow", "pandas", "numpy", "fastapi"];

// career_recommender.py
const CAREERS: Record<string, string[]> = {
  "Machine Learning Engineer": ["python", "machine learning", "tensorflow", "pytorch", "numpy", "pandas"],
  "Data Scientist": ["python", "sql", "statistics", "pandas", "numpy"],
  "Frontend Engineer": ["html", "css", "javascript", "react", "typescript"],
  "Backend Engineer": ["python", "fastapi", "sql", "mongodb"],
};

// skill_gap.py (main.py always compares against "machine learning engineer")
const GAP_TARGET = "machine learning engineer";
const CAREER_SKILLS: Record<string, string[]> = {
  "machine learning engineer": ["python", "machine learning", "statistics", "numpy", "pandas", "scikit-learn", "deep learning", "tensorflow", "pytorch"],
};

// roadmap.py
const ROADMAPS: Record<string, string[]> = {
  "Machine Learning Engineer": ["Python Advanced", "NumPy", "Pandas", "Statistics", "Machine Learning", "Scikit-learn", "Deep Learning", "TensorFlow", "MLOps"],
  "Data Scientist": ["Python", "SQL", "Statistics", "Pandas", "Data Visualization", "Machine Learning"],
  "Frontend Engineer": ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript"],
};

// project_recommender.py
const PROJECTS: Record<string, string[]> = {
  "Machine Learning Engineer": ["Plant Disease Detection", "Resume ATS Analyzer", "AI Interview Assistant"],
  "Frontend Engineer": ["Portfolio Website", "E-commerce Store", "Chat Application"],
  "Backend Engineer": ["URL Shortener", "Blog API", "Authentication System"],
};

function recommendCareer(skills: string[]) {
  let bestRole: string | null = null;
  let bestScore = 0;
  for (const [role, req] of Object.entries(CAREERS)) {
    const score = req.filter((s) => skills.includes(s)).length;
    if (score > bestScore) {
      bestScore = score;
      bestRole = role;
    }
  }
  return { role: bestRole, matchScore: bestScore };
}

const resumeScore = (skills: string[]) => Math.min(100, 40 + skills.length * 5);
const skillGap = (skills: string[]) => (CAREER_SKILLS[GAP_TARGET] ?? []).filter((s) => !skills.includes(s));

export function CareerDemo() {
  const [skills, setSkills] = useState<string[]>(["python", "react", "sql"]);

  const result = useMemo(() => {
    const career = recommendCareer(skills);
    return {
      career,
      score: resumeScore(skills),
      gap: skillGap(skills),
      roadmap: career.role ? ROADMAPS[career.role] ?? [] : [],
      projects: career.role ? PROJECTS[career.role] ?? [] : [],
    };
  }, [skills]);

  const toggle = (s: string) => setSkills((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-sm text-mist">Pretend these skills were found in a resume:</legend>
        <div className="flex flex-wrap gap-2">
          {VOCAB.map((s) => {
            const on = skills.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors duration-200 ${
                  on ? "border-transparent bg-paper text-ink" : "border-line text-mist hover:border-mist hover:text-paper"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div aria-live="polite" className="grid gap-4 rounded-xl border border-line bg-ink p-5 sm:grid-cols-2">
        <div>
          <p className="text-xs text-dim">Recommended role</p>
          <p className="mt-1 text-xl font-semibold tracking-tight">
            {result.career.role ?? <span className="text-mist">No match yet</span>}
          </p>
          {result.career.role && <p className="text-sm text-mist">matches {result.career.matchScore} of its core skills</p>}
        </div>
        <div>
          <p className="text-xs text-dim">Resume score</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-3">
              <div className="h-full rounded-full bg-[image:var(--wash)] transition-[width] duration-500" style={{ width: `${result.score}%` }} />
            </div>
            <span className="tabular-nums text-paper">{result.score}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-dim">Missing for ML Engineer</p>
          <p className="mt-1 text-sm leading-relaxed text-paper/85">{result.gap.length ? result.gap.join(", ") : "Nothing missing"}</p>
        </div>
        <div>
          <p className="text-xs text-dim">Roadmap and project ideas</p>
          <p className="mt-1 text-sm leading-relaxed text-paper/85">
            {result.roadmap.length ? result.roadmap.slice(0, 4).join(" › ") + (result.roadmap.length > 4 ? " …" : "") : "No roadmap defined for this role yet"}
          </p>
          {result.projects.length > 0 && <p className="mt-1 text-sm text-mist">Build: {result.projects.join(", ")}</p>}
        </div>
      </div>
      <p className="text-xs leading-relaxed text-dim">
        Runs the same rules as CareerAI&apos;s backend (career_recommender, skill_gap, resume_score, roadmap, project_recommender), ported to the browser. The live app adds PDF/DOCX parsing, Supabase history and the Gemini mentor.
      </p>
    </div>
  );
}
