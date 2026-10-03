import { ArrowUpRight } from "lucide-react";
import { milestones } from "@/data/profile";
import { RevealGroup, RevealItem } from "./Reveal";
import { Section } from "./Section";

export function Journey() {
  return (
    <Section id="journey" title="Programs and milestones" dek="Only the things that happened, and why each one mattered to me.">
      <RevealGroup as="ul" className="border-t border-line">
        {milestones.map((ms) => {
          const Title = (
            <span className="inline-flex items-center gap-1.5">
              {ms.title}
              {ms.href && <ArrowUpRight className="h-4 w-4 text-mist transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />}
            </span>
          );
          return (
            <RevealItem as="li" key={ms.title} className="border-b border-line">
              <div className="group grid gap-2 py-7 md:grid-cols-[6rem_1fr_1.2fr] md:gap-8">
                <p className="text-sm text-mist">{ms.year}</p>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {ms.href ? (
                      <a href={ms.href} target="_blank" rel="noopener" className="hover:text-rose">{Title}</a>
                    ) : (
                      Title
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-dim">{ms.org}</p>
                </div>
                <div className="font-serif text-[1.05rem] leading-relaxed text-paper/80">
                  <p>{ms.what}</p>
                  <p className="mt-1 text-mist">{ms.why}</p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
