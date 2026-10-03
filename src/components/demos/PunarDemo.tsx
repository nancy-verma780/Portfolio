"use client";

import { useMemo, useState } from "react";
import { Check, ShieldAlert, X } from "lucide-react";

/*
 * Direct port of getAIAssessmentSync() and runPolicyCheckSync() from
 * PunarPay/final.html, with the default merchant policies from appState.
 */

const POLICIES = {
  maxRetryAttempts: 2,
  maxAutomatedAmount: 10000,
  minAIConfidence: 80,
  cooldownHours: 24,
  maxCustomerRecoveryAttempts: 3,
  humanEscalationEnabled: true,
  duplicateProtectionEnabled: true,
};

const REASONS = [
  { id: "insufficient_funds", label: "Insufficient funds" },
  { id: "do_not_honor", label: "Issuer declined (do not honor)" },
  { id: "auth_failed", label: "Authentication failed" },
  { id: "network_timeout", label: "Network timeout" },
  { id: "expired_card", label: "Expired card" },
];

type Tx = {
  failure_reason: string;
  payment_status: "failed" | "unknown_timeout";
  amount: number;
  attempt_count: number;
  hours_since_last_attempt: number;
  customer_recovery_attempts: number;
};

function assess(tx: Tx) {
  let diagnosis: string, action: string, confidence: number, risk: number, recovery: number;
  if (tx.failure_reason === "insufficient_funds") {
    [diagnosis, action, confidence, risk, recovery] = ["temporary_insufficient_funds", "Smart retry in the salary window", 0.88, 0.25, 0.86];
  } else if (tx.failure_reason === "do_not_honor" || tx.failure_reason === "auth_failed") {
    [diagnosis, action, confidence, risk, recovery] = ["card_issuer_decline", "Send an interactive SMS payment link", 0.91, 0.4, 0.78];
  } else if (tx.failure_reason === "network_timeout" || tx.payment_status === "unknown_timeout") {
    [diagnosis, action, confidence, risk, recovery] = ["upstream_gateway_timeout", "Verify upstream gateway status", 0.95, 0.15, 0.9];
  } else if (tx.failure_reason === "expired_card") {
    [diagnosis, action, confidence, risk, recovery] = ["expired_payment_method", "Send card update prompt", 0.72, 0.65, 0.48];
  } else {
    [diagnosis, action, confidence, risk, recovery] = ["checkout_abandonment", "Send targeted incentive recovery link", 0.78, 0.5, 0.68];
  }
  return { diagnosis, action, confidence, risk, recovery, requiresHuman: tx.amount > POLICIES.maxAutomatedAmount };
}

function policyCheck(tx: Tx, ai: ReturnType<typeof assess>) {
  const checks: { rule: string; passed: boolean; reason: string }[] = [];
  let passed = true;
  const add = (rule: string, ok: boolean, reason: string) => {
    checks.push({ rule, passed: ok, reason });
    if (!ok) passed = false;
  };
  add("Max retry attempts", tx.attempt_count < POLICIES.maxRetryAttempts, `${tx.attempt_count} of ${POLICIES.maxRetryAttempts} allowed`);
  add("Max automated amount", tx.amount <= POLICIES.maxAutomatedAmount, `₹${tx.amount.toLocaleString("en-IN")} vs ₹${POLICIES.maxAutomatedAmount.toLocaleString("en-IN")} limit`);
  add("Min AI confidence", ai.confidence * 100 >= POLICIES.minAIConfidence, `${Math.round(ai.confidence * 100)}% vs ${POLICIES.minAIConfidence}% required`);
  add(
    "Cooldown period",
    !(tx.hours_since_last_attempt && tx.hours_since_last_attempt < POLICIES.cooldownHours),
    tx.hours_since_last_attempt ? `${tx.hours_since_last_attempt}h since last try, ${POLICIES.cooldownHours}h needed` : "No previous attempt",
  );
  add("Customer retry limit", tx.customer_recovery_attempts < POLICIES.maxCustomerRecoveryAttempts, `${tx.customer_recovery_attempts} of ${POLICIES.maxCustomerRecoveryAttempts} used`);
  add(
    "Duplicate payment risk",
    !(POLICIES.duplicateProtectionEnabled && tx.payment_status === "unknown_timeout"),
    tx.payment_status === "unknown_timeout" ? "Bank state unknown: money may have moved" : "Bank state known",
  );
  const escalate = ai.requiresHuman || (!passed && POLICIES.humanEscalationEnabled);
  checks.push({ rule: "Human escalation", passed: !escalate, reason: escalate ? "Sent to a person for review" : "Not needed" });
  return { passed, checks, escalate };
}

