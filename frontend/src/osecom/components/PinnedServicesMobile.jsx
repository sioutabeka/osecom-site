import { Link } from "react-router-dom";
import { ROUTES } from "../config/routes";
import { STEPS } from "./PinnedServices";

const TONES = ["rose", "olive", "sky", "yellow"];

/**
 * Mobile-only sticky card stack — same pattern as the cards on the
 * /services page (each card uses position:sticky with a progressive
 * top offset, so they stack visibly as you scroll). Pure CSS, no
 * GSAP pin, no Lenis fight on mobile.
 */
export default function PinnedServicesMobile() {
  return (
    <section className="pin-m">
      <div className="pin-m__head">
        <span className="mono pin-m__eyebrow">QUATRE ÉTAPES</span>
        <h2 className="pin-m__heading">
          Une présence qui construit, un système qui convertit.
        </h2>
      </div>

      <div className="pin-m__stack">
        {STEPS.map((s, i) => (
          <article
            key={s.num}
            className={`pin-m-card pin-m-card--${TONES[i % TONES.length]}`}
            style={{ "--i": i }}
            data-reveal
          >
            <div className="pin-m-card__head">
              <span className="pin-m-card__num">
                {s.num} / {String(STEPS.length).padStart(2, "0")}
              </span>
              <span className="pin-m-card__label">{s.label}</span>
            </div>
            <h3 className="pin-m-card__title">{s.title}</h3>
            <p className="pin-m-card__text">{s.text}</p>
          </article>
        ))}
      </div>

      <div className="pin-m__cta-wrap">
        <Link to={ROUTES.services} className="btn btn--ghost pin-m__cta">
          Voir toutes les offres
        </Link>
      </div>
    </section>
  );
}
