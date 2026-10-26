"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n";
import "@/styles/vials.css";

const men = [
  {
    title: "Testosterone & Hormones",
    label: "Hormones",
    detail:
      "Low energy, drive, strength, and mood are measured first with labs ? not guessed from a symptom checklist. If levels and history support it, a licensed provider may discuss testosterone (injection or cream) and monitoring. Care starts only after review; it is never a one-click checkout.",
    src: "/images/pax-studio-t-vial-fit-v2-hq.webp",
    alt: "Pax testosterone cypionate vial on warm limestone",
    price: "From $28/mo + membership",
    href: "/programs/hormones",
  },
  {
    title: "Weight & Metabolism",
    label: "Weight",
    detail:
      "Weight care is a clinical plan, not a cart. Appetite, energy, glucose, and metabolic markers are reviewed before tirzepatide from $299/mo plus membership. Your provider sets dosing and follow-up only when it fits your labs, history, and goals.",
    src: "/images/pax-formula-weight-v2.webp",
    alt: "Pax tirzepatide pen on warm limestone",
    price: "From $299/mo + membership",
    href: "/programs/weight",
  },
  {
    title: "Longevity",
    label: "Peptides",
    detail:
      "Healthspan comes from measurement and follow-up ? recovery, inflammation, hormones, and metabolic signals over time. Peptides and cellular support such as BPC-157, TB-500, GHK-Cu, NAD+, or glutathione are included only when a provider says they belong in your plan, with safety monitoring.",
    src: "/images/pax-formula-peptides.webp",
    alt: "Pax vials labeled BPC-157, Ipamorelin, and GHK-Cu on linen",
    price: "BPC-157 $149/mo ? TB-500 $105/mo ? Ipamorelin $179/mo ? NAD+ $129/mo ? glutathione $75/mo",
    href: "/programs/peptides",
  },
  {
    title: "Sexual Wellness",
    label: "Vitality",
    detail:
      "Performance and libido are discussed privately with a physician. PT-141 may be considered only as part of a broader plan after clinical review ? medicine ships when prescribed, never as a standalone impulse buy.",
    src: "/images/pax-formula-sexual-v2.webp",
    alt: "Pax PT-141 bottle on warm limestone",
    price: "$75 + membership",
    href: "/programs/vitality",
  },
  {
    title: "Energy & Performance",
    label: "Energy",
    detail:
      "Persistent fatigue and focus issues are signals to measure, not mask. Labs come first; Selank or Semax at $95/mo plus membership may follow only when a provider includes them.",
    src: "/images/pax-cat-energy-v5-hq.webp",
    alt: "Man in a beige linen shirt, full figure in quiet morning light",
    price: "Selank and Semax $95/mo + membership",
  },
  {
    title: "Hair & Aging",
    label: "Hair",
    detail:
      "Hair thinning and appearance changes are reviewed with the rest of your health. GHK-Cu at $149/mo plus membership is added only when a provider says it belongs ? never as an isolated cosmetic upsell.",
    src: "/images/pax-formula-hair-v2.webp",
    alt: "Pax GHK-Cu vial on warm limestone",
    price: "GHK-Cu $149/mo + membership",
    href: "/treatments/ghk-cu",
  },
];

const women = [
  {
    title: "Hormonal Balance",
    label: "Hormones",
    detail:
      "Menopause and perimenopause care starts with what you want to change ? hot flashes, sleep, mood, libido, or brain fog. Baseline labs come first. A licensed provider may discuss estrogen, progesterone, or testosterone support only when clinically appropriate.",
    src: "/images/pax-formula-menopause.webp",
    alt: "Pax estradiol jar and progesterone bottle on linen",
    price: "Estradiol from $58/mo ? progesterone from $49/mo ? progesterone cream from $79/mo ? testosterone cream from $60/mo",
    href: "/programs/hormones",
  },
  {
    title: "Weight & Metabolism",
    label: "Weight",
    detail:
      "Weight care is a clinical plan built around appetite, energy, and metabolic health ? especially when hormones are shifting. Tirzepatide from $299/mo plus membership is considered only after labs and a provider visit, with dosing and follow-up set for you.",
    src: "/images/pax-formula-weight-v2.webp",
    alt: "Pax tirzepatide pen on warm limestone",
    price: "From $299/mo + membership",
    href: "/programs/weight",
  },
  {
    title: "Longevity",
    label: "Peptides",
    detail:
      "Longer healthspan means measuring what matters over time: hormones, metabolism, inflammation, and recovery. Peptides or other adjuncts are added only when a provider says they fit, with monitoring ? not as a longevity shopping list.",
    src: "/images/pax-formula-peptides.webp",
    alt: "Pax vials labeled BPC-157, Ipamorelin, and GHK-Cu on linen",
    price: "BPC-157 $149/mo ? KPV $179/mo ? Tesamorelin $189/mo ? NAD+ $129/mo",
    href: "/programs/peptides",
  },
  {
    title: "Sexual Wellness",
    label: "Vitality",
    detail:
      "Desire, comfort, and arousal are discussed privately with a physician. When appropriate, PT-141 at $75 plus membership may be part of a full plan ? medicine ships only if prescribed after review.",
    src: "/images/pax-formula-sexual-v2.webp",
    alt: "Pax PT-141 bottle on warm limestone",
    price: "$75 + membership",
    href: "/programs/vitality",
  },
  {
    title: "Energy & Performance",
    label: "Energy",
    detail:
      "Fatigue, brain fog, and focus are signals to measure. Labs come first; Selank or Semax at $95/mo plus membership may follow only when a provider includes them.",
    src: "/images/pax-cat-energy-women-v5-hq.webp",
    alt: "Woman in a beige linen shirt, quiet morning light",
    price: "Selank and Semax $95/mo + membership",
  },
  {
    title: "Hair, Skin & Aging",
    label: "Hair",
    detail:
      "Hair and skin changes are reviewed with hormones, nutrients, and the rest of your health. GHK-Cu at $149/mo plus membership is added only when a provider says it belongs.",
    src: "/images/pax-formula-hair-v2.webp",
    alt: "Pax GHK-Cu vial on warm limestone",
    price: "GHK-Cu $149/mo + membership",
    href: "/treatments/ghk-cu",
  },
];

