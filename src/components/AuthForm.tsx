import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [notice, setNotice] = useState("");
  const isSignup = mode === "signup";

  return (
    <section className="mx-auto max-w-md px-6 pb-24 pt-20">
      <div className="glass glow-ring rounded-3xl p-8">
        <h1 className="text-2xl font-bold">{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isSignup
            ? "Save translations, choose your dialect and join the community."
            : "Log in to pick up your conversations where you left off."}
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setNotice("Accounts aren't connected yet — enable a backend to activate sign-in.");
          }}
        >
          {isSignup && (
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Full name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-foreground placeholder:text-muted-foreground"
                placeholder="Aria Mehta"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-foreground placeholder:text-muted-foreground"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete={isSignup ? "new-password" : "current-password"}
              className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-foreground placeholder:text-muted-foreground"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="glow-ring min-h-11 w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            {isSignup ? "Create account" : "Log in"}
          </button>

          <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
            {notice}
          </p>
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          {isSignup ? "Already have an account? " : "New to GESTURELINK? "}
          <Link to={isSignup ? "/login" : "/signup"} className="font-semibold text-primary underline">
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </p>
      </div>
    </section>
  );
}
