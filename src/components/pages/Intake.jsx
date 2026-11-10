"use client";

import Link from "next/link";
import { BrandSeal, LanguageToggle } from "@/components/Chrome";
import { useLang } from "@/i18n";

export default function Intake({ productName = null }) {
  const { t } = useLang();

  return (
    <main className="min-h-screen w-full bg-sand">
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" aria-label={t("Pax Longevity home")}>
          <BrandSeal className="h-10 w-10" />
        </Link>
        <LanguageToggle />
      </header>
      <section className="mx-auto max-w-2xl px-6 py-28 md:px-10 md:py-40">
        <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("Clinical intake")}</p>
        <h1 className="mt-6 font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
          {t("Intake unavailable")}
          {productName ? (
            <>
              {" "}
              <em className="italic text-terracotta">{productName}</em>
            </>
          ) : null}
          .
        </h1>
        <p className="mt-6 font-serif text-lg leading-relaxed text-ink/75">
          {t("This treatment isn’t open for intake right now. Choose one of our live treatments to continue.")}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/treatments"
            className="inline-flex rounded-full bg-forest px-7 py-3 text-xs uppercase tracking-[0.22em] text-sand transition hover:bg-ink"
          >
            {t("See live treatments")}
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-full border border-ink/20 px-7 py-3 text-xs uppercase tracking-[0.22em] text-ink transition hover:border-forest"
          >
            {t("Back to Pax Longevity")}
          </Link>
        </div>
      </section>
    </main>
  );
}
