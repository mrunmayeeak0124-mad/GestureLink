import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — GESTURELINK" },
      {
        name: "description",
        content:
          "Create a free GESTURELINK account to save translations, pick your dialect and join the signing community.",
      },
      { property: "og:title", content: "Sign Up — GESTURELINK" },
      { property: "og:description", content: "Create a free GESTURELINK account." },
    ],
  }),
  component: () => (
    <PageShell>
      <AuthForm mode="signup" />
    </PageShell>
  ),
});
