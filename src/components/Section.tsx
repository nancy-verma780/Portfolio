import { Reveal } from "./Reveal";

/** Section shell with a consistent heading treatment. */
export function Section({
  id,
  title,
  dek,
  children,
  className = "",
  aside,
}: {
  id: string;
  title: string;
  dek?: string;
  children: React.ReactNode;
  className?: string;
  /** Optional element shown beside the heading on larger screens. */
  aside?: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32 ${className}`}>
      <div className={aside ? "mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between md:mb-16" : ""}>
      <Reveal className={aside ? "max-w-2xl" : "mb-12 max-w-2xl md:mb-16"}>
        <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-[-0.02em] text-paper sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
          {title}
        </h2>
        {dek && <p className="mt-4 font-serif text-lg leading-relaxed text-mist md:text-xl">{dek}</p>}
      </Reveal>
      {aside}
      </div>
      {children}
    </section>
  );
}
