"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n";
import { canStartIntake, joinCategories, priceLabel } from "@/brand/productMap.js";
import MediaImage from "@/components/MediaImage";
import "@/styles/vials.css";

export default function Vials({ treatments = [] }) {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = treatments;

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;

  const go = (i) => setIndex(((i % slides.length) + slides.length) % slides.length);

  return (
    <section className="vials" id="vials" aria-label={t("Live treatments")}>
      <div className="vials-wrap">
        <h2>{t("Live treatments")}</h2>
        <p className="vials-lead">
          {t("Open for clinical intake on Pax right now:")} {joinCategories(slides, t)}.{" "}
          {t("Care starts with intake, not a checkout.")}
        </p>

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
              const href = `/treatments/${slide.slug}`;
              const kicker = slide.inStock ? t("Live intake") : t("Currently unavailable");
              const intake = canStartIntake(slide) ? (
                <a href={slide.intakeUrl} className="vials-btn">
                  {t("Start intake")}
                </a>
              ) : null;
              return (
                <article
                  key={slide.slug}
                  className={`vials-card ${on ? "is-on" : "is-off"}`}
                  aria-hidden={!on}
                  inert={!on ? true : undefined}
                >
                  <div className="vials-mobile">
                    <div className="vials-copy top">
                      <p className="vials-kicker">{kicker}</p>
                      <h3 className="vials-title">{t(slide.name)}</h3>
                      <p className="vials-price">{priceLabel(slide, t)}</p>
                    </div>
                    <div className="vials-well">
                      {showImage ? (
                        <MediaImage src={slide.image} alt={slide.imageAlt} width={900} height={900} sizes="(max-width: 768px) 90vw, 40vw" quality={68} className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <div className="vials-copy bottom">
                      <p className="vials-detail">{t(slide.summary)}</p>
                      <div className="vials-actions">
                        <Link href={href} className="vials-btn">
                          {t("Learn More")}
                        </Link>
                        {intake}
                      </div>
                    </div>
                  </div>
                  <div className="vials-desktop">
                    <div className="vials-side">
                      <p className="vials-kicker">{kicker}</p>
                      <h3 className="vials-title">{t(slide.name)}</h3>
                      <p className="vials-price">{priceLabel(slide, t)}</p>
                      <p className="vials-detail">{t(slide.summary)}</p>
                      <div className="vials-actions">
                        <Link href={href} className="vials-btn">
                          {t("Learn More")}
                        </Link>
                        {intake}
                      </div>
                    </div>
                    <div className="vials-photo">
                      {showImage ? (
                        <MediaImage src={slide.image} alt="" width={1000} height={1000} sizes="(max-width: 960px) 50vw, 40vw" quality={68} className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="vials-labels">
            {slides.map((slide, i) => (
              <button
                key={slide.slug}
                type="button"
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
              >
                {t(slide.label)}
              </button>
            ))}
          </div>
          <div className="vials-dots" role="tablist" aria-label={t("Treatment slides")}>
            {slides.map((slide, i) => (
              <button
                key={slide.slug}
                type="button"
                aria-label={`${t("Go to slide")} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <div className="vials-arrows">
            <button type="button" aria-label={t("Previous")} onClick={() => go(index - 1)}>
              ‹
            </button>
            <button type="button" aria-label={t("Next")} onClick={() => go(index + 1)}>
              ›
            </button>
          </div>
        </div>

        <p className="vials-lead" style={{ marginTop: "2rem" }}>
          {slides.length} {t("treatments connected to VirtualClinicOS hosted intake.")}
        </p>
      </div>
    </section>
  );
}
