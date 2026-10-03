import { Coffee, Languages, Palette, PenLine } from "lucide-react";
import { beyond } from "@/data/profile";
import { RevealGroup, RevealItem } from "./Reveal";
import { Section } from "./Section";

const ICONS = [Palette, Languages, PenLine, Coffee];

export function Beyond() {
  return (
    <Section id="beyond" title="Beyond the code" dek="A few things a list of technologies won't tell you.">
      <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {beyond.map((b, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <RevealItem key={b.title} className="bg-ink p-7 sm:p-8">
              <Icon className="h-5 w-5 text-rose" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-2 font-serif text-[1.05rem] leading-relaxed text-mist">{b.body}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
