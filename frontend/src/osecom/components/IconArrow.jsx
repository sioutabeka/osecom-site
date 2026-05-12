/**
 * Re-usable arrow icons used across CTAs and link-arrows.
 * `direction`: "right" (default), "diag-up" (north-east, used on portfolio cards).
 */
export default function IconArrow({ direction = "right", size = 14 }) {
  const path =
    direction === "diag-up"
      ? "M2 12 L 12 2 M 5 2 L 12 2 L 12 9"
      : "M1 7 L 13 7 M 8 2 L 13 7 L 8 12";
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true">
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
