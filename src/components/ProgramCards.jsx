"use client";
import Link from "next/link";
import { useLang } from "@/i18n";

const PROGRAMS = [
  {
    tag: "Most demand",
    title: "GLPs / Weight Loss",
    description: "Physician-titrated Semaglutide & Tirzepatide protocols with monthly refills shipped to your door.",
    highlights: ["Compounded Semaglutide & Tirzepatide", "Personalized titration schedule", "Monthly check-ins & dose adjustments"],
    href: "/programs/weight-management",
  },
  {
    tag: "Controlled",
    title: "Hormone Health & Longevity",
    description: "TRT, HRT, and full metabolic panels with ongoing labs — compounded or commercial pharmacy options.",
    highlights: ["Testosterone & estrogen optimization", "Comprehensive baseline & follow-up labs", "Quarterly physician reviews"],
    href: "/programs/hormone-optimization",
  },
  {
    tag: "Premium",
    title: "Peptides & Wellness",
    description: "Custom peptide protocols — BPC-157, Ipamorelin, GHK-Cu and more — designed around recovery and longevity goals.",
    highlights: ["Recovery, growth, and longevity peptides", "Cycled protocols with safety monitoring", "Premium compounding partners"],
    comingSoon: true,
  },
  {
    tag: "Subscription",
    title: "Vitality & Performance",
    description: "Sildenafil, Tadalafil, PT-141, Tri-Mix. Discreet shipping, physician-supervised, refilled on autopilot.",
    highlights: ["ED & libido protocols for men and women", "Discreet, unmarked packaging", "On-demand & daily dosing options"],
    comingSoon: true,
  },
];

export default function ProgramCards() {
  const { t } = useLang();

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-8 border-b border-ink/15 pb-12 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("— Programs")}</p>
          <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.1] text-ink md:text-6xl">
            {t("Multiple programs,")} <em className="italic">{t("one practice.")}</em>
          </h2>
        </div>
        <p className="max-w-sm font-serif text-lg leading-relaxed text-ink/70">
          {t("Physician-led prescription programs — fulfilled by vetted pharmacy partners and shipped directly to your door.")}
        </p>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {PROGRAMS.map((program) => (
          <div key={program.title} className="group flex flex-col rounded-2xl border border-ink/15 bg-sand p-8 transition hover:border-terracotta hover:shadow-lg md:p-10">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-ink/15 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink/60">{t(program.tag)}</span>
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta">{t(program.comingSoon ? "Coming soon" : "Available now")}</span>
            </div>
            <h3 className="mt-6 font-serif text-3xl leading-tight text-ink md:text-4xl">{t(program.title)}</h3>
            <p className="mt-4 font-serif text-base leading-relaxed text-ink/70">{t(program.description)}</p>
            <ul className="mt-6 space-y-2 border-t border-ink/10 pt-6 font-serif text-sm text-ink/75">
              {program.highlights.map((item) => (
                <li key={item} className="flex gap-3"><span className="text-terracotta">—</span><span>{t(item)}</span></li>
              ))}
            </ul>
            {program.comingSoon ? (
              <a href="#waitlist" className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-ink/70 transition hover:text-terracotta">{t("Join the waitlist →")}</a>
            ) : (
              <Link href={program.href} className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-ink/70 transition hover:text-terracotta">{t("Begin consultation →")}</Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
