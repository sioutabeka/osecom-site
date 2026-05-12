import { Link, Navigate, useParams } from "react-router-dom";
import IconArrow from "../components/IconArrow";
import { SERVICES } from "../data/services";
import { ROUTES } from "../config/routes";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const index = SERVICES.findIndex((s) => s.slug === slug);
  if (index < 0) return <Navigate to={ROUTES.services} replace />;

  const service = SERVICES[index];
  const next = SERVICES[(index + 1) % SERVICES.length];

  return (
    <main className={`page page--service page--service-${service.tone}`}>
      <ServiceHero service={service} />
      {service.problem && <ProblemSection problem={service.problem} />}
      {service.solution && <SolutionSection solution={service.solution} />}
      {service.offer && <OfferSection offer={service.offer} />}
      <SymptomsSection service={service} />
      {service.results && <ResultsSection results={service.results} />}
      <FinalCta service={service} />
      <NextService next={next} />
    </main>
  );
}

function ServiceHero({ service }) {
  return (
    <section className="srvd-hero">
      <Link to={ROUTES.services} className="srvd-back">
        <BackArrow />
        <span>Tous les services</span>
      </Link>
      <span className="mono srvd-hero__tag">{service.tag}</span>
      <h1>{service.titleEN || service.title + "."}</h1>
      <p className="srvd-hero__intro">{service.intro}</p>
      <div className="srvd-hero__cta">
        <Link to={ROUTES.contact} className="btn btn--brown">
          {service.primaryCta || "Prendre rendez-vous"}
        </Link>
        <Link to={ROUTES.contact} className="btn btn--ghost">
          Discuter de mon projet
        </Link>
      </div>
      <div className="srvd-hero__meta">
        <MetaCell label="DURÉE" value={service.duration} />
        <MetaCell label="RYTHME" value={service.rythm} />
        <MetaCell label="FORMAT" value={service.format} />
      </div>
    </section>
  );
}

function MetaCell({ label, value }) {
  return (
    <div>
      <span className="mono">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProblemSection({ problem }) {
  return (
    <section className="srvd-problem" data-reveal>
      <span className="mono">{problem.title}</span>
      <div className="srvd-problem__grid">
        {problem.blocks.map((block, i) => (
          <article
            key={block.subtitle}
            className="srvd-problem__block"
            data-reveal
            style={{ "--delay": i * 0.08 + "s" }}
          >
            <h3>{block.subtitle}</h3>
            {block.text.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

function SolutionSection({ solution }) {
  return (
    <section className="srvd-solution" data-reveal>
      <span className="mono">{solution.title}</span>
      <h2>{solution.text}</h2>
      <p>{solution.supporting}</p>
    </section>
  );
}

function OfferSection({ offer }) {
  return (
    <section className="srvd-offer" data-reveal>
      <div className="srvd-offer__head">
        <span className="mono">L'OFFRE</span>
        <h2>{offer.title}</h2>
      </div>
      <div className="srvd-offer__grid">
        {offer.cards.map((card, i) => (
          <div
            key={card.title}
            className="srvd-offer__card"
            data-reveal
            style={{ "--delay": i * 0.1 + "s" }}
          >
            <span className="mono srvd-offer__n">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4>{card.title}</h4>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SymptomsSection({ service }) {
  return (
    <section className="srvd-split" data-reveal>
      <div className="srvd-split__col">
        <span className="mono">VOUS VOUS RECONNAÎTREZ ICI SI…</span>
        <ul className="srvd-symptoms">
          {service.symptoms.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div className="srvd-split__col srvd-split__col--alt">
        <span className="mono">CE QU'ON ACTIVE ENSEMBLE</span>
        <div className="srvd-delivers">
          {service.delivers.map((d) => (
            <span key={d} className="srvd-chip">
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsSection({ results }) {
  return (
    <section className="srvd-results" data-reveal>
      <span className="mono">{results.title}</span>
      <p className="srvd-results__intro">{results.intro}</p>
      <ul className="srvd-results__list">
        {results.points.map((p, j) => (
          <li key={p} data-reveal style={{ "--delay": j * 0.08 + "s" }}>
            {p}
          </li>
        ))}
      </ul>
      {results.closing && <p className="srvd-results__closing">{results.closing}</p>}
    </section>
  );
}

function FinalCta({ service }) {
  const cta = service.finalCta;
  return (
    <section className="srvd-cta" data-reveal>
      <div className="srvd-cta__card">
        <span className="mono">PRÊT À COMMENCER ?</span>
        <h2>{cta?.title || "On en parle"} 30 minutes ?</h2>
        <p>
          {cta?.text ||
            "Un appel pour cadrer votre besoin, voir si c'est aligné, et savoir où on peut aller ensemble."}
        </p>

        {(cta?.forWho || cta?.notForWho) && (
          <div className="srvd-cta__forwho">
            {cta.forWho && (
              <div className="srvd-cta__forwho-card srvd-cta__forwho-card--for">
                <span className="mono">POUR QUI</span>
                <p>{cta.forWho}</p>
              </div>
            )}
            {cta.notForWho && (
              <div className="srvd-cta__forwho-card srvd-cta__forwho-card--not">
                <span className="mono">PAS POUR</span>
                <p>{cta.notForWho}</p>
              </div>
            )}
          </div>
        )}

        <div className="srvd-cta__row">
          <Link to={ROUTES.contact} className="btn btn--rose">
            {service.primaryCta || "Prendre rendez-vous"}
          </Link>
          <Link to={ROUTES.services} className="btn btn--ghost">
            Voir tous les services
          </Link>
        </div>
      </div>
    </section>
  );
}

function NextService({ next }) {
  return (
    <section className="srvd-next" data-reveal>
      <span className="mono">SERVICE SUIVANT</span>
      <Link to={ROUTES.service(next.slug)} className="srvd-next__link">
        <span>{next.title}</span>
        <IconArrow size={22} />
      </Link>
    </section>
  );
}

function BackArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M13 7 L 1 7 M 6 2 L 1 7 L 6 12"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
