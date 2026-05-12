import { useState } from "react";
import Placeholder from "./Placeholder";
import epjewelsCover from "../../assets/epjewels-cover.jpg";
import maxmaraCover from "../../assets/maxmara-cover.jpg";
import phepheCover from "../../assets/phephe-cover.jpg";
import instagramScreen from "../../assets/instagram-screen.webp";

const WORKS = [
  {
    category: "SOCIAL MEDIA",
    title: "Community Management",
    image: phepheCover,
  },
  {
    category: "CONTENT CREATION",
    title: "UGC Content",
    image: instagramScreen,
  },
  {
    category: "BRANDING",
    title: "Brand Strategy",
    image: maxmaraCover,
  },
  {
    category: "CAMPAIGNS",
    title: "Creative Campaigns",
    image: epjewelsCover,
  },
];

/**
 * "Selected work" interactive showcase.
 * - Active row big & bold, neighbors slightly faded, others muted.
 * - Up/Down arrows or direct row clicks move the cursor.
 * - The image on the right is keyed on activeIndex so React unmounts/remounts
 *   it — the CSS fade-in animation runs every time it changes.
 */
export default function ImpactCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="impact" data-reveal>
      <div className="impact__head">
        <span className="mono">SELECTED WORK</span>
        <h2>A few ways I create impact for brands</h2>
      </div>

      <div className="impact__showcase">
        <ul className="impact__titles">
          {WORKS.map((work, i) => (
            <li key={work.title}>
              <button
                type="button"
                className={"impact__title-btn " + rowState(i, activeIndex)}
                onClick={() => setActiveIndex(i)}
                aria-current={i === activeIndex ? "true" : undefined}
              >
                <span className="mono">{work.category}</span>
                <h3>{work.title}</h3>
              </button>
            </li>
          ))}
        </ul>

        <div className="impact__media">
          <Placeholder
            key={activeIndex}
            ratio="4/5"
            src={WORKS[activeIndex].image}
            alt={WORKS[activeIndex].title}
            className="impact__media-img"
          />
        </div>
      </div>
    </section>
  );
}

function rowState(index, activeIndex) {
  if (index === activeIndex) return "is-active";
  if (Math.abs(index - activeIndex) === 1) return "is-neighbor";
  return "is-muted";
}
