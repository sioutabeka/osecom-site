import { Navigate, useParams } from "react-router-dom";
import { LEGAL } from "../data/legal";
import { ROUTES } from "../config/routes";

export default function LegalPage() {
  const { slug } = useParams();
  const doc = LEGAL[slug];
  if (!doc) return <Navigate to={ROUTES.home} replace />;

  return (
    <main className="page page--legal">
      <section className="legal">
        <span className="mono">{doc.tag}</span>
        <h1>{doc.title}</h1>
        <p className="legal__intro">{doc.intro}</p>
        <p className="legal__updated mono">{doc.updated}</p>

        <div className="legal__content">
          {doc.sections.map((section) => (
            <LegalSection key={section.h} section={section} />
          ))}
        </div>
      </section>
    </main>
  );
}

function LegalSection({ section }) {
  return (
    <article className="legal__section">
      <h2>{section.h}</h2>
      {section.body?.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {section.list && (
        <ul>
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
