import { useEffect, useRef, useState } from "react";

const PHRASES = [
  "Hello",
  "Hello, my",
  "Hello, my name",
  "Hello, my name is Aria.",
  "Hello, my name is Aria. Nice",
  "Hello, my name is Aria. Nice to meet you!",
];

/** 21 MediaPipe-style hand keypoints, normalised 0-1 inside the viewport. */
const KEYPOINTS: [number, number][] = [
  [0.5, 0.86],
  [0.4, 0.79],
  [0.33, 0.7],
  [0.29, 0.61],
  [0.25, 0.54],
  [0.45, 0.56],
  [0.43, 0.42],
  [0.42, 0.33],
  [0.41, 0.26],
  [0.53, 0.54],
  [0.54, 0.39],
  [0.54, 0.29],
  [0.55, 0.22],
  [0.61, 0.56],
  [0.63, 0.43],
  [0.64, 0.34],
  [0.65, 0.27],
  [0.68, 0.6],
  [0.72, 0.5],
  [0.74, 0.43],
  [0.76, 0.37],
];

const BONES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [0, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [0, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20],
  [5, 9],
  [9, 13],
  [13, 17],
];

export function DemoViewport() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [caption, setCaption] = useState(PHRASES[PHRASES.length - 1]!);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % PHRASES.length;
      setCaption(PHRASES[i]!);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;

    const draw = () => {
      const { width: cw, height: ch } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      t += reduced ? 0 : 0.02;
      const px = (k: [number, number], i: number) => {
        const sway = Math.sin(t * 1.6 + i * 0.45) * 0.012;
        const lift = Math.cos(t * 1.2 + i * 0.3) * 0.014;
        return [(k[0] + sway) * cw, (k[1] + lift) * ch] as const;
      };

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(150, 245, 240, 0.75)";
      ctx.shadowColor = "rgba(150, 245, 240, 0.9)";
      ctx.shadowBlur = 12;
      for (const [a, b] of BONES) {
        const [ax, ay] = px(KEYPOINTS[a]!, a);
        const [bx, by] = px(KEYPOINTS[b]!, b);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      KEYPOINTS.forEach((k, i) => {
        const [x, y] = px(k, i);
        ctx.beginPath();
        ctx.arc(x, y, i === 0 ? 5 : 3.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(226, 255, 253, 0.95)";
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="glass glow-ring overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-3 text-xs">
        <span className="flex items-center gap-2 font-medium text-foreground">
          <span className="size-2.5 animate-pulse rounded-full bg-destructive" aria-hidden="true" />
          Live camera feed (simulated)
        </span>
        <span className="text-muted-foreground">21 keypoints · 12 ms inference</span>
      </div>

      <div className="relative aspect-video grid-lines bg-surface">
        <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-6 rounded-2xl border border-primary/40" />
      </div>

      <div className="border-t border-border px-5 py-4">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Transcription</p>
        <p aria-live="polite" className="mt-2 min-h-14 font-display text-xl text-foreground sm:text-2xl">
          {caption}
          <span className="ml-1 inline-block animate-pulse text-primary">|</span>
        </p>
      </div>
    </div>
  );
}
