import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CookieBanner from "./components/CookieBanner";
import Curtain from "./components/Curtain";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import MeshBg from "./components/MeshBg";
import Nav from "./components/Nav";
import TopBanner from "./components/TopBanner";
import { useParallax, useReveal } from "./lib/hooks";
import { TIMING } from "./config/timing";

/**
 * Root layout. Orchestrates:
 *  - The intro loader (full-screen, ~1.7s)
 *  - The curtain page transition that plays on every route change
 *  - Scroll-to-top on route change (or scroll-to-hash when an anchor is present)
 *  - Reveal-on-scroll + parallax hooks scoped to the current page
 *  - The persistent shell: mesh bg, top banner, nav, footer, cookie banner
 */
export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const { pathname, hash } = useLocation();
  const isFirstRender = useRef(true);

  // Intro loader — only fires once on mount.
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), TIMING.LOADER_MS);
    return () => clearTimeout(id);
  }, []);

  // Curtain transition on every route change (skipped on first render).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Defer setState by one frame so we don't trigger a cascading render.
    const raf = requestAnimationFrame(() => setTransitioning(true));
    const id = setTimeout(() => setTransitioning(false), TIMING.CURTAIN_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(id);
    };
  }, [pathname]);

  // Scroll behavior: jump to anchor if present, otherwise scroll to top.
  useEffect(() => {
    if (hash) {
      const id = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, TIMING.HASH_SCROLL_DELAY_MS);
      return () => clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  useReveal([pathname]);
  useParallax([pathname]);

  return (
    <>
      <Loader done={!loading} />
      <MeshBg />
      <TopBanner />
      <Nav />
      <div className={"page-wrap " + (transitioning ? "is-trans" : "")}>
        <Outlet />
      </div>
      <Footer />
      <CookieBanner />
      <Curtain on={transitioning} />
    </>
  );
}
