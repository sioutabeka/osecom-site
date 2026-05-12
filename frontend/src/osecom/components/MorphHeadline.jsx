/**
 * Per-character "rise" animation headline.
 * - `lines`: array of strings (each rendered on its own visual line).
 * - `accentIdx`: index of the line painted in the olive accent color.
 * The stagger delay is computed from line × char position and exposed
 * to CSS via the `--d` custom property (read by .morph__ch animation).
 */
export default function MorphHeadline({ lines, accentIdx = 1 }) {
  return (
    <h1 className="morph">
      {lines.map((line, lineIndex) => (
        <span className="morph__line" key={lineIndex}>
          {[...line].map((char, charIndex) => (
            <span
              key={charIndex}
              className={
                "morph__ch " +
                (lineIndex === accentIdx ? "morph__ch--accent" : "")
              }
              style={{ "--d": lineIndex * 0.4 + charIndex * 0.025 + "s" }}
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
