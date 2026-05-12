import { C } from "../lib/theme";

/**
 * Image or striped placeholder. When `src` is provided, renders the real
 * image at the given aspect ratio. Otherwise renders the monospace striped
 * placeholder used for not-yet-shot assets.
 *
 * Tones drive the striped fallback colors only (cream, rose, olive, sky, brown).
 */

const TONES = {
  cream: { bg: C.cream, line: "#D9CFAE", text: C.brownSoft },
  rose: { bg: "#FAD6E7", line: "#E9B4CC", text: C.brown },
  olive: { bg: "#B9BD7A", line: "#9BA260", text: "#fff" },
  sky: { bg: C.sky, line: "#A6B4CF", text: C.brown },
  brown: { bg: C.brown, line: "#3D2A1E", text: C.cream },
};

export default function Placeholder({
  ratio = "4/5",
  label = "image",
  tone = "cream",
  className = "",
  src,
  alt,
}) {
  if (src) {
    return (
      <div className={"ph ph--img " + className} style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt || label} className="ph__img" />
      </div>
    );
  }
  const t = TONES[tone] || TONES.cream;
  return (
    <div
      className={"ph " + className}
      style={{ aspectRatio: ratio, background: t.bg, color: t.text }}
    >
      <svg
        className="ph__stripes"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`stp-${tone}`}
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke={t.line} strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#stp-${tone})`} />
      </svg>
      <span className="ph__label">[ {label} ]</span>
      <span className="ph__corner">▦ photo</span>
    </div>
  );
}
