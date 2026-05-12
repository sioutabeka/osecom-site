import { Link } from "react-router-dom";
import IconArrow from "../components/IconArrow";
import ImpactCarousel from "../components/ImpactCarousel";
import Marquee from "../components/Marquee";
import MorphHeadline from "../components/MorphHeadline";
import Placeholder from "../components/Placeholder";
import PortfolioStrip from "../components/PortfolioStrip";
import { ROUTES } from "../config/routes";
import { BRANDS } from "../config/site";
import essiaHome from "../../assets/essiahome.webp";

const HERO_LINES = ["Je transforme", "vos contenus", "en client."];

const TOP_MARQUEE = [
  "Stratégie",
  "Contenu",
  "Acquisition",
  "Community",
  "UGC",
  "Growth",
  "Brand",
  "Performance",
];

const BOTTOM_MARQUEE = [
  "Stratégie, contenu, acquisition & tout ce qu'il faut pour faire rentrer des clients",
];

const SIGNATURE_PILLARS = [
  { title: "Stratégie", text: "Benchmark, positionnement, ligne éditoriale et direction visuelle." },
  { title: "Pilotage éditorial", text: "Calendrier, formats, rythme et organisation des prises de parole." },
  { title: "Animation & modération", text: "Publication, gestion des interactions et engagement des communautés." },
  { title: "Visibilité & performance", text: "Boosts, campagnes paid, suivi des résultats et optimisation." },
];

export default function HomePage() {
  return (
    <main className="page page--home">
      <Hero />
      <Marquee items={TOP_MARQUEE} theme="olive" speed={45} />
      <DualPromise />
      <Signature />
      <Trust />
      <ImpactCarousel />
      <PortfolioStrip
        title={
          <h2>
            Consulte mon <span className="accent">Portfolio</span>
          </h2>
        }
      />
      <Marquee items={BOTTOM_MARQUEE} theme="rose" speed={55} dir="right" />
    </main>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__meta">
        <span className="mono">HI · MOI C'EST ESSIA</span>
        <span className="mono">OSECOM · PARIS</span>
      </div>

      <MorphHeadline lines={HERO_LINES} accentIdx={1} />

      <div className="hero__base">
        <p className="hero__sub">
          Community management, stratégie, production de contenus orientés
          performance.
          <br />
          J'aide les marques à construire une présence claire, cohérente et
          désirable.
        </p>

        <div className="hero__cta">
          <Link to={ROUTES.contact} className="btn btn--olive">
            Prendre rendez-vous
          </Link>
          <Link to={ROUTES.services} className="btn btn--ghost">
            Voir mes offres
            <IconArrow />
          </Link>
        </div>
      </div>

      <div className="hero__portrait" data-parallax="0.15">
        <Placeholder ratio="3/4" src={essiaHome} alt="Essia, fondatrice d'OseCom" />
        <span className="hero__portrait-tag">Meet Essia</span>
      </div>

      <div className="hero__chip hero__chip--2" data-parallax="0.25">
        <span className="mono">stratégie · contenu · performance</span>
      </div>
    </section>
  );
}

function DualPromise() {
  return (
    <section className="dual" data-reveal>
      <div className="dual__card">
        <span className="dual__mark">LE PROBLÈME</span>
        <h3>Publier ne suffit plus.</h3>
        <p>
          Beaucoup d'entreprises sont présentes sur les réseaux… mais sans
          réelle stratégie. Le contenu manque de cohérence, la communication de
          régularité, et les résultats ne suivent pas.
        </p>
      </div>
      <div className="dual__card dual__card--alt">
        <span className="dual__mark">LA RÉPONSE</span>
        <h3>Une présence structurée change tout.</h3>
        <p>
          Je construis une stratégie social media claire et performante pour
          transformer vos réseaux en levier de visibilité, d'acquisition et de
          croissance.
        </p>
      </div>
    </section>
  );
}

function Signature() {
  return (
    <section className="signature" data-reveal>
      <div className="signature__head">
        <span className="mono">OFFRE SIGNATURE</span>
        <h2>
          Community Management <span className="accent">Stratégique</span>
        </h2>
        <p>Une offre pensée pour déléguer vos réseaux sociaux avec exigence.</p>
      </div>

      <div className="signature__grid">
        {SIGNATURE_PILLARS.map((pillar, i) => (
          <article
            key={pillar.title}
            className="signature__card"
            data-reveal
            style={{ "--delay": i * 0.08 + "s" }}
          >
            <span className="signature__num">{String(i + 1).padStart(2, "0")}</span>
            <h4>{pillar.title}</h4>
            <p>{pillar.text}</p>
          </article>
        ))}
      </div>

      <div className="signature__cta">
        <Link to={ROUTES.contact} className="btn btn--olive">
          Parler de votre projet
        </Link>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="trust" data-reveal>
      <span className="mono trust__label">ELLES M'ONT FAIT CONFIANCE</span>
      <div className="trust__row">
        {BRANDS.map((b) => (
          <span key={b} className="trust__brand">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
