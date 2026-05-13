import { useRef } from "react";
import { Link } from "react-router-dom";
import essiaHome from "../../assets/essiahome.webp";
import DualPromise from "../components/DualPromise";
import IconArrow from "../components/IconArrow";
import MorphHeadline from "../components/MorphHeadline";
import PinnedServices from "../components/PinnedServices";
import PortfolioStrip from "../components/PortfolioStrip";
import ServicesOffer from "../components/ServicesOffer";
import WordRotator from "../components/WordRotator";
import { useHeroDrift } from "../lib/hooks";
import { ROUTES } from "../config/routes";
import { BRANDS } from "../config/site";

const HERO_LAST_WORDS = ["client", "lead", "revenus", "assets"];
const HERO_LINES = [
  "Je transforme ",
  "vos contenus",
  ["en ", <WordRotator key="rot" words={HERO_LAST_WORDS} />, "."],
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
      <DualPromise />
      <Signature />
      <Trust />
      <PinnedServices />
      <ServicesOffer />
      <PortfolioStrip
        title={
          <h2>Consulte mon Portfolio</h2>
        }
      />
    </main>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const mediaRef = useRef(null);
  useHeroDrift(sectionRef, textRef, mediaRef);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero__row">
        <div className="hero__col-text" ref={textRef}>
          <div className="hero__meta">
            <span className="mono">HI · MOI C'EST ESSIA aka Siouta</span>
            <span className="mono"> · Freelance à PARIS</span>
          </div>

          <MorphHeadline lines={HERO_LINES} accentIdx={-1} />

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
        </div>

        <div className="hero__col-media" ref={mediaRef}>
          <div className="hero__media">
            <img src={essiaHome} alt="Essia — OseCom" className="hero__img" />
          </div>
          <div className="hero__chip hero__chip--2">
            <span className="mono">stratégie · contenu · performance</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Signature() {
  return (
    <section className="signature" data-reveal>
      <div className="signature__head">
        <span className="mono">OFFRE SIGNATURE</span>
        <h2>Community Management Stratégique</h2>
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
