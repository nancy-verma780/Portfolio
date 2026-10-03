import { Download, FileText, GraduationCap } from "lucide-react";
import { education } from "@/data/profile";
import { Reveal } from "./Reveal";

export function EducationResume({ resumeHref }: { resumeHref: string | null }) {
  return (
    <section id="education" aria-labelledby="education-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-28">
      <div className={`grid gap-6 ${resumeHref ? "md:grid-cols-[1.2fr_1fr]" : ""}`}>
        <Reveal className="rounded-2xl border border-line p-7 sm:p-9">
          <GraduationCap className="h-5 w-5 text-mist" aria-hidden="true" />
          <h2 id="education-title" className="mt-5 text-sm font-medium text-mist">Education</h2>
          <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{education.degree}</p>
          <p className="mt-2 font-serif text-lg text-paper/80">Specialising in {education.specialization}</p>
          {education.institution && <p className="mt-4 text-paper/90">{education.institution}</p>}
          <p className="mt-4 text-sm text-mist">
            {education.dates ?? education.stage}
            {education.dates && <span className="text-dim">, {education.stage.toLowerCase()}</span>}
          </p>
          {education.notes && <p className="mt-3 text-sm text-mist">{education.notes}</p>}
        </Reveal>

        {resumeHref && (
          <Reveal delay={0.08} className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-7 sm:p-9">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(238,141,185,0.22),transparent_65%)] blur-xl" />
            <FileText className="relative h-5 w-5 text-mist" aria-hidden="true" />
            <h2 className="relative mt-5 text-sm font-medium text-mist">Resume</h2>
            <p className="relative mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Everything above, on one page.</p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <a href={resumeHref} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink">
                <FileText className="h-4 w-4" aria-hidden="true" /> Open resume
              </a>
              <a href={resumeHref} download className="wash-border inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium">
                <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
