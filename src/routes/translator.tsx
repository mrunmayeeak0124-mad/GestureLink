import { createFileRoute } from "@tanstack/react-router";
import { DemoViewport } from "@/components/DemoViewport";
import { PageShell } from "@/components/PageShell";
import { Reveal, SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/translator")({
  head: () => ({
    meta: [
      { title: "Sign Language Translator — GESTURELINK" },
      {
        name: "description",
        content:
          "Launch the GESTURELINK live translator: skeletal hand tracking, instant transcription and spoken output in one viewport.",
      },
      { property: "og:title", content: "Sign Language Translator — GESTURELINK" },
      {
        property: "og:description",
        content: "Skeletal hand tracking with instant transcription and spoken output.",
      },
    ],
  }),
  component: Translator,
});

function Translator() {
  return (
    <PageShell>
      <section className="px-6 pb-12 pt-20">
        <SectionHeading
          eyebrow="Live translator"
          title="Sign in. Text out. Instantly."
          description="This preview runs a simulated feed. Grant camera access in the full app to translate your own signing."
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <Reveal>
          <DemoViewport />
        </Reveal>
        <Reveal delay={0.1} className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Dialect", "American Sign Language"],
            ["Output", "Text + synthesized speech"],
            ["Mode", "On-device, offline ready"],
          ].map(([k, v]) => (
            <div key={k} className="glass rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-primary">{k}</p>
              <p className="mt-2 text-sm text-foreground">{v}</p>
            </div>
          ))}
        </Reveal>
      </section>
    </PageShell>
  );
}
