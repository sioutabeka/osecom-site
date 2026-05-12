// Single source of truth for every route in the app.
// Use builders (e.g. ROUTES.service("strategy")) instead of string-literal paths.

export const ROUTES = {
  home: "/",
  services: "/services",
  service: (slug) => `/services/${slug}`,
  ugc: "/ugc",
  portfolio: "/portfolio",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
  legal: {
    mentions: "/legal/mentions",
    privacy: "/legal/privacy",
    terms: "/legal/terms",
    cookies: "/legal/cookies",
  },
};
