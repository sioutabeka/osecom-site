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

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      const shift = progress * maxShift;
      text.style.transform = `translate3d(${shift}px, 0, 0)`;
      media.style.transform = `translate3d(${-shift}px, 0, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Translates any `[data-parallax="<factor>"]` element vertically on
 * scroll. A factor of 0.15 means the element moves at 15% of scroll speed.
 */
export function useParallax(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll("[data-parallax]");
    const onScroll = () => {
      const y = window.scrollY;
      els.forEach((el) => {
        const factor = parseFloat(el.getAttribute("data-parallax")) || 0;
        el.style.transform = `translate3d(0, ${y * factor}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
