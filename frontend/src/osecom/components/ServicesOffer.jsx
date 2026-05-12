const SERVICES = [
  ["Community Management", "rose"],
  ["Social Media Strategy", "olive"],
  ["UGC Content", "sky"],
  ["Acquisition", "burgundy"],
  ["Digital Strategy", "cream"],
  ["Growth", "lightpink"],
];

/**
 * Large flowing list of services with colored flower separators.
 * Used on Home and About. Style matches the legacy site's "SERVICES I OFFER"
 * section: big serif text wrapping across multiple lines, each item followed
 * by a small "✿" in a unique pastel.
 */
export default function ServicesOffer() {
  return (
    <section className="services-offer" data-reveal>
      <span className="mono">SERVICES I OFFER</span>
      <div className="services-offer__row">
        {SERVICES.map(([label, tone]) => (
          <span key={label} className="services-offer__item">
            <span>{label}</span>
            <span
              className={`services-offer__flower services-offer__flower--${tone}`}
              aria-hidden="true"
            >
              ✿
            </span>
          </span>
        ))}
        <span className="services-offer__more">& More</span>
      </div>
    </section>
  );
}
