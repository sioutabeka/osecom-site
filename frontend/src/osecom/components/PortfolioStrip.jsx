import { Link } from "react-router-dom";
import IconArrow from "./IconArrow";
import Placeholder from "./Placeholder";
import { ROUTES } from "../config/routes";
import epjewelsCover from "../../assets/epjewels-cover.jpg";
import maxmaraCover from "../../assets/maxmara-cover.jpg";
import phepheCover from "../../assets/phephe-cover.jpg";

const TEASERS = [
  { label: "Phe Phe", slug: "phephe", img: phepheCover },
  { label: "MaxMara", slug: "maxmara", img: maxmaraCover },
  { label: "EP Jewels", slug: "epjewels", img: epjewelsCover },
];

/**
 * 3-card teaser linking to the corresponding case study on /portfolio.
 * Used on Home (with the heading) and About (without — passed via props).
 */
export default function PortfolioStrip({ eyebrow = "OSECOM STUDIO", title }) {
  return (
    <section className="portfolio-strip" data-reveal>
      <div className="portfolio-strip__head">
        <span className="mono">{eyebrow}</span>
        {title}
      </div>
      <div className="portfolio-strip__grid">
        {TEASERS.map((teaser, i) => (
          <Link
            key={teaser.slug}
            to={`${ROUTES.portfolio}#${teaser.slug}`}
            className="portfolio-card"
            data-reveal
            style={{ "--delay": i * 0.1 + "s" }}
          >
            <Placeholder ratio="4/5" src={teaser.img} alt={teaser.label} />
            <div className="portfolio-card__foot">
              <span>{teaser.label}</span>
              <IconArrow direction="diag-up" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
