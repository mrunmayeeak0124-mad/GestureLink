import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Reveal, SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — GESTURELINK" },
      {
        name: "description",
        content:
          "Join the GESTURELINK community: contribute signs, mentor new signers and help expand the multi-dialect sign library.",
      },
      { property: "og:title", content: "Community — GESTURELINK" },
      {
        property: "og:description",
        content: "Contribute signs, mentor new signers and expand the sign library.",
      },
    ],
  }),
  component: Community,
});

function Community() {
  return (
    <PageShell>
      <section className="px-6 pb-12 pt-20">
        <SectionHeading
          eyebrow="Community"
          title="The library grows with every signer"
          description="Contributors record, review and verify signs so regional dialects are represented accurately."
        />
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-3">
        {[
          { h: "Contribute a sign", p: "Record a short clip; two verified reviewers confirm it before it enters the corpus." },
          { h: "Mentor circles", p: "Weekly practice rooms pairing new signers with fluent mentors across time zones." },
          { h: "Accessibility council", p: "Deaf and hard-of-hearing members steer the roadmap and veto inaccessible features." },
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
