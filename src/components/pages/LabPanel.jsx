"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BrandSeal, LanguageToggle } from "@/components/Chrome";
import MediaImage from "@/components/MediaImage";
import { useLang } from "@/i18n";
import { DEFAULT_INTAKE_HREF } from "@/brand/productMap.js";
import { LAB_PANELS, findLabPanel } from "@/data/labPanels.js";
import NotFound from "@/components/pages/NotFound";

export default function LabPanel() {
  const { slug } = useParams();
  const panel = findLabPanel(slug);
  const { t } = useLang();
  if (!panel) return <NotFound />;

  const others = LAB_PANELS.filter((item) => item.slug !== panel.slug);

  return (
    <main className="min-h-screen bg-sand text-ink">
      <header className="border-b border-ink/10 bg-[oklch(0.93_0.022_72)]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-10">
          <Link href="/" className="inline-flex items-center gap-3 font-serif text-2xl tracking-tight">
            <BrandSeal className="h-12 w-12 md:h-16 md:w-16" />
            <span>
              Pax<span className="italic text-terracotta"> Health</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link
              href="/#blood-testing"
              className="hidden text-xs uppercase tracking-[0.18em] text-ink/60 transition hover:text-terracotta sm:inline"
            >
              {t("All panels")}
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t(panel.eyebrow)}</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-ink md:text-6xl">{t(panel.title)}</h1>
          <p className="mt-6 font-serif text-lg leading-relaxed text-ink/70 md:text-xl">{t(panel.summary)}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={DEFAULT_INTAKE_HREF}
              className="rounded-full bg-terracotta px-7 py-3 text-xs uppercase tracking-[0.2em] text-sand transition hover:bg-terracotta/90"
            >
              {t("Begin intake")}
            </Link>
            <Link
              href="/#blood-testing"
              className="rounded-full border border-ink/25 px-7 py-3 text-xs uppercase tracking-[0.2em] text-ink transition hover:border-ink hover:bg-ink hover:text-sand"
            >
              {t("Back to panels")}
            </Link>
          </div>
          <MediaImage
            src="/images/pax-bloodwork-page-v4-hq.webp"
            alt={t("Quiet focus before the plan — Pax diagnostics")}
            width={900}
            height={1125}
            sizes="(max-width: 768px) 0px, 40vw"
            quality={68}
            className="mt-12 hidden w-full rounded-3xl object-cover shadow-lg md:block"
          />
        </div>

        <div className="md:col-span-7">
          <div className="rounded-3xl border border-ink/10 bg-[#fffbf5] p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-terracotta">{t("Markers in this panel")}</p>
            <ul className="mt-8 divide-y divide-ink/10">
              {panel.markers.map((marker) => (
                <li key={marker.name} className="py-5 first:pt-0 last:pb-0">
                  <h2 className="font-serif text-2xl text-ink md:text-3xl">{t(marker.name)}</h2>
                  <p className="mt-2 font-serif text-base leading-relaxed text-ink/70 md:text-lg">{t(marker.detail)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-dune/25 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <h2 className="font-serif text-3xl text-ink md:text-4xl">{t("Other panels we measure")}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/labs/${item.slug}`}
                className="rounded-2xl border border-ink/10 bg-sand p-6 transition hover:border-terracotta hover:shadow-md"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-terracotta">{t(item.title)}</p>
                <ul className="mt-4 space-y-1.5 font-serif text-base text-ink/80">
                  {item.markers.map((marker) => (
                    <li key={marker.name} className="flex gap-2">
                      <span className="text-terracotta">•</span>
                      <span>{t(marker.name)}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
