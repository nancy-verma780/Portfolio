import { existsSync } from "node:fs";
import path from "node:path";
import { Beyond } from "@/components/Beyond";
import { Contact } from "@/components/Contact";
import { EducationResume } from "@/components/EducationResume";
import { Focus } from "@/components/Focus";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Navbar } from "@/components/Navbar";
import { OpenSource } from "@/components/OpenSource";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Story } from "@/components/Story";
import { profile } from "@/data/profile";

// Drop your resume at public/resume.pdf and every resume button appears automatically.
const RESUME_FILE = "resume.pdf";
const resumeHref = existsSync(path.join(process.cwd(), "public", RESUME_FILE)) ? `/${RESUME_FILE}` : null;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.x],
  knowsAbout: ["Python", "TypeScript", "Next.js", "FastAPI", "Machine Learning", "Open source"],
};

export default function Home() {
  return (
    <>
      <Navbar resumeHref={resumeHref} />
      <main id="main">
        <Hero resumeHref={resumeHref} />
        <Story />
        <Focus />
        <Projects />
        <OpenSource />
        <Skills />
        <Journey />
        <EducationResume resumeHref={resumeHref} />
        <Beyond />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
