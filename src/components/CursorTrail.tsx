import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; life: number };

/**
 * Canvas light-trail cursor. Pointer-fine devices only; disabled when the
 * user prefers reduced motion (native cursor is restored in that case).
 */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("reduce-motion");
    if (!fine || reduced) return;

    document.documentElement.classList.add("cursor-none-fine");

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: P[] = [];
    let mx = w / 2;
    let my = h / 2;
    let cx = mx;
    let cy = my;
    let down = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const n = down ? 5 : 3;
      for (let k = 0; k < n; k++) {
        particles.push({
          x: mx,
          y: my,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          life: 1,
        });
      }
      if (particles.length > 420) particles.splice(0, particles.length - 420);
    };
    const onDown = () => (down = true);
    const onUp = () => (down = false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.life -= 0.028;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const r = 16 * p.life;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `rgba(160, 255, 246, ${0.32 * p.life})`);
        g.addColorStop(1, "rgba(90, 220, 220, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      cx += (mx - cx) * 0.28;
      cy += (my - cy) * 0.28;

      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      halo.addColorStop(0, "rgba(180, 255, 250, 0.5)");
      halo.addColorStop(1, "rgba(120, 235, 235, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.arc(mx, my, down ? 4.5 : 3.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(226, 255, 253, 0.95)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 13, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(140, 245, 240, 0.55)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("cursor-none-fine");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
}
