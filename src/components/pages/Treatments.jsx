"use client";

import Link from "next/link";
import { BrandSeal, LanguageToggle } from "@/components/Chrome";
import { useLang } from "@/i18n";
import { DEFAULT_INTAKE_HREF, intakeHref } from "@/brand/productMap.js";
import {
  LIVE_PRODUCT_CARDS,
  FORMULA_CARDS,
  STUDIO_CARDS,
  PROGRAM_CARDS,
} from "@/data/designCatalog.js";
import "@/styles/design-pages.css";

export default function Treatments() {
  const { t } = useLang();

  return (
    <main className="design-page">
      <header className="absolute inset-x-0 top-0 z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 text-sand md:px-10">
          <Link href="/" className="inline-flex items-center gap-3 font-serif text-2xl tracking-tight">
            <BrandSeal className="h-12 w-12 md:h-16 md:w-16" />
            <span>
              Pax<span className="italic text-dune"> Health</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle className="text-sand" />
            <Link
              href={DEFAULT_INTAKE_HREF}
              className="hidden rounded-full bg-sand px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-forest transition hover:bg-dune sm:inline-flex"
            >
              {t("Take Assessment")}
            </Link>
          </div>
        </nav>
      </header>

      <section className="dp-hero">
        <img src="/images/pax-studio-t-vial-fit-v2-hq.webp" alt="" />
        <div className="dp-hero__veil" />
        <div className="dp-hero__inner">
          <p className="dp-kicker">{t("Treatments")}</p>
          <h1 className="dp-title">
            {t("Designed care.")} <em>{t("Live intake.")}</em>
          </h1>
          <p className="dp-lead">
            {t(
              "Studio product cards and formula photography for the Pax practice — with Semaglutide, Tirzepatide, and NAD+ open for clinical intake now.",
            )}
          </p>
        </div>
      </section>

      <section className="dp-section">
        <div className="dp-section-head">
          <h2>{t("Three live treatments")}</h2>
          <p>{t("Physician-reviewed protocols with secure clinical intake — never a cart checkout.")}</p>
        </div>
        <div className="dp-live-grid">
          {LIVE_PRODUCT_CARDS.map((card) => (
            <article key={card.id} className="dp-live-card">
              <Link href={card.href} className="dp-live-card__media">
                <img src={card.image} alt={card.name} />
              </Link>
              <div className="dp-live-card__body">
                <div className="dp-live-card__meta">
                  <span>{t(card.category)}</span>
                  <span>{t(card.badge)}</span>
                </div>
                <h3>
                  <Link href={card.href}>{t(card.name)}</Link>
                </h3>
                <p className="dp-live-card__blurb">{t(card.blurb)}</p>
                <p className="dp-live-card__price">{t(card.price)}</p>
                <Link href={intakeHref(card.intakeId)} className="dp-live-card__cta">
                  {t("Begin consultation →")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dp-section" style={{ paddingTop: 0 }}>
        <div className="dp-section-head">
          <h2>{t("Programs")}</h2>
          <p>{t("Card photography from the brand kit — start where your goals live.")}</p>
        </div>
        <div className="dp-formula-grid">
          {PROGRAM_CARDS.map((card) => (
            <Link key={card.id} href={card.href} className="dp-formula-card">
              <img src={card.image} alt={card.title} />
              <div className="dp-formula-card__overlay">
                <p className="dp-bento-card__eyebrow">{t(card.badge)}</p>
                <h3>{t(card.title)}</h3>
                <p>{t(card.blurb)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="dp-section" style={{ paddingTop: 0 }}>
        <div className="dp-section-head">
          <h2>{t("Formula photography")}</h2>
          <p>{t("Category stills used across the practice — weight, peptides, sexual health, hair, and menopause.")}</p>
        </div>
        <div className="dp-formula-grid">
          {FORMULA_CARDS.map((card) => (
            <Link key={card.id} href={card.href} className="dp-formula-card">
              <img src={card.image} alt={card.title} />
              <div className="dp-formula-card__overlay">
                <h3>{t(card.title)}</h3>
                <p>{t(card.teaser)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="dp-section" style={{ paddingTop: 0 }}>
        <div className="dp-section-head">
          <h2>{t("Studio product cards")}</h2>
          <p>
            {t(
              "Full designed catalog. Live clinical intake remains Semaglutide, Tirzepatide, and NAD+ — other formulas are discussed with your physician when appropriate.",
            )}
          </p>
        </div>
        <div className="dp-studio-grid">
          {STUDIO_CARDS.map((card) => (
            <article key={card.id} className="dp-studio-card">
              <div className="dp-studio-card__media">
                <img src={card.image} alt={card.name} loading="lazy" />
              </div>
              <div className="dp-studio-card__body">
                <p className="dp-studio-card__tag">{t(card.tag)}</p>
                <h3>{t(card.name)}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="dp-cta-band">
        <img src="/images/pax-longevity-cta-v6-hq.webp" alt="" />
        <div className="dp-cta-band__inner">
          <h2>{t("Ready for a licensed visit?")}</h2>
          <p style={{ color: "color-mix(in oklab, var(--sand) 80%, transparent)", lineHeight: 1.5 }}>
            {t("Begin with a short intake. A U.S.-licensed provider reviews your answers before anything is prescribed.")}
          </p>
          <Link href={DEFAULT_INTAKE_HREF} className="dp-btn">
            {t("Take Assessment")}
          </Link>
        </div>
      </div>
    </main>
  );
}
