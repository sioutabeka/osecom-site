/**
 * Per-character "rise" animation headline.
 * - `lines`: array. Each entry is a string (animated per-char) OR an array
 *   of segments — a segment is either a string or a React node rendered
 *   as-is (used for inline widgets like a word rotator).
 * - `accentIdx`: index of the line painted in the olive accent color.
 *
 * Chars are grouped into per-word spans with `white-space: nowrap` so the
 * browser never breaks a word in the middle of its rise animation.
 * The stagger delay (var --d) is computed from line × char position.
 */
export default function MorphHeadline({ lines, accentIdx = 1 }) {
  return (
    <h1 className="morph">
      {lines.map((line, lineIndex) => {
        const segments = Array.isArray(line) ? line : [line];
        const accentClass =
          lineIndex === accentIdx ? "morph__ch--accent" : "";
        let charOffset = 0;

        const nodes = [];
        segments.forEach((seg, segIndex) => {
          if (typeof seg !== "string") {
            nodes.push(
              <span key={`s-${segIndex}`} className="morph__seg">
                {seg}
              </span>
            );
            return;
          }
          // Split into word + whitespace tokens. Words become nowrap groups
          // of chars; whitespace becomes a flexible break-allowed gap.
          const tokens = seg.match(/\S+|\s+/g) || [];
          tokens.forEach((tok, tokIndex) => {
            if (/^\s+$/.test(tok)) {
              charOffset += tok.length;
              nodes.push(
                <span
                  key={`sp-${segIndex}-${tokIndex}`}
                  className="morph__space"
                >
                  {tok}
                </span>
              );
              return;
            }
            const startOffset = charOffset;
            charOffset += [...tok].length;
            nodes.push(
              <span
                key={`w-${segIndex}-${tokIndex}`}
                className="morph__word"
              >
                {[...tok].map((char, ci) => (
                  <span
                    key={ci}
                    className={"morph__ch " + accentClass}
                    style={{
                      "--d":
                        lineIndex * 0.4 +
                        (startOffset + ci) * 0.025 +
                        "s",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            );
          });
        });

        return (
          <span className="morph__line" key={lineIndex}>
            {nodes}
          </span>
        );
      })}
    </h1>
  );
}
