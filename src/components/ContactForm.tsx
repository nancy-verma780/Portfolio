"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Check, Loader2, Send } from "lucide-react";
import { profile } from "@/data/profile";

/**
 * Sends to your inbox through Web3Forms (https://web3forms.com, free, no backend).
 * Put your access key in NEXT_PUBLIC_WEB3FORMS_KEY (see .env.example).
 * Without a key the form still works: it opens the visitor's email app,
 * pre-filled and addressed to you, so nothing is ever silently lost.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const TOPICS = ["Internship or job", "Collaboration", "Hackathon team", "Just saying hi"];

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-paper placeholder:text-dim transition-colors focus:border-violet focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-violet/30";

export function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const org = String(data.get("organization") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!ACCESS_KEY) {
      const body = `${message}\n\n${name}${org ? `, ${org}` : ""}\n${email}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`${topic}: from ${name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio: ${topic} from ${name}`,
          from_name: "Portfolio contact form",
          replyto: email,
          name,
          email,
          organization: org || "Not given",
          topic,
          message,
          botcheck: data.get("botcheck") ? true : "",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "The message couldn't be sent.");
      setStatus("sent");
      form.reset();
      setTopic(TOPICS[0]);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "The message couldn't be sent.");
    }
  }

  return (
    <div className="relative rounded-2xl border border-line bg-ink-2/70 p-6 backdrop-blur-sm sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <m.div
            key="sent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[26rem] flex-col items-start justify-center"
            role="status"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[image:var(--wash)] text-ink">
              <Check className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-6 text-2xl font-semibold tracking-tight">Message sent.</p>
            <p className="mt-2 font-serif text-lg text-mist">Thank you. I read everything and usually reply within a couple of days.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm text-mist underline underline-offset-4 hover:text-paper">
              Send another message
            </button>
          </m.div>
        ) : (
          <m.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} className="space-y-5" noValidate={false}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-mist">Your name</span>
                <input name="name" required autoComplete="name" className={field} placeholder="Aarav Sharma" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-mist">Email</span>
                <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm text-mist">
                Company, college or project <span className="text-dim">(optional)</span>
              </span>
              <input name="organization" autoComplete="organization" className={field} />
            </label>

            <fieldset>
              <legend className="mb-2 text-sm text-mist">What&apos;s this about?</legend>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <label key={t} className="cursor-pointer">
                    <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="peer sr-only" />
                    <span className="inline-block rounded-full border border-line px-3.5 py-1.5 text-sm text-mist transition-colors peer-checked:border-transparent peer-checked:bg-paper peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-apricot hover:text-paper">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="mb-2 block text-sm text-mist">Message</span>
              <textarea name="message" required rows={5} minLength={10} className={`${field} resize-y`} placeholder="What are you building, and how can I help?" />
            </label>

            {/* Honeypot for bots; hidden from people and assistive tech. */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            {status === "error" && (
              <p role="alert" className="rounded-lg border border-rose/40 px-4 py-3 text-sm text-paper">
                {error} You can also email me directly at{" "}
                <a href={`mailto:${profile.email}`} className="underline underline-offset-2">{profile.email}</a>.
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-[image:var(--wash)] px-6 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
              >
                {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                {status === "sending" ? "Sending…" : ACCESS_KEY ? "Send message" : "Send via email"}
              </button>
              {!ACCESS_KEY && <p className="text-xs text-dim">Opens your email app with this message filled in.</p>}
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
