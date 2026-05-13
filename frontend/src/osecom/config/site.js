import { ROUTES } from "./routes";

export const SITE = {
  name: "OseCom",
  founder: "Essia Ben Kheder",
  city: "Paris",
  region: "75",
  email: "contact@osecom.plus",
  emailHref: "mailto:contact@osecom.plus",
  copyright:
    "© 2026 OSECOM · STRATÉGIE DIGITALE & COMMUNITY MANAGEMENT À PARIS",
};

export const SOCIALS = [
  { name: "Instagram", handle: "@osecom", url: "https://instagram.com/osecom" },
  { name: "TikTok", handle: "@osecom", url: "https://tiktok.com/@osecom" },
  { name: "LinkedIn", handle: "Essia", url: "https://linkedin.com/in/osecom" },
  { name: "YouTube", handle: "@osecom", url: "https://youtube.com/@osecom" },
  { name: "Substack", handle: "@osecom", url: "https://substack.com/@osecom" },
];

export const BRANDS = [
  "L'Oréal",
  "Phe Phe",
  "Adobe",
  "MaxMara",
  "Klaviyo",
  "Paula's Choice",
];

export const NAV_ITEMS = [
  { to: ROUTES.home, label: "Home", end: true },
  { to: ROUTES.services, label: "Services" },
  { to: ROUTES.ugc, label: "UGC" },
  { to: ROUTES.blog, label: "Blog" },
  { to: ROUTES.about, label: "About" },
];

export const FOOTER_NAV = {
  services: [
    { label: "Community Management", to: ROUTES.service("cm") },
    { label: "Création UGC", to: ROUTES.ugc },
    { label: "Stratégie digitale", to: ROUTES.service("strategy") },
    { label: "Audit réseaux sociaux", to: ROUTES.services },
  ],
  explore: [
    { label: "Portfolio", to: ROUTES.portfolio },
    { label: "Content & UGC", to: ROUTES.ugc },
    { label: "Blog", to: ROUTES.blog },
    { label: "About", to: ROUTES.about },
    { label: "Contact", to: ROUTES.contact },
  ],
  legal: [
    { label: "Mentions légales", to: ROUTES.legal.mentions },
    { label: "Confidentialité", to: ROUTES.legal.privacy },
    { label: "CGU", to: ROUTES.legal.terms },
    { label: "Cookies", to: ROUTES.legal.cookies },
  ],
};
