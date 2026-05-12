import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";
import { PORTFOLIO } from "../data/portfolio";
import { ROUTES } from "../config/routes";

export default function PortfolioPage() {
  return (
    <main className="page page--portfolio">
      <PortfolioHero />
      {PORTFOLIO.map((project) => (
        <CaseStudy key={project.slug} project={project} />
      ))}
      <PortfolioCta />
    </main>
  );
}

function PortfolioHero() {
  return (
    <section className="pf-hero">
      <span className="mono">OSECOM STUDIO · CASE STUDIES</span>
      <h1>
        The Community Management
        <br />
        Portfolio.
      </h1>
      <p>
        Une sélection de marques avec lesquelles j'ai construit du contenu, de
        la stratégie ou des campagnes — du brief à la livraison.
      </p>
      <div className="pf-hero__nav">
        {PORTFOLIO.map((p) => (
          <a key={p.slug} href={`#${p.slug}`} className="chip">
            {p.title}
          </a>
        ))}
      </div>
    </section>
  );
}

function CaseStudy({ project }) {
  return (
    <section id={project.slug} className="pf-case" data-reveal>
      <div className="pf-case__head">
        <span className="mono">{project.tag}</span>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>
      <div className="pf-case__grid">
        {project.images.map((img, j) => (
          <div
            key={j}
            className="pf-case__tile"
            data-reveal
            style={{ "--delay": j * 0.05 + "s" }}
          >
            <Placeholder
              ratio="4/5"
              src={img}
              alt={`${project.title} — visuel ${j + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function PortfolioCta() {
  return (
    <section className="pf-cta" data-reveal>
      <div className="pf-cta__card">
        <span className="mono">VOUS RECONNAISSEZ VOTRE MARQUE ICI ?</span>
        <h2>On construit la prochaine ?</h2>
        <Link to={ROUTES.contact} className="btn btn--rose">
          Discuter de votre projet
        </Link>
      </div>
    </section>
  );
}
