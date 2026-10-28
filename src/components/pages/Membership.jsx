"use client";

import Link from "next/link";
import { BrandSeal, LanguageToggle } from "@/components/Chrome";
import { useLang } from "@/i18n";
import { DEFAULT_INTAKE_HREF } from "@/brand/productMap.js";
import "@/styles/design-pages.css";

const tiers = [
  {
    name: "Basic",
    price: "$25/mo",
    points: ["Secure messaging", "Member pharmacy pricing", "Priority intake queue"],
  },
  {
    name: "Premium",
    price: "$155/mo",
    points: ["Everything in Basic", "Quarterly labs add-on pricing", "Physician follow-up cadence"],
  },
];

export default function Membership() {
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
        <img src="/images/pax-membership-v4-hq.webp" alt="" />
        <div className="dp-hero__veil" />
        <div className="dp-hero__inner">
          <p className="dp-kicker">{t("Membership")}</p>
          <h1 className="dp-title">
            {t("A quieter way")} <em>{t("to stay in care.")}</em>
          </h1>
          <p className="dp-lead">
            {t(
              "Membership keeps your record, messaging, and pharmacy pricing in one place — while medication is billed only after a licensed provider says it should.",
            )}
          </p>
        </div>
      </section>

      <section className="dp-section">
        <div className="dp-split">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("— Practice membership")}</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              {t("Designed around the long life,")} <em className="italic text-terracotta">{t("not a cart.")}</em>
            </h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-ink/70">
              {t(
                "Founding members receive priority intake, baseline bloodwork pathways, and physician-guided protocols built around biology — not impulse refills.",
              )}
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {tiers.map((tier) => (
                <div key={tier.name} className="rounded-2xl border border-ink/12 bg-[#fffbf5] p-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-terracotta">{t(tier.name)}</p>
                  <p className="mt-3 font-serif text-3xl text-ink">{tier.price}</p>
                  <ul className="mt-5 space-y-2 font-serif text-base text-ink/75">
                    {tier.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="text-terracotta">•</span>
                        <span>{t(point)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link
              href={DEFAULT_INTAKE_HREF}
              className="mt-10 inline-flex rounded-full bg-forest px-7 py-3 text-xs uppercase tracking-[0.2em] text-sand transition hover:bg-forest/90"
            >
              {t("Begin intake →")}
            </Link>
          </div>
          <img src="/images/pax-front-membership-v4-hq.webp" alt={t("Membership ritual — journal and quiet intention")} />
        </div>
      </section>

      <section className="dp-section" style={{ paddingTop: 0 }}>
        <div className="dp-split">
          <img src="/images/pax-bloodwork-page-v4-hq.webp" alt={t("At-home diagnostics still life")} />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("— Diagnostics")}</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              {t("Bloodwork that")} <em className="italic text-terracotta">{t("belongs with membership.")}</em>
            </h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-ink/70">
              {t(
                "At-home collection and CLIA-certified partners feed your plan. Results are reviewed before treatment — so dosing follows data.",
              )}
            </p>
            <Link href="/how-pax-works" className="mt-8 inline-flex text-xs uppercase tracking-[0.2em] text-terracotta transition hover:text-ink">
              {t("How Pax works →")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
