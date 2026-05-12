import { Link } from "react-router-dom";
import { ROUTES } from "../config/routes";

export default function NotFoundPage() {
  return (
    <main className="page page--404">
      <section className="nf">
        <span className="mono">ERROR 404 · PAGE INTROUVABLE</span>
        <h1>
          On a <span className="accent">cherché.</span>
          <br />
          Pas trouvé.
        </h1>
        <p>
          La page que vous cherchez n'existe plus, a été déplacée, ou n'a jamais
          existé. Pas de stress — voici par où repartir.
        </p>
        <div className="nf__cta">
          <Link to={ROUTES.home} className="btn btn--olive">
            Retour à l'accueil
          </Link>
          <Link to={ROUTES.services} className="btn btn--ghost">
            Voir mes offres
          </Link>
          <Link to={ROUTES.contact} className="btn btn--rose">
            Me contacter
          </Link>
        </div>
      </section>
    </main>
  );
}
