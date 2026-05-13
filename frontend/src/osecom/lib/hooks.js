import { useEffect } from "react";
import { REVEAL } from "../config/timing";

/**
 * Adds an `in-view` class on any `[data-reveal]` element when it enters
 * the viewport, then unobserves it so animations don't replay. Re-runs
 * when `deps` change (typically the current route) so newly-mounted
 * sections are picked up.
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: REVEAL.THRESHOLD, rootMargin: REVEAL.ROOT_MARGIN }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Subtle inward horizontal drift used on every page's hero: as the user
 * scrolls through the section, the text column shifts right and the media
 * column shifts left, both proportional to how far we've scrolled through
 * the section. `maxShift` is the cap in pixels each side reaches at the
 * exit of the section.
 */
export function useHeroDrift(sectionRef, textRef, mediaRef, maxShift = 36) {
  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const media = mediaRef.current;
    if (!section || !text || !media) return;

    // On mobile the hero columns stack vertically at full width — a
    // horizontal drift would push them past the viewport and cause a
    // page-wide horizontal scroll.
    const mql = window.matchMedia("(max-width: 860px)");
    const reset = () => {
      text.style.transform = "";
      media.style.transform = "";
    };

    let active = !mql.matches;
    const onScroll = () => {
      if (!active) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      const shift = progress * maxShift;
      text.style.transform = `translate3d(${shift}px, 0, 0)`;
      media.style.transform = `translate3d(${-shift}px, 0, 0)`;
    };
    const onChange = (e) => {
      active = !e.matches;
      if (!active) reset();
      else onScroll();
    };
    if (!active) reset();
    else onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    mql.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mql.removeEventListener("change", onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Translates any `[data-parallax="<factor>"]` element vertically on
 * scroll. A factor of 0.15 means the element moves at 15% of scroll speed.
 * Writes the offset to a `--py` CSS custom property so the element's own
 * transform (rotation, etc.) is preserved — the CSS composes them.
 */
export function useParallax(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll("[data-parallax]");
    const onScroll = () => {
      const y = window.scrollY;
      els.forEach((el) => {
        const factor = parseFloat(el.getAttribute("data-parallax")) || 0;
        el.style.setProperty("--py", `${y * factor}px`);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
