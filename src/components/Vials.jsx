"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n";
import { LIVE_TREATMENTS, intakeHref } from "@/brand/productMap.js";
import MediaImage from "@/components/MediaImage";
import "@/styles/vials.css";

const slides = [
  {
    id: "semaglutide",
    title: "Semaglutide",
    label: "Semaglutide",
    detail:
      "Once-weekly GLP-1 for weight and metabolic care. Live clinical intake after labs and a licensed provider visit — never a cart checkout.",
    src: "/images/pax-formula-weight-v2.webp",
    alt: "Pax weight-care treatment on warm limestone",
    price: "From $399/mo + membership",
    href: "/treatments/semaglutide",
  },
  {
    id: "tirzepatide",
    title: "Tirzepatide",
    label: "Tirzepatide",
    detail:
      "Dual-pathway weight care. Live clinical intake with dosing and follow-up set by your provider when labs and history support it.",
    src: "/images/pax-card-tirzepatide-v2.webp",
    alt: "Pax tirzepatide vial",
    price: "From $299/mo + membership",
    href: "/treatments/tirzepatide",
  },
  {
    id: "nad",
    title: "NAD+",
    label: "NAD+",
    detail:
      "Cellular energy and healthy aging support. Live clinical intake when a physician includes NAD+ in your longevity plan.",
    src: "/images/pax-card-nad-v3.webp",
    alt: "Pax NAD+ vials",
    price: "From $199 + membership",
    href: "/treatments/nad-1000-mg",
  },
];

export default function Vials() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (i) => setIndex(((i % slides.length) + slides.length) % slides.length);

  return (
    <section className="vials" id="vials" aria-label={t("Live treatments")}>
      <div className="vials-wrap">
        <h2>{t("Three live treatments")}</h2>
        <p className="vials-lead">
          {t(
            "Semaglutide, Tirzepatide, and NAD+ — the only treatments open for clinical intake on Pax right now. Care starts with intake, not a checkout.",
          )}
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
              return (
                <article
                  key={slide.id}
                  className={`vials-card ${on ? "is-on" : "is-off"}`}
                  aria-hidden={!on}
                  inert={!on ? true : undefined}
                >
                  <div className="vials-mobile">
                    <div className="vials-copy top">
                      <p className="vials-kicker">{t("Live intake")}</p>
                      <h3 className="vials-title">{t(slide.title)}</h3>
                      <p className="vials-price">{t(slide.price)}</p>
                    </div>
                    <div className="vials-well">
                      {showImage ? (
                        <MediaImage src={slide.src} alt={slide.alt} width={900} height={900} sizes="(max-width: 768px) 90vw, 40vw" quality={68} className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <div className="vials-copy bottom">
                      <p className="vials-detail">{t(slide.detail)}</p>
                      <Link href={slide.href} className="vials-btn">
                        {t("Learn More")}
                      </Link>
                      <Link href={intakeHref(slide.id)} className="vials-btn" style={{ marginLeft: "0.75rem" }}>
                        {t("Start intake")}
                      </Link>
                    </div>
                  </div>
                  <div className="vials-desktop">
                    <div className="vials-side">
                      <p className="vials-kicker">{t("Live intake")}</p>
                      <h3 className="vials-title">{t(slide.title)}</h3>
                      <p className="vials-price">{t(slide.price)}</p>
                      <p className="vials-detail">{t(slide.detail)}</p>
                      <div className="flex flex-wrap gap-3">
                        <Link href={slide.href} className="vials-btn">
                          {t("Learn More")}
                        </Link>
                        <Link href={intakeHref(slide.id)} className="vials-btn">
                          {t("Start intake")}
                        </Link>
                      </div>
                    </div>
                    <div className="vials-photo">
                      {showImage ? (
                        <MediaImage src={slide.src} alt="" width={1000} height={1000} sizes="(max-width: 960px) 50vw, 40vw" quality={68} className="h-full w-full object-cover" />
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
                key={slide.id}
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
                key={slide.id}
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
          {LIVE_TREATMENTS.length} {t("treatments connected to VirtualClinicOS hosted intake.")}
        </p>
      </div>
    </section>
  );
}
