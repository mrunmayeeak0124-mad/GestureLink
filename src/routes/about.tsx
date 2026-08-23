import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Reveal, SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — GESTURELINK" },
      {
        name: "description",
        content:
          "Why GESTURELINK exists: the team, the research and the accessibility principles behind real-time gesture-to-text translation.",
      },
      { property: "og:title", content: "About Us — GESTURELINK" },
      {
        property: "og:description",
        content: "The team and principles behind real-time gesture-to-text translation.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <section className="px-6 pb-16 pt-20">
        <SectionHeading
          eyebrow="About us"
          title="Built with the deaf community, not for it"
          description="GESTURELINK began as a research collaboration between signers, speech therapists and machine-learning engineers."
        />
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-2">
        {[
          {
            h: "Our origin",
            p: "A prototype built for one student who could not follow a lecture became a platform used across classrooms and clinics.",
          },
          {
            h: "Our research",
            p: "21-keypoint landmark tracking paired with a temporal sequence model, trained on consented, community-contributed sign data.",
          },
          {
            h: "Our accessibility bar",
            p: "WCAG AAA contrast, full keyboard operation, reduced-motion and text-scaling controls shipped as first-class features.",
          },
          {
            h: "Our promise on privacy",
            p: "Frames never leave the device. Translation happens locally, and nothing is stored unless you explicitly save it.",
          },
        ].map((c, i) => (
          <Reveal key={c.h} delay={i * 0.08}>
            <article className="glass h-full rounded-2xl p-7">
              <h2 className="text-lg font-semibold text-primary">{c.h}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{c.p}</p>
            </article>
          </Reveal>
        ))}
      </section>
    </PageShell>
  );
}
