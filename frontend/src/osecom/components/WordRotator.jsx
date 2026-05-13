import { useEffect, useState } from "react";

/**
 * Inline word cycler. Cycles through `words` every `interval` ms.
 * The previous word slides up + fades out while the next rises from below.
 * Designed to live inside a serif headline — inherits font/size/color.
 */
export default function WordRotator({ words, interval = 2400 }) {
  const [i, setI] = useState(0);
  const [exiting, setExiting] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setExiting(i);
      setI((x) => (x + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [i, words.length, interval]);

  useEffect(() => {
    if (exiting === null) return;
    const t = setTimeout(() => setExiting(null), 650);
    return () => clearTimeout(t);
  }, [exiting]);

  return (
    <span className="word-rot">
      <span key={i} className="word-rot__item word-rot__item--in">
        {words[i]}
      </span>
      {exiting !== null && exiting !== i && (
        <span
          key={`exit-${exiting}`}
          className="word-rot__item word-rot__item--out"
          aria-hidden="true"
        >
          {words[exiting]}
        </span>
      )}
    </span>
  );
}
