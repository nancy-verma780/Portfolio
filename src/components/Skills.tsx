import { skills } from "@/data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section
      id="skills"
      title="Tools I actually use"
      dek="No percentages. Where I've used something in a project, it says where, so you can go and check."
    >
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
        {skills.map((g, gi) => (
          <Reveal key={g.group} delay={(gi % 2) * 0.06}>
            <h3 className="mb-3 text-sm font-medium text-mist">{g.group}</h3>
            <ul className="divide-y divide-line/70 border-t border-line/70">
              {g.items.map((s) => (
                <li key={s.name} className="group grid grid-cols-[minmax(7.5rem,auto)_1fr] items-baseline gap-4 py-2.5">
                  <span className="text-[0.975rem] font-medium text-paper transition-colors group-hover:text-rose">{s.name}</span>
                  <span className="text-right text-sm text-dim transition-colors group-hover:text-mist">{s.where ?? ""}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
