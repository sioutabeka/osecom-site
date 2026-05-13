import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROUTES } from "../config/routes";

const STEPS = [
  {
    num: "01",
    label: "Stratégie",
    title: "Clarifier avant de produire plus.",
    text: "Positionnement, message, ligne éditoriale et piliers de contenu. On pose la direction avant de poster.",
    accent: "#F5BADF",
    bg: "linear-gradient(135deg, #F5BADF 0%, #E791C0 100%)",
  },
  {
    num: "02",
    label: "Community Management",
    title: "Animer une présence qui construit vraiment.",
    text: "Calendrier, publication, modération et engagement. Une parole cohérente qui s'installe semaine après semaine.",
    accent: "#7C8136",
    bg: "linear-gradient(135deg, #7C8136 0%, #5C611F 100%)",
  },
  {
    num: "03",
    label: "Création UGC",
    title: "Du contenu qui ressemble à votre audience.",
    text: "Production de vidéos courtes, témoignages et formats natifs pensés pour les algorithmes et la conversion.",
    accent: "#C8D3E8",
    bg: "linear-gradient(135deg, #C8D3E8 0%, #8FA0BE 100%)",
  },
  {
    num: "04",
    label: "Acquisition",
    title: "Transformer la visibilité en clients.",
    text: "Boosts, campagnes paid et entonnoirs de conversion. La performance comme prolongement naturel du contenu.",
    accent: "#F0E5A8",
    bg: "linear-gradient(135deg, #F0E5A8 0%, #C9BC6E 100%)",
  },
];

/**
 * Pinned services showcase, cyberscope-style.
 * The section pins for ~4 viewports while a circular media tile and
 * the right-hand copy crossfade between each service step.
 */
export default function PinnedServices() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const mediaRefs = useRef([]);
  const labelRefs = useRef([]);
  const titleRefs = useRef([]);
  const textRefs = useRef([]);
  const numRefs = useRef([]);
  const titlesBoxRef = useRef(null);
  const textsBoxRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const total = STEPS.length;

      const measure = (el) => {
        const prev = el.style.cssText;
        el.style.cssText = "visibility:visible;opacity:1;transform:none;position:static";
        const h = el.getBoundingClientRect().height;
        el.style.cssText = prev;
        return h;
      };

      let currentTl = null;

      const build = () => {
        // Tear down the previous timeline + its ScrollTrigger so the rebuild
        // doesn't stack two pinning controllers on the same section.
        if (currentTl) {
          currentTl.scrollTrigger?.kill();
          currentTl.kill();
        }

        const titleHeights = titleRefs.current.map(measure);
        const textHeights = textRefs.current.map(measure);

        // Initial state: only step 0 visible, containers sized to step 0.
        mediaRefs.current.forEach((el, i) => {
          gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.1 });
        });
        [labelRefs, titleRefs, textRefs, numRefs].forEach((group) => {
          group.current.forEach((el, i) => {
            gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, yPercent: i === 0 ? 0 : 40 });
          });
        });
        gsap.set(titlesBoxRef.current, { height: titleHeights[0] });
        gsap.set(textsBoxRef.current, { height: textHeights[0] });
        gsap.set(progressRef.current, { "--progress": "0%" });

        currentTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${total * 100}%`,
            pin: pinRef.current,
            pinType: "transform",
            anticipatePin: 1,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        for (let i = 1; i < total; i++) {
          const at = `+=1`;
          currentTl
            .to(mediaRefs.current[i - 1], { autoAlpha: 0, scale: 0.85, duration: 1 }, at)
            .to(mediaRefs.current[i], { autoAlpha: 1, scale: 1, duration: 1 }, "<")
            .to(labelRefs.current[i - 1], { autoAlpha: 0, yPercent: -40, duration: 1 }, "<")
            .to(labelRefs.current[i], { autoAlpha: 1, yPercent: 0, duration: 1 }, "<")
            .to(titleRefs.current[i - 1], { autoAlpha: 0, yPercent: -30, duration: 1 }, "<")
            .to(titleRefs.current[i], { autoAlpha: 1, yPercent: 0, duration: 1 }, "<")
            .to(textRefs.current[i - 1], { autoAlpha: 0, yPercent: -20, duration: 1 }, "<")
            .to(textRefs.current[i], { autoAlpha: 1, yPercent: 0, duration: 1 }, "<")
            .to(numRefs.current[i - 1], { autoAlpha: 0, yPercent: -40, duration: 1 }, "<")
            .to(numRefs.current[i], { autoAlpha: 1, yPercent: 0, duration: 1 }, "<")
            .to(titlesBoxRef.current, { height: titleHeights[i], duration: 1, ease: "power2.inOut" }, "<")
            .to(textsBoxRef.current, { height: textHeights[i], duration: 1, ease: "power2.inOut" }, "<")
            .to(progressRef.current, { "--progress": `${(i / (total - 1)) * 100}%`, duration: 1 }, "<");
        }
      };

      // First build with whatever fonts are available right now (may be the
      // serif fallback). Then rebuild once Cormorant is actually ready so the
      // measured heights reflect the real glyph metrics.
      build();
      document.fonts?.ready?.then(build);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pin-services" ref={sectionRef}>
      <div className="pin-services__inner" ref={pinRef}>
        <div className="pin-services__media">
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              ref={(el) => (mediaRefs.current[i] = el)}
              className="pin-services__circle"
              style={{ background: s.bg }}
            >
              <span className="pin-services__circle-num">{s.num}</span>
            </div>
          ))}
        </div>

        <div className="pin-services__content">
          <div className="pin-services__nums">
            {STEPS.map((s, i) => (
              <span
                key={s.num}
                ref={(el) => (numRefs.current[i] = el)}
                className="pin-services__num"
              >
                {s.num} / {String(STEPS.length).padStart(2, "0")}
              </span>
            ))}
          </div>

          <div className="pin-services__labels">
            {STEPS.map((s, i) => (
              <span
                key={s.num}
                ref={(el) => (labelRefs.current[i] = el)}
                className="pin-services__label"
                style={{ color: s.accent }}
              >
                {s.label}
              </span>
            ))}
          </div>

          <div className="pin-services__titles" ref={titlesBoxRef}>
            {STEPS.map((s, i) => (
              <h2
                key={s.num}
                ref={(el) => (titleRefs.current[i] = el)}
                className="pin-services__title"
              >
                {s.title}
              </h2>
            ))}
          </div>

          <div className="pin-services__texts" ref={textsBoxRef}>
            {STEPS.map((s, i) => (
              <p
                key={s.num}
                ref={(el) => (textRefs.current[i] = el)}
                className="pin-services__text"
              >
                {s.text}
              </p>
            ))}
          </div>

          <Link to={ROUTES.services} className="btn btn--ghost pin-services__cta">
            Voir toutes les offres
          </Link>
        </div>

        <div className="pin-services__progress" ref={progressRef}>
          <span className="pin-services__progress-bar" />
        </div>
      </div>
    </section>
  );
}
