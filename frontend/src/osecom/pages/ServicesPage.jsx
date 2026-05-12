import { Link } from "react-router-dom";
import IconArrow from "../components/IconArrow";
import { SERVICES } from "../data/services";
import { ROUTES } from "../config/routes";

export default function ServicesPage() {
  return (
    <main className="page page--services">
      <ServicesHero />
      <div className="srv-list">
        {SERVICES.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
      <ServicesFoot />
    </main>
  );
}

function ServicesHero() {
  return (
    <section className="srv-hero">
      <span className="mono">SOCIAL GROWTH ISN'T AN OPTION</span>
      <h1 className="srv-hero__title">
        Accélérez votre croissance en utilisant les réseaux sociaux !
      </h1>
      <p>
        La stratégie d'image, de communication et de marketing digital est le
        cœur de tout business qui fonctionne aujourd'hui.{" "}
        <strong>Explorer le bon levier</strong> selon vos objectifs et vos
        besoins.
      </p>
      <p className="srv-hero__note">
        Mes offres sont à titre indicatif, le mieux c'est qu'on en discute.
      </p>
      <Link to={ROUTES.contact} className="btn btn--rose">
        Discuter de mon projet
      </Link>
    </section>
  );
}

function ServiceCard({ service }) {
  return (
    <article className={`srv srv--${service.tone}`} data-reveal>
      <div className="srv__head">
        <span className="mono">{service.tag}</span>
        <h2>{service.title}</h2>
        <p>{service.copy}</p>
      </div>
      <div className="srv__cols">
        <div className="srv__col">
          <span className="mono mono--sm">VOUS VOUS RECONNAÎTREZ ICI SI…</span>
          <ul>
            {service.symptoms.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="srv__col">
          <span className="mono mono--sm">CE QU'ON ACTIVE</span>
          <div className="srv__chips">
            {service.delivers.map((d) => (
              <span key={d} className="chip">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="srv__cta">
        <Link to={ROUTES.service(service.slug)} className="link-arrow">
          Plus de détails
          <IconArrow size={16} />
        </Link>
        <Link to={ROUTES.contact} className="btn btn--olive btn--compact">
          Prendre rendez-vous
        </Link>
      </div>
    </article>
  );
}

function ServicesFoot() {
  return (
    <section className="srv-foot">
      <span className="mono">NEED CLARITY BEFORE SCALING ?</span>
      <h2>
        Vous ne savez pas encore exactement ce qu'il vous faut ? Et c'est OK.
      </h2>
      <p>
        On regarde ensemble où vous en êtes, ce qui bloque aujourd'hui, et quel
        levier activer en priorité.
      </p>
      <div className="srv-foot__cta">
        <Link to={ROUTES.contact} className="btn btn--brown">
          Prendre rendez-vous
        </Link>
        <Link to={ROUTES.contact} className="btn btn--rose">
          Discuter de mon projet
        </Link>
      </div>
    </section>
  );
}
