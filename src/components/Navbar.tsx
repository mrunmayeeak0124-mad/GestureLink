import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/translator", label: "Sign Language Translator" },
  { to: "/community", label: "Community" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        aria-label="Primary"
        className="glass mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6"
      >
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-[0.22em] text-primary text-glow"
        >
          GESTURELINK
        </Link>

        <ul className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:order-none sm:w-auto">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/login"
            className="min-h-11 rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="glow-ring min-h-11 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
