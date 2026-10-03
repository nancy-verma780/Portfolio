import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-semibold text-paper">{profile.name}</p>
          <p className="mt-1 text-mist">CSE (AI &amp; ML) student and developer, {profile.location}.</p>
        </div>
        <div className="flex items-center gap-5 text-mist">
          <a href={profile.links.github} target="_blank" rel="noopener" aria-label="GitHub" className="hover:text-paper"><GitHubIcon className="h-4 w-4" /></a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-paper"><LinkedInIcon className="h-4 w-4" /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-paper"><Mail className="h-4 w-4" /></a>
          <span className="text-dim">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
