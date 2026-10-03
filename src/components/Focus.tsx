import { focus } from "@/data/profile";
import { RevealGroup, RevealItem } from "./Reveal";
import { Section } from "./Section";

export function Focus() {
  return (
    <Section id="focus" title="What I'm working toward" dek="Four things I'm deliberately getting better at right now.">
      <RevealGroup className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {focus.map((f) => (
          <RevealItem key={f.title} className="border-t border-line pt-6">
            <h3 className="text-xl font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-3 max-w-[48ch] font-serif text-[1.075rem] leading-relaxed text-mist">{f.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
