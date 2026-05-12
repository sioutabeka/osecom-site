import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./osecom/Layout";
import AboutPage from "./osecom/pages/AboutPage";
import BlogPage from "./osecom/pages/BlogPage";
import ContactPage from "./osecom/pages/ContactPage";
import HomePage from "./osecom/pages/HomePage";
import LegalPage from "./osecom/pages/LegalPage";
import NotFoundPage from "./osecom/pages/NotFoundPage";
import PortfolioPage from "./osecom/pages/PortfolioPage";
import ServiceDetailPage from "./osecom/pages/ServiceDetailPage";
import ServicesPage from "./osecom/pages/ServicesPage";
import UGCPage from "./osecom/pages/UGCPage";
import { ROUTES } from "./osecom/config/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Canonical routes */}
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.services} element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path={ROUTES.ugc} element={<UGCPage />} />
          <Route path={ROUTES.blog} element={<BlogPage />} />
          <Route path={ROUTES.about} element={<AboutPage />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path={ROUTES.portfolio} element={<PortfolioPage />} />
          <Route path="/legal/:slug" element={<LegalPage />} />

          {/* Legacy redirects — kept so older URLs and inbound links still work */}
          <Route path="/strategy" element={<Navigate to={ROUTES.service("strategy")} replace />} />
          <Route path="/community-management" element={<Navigate to={ROUTES.service("cm")} replace />} />
          <Route path="/acquisition" element={<Navigate to={ROUTES.service("acquisition")} replace />} />
          <Route path="/growth" element={<Navigate to={ROUTES.service("growth")} replace />} />
          <Route path="/social-growth" element={<Navigate to={ROUTES.services} replace />} />
          <Route path="/portfolio/content" element={<Navigate to={ROUTES.ugc} replace />} />
          <Route path="/portfolio/design" element={<Navigate to={ROUTES.portfolio} replace />} />
          <Route path="/mentions-legales" element={<Navigate to={ROUTES.legal.mentions} replace />} />
          <Route path="/privacy-policy" element={<Navigate to={ROUTES.legal.privacy} replace />} />
          <Route path="/confidentialite" element={<Navigate to={ROUTES.legal.privacy} replace />} />
          <Route path="/terms" element={<Navigate to={ROUTES.legal.terms} replace />} />
          <Route path="/cgu" element={<Navigate to={ROUTES.legal.terms} replace />} />
          <Route path="/cookies" element={<Navigate to={ROUTES.legal.cookies} replace />} />
          <Route path="/return-policy" element={<Navigate to={ROUTES.legal.terms} replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
