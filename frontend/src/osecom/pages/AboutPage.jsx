import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";
import PortfolioStrip from "../components/PortfolioStrip";
import ServicesOffer from "../components/ServicesOffer";
import { ROUTES } from "../config/routes";
import aboutHero from "../../assets/about-hero.jpg";
import aboutStory from "../../assets/about-story.jpg";

const FACTS = [
  ["BASÉE À PARIS 🇫🇷", "Disponible remote"],
  ["MARKETING, GROWTH & ACQUISITION EN BACKGROUND ✨", "5+ ans en growth · brand · contenu"],
  ["ENTRE STRATÉGIE ET CONTENU 💻", "(et un peu obsédée par les deux)"],
  ["J'AIME AUTANT ANALYSER QU'EXÉCUTER 🧠", "Data + Création, sans compromis"],
  ["LE CONTENU, C'EST BIEN 🎥", "Le contenu qui convertit, c'est mieux"],
];

const PILLARS = [
  ["01", "Une vision claire", "Comprendre la marque, son marché, son audience, avant de produire."],
  ["02", "Un contenu pensé", "Créer un contenu aligné avec votre image et votre voix."],
  ["03", "Une présence structurée", "Installer un système qui performe dans le temps."],
];

export default function AboutPage() {
  return (
    <main className="page page--about">
      <section className="about-hero">
        <div className="about-hero__text">
          <span className="mono">HI, MOI C'EST ESSIA</span>
          <h1>I help brands grow through content.</h1>
          <p>
            J'aide les marques à développer leur présence en ligne grâce à une
            stratégie claire et du contenu qui capte vraiment l'attention.
          </p>
          <Link to={ROUTES.contact} className="btn btn--olive about-hero__cta">
            Work with me
          </Link>
        </div>
        <div className="about-hero__portrait" data-parallax="0.1">
          <Placeholder ratio="4/5" src={aboutHero} alt="Portrait d'Essia" />
          <p className="about-hero__caption mono">Meet Essia</p>
        </div>
      </section>

      <section className="about-philo about-philo--with-media" data-reveal>
        <div className="about-philo__media">
          <Placeholder ratio="4/5" src={aboutStory} alt="Essia au travail" />
        </div>
        <div className="about-philo__body">
          <h2>Mon parcours & mon approche.</h2>
          <p>
            Issue du marketing digital, du growth et de l'acquisition, j'ai
            construit mon approche à la croisée de la stratégie, du contenu et
            de la performance. Très vite, j'ai compris qu'une marque ne peut pas
            se contenter d'être présente en ligne : elle doit être claire,
            cohérente et mémorable.
          </p>
          <p>
            Aujourd'hui, j'accompagne des marques, des entrepreneurs et des
            projets ambitieux dans le développement de leur présence digitale à
            travers le community management, la création de contenus UGC et le
            conseil en stratégie digitale. Mon objectif : créer une
            communication qui attire, engage et convertit, tout en restant
            alignée avec l'identité de la marque.
          </p>
        </div>
      </section>

      <ServicesOffer />

      <section className="about-facts" data-reveal>
        {FACTS.map(([eyebrow, value], i) => (
          <div
            key={eyebrow}
            className="about-facts__row"
            data-reveal
            style={{ "--delay": i * 0.06 + "s" }}
          >
            <span className="mono">{eyebrow}</span>
            <span className="about-facts__val">{value}</span>
          </div>
        ))}
      </section>

      <section className="about-pillars" data-reveal>
        <h2>Derrière OseCom.</h2>
        <p className="about-pillars__intro">
          OseCom est né d'une conviction simple : ce qui fonctionne, c'est
          l'alignement entre stratégie, contenu et constance.
        </p>
        <div className="about-pillars__grid">
          {PILLARS.map(([n, title, text], i) => (
            <div
              key={n}
              className="about-pillars__card"
              data-reveal
              style={{ "--delay": i * 0.1 + "s" }}
            >
              <span className="about-pillars__n">{n}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <PortfolioStrip
        title={
          <h2>Consulte mon Portfolio</h2>
        }
      />

      <section className="about-cta">
        <h2>Travaillons ensemble.</h2>
        <Link to={ROUTES.contact} className="btn btn--olive">
          Prendre rendez-vous
        </Link>
      </section>
    </main>
  );
}