function Slider({ label, value, min, max, step = 1, format, onChange }: {
  label: string; value: number; min: number; max: number; step?: number; format: (v: number) => string; onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex justify-between text-sm">
        <span className="text-mist">{label}</span>
        <span className="tabular-nums text-paper">{format(value)}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 w-full accent-[#ee8db9]" />
    </label>
  );
}

export function PunarDemo() {
  const [tx, setTx] = useState<Tx>({
    failure_reason: "insufficient_funds",
    payment_status: "failed",
    amount: 2499,
    attempt_count: 1,
    hours_since_last_attempt: 30,
    customer_recovery_attempts: 1,
  });
  const set = <K extends keyof Tx>(k: K, v: Tx[K]) => setTx((t) => ({ ...t, [k]: v }));

  const ai = useMemo(() => assess(tx), [tx]);
  const gate = useMemo(() => policyCheck(tx, ai), [tx, ai]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-mist">Why the payment failed</span>
          <select
            value={tx.failure_reason}
            onChange={(e) => set("failure_reason", e.target.value)}
            className="mt-2 w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-paper"
          >
            {REASONS.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-3 text-sm text-mist">
          <input
            type="checkbox"
            checked={tx.payment_status === "unknown_timeout"}
            onChange={(e) => set("payment_status", e.target.checked ? "unknown_timeout" : "failed")}
            className="h-4 w-4 accent-[#ee8db9]"
          />
          Bank timed out, so we don&apos;t know if money moved
        </label>
        <Slider label="Amount" value={tx.amount} min={499} max={20000} step={100} format={(v) => `₹${v.toLocaleString("en-IN")}`} onChange={(v) => set("amount", v)} />
        <Slider label="Retries already made" value={tx.attempt_count} min={0} max={3} format={String} onChange={(v) => set("attempt_count", v)} />
        <Slider label="Hours since last try" value={tx.hours_since_last_attempt} min={0} max={48} format={(v) => (v ? `${v}h` : "none")} onChange={(v) => set("hours_since_last_attempt", v)} />
        <Slider label="Customer's past recoveries" value={tx.customer_recovery_attempts} min={0} max={4} format={String} onChange={(v) => set("customer_recovery_attempts", v)} />
      </div>

      <div aria-live="polite" className="rounded-xl border border-line bg-ink p-5">
        <p className="text-xs text-dim">Diagnosis</p>
        <p className="mt-1 font-medium text-paper">{ai.diagnosis.replaceAll("_", " ")}</p>
        <p className="mt-1 text-sm text-mist">
          Suggests: {ai.action}. Confidence {Math.round(ai.confidence * 100)}%, risk {Math.round(ai.risk * 100)}%.
        </p>

        <ul className="mt-5 space-y-2">
          {gate.checks.map((c) => (
            <li key={c.rule} className="flex items-start gap-2.5 text-sm">
              {c.passed ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet" aria-label="passed" />
              ) : (
                <X className="mt-0.5 h-4 w-4 shrink-0 text-rose" aria-label="failed" />
              )}
              <span>
                <span className="text-paper/90">{c.rule}</span>
                <span className="block text-xs text-dim">{c.reason}</span>
              </span>
            </li>
          ))}
        </ul>

        <div
          className={`mt-5 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
            gate.passed ? "bg-[image:var(--wash)] text-ink" : "border border-rose/50 text-paper"
          }`}
        >
          {gate.passed ? <Check className="h-4 w-4" aria-hidden="true" /> : <ShieldAlert className="h-4 w-4 text-rose" aria-hidden="true" />}
          {gate.passed ? `Act: ${ai.action}` : gate.escalate ? "Blocked. Escalated to a human with an audit trail." : "Blocked by policy."}
        </div>
      </div>
      <p className="text-xs leading-relaxed text-dim lg:col-span-2">
        Same rules and default merchant limits as PunarPay&apos;s policy engine, ported from the project source.
      </p>
    </div>
  );
}
