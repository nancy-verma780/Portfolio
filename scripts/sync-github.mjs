#!/usr/bin/env node
/**
 * Refreshes src/data/github.json from public GitHub sources:
 *   - contribution calendar: https://github.com/users/<user>/contributions
 *   - pull requests:         GitHub search API (author:<user> type:pr)
 *
 * Run manually with `npm run sync:github`. It also runs before `npm run build`.
 * If the network is unavailable, the existing snapshot is kept, so a build
 * never fails or shows invented numbers.
 *
 * Optional: set GITHUB_TOKEN to avoid the unauthenticated rate limit.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const USER = "nancy-verma780";
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/data/github.json");
// Your own test/sandbox repos are excluded from open-source counts.
const OWN_ORGS = [USER.toLowerCase(), "nancy-verma-labs"];

const headers = { "User-Agent": "portfolio-sync", Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function fetchCalendar() {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, {
    headers: { "User-Agent": "Mozilla/5.0 portfolio-sync" },
  });
  if (!res.ok) throw new Error(`calendar ${res.status}`);
  const html = await res.text();

  const total = Number(
    (html.match(/([\d,]+)\s+contributions?\s+in the last year/) || [])[1]?.replace(/,/g, "") ?? NaN,
  );
  const tips = new Map();
  for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g)) {
    tips.set(m[1], m[2]);
  }
  const days = [];
  for (const m of html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"[^>]*data-level="(\d)"/g)) {
    const tip = tips.get(m[2]) ?? "";
    const count = Number((tip.match(/^(\d+) contribution/) || [])[1] ?? 0);
    days.push({ date: m[1], count, level: Number(m[3]) });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  if (!days.length || Number.isNaN(total)) throw new Error("calendar markup changed");
  return { total, days };
}

async function fetchPullRequests() {
  const items = [];
  for (let page = 1; page <= 10; page++) {
    const url = `https://api.github.com/search/issues?q=author:${USER}+type:pr&per_page=100&page=${page}`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`search ${res.status}`);
    const data = await res.json();
    items.push(...data.items);
    if (items.length >= data.total_count || data.items.length < 100) break;
  }
  return items
    .map((i) => ({
      repo: i.repository_url.split("/repos/")[1],
      title: i.title,
      url: i.html_url,
      state: i.state,
      merged: Boolean(i.pull_request?.merged_at),
      createdAt: i.created_at.slice(0, 10),
    }))
    .filter((p) => !OWN_ORGS.includes(p.repo.split("/")[0].toLowerCase()));
}

async function main() {
  let previous = null;
  try {
    previous = JSON.parse(await readFile(OUT, "utf8"));
  } catch {}

  try {
    const [calendar, prs] = await Promise.all([fetchCalendar(), fetchPullRequests()]);
    const merged = prs.filter((p) => p.merged);
    const byRepo = {};
    for (const p of merged) byRepo[p.repo] = (byRepo[p.repo] ?? 0) + 1;

    const data = {
      user: USER,
      fetchedAt: new Date().toISOString().slice(0, 10),
      contributionsLastYear: calendar.total,
      days: calendar.days,
      pullRequests: {
        opened: prs.length,
        merged: merged.length,
        repos: new Set(prs.map((p) => p.repo)).size,
        reposWithMerged: Object.keys(byRepo).length,
        mergedByRepo: Object.entries(byRepo)
          .sort((a, b) => b[1] - a[1])
          .map(([repo, count]) => ({ repo, count })),
      },
    };
    await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
    console.log(
      `github.json updated: ${data.contributionsLastYear} contributions, ${data.pullRequests.opened} PRs (${data.pullRequests.merged} merged)`,
    );
  } catch (err) {
    if (previous) {
      console.warn(`sync-github: ${err.message}. Keeping snapshot from ${previous.fetchedAt}.`);
    } else {
      console.error(`sync-github: ${err.message} and no snapshot exists.`);
      process.exitCode = 1;
    }
  }
}

main();
