/**
 * Home · "Avant / Après" section.
 * Vertical stack: a strucked-through "sans stratégie" claim, a bouncing
 * arrow, then the "avec stratégie" statement. The strike-through animates
 * on scroll-in via the .dv1__title--strike pseudo-element.
 */
export default function DualPromise() {
  return (
    <section className="dv1" data-reveal>
      <div className="dv1__before">
        <span className="dv1__tag mono">SANS STRATÉGIE</span>
        <h3 className="dv1__title dv1__title--strike">
          Du bruit. Aucune trace.
        </h3>
        <p>
          Vous publiez, vous publiez encore… et rien ne bouge. Pas de
          cohérence, pas de retour, pas de clients.
        </p>
      </div>

      <div className="dv1__arrow" aria-hidden="true">
        <svg viewBox="0 0 40 60" width="40" height="60">
          <path
            d="M20 4 L20 48 M6 34 L20 52 L34 34"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="dv1__after">
        <span className="dv1__tag mono">AVEC STRATÉGIE</span>
        <h3 className="dv1__title">
          Un système. Une marque <span className="dv1__title-accent">qui convertit</span>.
        </h3>
        <p>
          Chaque post a une intention. Chaque format a une raison. Et vos
          réseaux deviennent un vrai levier de business.
        </p>
      </div>
    </section>
  );
}
