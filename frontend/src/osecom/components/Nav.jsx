import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo-osecom.png";
import { NAV_ITEMS } from "../config/site";
import { ROUTES } from "../config/routes";

/**
 * Sticky top navigation.
 *  - On wide screens: brand left, nav links centered, "Book a call" CTA right.
 *  - On narrow screens (≤ 980px): hamburger button replaces nav links and
 *    opens a fullscreen drawer. Scroll is locked while the drawer is open.
 */
export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Close drawer on route change. Use a microtask so we don't trigger a
  // cascading render inside the effect body.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // Lock scroll while drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isItemActive = (item) =>
    item.end
      ? pathname === item.to
      : pathname === item.to || pathname.startsWith(item.to + "/");

  return (
    <>
      <header className="nav">
        <div className="nav__inner">
          <Link to={ROUTES.home} className="brand">
            <img src={logo} alt="OseCom" className="brand__logo" />
          </Link>

          <nav className="nav__links">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={
                  "nav__link " + (isItemActive(item) ? "is-active" : "")
                }
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <Link to={ROUTES.contact} className="nav__cta nav__cta--desktop">
            Book a call
            <ArrowRight />
          </Link>

          <button
            type="button"
            className={"nav__burger " + (open ? "is-open" : "")}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <MobileDrawer
        open={open}
        items={NAV_ITEMS}
        isItemActive={isItemActive}
        onNavigate={() => setOpen(false)}
      />
    </>
  );
}

function MobileDrawer({ open, items, isItemActive, onNavigate }) {
  return (
    <div
      className={"mobile-drawer " + (open ? "is-open" : "")}
      role="dialog"
      aria-hidden={!open}
    >
      <nav className="mobile-drawer__links">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={
              "mobile-drawer__link " + (isItemActive(item) ? "is-active" : "")
            }
            onClick={onNavigate}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Link to={ROUTES.contact} className="btn btn--olive mobile-drawer__cta" onClick={onNavigate}>
        Book a call
        <ArrowRight />
      </Link>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M1 7 L 13 7 M 8 2 L 13 7 L 8 12"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
