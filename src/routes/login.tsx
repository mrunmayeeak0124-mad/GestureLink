import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In — GESTURELINK" },
      {
        name: "description",
        content: "Log in to GESTURELINK to access your saved translations and dialect preferences.",
      },
      { property: "og:title", content: "Log In — GESTURELINK" },
      { property: "og:description", content: "Access your GESTURELINK translation workspace." },
    ],
  }),
  component: () => (
    <PageShell>
      <AuthForm mode="login" />
    </PageShell>
  ),
});
