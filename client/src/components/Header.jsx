import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
            1Fi
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-brand-700" : "hover:text-slate-900"
            }
          >
            Shop
          </NavLink>
          <a href="#emi-plans" className="hidden hover:text-slate-900 sm:inline">
            EMI plans
          </a>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            Secure checkout
          </span>
        </nav>
      </div>
    </header>
  );
}
