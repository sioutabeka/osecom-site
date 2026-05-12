import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../config/routes";
import { STORAGE_KEYS, TIMING } from "../config/timing";

/**
 * GDPR consent banner. Renders 2s after first visit if no choice is stored.
 * Persists the user's decision under `STORAGE_KEYS.COOKIE_CONSENT`.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const choice = window.localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
    if (choice) return;
    const id = setTimeout(() => setVisible(true), TIMING.COOKIE_BANNER_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  function decide(value) {
    try {
      window.localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, value);
    } catch (e) {
      console.warn("Cookie consent storage failed", e);
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Consentement cookies"
    >
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">
          <span className="mono">COOKIES & VIE PRIVÉE</span>
          <p>
            Ce site utilise des cookies pour mesurer l'audience et améliorer
            l'expérience. Vous pouvez accepter, refuser, ou consulter la{" "}
            <Link to={ROUTES.legal.cookies}>politique cookies</Link>.
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button className="btn btn--ghost" onClick={() => decide("refused")}>
            Refuser
          </button>
          <button className="btn btn--olive" onClick={() => decide("accepted")}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
