"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";

/*
 * playTudumSound() from Netflix-streaming-dashboard/src/App.jsx, unchanged,
 * plus an AnalyserNode so the page can draw the waveform while it plays.
 */
function playTudum(ctx: AudioContext, out: AudioNode) {
  const now = ctx.currentTime;

  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = "sawtooth";
  subOsc.frequency.setValueAtTime(82.41, now);
  subOsc.frequency.exponentialRampToValueAtTime(55.0, now + 0.4);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(180, now);
  subGain.gain.setValueAtTime(0.01, now);
  subGain.gain.linearRampToValueAtTime(0.7, now + 0.1);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
  subOsc.connect(lp);
  lp.connect(subGain);
  subGain.connect(out);

  [110.0, 164.81, 220.0, 277.18, 329.63, 440.0].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = i % 2 === 0 ? "triangle" : "sawtooth";
    osc.frequency.setValueAtTime(freq, now + 0.12);
    osc.frequency.linearRampToValueAtTime(freq * 0.99, now + 2.0);
    g.gain.setValueAtTime(0.001, now + 0.12);
    g.gain.linearRampToValueAtTime(0.25, now + 0.22);
    g.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.setValueAtTime(120, now);
    osc.connect(hp);
    hp.connect(g);
    g.connect(out);
    osc.start(now + 0.12);
    osc.stop(now + 2.4);
  });

  subOsc.start(now);
  subOsc.stop(now + 2.4);
}

export function TudumDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    ctxRef.current?.close();
  }, []);

  function drawIdle() {
    const c = canvasRef.current;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    g.clearRect(0, 0, c.width, c.height);
    g.strokeStyle = "#252836";
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(0, c.height / 2);
    g.lineTo(c.width, c.height / 2);
    g.stroke();
  }

  useEffect(drawIdle, []);

  async function play() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = ctxRef.current ?? new AC();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.connect(ctx.destination);
    playTudum(ctx, analyser);
    setPlaying(true);

    const c = canvasRef.current!;
    const g = c.getContext("2d")!;
    const data = new Uint8Array(analyser.fftSize);
    const grad = g.createLinearGradient(0, 0, c.width, 0);
    grad.addColorStop(0, "#9d8cff");
    grad.addColorStop(0.55, "#ee8db9");
    grad.addColorStop(1, "#f4c28c");
    const end = performance.now() + 2600;

    const frame = () => {
      analyser.getByteTimeDomainData(data);
      g.clearRect(0, 0, c.width, c.height);
      g.lineWidth = 2.5;
      g.strokeStyle = grad;
      g.beginPath();
      const step = c.width / data.length;
      data.forEach((v, i) => {
        const y = (v / 255) * c.height;
        if (i === 0) g.moveTo(0, y);
        else g.lineTo(i * step, y);
      });
      g.stroke();
      if (performance.now() < end) rafRef.current = requestAnimationFrame(frame);
      else {
        setPlaying(false);
        drawIdle();
        analyser.disconnect();
      }
    };
    cancelAnimationFrame(rafRef.current);
    frame();
  }

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-xl border border-line bg-ink p-5 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={play}
          disabled={playing}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-opacity disabled:opacity-60"
        >
          {playing ? <Volume2 className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          {playing ? "Playing…" : "Play the sound"}
        </button>
        <canvas ref={canvasRef} width={720} height={120} className="h-[90px] w-full min-w-0 flex-1" aria-label="Live waveform of the synthesised sound" role="img" />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-dim">
        Not an audio file: a sawtooth sub-bass through a low-pass filter, plus six triangle and sawtooth tones through high-pass filters, generated live by the same code as the project. Turn your volume on.
      </p>
    </div>
  );
}
