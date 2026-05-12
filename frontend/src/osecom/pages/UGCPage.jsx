import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";
import { ROUTES } from "../config/routes";
import { SOCIALS } from "../config/site";
import logo from "../../assets/logo-osecom.png";
import instaScreen from "../../assets/instagram-screen.webp";

const PILL_TONES = {
  Instagram: "rose",
  TikTok: "cream",
  YouTube: "rose",
  Substack: "olive",
};

const UGC_SOCIALS = SOCIALS.filter((s) => PILL_TONES[s.name]);

const PORTFOLIO_SECTIONS = [
  {
    pill: "PORTFOLIO CONTENU",
    pillTone: "rose",
    title: ["Beauté & ", "Mode"],
    description:
      "Une sélection de contenus créés autour de la beauté, de la mode, du lifestyle et du storytelling visuel.",
    tiles: [
      { label: "beauty 01", tone: "rose" },
      { label: "beauty 02", tone: "cream" },
      { label: "mode 01", tone: "olive" },
      { label: "mode 02", tone: "brown" },
      { label: "lifestyle", tone: "rose" },
    ],
  },
  {
    pill: "PORTFOLIO CRÉATIF",
    pillTone: "olive",
    title: ["Design ", "graphique"],
    description:
      "Des concepts visuels, compositions créatives et contenus pensés pour les réseaux sociaux, au service d'un univers de marque fort et reconnaissable.",
    tiles: [
      { label: "design 01", tone: "cream" },
      { label: "design 02", tone: "olive" },
      { label: "design 03", tone: "brown" },
      { label: "design 04", tone: "rose" },
      { label: "design 05", tone: "sky" },
    ],
  },
  {
    pill: "PORTFOLIO COLLABORATIONS",
    pillTone: "cream",
    title: ["Collaborations ", "de marque"],
    description:
      "Une sélection de collaborations et de contenus de marque pensés pour allier storytelling, esthétique et connexion avec l'audience.",
    tiles: [
      { label: "collab 01", tone: "rose" },
      { label: "collab 02", tone: "olive" },
      { label: "collab 03", tone: "cream" },
      { label: "collab 04", tone: "sky" },
      { label: "collab 05", tone: "brown" },
    ],
  },
];

export default function UGCPage() {
  return (
    <main className="page page--ugc">
      <UgcHero />
      {PORTFOLIO_SECTIONS.map((section, i) => (
        <PortfolioSection key={i} section={section} />
      ))}
      <CollabCta />
    </main>
  );
}

function UgcHero() {
  return (
    <section className="ugc-hero">
      <div className="ugc-hero__text">
        <span className="mono">CONTENT & INFLUENCING</span>
        <h1>
          Content
          <br />& <span className="accent">Influencing.</span>
        </h1>
        <p>
          Je crée du contenu qui mêle design, lifestyle et tout ce qui gravite
          autour — esthétique, créatif et pensé pour vraiment capter
          l'attention.
        </p>
        <div className="ugc-hero__pills">
          {UGC_SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className={`pill pill--${PILL_TONES[social.name]}`}
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
      <div className="ugc-hero__phones">
        <div className="phone phone--1" data-parallax="-0.2">
          <Placeholder ratio="9/19" src={instaScreen} alt="Aperçu Instagram" />
        </div>
        <div className="phone phone--2" data-parallax="0.15">
          <Placeholder ratio="9/19" src={instaScreen} alt="Aperçu Instagram" />
        </div>
      </div>
    </section>
  );
}

function PortfolioSection({ section }) {
  const [titleA, titleB] = section.title;
  return (
    <section className="ugc-design" data-reveal>
      <span className={`pill pill--${section.pillTone} pill--inline`}>{section.pill}</span>
      <h2>
        {titleA}
        <span className="accent">{titleB}.</span>
      </h2>
      <p>{section.description}</p>
      <div className="ugc-design__grid">
        {section.tiles.map((tile, i) => (
          <div
            key={tile.label}
            className="ugc-design__tile"
            data-reveal
            style={{ "--delay": i * 0.05 + "s" }}
          >
            <Placeholder ratio="3/4" label={tile.label} tone={tile.tone} />
          </div>
        ))}
      </div>
    </section>
  );
}

function CollabCta() {
  return (
    <section className="ugc-collab">
      <div className="ugc-collab__card">
        <img src={logo} alt="" className="ugc-collab__logo" />
        <span className="mono">COLLABORONS ENSEMBLE</span>
        <h2>
          Vous recherchez une créatrice pour représenter votre marque sur le
          long terme ?
        </h2>
        <Link to={ROUTES.contact} className="btn btn--olive">
          Me contacter
        </Link>
      </div>
    </section>
  );
}
