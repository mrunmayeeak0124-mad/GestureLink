import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Phase = "splash" | "video" | "done";

export function IntroSequence({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<Phase>("splash");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      finish();
      return;
    }
    const t = setTimeout(() => setPhase("video"), 2600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "video") return;
    const v = videoRef.current;
    void v?.play().catch(() => finish());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function finish() {
    setPhase("done");
    onFinish();
  }

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-background"
          role="dialog"
          aria-label="GESTURELINK introduction"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.12, filter: "blur(14px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {phase === "splash" && (
              <motion.div
                key="splash"
                className="relative flex flex-col items-center gap-6 px-6 text-center"
                exit={{ opacity: 0, scale: 1.06 }}
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  className="absolute -z-10 size-[420px] rounded-full opacity-40 blur-3xl"
                  style={{ background: "var(--gradient-glow)" }}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: [0.3, 1.05, 0.9], opacity: [0, 0.5, 0.35] }}
                  transition={{ duration: 2.4, ease: "easeOut" }}
                />
                <motion.div
                  className="size-24 rounded-full border-2 border-primary"
                  initial={{ scale: 0, rotate: -120, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ boxShadow: "var(--shadow-glow)" }}
                />
                <motion.h1
                  className="text-glow font-display text-4xl font-bold tracking-[0.32em] text-primary sm:text-6xl"
                  initial={{ opacity: 0, y: 24, letterSpacing: "0.6em" }}
                  animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
                  transition={{ duration: 1.2, delay: 0.25 }}
                >
                  GESTURELINK
                </motion.h1>
                <motion.p
                  className="max-w-md text-sm text-muted-foreground sm:text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Initializing the gesture gateway…
                </motion.p>
              </motion.div>
            )}

            {phase === "video" && (
              <motion.div
                key="video"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <video
                  ref={videoRef}
                  className="size-full object-cover"
                  src="/gesturelink-intro.mp4"
                  muted
                  playsInline
                  autoPlay
                  preload="auto"
                  onEnded={finish}
                  onError={finish}
                  aria-label="Cinematic introduction depicting hands and human connection"
                />
                <div className="pointer-events-none absolute inset-0 bg-background/25" />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={finish}
            className="glass absolute bottom-8 right-6 min-h-11 rounded-full px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
