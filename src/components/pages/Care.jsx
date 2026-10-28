"use client";

import Link from "next/link";
import { BrandSeal, LanguageToggle } from "@/components/Chrome";
import { useLang } from "@/i18n";
import { DEFAULT_INTAKE_HREF } from "@/brand/productMap.js";
import { CARE_DOCTORS, FORMULA_CARDS } from "@/data/designCatalog.js";
import "@/styles/design-pages.css";

export default function Care() {
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
          <LanguageToggle className="text-sand" />
        </nav>
      </header>

      <section className="dp-hero">
        <img src="/images/pax-physicians-v5-hq.webp" alt="" />
        <div className="dp-hero__veil" />
        <div className="dp-hero__inner">
          <p className="dp-kicker">{t("Care team")}</p>
          <h1 className="dp-title">
            {t("Licensed providers.")} <em>{t("Quiet consults.")}</em>
          </h1>
          <p className="dp-lead">
            {t(
              "Independent U.S.-licensed clinicians review your intake, labs, and goals before anything ships — private telehealth, not a waiting room.",
            )}
          </p>
        </div>
      </section>

      <section className="dp-section">
        <div className="dp-section-head">
          <h2>{t("Clinicians who lead the plan")}</h2>
          <p>{t("Illustrated care portraits from the brand kit — paired with live Semaglutide, Tirzepatide, and NAD+ intake.")}</p>
        </div>
        <div className="dp-doctors">
          {CARE_DOCTORS.map((doc) => (
            <article key={doc.name} className="dp-doctor">
              <img src={doc.image} alt={doc.name} />
              <div>
                <h3>{doc.name}</h3>
                <p>{t(doc.bio)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dp-section" style={{ paddingTop: 0 }}>
        <div className="dp-split">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("— Consult")}</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              {t("A private visit,")} <em className="italic text-terracotta">{t("on your schedule.")}</em>
            </h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-ink/70">
              {t(
                "Share history and goals. Complete labs. Meet a licensed provider who decides whether treatment belongs — then ship only if it does.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={DEFAULT_INTAKE_HREF} className="rounded-full bg-forest px-7 py-3 text-xs uppercase tracking-[0.2em] text-sand transition hover:bg-forest/90">
                {t("Begin intake →")}
              </Link>
              <Link href="/network" className="rounded-full border border-ink/25 px-7 py-3 text-xs uppercase tracking-[0.2em] text-ink transition hover:border-ink hover:bg-ink hover:text-sand">
                {t("Partner network")}
              </Link>
            </div>
          </div>
          <img src="/images/pax-consult-v5-hq.webp" alt={t("Licensed provider in a private telehealth consult")} />
        </div>
      </section>

      <section className="dp-section" style={{ paddingTop: 0 }}>
        <div className="dp-section-head">
          <h2>{t("Formulas under clinical review")}</h2>
          <p>{t("Category photography for conversations with your provider — live intake stays on the three open treatments.")}</p>
        </div>
        <div className="dp-formula-grid">
          {FORMULA_CARDS.map((card) => (
            <Link key={card.id} href={card.href === "/care" ? "/treatments" : card.href} className="dp-formula-card">
              <img src={card.image} alt={card.title} />
              <div className="dp-formula-card__overlay">
                <h3>{t(card.title)}</h3>
                <p>{t(card.teaser)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="dp-cta-band">
        <img src="/images/pax-women-hub-v5-hq.webp" alt="" />
        <div className="dp-cta-band__inner">
          <h2>{t("Start with assessment")}</h2>
          <Link href={DEFAULT_INTAKE_HREF} className="dp-btn">
            {t("Take Assessment")}
          </Link>
        </div>
      </div>
    </main>
  );
}
