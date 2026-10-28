"use client";

import Link from "next/link";
import { BrandSeal, LanguageToggle } from "@/components/Chrome";
import { useLang } from "@/i18n";
import { DEFAULT_INTAKE_HREF } from "@/brand/productMap.js";
import { LIFESTYLE_PILLARS } from "@/data/designCatalog.js";
import "@/styles/design-pages.css";

export default function Lifestyle() {
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
              href="/treatments"
              className="hidden rounded-full border border-sand/50 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-sand transition hover:bg-sand hover:text-forest sm:inline-flex"
            >
              {t("Treatments")}
            </Link>
          </div>
        </nav>
      </header>

      <section className="dp-hero">
        <img src="/images/lifestyle-movement.webp" alt="" />
        <div className="dp-hero__veil" />
        <div className="dp-hero__inner">
          <p className="dp-kicker">{t("The Pax Lifestyle")}</p>
          <h1 className="dp-title">
            {t("Four rituals.")} <em>{t("One long life.")}</em>
          </h1>
          <p className="dp-lead">
            {t(
              "Movement, nourishment, active longevity, and mind-body balance — the coastal practices that surround every clinical plan.",
            )}
          </p>
        </div>
      </section>

      <section className="dp-section">
        <div className="dp-bento">
          {LIFESTYLE_PILLARS.map((pillar) => (
            <article key={pillar.id} className="dp-bento-card">
              <img src={pillar.image} alt={pillar.alt} />
              <div className="dp-bento-card__body">
                <p className="dp-bento-card__eyebrow">{t(pillar.eyebrow)}</p>
                <h3>{t(pillar.title)}</h3>
                <p>{t(pillar.teaser)}</p>
                <ul className="dp-practices">
                  {pillar.practices.map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="dp-cta-band">
        <img src="/images/pax-cat-energy-v5-hq.webp" alt="" />
        <div className="dp-cta-band__inner">
          <h2>{t("Pair lifestyle with a live protocol")}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Link href="/treatments" className="dp-btn">
              {t("View treatments")}
            </Link>
            <Link href={DEFAULT_INTAKE_HREF} className="dp-btn dp-btn--ghost">
              {t("Take Assessment")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