export default function Vials() {
  const { t } = useLang();
  const [path, setPath] = useState("men");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = path === "women" ? women : men;
  const pathLabel = path === "women" ? t("Women's Care") : t("Men's Care");

  useEffect(() => {
    setIndex(0);
  }, [path]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => window.clearInterval(id);
  }, [slides.length, path, paused]);

  const go = (i) => setIndex(((i % slides.length) + slides.length) % slides.length);

  return (
    <section className="vials" id="vials" aria-label={t("Find a goal")}>
      <div className="vials-wrap">
        <h2>{t("Find a goal")}</h2>
        <p className="vials-lead">
          {t("Choose the path that matches what you want to change ? hormones, weight, longevity, sexual wellness, energy, or hair. One click shows the vial. Care still starts with the intake, not a checkout.")}
        </p>
        <div className="vials-tabs" role="tablist" aria-label={t("Care path")}>
          {[
            ["men", "Men's Care"],
            ["women", "Women's Care"],
          ].map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={path === id} onClick={() => setPath(id)}>
              {t(label)}
            </button>
          ))}
        </div>

        <div
          className="vials-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="vials-stack">
            {slides.map((slide, i) => {
              const on = i === index;
              const showImage = on || i === (index + 1) % slides.length;
              return (
                <article key={`${path}-${slide.title}`} className={`vials-card ${on ? "is-on" : "is-off"}`} aria-hidden={!on} inert={!on ? true : undefined}>
                  <div className="vials-mobile">
                    <div className="vials-copy top">
                      <p className="vials-kicker">{pathLabel}</p>
                      <h3 className="vials-title">{t(slide.title)}</h3>
                      <p className="vials-price">{t(slide.price)}</p>
                    </div>
                    <div className="vials-well">
                      {showImage ? <img src={slide.src} alt={slide.alt} /> : null}
                    </div>
                    <div className="vials-copy bottom">
                      <p className="vials-detail">{t(slide.detail)}</p>
                      <Link href={slide.href || "/intake"} className="vials-btn">{t("Learn More")}</Link>
                    </div>
                  </div>
                  <div className="vials-desktop">
                    <div className="vials-side">
                      <p className="vials-kicker">{pathLabel}</p>
                      <h3 className="vials-title">{t(slide.title)}</h3>
                      <p className="vials-price">{t(slide.price)}</p>
                      <p className="vials-detail">{t(slide.detail)}</p>
                      <div>
                        <Link href={slide.href || "/intake"} className="vials-btn">{t("Learn More")}</Link>
                      </div>
                    </div>
                    <div className="vials-photo">
                      {showImage ? <img src={slide.src} alt="" /> : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="vials-labels">
            {slides.map((slide, i) => (
              <button key={slide.title} type="button" aria-current={i === index ? "true" : undefined} onClick={() => go(i)}>
                {t(slide.label)}
              </button>
            ))}
          </div>
          <div className="vials-dots" role="tablist" aria-label={t("Formula slides")}>
            {slides.map((slide, i) => (
              <button key={slide.title} type="button" aria-label={`${t("Go to slide")} ${i + 1}`} aria-current={i === index ? "true" : undefined} onClick={() => go(i)} />
            ))}
          </div>
          <div className="vials-arrows">
            <button type="button" aria-label={t("Previous")} onClick={() => go(index - 1)}>?</button>
            <button type="button" aria-label={t("Next")} onClick={() => go(index + 1)}>?</button>
          </div>
        </div>
      </div>
    </section>
  );
}
