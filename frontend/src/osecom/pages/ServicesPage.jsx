import { useRef } from "react";
import { Link } from "react-router-dom";
import aboutHero from "../../assets/about-hero.jpg";
import logo from "../../assets/logo-osecom.png";
import IconArrow from "../components/IconArrow";
import MorphHeadline from "../components/MorphHeadline";
import WordRotator from "../components/WordRotator";
import { useHeroDrift } from "../lib/hooks";
import { SERVICES } from "../data/services";
import { ROUTES } from "../config/routes";

const SRV_HERO_WORDS = ["croissance", "audience", "engagement", "ventes"];
const SRV_HERO_LINES = [
  "Accélérez votre",
  [<WordRotator key="rot" words={SRV_HERO_WORDS} />],
  "sur les réseaux sociaux.",
];

export default function ServicesPage() {
  return (
    <main className="page page--services">
      <ServicesHero />
      <div className="srv-list">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </div>
      <ServicesFoot />
    </main>
  );
}

function ServicesHero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const mediaRef = useRef(null);
  useHeroDrift(sectionRef, textRef, mediaRef);

  return (
    <section className="srv-hero" ref={sectionRef}>
      <div className="srv-hero__row">
        <div className="srv-hero__col-text" ref={textRef}>
          <span className="mono">SOCIAL GROWTH ISN'T AN OPTION</span>
          <MorphHeadline lines={SRV_HERO_LINES} accentIdx={-1} />
          <p>
            La stratégie d'image, de communication et de marketing digital est
            le cœur de tout business qui fonctionne aujourd'hui.{" "}
            <strong>Explorer le bon levier</strong> selon vos objectifs et vos
            besoins.
          </p>
          <p className="srv-hero__note">
            Mes offres sont à titre indicatif, le mieux c'est qu'on en discute.
          </p>
          <Link to={ROUTES.contact} className="btn btn--rose">
            Discuter de mon projet
          </Link>
        </div>

        <div className="srv-hero__col-media" ref={mediaRef}>
          <div className="srv-hero__media">
            <img src={aboutHero} alt="Services OseCom" className="srv-hero__img" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  return (
    <article
      className={`srv srv--${service.tone}`}
      data-reveal
      style={{ "--i": index }}
    >
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
      <div className="srv-foot__card">
        <img src={logo} alt="" className="srv-foot__logo" />
        <span className="mono">NEED CLARITY BEFORE SCALING ?</span>
        <h2>
          Vous ne savez pas encore exactement ce qu'il vous faut ? Et c'est OK.
        </h2>
        <p>
          On regarde ensemble où vous en êtes, ce qui bloque aujourd'hui, et
          quel levier activer en priorité.
        </p>
        <Link to={ROUTES.contact} className="btn btn--olive">
          Prendre rendez-vous
        </Link>
      </div>
    </section>
  );
}
