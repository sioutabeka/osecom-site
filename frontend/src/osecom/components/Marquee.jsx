/**
 * Infinite horizontal marquee. The track contains the items triplicated
 * to give the CSS scroll animation room to loop without a visible seam.
 * - `items`: strings to render
 * - `dir`: "left" (default) or "right"
 * - `speed`: animation duration in seconds (lower = faster)
 * - `theme`: "olive" | "rose" | "cream" — background palette
 */
export default function Marquee({ items, dir = "left", speed = 40, theme = "olive" }) {
  const looped = [...items, ...items, ...items];
  return (
    <div className={`marquee marquee--${theme}`}>
      <div
        className="marquee__track"
        style={{
          animationDuration: speed + "s",
          animationDirection: dir === "left" ? "normal" : "reverse",
        }}
      >
        {looped.map((item, i) => (
          <span className="marquee__item" key={i}>
            <span>{item}</span>
            <Sparkle />
          </span>
        ))}
      </div>
    </div>
  );
}

function Sparkle() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className="marquee__sep"
      aria-hidden="true"
    >
      <path
        d="M7 1 L 8.2 5.8 L 13 7 L 8.2 8.2 L 7 13 L 5.8 8.2 L 1 7 L 5.8 5.8 Z"
        fill="currentColor"
      />
    </svg>
  );
}
