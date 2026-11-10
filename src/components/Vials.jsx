"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n";
import MediaImage from "@/components/MediaImage";
import "@/styles/vials.css";

const SLIDE_SECONDS = 10;
const RING = 157;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const CARE_AREAS = {
  testosterone: {
    label: "Testosterone",
    title: "Increase Testosterone",
    text: "Gain energy, focus, and strength with Pax’s personalized, physician-guided, biomarker-based Testosterone Replacement Therapy.",
    match: (item) => item.slug.includes("testosterone"),
  },
  weight: {
    label: "Weight Loss",
    title: "Lose Weight",
    text: "Access newly available medications and treatments that have revolutionized weight loss and transformed lives.",
    match: (item) => item.categorySlug === "weight-management" || /semaglutide|tirzepatide/.test(item.slug),
  },
  menopause: {
    label: "Menopause",
    title: "Relieve Menopause Symptoms",
    text: "Regain hormone balance, take control, and feel your best with personalized Hormone Replacement Therapy from Pax’s licensed physicians.",
    match: (item) => /estradiol|progesterone/.test(item.slug),
  },
};

/** Areas only appear when a live VCO treatment backs them; the rest of the Hone lineup has no Pax product yet. */
const CARE_TABS = [
  { label: "Men's Care", areas: ["testosterone", "weight"] },
  { label: "Women's Care", areas: ["menopause", "weight"] },
];

function buildTabs(treatments) {
  return CARE_TABS.map((tab) => ({
    label: tab.label,
    slides: tab.areas
      .map((key) => {
        const area = CARE_AREAS[key];
        const items = treatments.filter(area.match);
        if (items.length === 0) return null;
        const href = items.length === 1 ? `/treatments/${items[0].slug}` : `/programs/${items[0].categorySlug}`;
        return { key, ...area, href, image: items[0].image, imageAlt: items[0].imageAlt };
      })
      .filter(Boolean),
  })).filter((tab) => tab.slides.length > 0);
}

export default function Vials({ treatments = [] }) {
  const { t } = useLang();
  const tabs = buildTabs(treatments);
  const [tab, setTab] = useState(0);
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [navShift, setNavShift] = useState(0);
  const hovered = useRef(false);
  const ringRef = useRef(null);
  const countRef = useRef(null);
  const navRef = useRef(null);
  const swipeX = useRef(null);

  const current = tabs[Math.min(tab, tabs.length - 1)];
  const slides = current ? current.slides : [];
  const count = slides.length;

  const go = (i) => {
    setIndex(((i % count) + count) % count);
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    if (count === 0) return undefined;
    const ring = ringRef.current;
    const label = countRef.current;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let elapsed = 0;
    let last = performance.now();
    let frame;
    const paint = () => {
      const progress = Math.min(1, elapsed / (SLIDE_SECONDS * 1000));
      if (ring) ring.style.strokeDashoffset = String(RING * (1 - progress));
      if (label) label.textContent = String(Math.max(0, SLIDE_SECONDS - Math.round(progress * SLIDE_SECONDS))).padStart(2, "0");
      return progress;
    };
    paint();
    if (still) return undefined;
    const tick = (now) => {
      if (!hovered.current) elapsed += now - last;
      last = now;
      if (paint() >= 1) {
        setIndex((prev) => (prev + 1) % count);
        setCycle((c) => c + 1);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [cycle, tab, count]);

  useIsoLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav || count === 0) return undefined;
    const measure = () => {
      const item = nav.querySelector(".formula-nav__item");
      if (!item) return;
      const view = nav.clientWidth;
      const cell = item.offsetWidth;
      const total = cell * count;
      if (total <= view) {
        setNavShift((view - total) / 2);
      } else {
        const target = cell * (index + 0.5) - view / 2;
        setNavShift(-Math.min(Math.max(target, 0), total - view));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index, count, tab]);

  if (tabs.length === 0) return null;

  const pickTab = (i) => {
    setTab(i);
    setIndex(0);
    setCycle((c) => c + 1);
  };

  return (
    <section className="formula" id="vials" aria-labelledby="formula-title">
      <div className="formula-inner">
        <h2 id="formula-title" className="formula-title">
          {t("Find the Right")} <em>{t("Formula")}</em>
        </h2>
        <div className="formula-tabbed">
          <div className="formula-tabs">
            <div className="formula-tabs__inner" role="tablist" aria-label={t("Care categories")}>
              {tabs.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  aria-selected={i === tab}
                  className={`formula-tab${i === tab ? " is-active" : ""}`}
                  onClick={() => pickTab(i)}
                >
                  {t(item.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="formula-show" role="tabpanel" aria-label={t(current.label)}>
            <div
              className="formula-slides"
              onMouseEnter={() => { hovered.current = true; }}
              onMouseLeave={() => { hovered.current = false; }}
              onPointerDown={(e) => { swipeX.current = e.clientX; }}
              onPointerUp={(e) => {
                if (swipeX.current == null) return;
                const dx = e.clientX - swipeX.current;
                swipeX.current = null;
                if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
              }}
            >
              {slides.map((slide, i) => {
                const on = i === index;
                const showImage = on || i === (index + 1) % count;
                return (
                  <article
                    key={slide.key}
                    className={`formula-slide${on ? " is-selected" : ""}`}
                    aria-hidden={!on}
                    inert={!on ? true : undefined}
                  >
                    <div className="formula-slide__media">
                      {showImage ? (
                        <MediaImage src={slide.image} alt={slide.imageAlt} fill sizes="(max-width: 960px) 100vw, 50vw" quality={72} className="formula-slide__img" />
                      ) : null}
                    </div>
                    <div className="formula-slide__content">
                      <div className="formula-slide__top">
                        <span className="formula-eyebrow">{t(current.label)}</span>
                        <h3 className="formula-slide__title">{t(slide.title)}</h3>
                        <div className="formula-btn-wrap formula-btn-wrap--desktop">
                          <Link href={slide.href} className="formula-btn">{t("Learn More")}</Link>
                        </div>
                      </div>
                      <div className="formula-slide__bottom">
                        <p className="formula-slide__text">{t(slide.text)}</p>
                        <div className="formula-btn-wrap formula-btn-wrap--mobile">
                          <Link href={slide.href} className="formula-btn formula-btn--outline">{t("Learn More")}</Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <ol className="formula-dots" aria-label={t("Care slides")}>
              {slides.map((slide, i) => (
                <li key={slide.key}>
                  <button
                    type="button"
                    className={`formula-dot${i === index ? " is-selected" : ""}`}
                    aria-label={`${t("Go to slide")} ${i + 1}`}
                    aria-current={i === index ? "step" : undefined}
                    onClick={() => go(i)}
                  />
                </li>
              ))}
            </ol>

            <div className="formula-nav" ref={navRef}>
              <div className="formula-nav__track" style={{ transform: `translateX(${navShift}px)` }}>
                {slides.map((slide, i) => (
                  <button
                    key={slide.key}
                    type="button"
                    className={`formula-nav__item${i === index ? " is-selected" : ""}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => go(i)}
                  >
                    {t(slide.label)}
                  </button>
                ))}
              </div>
            </div>

            <div className="formula-progress" aria-hidden="true">
              <svg width="60" height="60">
                <circle cx="30" cy="30" r="25" className="formula-progress__track" />
                <circle cx="30" cy="30" r="25" className="formula-progress__ring" ref={ringRef} />
              </svg>
              <span className="formula-progress__text" ref={countRef}>{String(SLIDE_SECONDS).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
