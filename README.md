# Nancy Verma — portfolio

Next.js 16, TypeScript, Tailwind CSS 4, Motion. Fully static, no backend.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # refreshes GitHub data, then builds
npm start
```

## Edit content

Everything you see lives in `src/data/profile.ts`: hero text, story chapters,
projects, skills, milestones, education, "beyond the code". Change it there,
not in the components.

Things to fill in (left empty because they couldn't be verified):

- **Resume:** add your PDF as `public/resume.pdf`. All resume buttons (navbar,
  hero, resume card) appear automatically. Remove the file and they disappear.
- **Education:** set `institution`, `dates`, and `notes` (CGPA/coursework) in
  `education`. Fields left as `null` are simply not shown.
- **LinkedIn:** check `profile.links.linkedin` is the URL you want.

## Contact form

The form sends straight to your inbox through [Web3Forms](https://web3forms.com)
(free, no backend, the key is not secret):

1. Go to web3forms.com, enter nancy45815@gmail.com, and copy the access key
   they email you.
2. Copy `.env.example` to `.env.local` and paste the key after
   `NEXT_PUBLIC_WEB3FORMS_KEY=`. Restart `npm run dev`.
3. On Vercel: Project Settings > Environment Variables > add the same
   variable, then redeploy.

Without a key, the button reads "Send via email" and opens the visitor's
email app with their message filled in, so the form always works.

## Photo and name toggle

Your portrait is `public/nancy.webp` (set in `profile.photo`). The first name
flips between `profile.name` and `profile.nameHindi` (नैंसी): automatically
every few seconds, or on click/tap. It pauses on hover and stays still for
visitors who prefer reduced motion.

## Project visuals

- **Screenshots:** put images in `public/projects/<slug>/` and list them in the
  project's `screens` array in `profile.ts`. The card shows the first and
  cross-fades to the second on hover; the breakdown shows a gallery. PunarPay
  has real screenshots. Add some for the Netflix dashboard from your live demo
  (1440x900 works best).
- **Interactive demos** live in `src/components/demos/`. Each is a port of
  your real project code (CareerAI's analysis modules, PunarPay's policy
  engine, the Netflix intro sound). If you change the project logic, update
  the demo to match.

## GitHub data

`src/data/github.json` is a snapshot (contribution calendar + pull requests)
created by `scripts/sync-github.mjs`. It runs automatically before every build
and keeps the old snapshot if GitHub can't be reached, so numbers are never
made up. Run it manually with `npm run sync:github`. Set `GITHUB_TOKEN` to
avoid rate limits. Highlighted PRs are hand-picked in `notablePRs`.

## Deploy

Push to GitHub and import the repo on Vercel. Set `NEXT_PUBLIC_SITE_URL` to
your final domain so Open Graph links are absolute. Redeploy occasionally (or
add a Vercel cron/deploy hook) to refresh GitHub stats.

## Structure

```
src/app/            layout (fonts, metadata), page, OG image, favicon
src/components/     Navbar, Hero, Story, Focus, Projects, ProjectVisual,
                    OpenSource, Skills, Journey, EducationResume, Beyond,
                    Contact, Footer, Reveal, Section, icons, MotionProvider
src/data/           profile.ts (content), github.json (synced data)
src/fonts/          self-hosted Bricolage Grotesque + Newsreader
scripts/            sync-github.mjs
```
