import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Prefs = { reducedMotion: boolean; highContrast: boolean; scale: number };
const KEY = "gesturelink:a11y";

export function Footer() {
  const [prefs, setPrefs] = useState<Prefs>({
    reducedMotion: false,
    highContrast: false,
    scale: 1,
  });

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setPrefs({ ...JSON.parse(raw) });
      } catch {
        /* ignore malformed prefs */
      }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("reduce-motion", prefs.reducedMotion);
    root.classList.toggle("hc", prefs.highContrast);
    root.style.setProperty("--text-scale", String(prefs.scale));
    localStorage.setItem(KEY, JSON.stringify(prefs));
  }, [prefs]);

  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold tracking-[0.22em] text-primary">
            GESTURELINK
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Real-time hand gesture-to-text for the hearing and speech impaired.
          </p>
        </div>

        <nav aria-label="Site map">
          <h2 className="text-sm font-semibold text-foreground">Site map</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/translator", label: "Sign Language Translator" },
              { to: "/community", label: "Community" },
              { to: "/login", label: "Log In" },
              { to: "/signup", label: "Sign Up" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="a11y-settings">
          <h2 id="a11y-settings" className="text-sm font-semibold text-foreground">
            Accessibility settings
          </h2>
          <div className="mt-4 space-y-3 text-sm">
            <label className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Reduce motion</span>
              <input
                type="checkbox"
                className="size-5 accent-[var(--primary)]"
                checked={prefs.reducedMotion}
                onChange={(e) => setPrefs((p) => ({ ...p, reducedMotion: e.target.checked }))}
              />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">High contrast</span>
              <input
                type="checkbox"
                className="size-5 accent-[var(--primary)]"
                checked={prefs.highContrast}
                onChange={(e) => setPrefs((p) => ({ ...p, highContrast: e.target.checked }))}
              />
            </label>
            <label className="block">
              <span className="text-muted-foreground">Text size ({Math.round(prefs.scale * 100)}%)</span>
              <input
                type="range"
                min={0.9}
                max={1.4}
                step={0.05}
                value={prefs.scale}
                onChange={(e) => setPrefs((p) => ({ ...p, scale: Number(e.target.value) }))}
                className="mt-2 w-full accent-[var(--primary)]"
              />
            </label>
          </div>
        </section>
      </div>

      <div className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GESTURELINK. Built for accessible human connection.
      </div>
    </footer>
  );
}
