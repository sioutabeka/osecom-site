import { Link } from "react-router-dom";
import logo from "../../assets/logo-osecom.png";
import { SITE, SOCIALS, FOOTER_NAV } from "../config/site";

const FOOTER_SOCIALS = SOCIALS.slice(0, 3);

export default function Footer() {
  return (
    <footer className="ft">
      <FollowAlong />

      <div className="ft__top">
        <FooterColumn title="SERVICES" links={FOOTER_NAV.services} />
        <FooterBrand />
        <FooterColumn title="EXPLORE" links={FOOTER_NAV.explore} align="right" />
      </div>

      <div className="ft__base">
        <span className="mono">{SITE.copyright}</span>
        <div className="ft__legal">
          {FOOTER_NAV.legal.map((l) => (
            <Link key={l.to} to={l.to} className="mono">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function FollowAlong() {
  return (
    <section className="ft__social">
      <div className="ft__social-head">
        <span className="mono">FOLLOW ALONG</span>
        <h2>Restons connectés.</h2>
      </div>
      <div className="ft__social-grid">
        {FOOTER_SOCIALS.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="ft__social-card"
          >
            <div className="ft__social-top">
              <span className="ft__social-name">{s.name}</span>
              <ArrowOut />
            </div>
            <span className="ft__social-handle mono">{s.handle}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function FooterColumn({ title, links, align = "left" }) {
  return (
    <div className={"ft__col " + (align === "right" ? "ft__col--right" : "")}>
      <span className="mono">{title}</span>
      {links.map((l) => (
        <Link key={l.to + l.label} to={l.to}>
          {l.label}
        </Link>
      ))}
    </div>
  );
}

function FooterBrand() {
  return (
    <div className="ft__center">
      <img src={logo} alt={SITE.name} className="ft__logo" />
    </div>
  );
}

function ArrowOut() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 13 L 13 3 M 6 3 L 13 3 L 13 10"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
