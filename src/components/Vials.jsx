"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n";
import { groupByCategory } from "@/brand/productMap.js";
import MediaImage from "@/components/MediaImage";
import "@/styles/vials.css";

const SLIDE_SECONDS = 10;
const RING = 157;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Vials({ treatments = [] }) {
  const { t } = useLang();
  const groups = groupByCategory(treatments);
  const [tab, setTab] = useState(0);
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [navShift, setNavShift] = useState(0);
  const hovered = useRef(false);
  const ringRef = useRef(null);
  const countRef = useRef(null);
  const navRef = useRef(null);
  const swipeX = useRef(null);

  const group = groups[Math.min(tab, groups.length - 1)];
  const slides = group ? group.items : [];
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

  if (groups.length === 0) return null;

  const pickTab = (i) => {
    setTab(i);
    setIndex(0);
    setCycle((c) => c + 1);
  };

  return (
    <section className="formula" id="vials" aria-labelledby="formula-title">
      <div className="formula-inner">
        <h2 id="formula-title" className="formula-title">
          {t("Find your")} <em>{t("protocol.")}</em>
        </h2>
        <div className="formula-tabbed">
          <div className="formula-tabs">
            <div className="formula-tabs__inner" role="tablist" aria-label={t("Treatment categories")}>
              {groups.map((g, i) => (
                <button
                  key={g.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === tab}
                  className={`formula-tab${i === tab ? " is-active" : ""}`}
                  onClick={() => pickTab(i)}
                >
                  {t(g.name)}
                </button>
              ))}
            </div>
          </div>

          <div className="formula-show" role="tabpanel" aria-label={t(group.name)}>
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
                const href = `/treatments/${slide.slug}`;
                return (
                  <article
                    key={slide.slug}
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
                        <span className="formula-eyebrow">{t(group.name)}</span>
                        <h3 className="formula-slide__title">{t(slide.label)}</h3>
                        <div className="formula-btn-wrap formula-btn-wrap--desktop">
                          <Link href={href} className="formula-btn">{t("Learn More")}</Link>
                        </div>
                      </div>
                      <div className="formula-slide__bottom">
                        <p className="formula-slide__text">{t(slide.summary)}</p>
                        <div className="formula-btn-wrap formula-btn-wrap--mobile">
                          <Link href={href} className="formula-btn formula-btn--outline">{t("Learn More")}</Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <ol className="formula-dots" aria-label={t("Treatment slides")}>
              {slides.map((slide, i) => (
                <li key={slide.slug}>
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
                    key={slide.slug}
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
