import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { DemoViewport } from "@/components/DemoViewport";
import { IntroSequence } from "@/components/IntroSequence";
import { PageShell } from "@/components/PageShell";
import { Reveal, SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GESTURELINK — Real-Time Hand Gesture to Text" },
      {
        name: "description",
        content:
          "GESTURELINK turns sign language into instant text and speech, giving the hearing and speech impaired real-time, two-way conversation.",
      },
      { property: "og:title", content: "GESTURELINK — Real-Time Hand Gesture to Text" },
      {
        property: "og:description",
        content: "Instant sign-language translation powered by on-device hand landmark AI.",
      },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    n: "01",
    title: "Motion Capture",
    body: "The camera records gesture input at 60 fps, isolating hands from the background in real time.",
  },
  {
    n: "02",
    title: "AI Landmark Mapping",
    body: "A neural network maps 21 hand keypoints per frame, tracking joint angles and motion trajectories.",
  },
  {
    n: "03",
    title: "Instant Translation",
    body: "Sequences are decoded into natural language and delivered as text and synthesized speech.",
  },
];

const CAPABILITIES = [
  {
    title: "Zero-latency inference",
    body: "Sub-15 ms on-device prediction keeps conversation at human speed — no cloud round-trip.",
  },
  {
    title: "Multi-dialect library",
    body: "ASL, BSL, ISL and regional variants, with a growing community-contributed sign corpus.",
  },
  {
    title: "Offline functionality",
    body: "The full model runs locally, so translation works in classrooms, clinics and transit alike.",
  },
  {
    title: "Two-way communication",
    body: "Speech is transcribed back into captions and animated signing avatars for true dialogue.",
  },
];

function Index() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <IntroSequence onFinish={() => setIntroDone(true)} />

      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <PageShell>
          {/* Hero */}
          <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <motion.h1
                className="text-glow font-display text-4xl font-bold leading-tight sm:text-6xl"
                initial={{ opacity: 0, y: 30 }}
                animate={introDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                Welcome to <span className="text-primary">GESTURELINK</span>
              </motion.h1>
              <motion.p
                className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={introDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.45 }}
              >
                A Real-Time Hand Gesture-to-Text System for the Hearing and Speech Impaired
              </motion.p>
              <motion.div
                className="mt-10 flex flex-wrap justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={introDone ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <Link
                  to="/translator"
                  className="glow-ring min-h-11 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  Launch Live Translator
                </Link>
                <a
                  href="#demo"
                  className="glass min-h-11 rounded-full px-7 py-3 font-semibold text-foreground transition-colors hover:bg-surface-2"
                >
                  Explore Platform
                </a>
              </motion.div>
            </div>
          </section>

          {/* Demo */}
          <section id="demo" className="scroll-mt-24 px-6 py-16">
            <SectionHeading
              eyebrow="Live viewport"
              title="Watch signing become sentences"
              description="Skeletal tracking overlays every joint while text streams out the moment a sign resolves."
            />
            <Reveal className="mx-auto mt-12 max-w-4xl" delay={0.1}>
              <DemoViewport />
            </Reveal>
          </section>

          {/* How it works */}
          <section id="how" className="scroll-mt-24 px-6 py-16">
            <SectionHeading eyebrow="How it works" title="Three steps, milliseconds apart" />
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.12}>
                  <article className="glass h-full rounded-2xl p-7">
                    <p className="font-display text-4xl font-bold text-primary/70">{s.n}</p>
                    <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Capabilities */}
          <section id="capabilities" className="scroll-mt-24 px-6 py-16">
            <SectionHeading eyebrow="Capabilities" title="Engineered for real conversation" />
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
              {CAPABILITIES.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <article className="glass h-full rounded-2xl p-7 transition-transform hover:-translate-y-1">
                    <h3 className="text-lg font-semibold text-primary">{c.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Mission */}
          <section id="mission" className="scroll-mt-24 px-6 py-16">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <div className="glass glow-ring rounded-3xl p-8 sm:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
                    Mission &amp; impact
                  </p>
                  <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                    Independence should never wait for an interpreter
                  </h2>
                  <p className="mt-5 text-muted-foreground">
                    Over 70 million people sign as their first language, yet most everyday
                    counters, clinics and classrooms cannot answer back. GESTURELINK puts a
                    translator in every pocket — so a hospital visit, a job interview or a
                    conversation with a neighbour happens on equal footing, without a third
                    person in the middle.
                  </p>
                  <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                    {[
                      ["70M+", "people signing worldwide"],
                      ["12 ms", "average translation latency"],
                      ["100%", "on-device, private by default"],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="font-display text-3xl font-bold text-primary">{k}</dt>
                        <dd className="mt-1 text-sm text-muted-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </section>
        </PageShell>
      </motion.div>
    </>
  );
}
