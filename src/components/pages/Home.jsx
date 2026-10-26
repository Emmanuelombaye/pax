"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n";
import { BrandSeal, Icon, LanguageToggle, icons } from "@/components/Chrome";
import Vials from "@/components/Vials";
import LiveTreatments from "@/components/LiveTreatments";
import { DEFAULT_INTAKE_HREF, intakeHrefForProgram } from "@/brand/productMap.js";
import "@/styles/footer-badges.css";

const programs = [
  {
    slug: "weight",
    tag: "Most demand",
    title: "GLPs / Weight Loss",
    description: "Physician-titrated Semaglutide & Tirzepatide protocols with monthly refills shipped to your door.",
    highlights: ["Live intake: Semaglutide & Tirzepatide", "Personalized titration schedule", "Monthly check-ins & dose adjustments"],
    price: "Semaglutide & Tirzepatide — clinical intake open",
  },
  {
    slug: "hormones",
    tag: "Controlled",
    title: "Hormone Health & Longevity",
    description: "TRT, HRT, and full metabolic panels with ongoing labs ? compounded or commercial pharmacy options.",
    highlights: ["Testosterone & estrogen optimization", "Comprehensive baseline & follow-up labs", "Quarterly physician reviews"],
    price: "Testosterone from $28/mo + membership",
  },
  {
    slug: "peptides",
    tag: "Premium",
    title: "Peptides & Wellness",
    description: "Custom peptide protocols ? BPC-157, Ipamorelin, GHK-Cu and more ? designed around recovery and longevity goals.",
    highlights: ["Live intake: NAD+", "Cycled protocols with safety monitoring", "Premium compounding partners"],
    price: "NAD+ live · other peptides by consult",
  },
  {
    slug: "vitality",
    tag: "Subscription",
    title: "Vitality & Performance",
    description: "Sildenafil, Tadalafil, PT-141, Tri-Mix. Discreet shipping, physician-supervised, refilled on autopilot.",
    highlights: ["ED & libido protocols for men and women", "Discreet, unmarked packaging", "On-demand & daily dosing options"],
    price: "PT-141 $75 + membership",
  },
];

const panels = [
  { title: "Hormones", markers: ["Total Testosterone", "Free Testosterone", "Estradiol (E2)", "Progesterone", "SHBG"] },
  { title: "Cardiovascular Health", markers: ["ApoB", "LDL", "HDL", "Triglycerides", "hs-CRP"] },
  { title: "Metabolic Health", markers: ["Fasting Insulin", "Hemoglobin A1C", "Glucose"] },
  { title: "Thyroid Health", markers: ["TSH", "Free T3", "Free T4"] },
  { title: "Nutrient Status", markers: ["Vitamin D", "Vitamin B12", "Ferritin", "Iron Studies"] },
  { title: "General Health", markers: ["CBC", "CMP", "Kidney Function", "Liver Function"] },
];

export default function Home() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <main className="bg-sand">
      <section id="top" className="relative min-h-screen w-full overflow-hidden bg-forest">
        <img src="/assets/hero-BUD68560.jpg" alt="Warm, sunlit Pax Health brand imagery evoking calm and vitality" width="1600" height="1200" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/80" />
        <header className="absolute inset-x-0 top-0 z-20">
          <nav className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between gap-4 px-6 py-6 text-sand md:px-10">
            <a href="#top" className="inline-flex shrink-0 items-center gap-3 font-serif text-2xl tracking-tight">
              <BrandSeal />
              <span>Pax<span className="italic text-dune"> Health</span></span>
            </a>
            <ul className="ml-auto hidden flex-nowrap gap-6 pr-4 text-xs uppercase tracking-[0.18em] md:flex">
              <li><a href="#membership" className="hover:text-dune">{t("Membership")}</a></li>
              <li><a href="#philosophy" className="hover:text-dune">{t("Philosophy")}</a></li>
              <li><Link href="/network" className="hover:text-dune">{t("Partners")}</Link></li>
            </ul>
            <div className="hidden shrink-0 items-center gap-2 md:flex">
              <LanguageToggle className="text-sand" />
              <a href="#waitlist" className="whitespace-nowrap rounded-full border border-sand/60 px-3 py-2 text-xs uppercase tracking-[0.16em] transition hover:border-sand hover:bg-sand hover:text-forest">{t("Join")}</a>
              <Link href={DEFAULT_INTAKE_HREF} className="whitespace-nowrap rounded-full bg-sand px-3 py-2 text-xs uppercase tracking-[0.16em] text-forest transition hover:bg-dune">{t("Take Assessment")}</Link>
            </div>
            <div className="md:hidden">
              <LanguageToggle className="text-sand" />
            </div>
          </nav>
          <nav aria-label={t("Mobile primary")} className="md:hidden">
            <ul className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-6 pb-3 text-[11px] uppercase tracking-[0.18em] text-sand">
              <li><a href="#membership" className="inline-flex min-h-11 items-center rounded-sm px-1 transition hover:text-dune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-ink">{t("Membership")}</a></li>
              <li><a href="#philosophy" className="inline-flex min-h-11 items-center rounded-sm px-1 transition hover:text-dune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-ink">{t("Philosophy")}</a></li>
              <li><Link href="/network" className="inline-flex min-h-11 items-center rounded-sm px-1 transition hover:text-dune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-ink">{t("Partners")}</Link></li>
            </ul>
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 pb-4 text-[11px] uppercase tracking-[0.16em]">
              <a href="#waitlist" aria-label={t("Join the Pax Health waitlist")} className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full border border-sand/60 px-4 py-2 text-sand transition hover:border-sand hover:bg-sand hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-ink">{t("Join")}</a>
              <Link href={DEFAULT_INTAKE_HREF} aria-label={t("Take the intake assessment")} className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-sand px-4 py-2 text-forest transition hover:bg-dune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-ink">{t("Take Assessment")}</Link>
            </div>
          </nav>
        </header>
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 pt-40 md:px-10 md:pb-28">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-dune">{t("Telehealth ? Longevity ? Performance")}</p>
          <h1 className="max-w-5xl font-serif text-5xl leading-[1.02] text-sand md:text-7xl lg:text-[6.5rem]">
            {t("A modern telehealth clinic for the")} <em className="italic text-dune">{t("long life")}</em>.
          </h1>
          <p className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-sand/80 md:text-xl">
            {t("Pax Health is a physician-led virtual practice ? GLP-1s, hormones, peptides, and vitality protocols prescribed by licensed U.S. doctors and shipped to your door.")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#membership" className="rounded-full bg-sand px-8 py-4 text-xs uppercase tracking-[0.22em] text-forest transition hover:bg-dune">{t("Membership")}</a>
            <a href="#philosophy" className="text-xs uppercase tracking-[0.22em] text-sand/80 hover:text-sand">{t("Discover the practice ?")}</a>
          </div>
        </div>
      </section>

      <section aria-label="Credentials and compliance" className="w-full bg-forest py-10 text-sand">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 md:justify-between md:px-10">
          {[
            [icons.stethoscope, "HIPAA", "Compliant"],
            [icons.flask, "CLIA", "Certified Labs"],
            [icons.badge, "CAP", "Accredited Partners"],
            [icons.shield, "FDA", "Registered"],
          ].map(([icon, label, text]) => (
            <div key={label} className="flex items-center gap-3">
              <Icon icon={icon} className="text-dune" />
              <p className="font-serif text-base md:text-lg">
                <span className="text-[10px] uppercase tracking-[0.28em] text-sand/60">{label}</span>{" "}
                <span className="ml-1">{t(text)}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="philosophy" className="w-full bg-sand py-28 md:py-40">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-12 md:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta md:col-span-3">{t("? Our philosophy")}</p>
          <div className="md:col-span-9">
            <h2 className="font-serif text-4xl leading-[1.1] text-ink md:text-6xl">
              {t("We believe longevity is a daily practice ?")}
              <em className="italic text-terracotta"> {t("not a prescription.")}</em>
            </h2>
            <p className="mt-10 max-w-2xl font-serif text-xl leading-relaxed text-ink/75 md:text-2xl">
              {t("Pax is Latin for peace. In a culture that rarely slows down, we've built a quiet counterweight: a virtual practice that helps you train intelligently, recover completely, and measure what matters. Our protocols draw from contemplative tradition and cutting-edge performance science in equal measure ? delivered through a secure telehealth experience, nationwide.")}
            </p>
            <div className="mt-16 grid gap-10 border-t border-ink/10 pt-12 sm:grid-cols-3">
              {[
                ["01", "Physician-led", "Licensed U.S. doctors guiding every protocol from intake to refill."],
                ["02", "Guided by data", "Bloodwork, biomarkers, and ongoing labs translated into clear practice."],
                ["03", "Built for life", "Programs designed to compound over decades ? shipped to your door."],
              ].map(([n, title, desc]) => (
                <div key={n}>
                  <p className="font-serif text-2xl text-terracotta">{n}</p>
                  <h3 className="mt-4 font-serif text-2xl text-ink">{t(title)}</h3>
                  <p className="mt-3 font-serif text-lg leading-relaxed text-ink/70">{t(desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="membership" className="w-full bg-[oklch(0.93_0.022_72)] py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-ink/15 pb-12 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("? Programs")}</p>
              <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.1] text-ink md:text-6xl">
                {t("Multiple programs,")} <em className="italic">{t("one practice.")}</em>
              </h2>
            </div>
            <p className="max-w-sm font-serif text-lg leading-relaxed text-ink/70">
              {t("Physician-led prescription programs ? fulfilled by vetted pharmacy partners and shipped directly to your door.")}
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {programs.map((program) => (
              <div key={program.title} className="group flex flex-col rounded-2xl border border-ink/15 bg-sand p-8 transition hover:border-terracotta hover:shadow-lg md:p-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-ink/15 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink/60">{t(program.tag)}</span>
                  <span className="text-xs uppercase tracking-[0.25em] text-terracotta">{t("Available now")}</span>
                </div>
                <h3 className="mt-6 font-serif text-3xl leading-tight text-ink md:text-4xl">{t(program.title)}</h3>
                <p className="mt-4 font-serif text-base leading-relaxed text-ink/70">{t(program.description)}</p>
                <p className="mt-3 font-serif text-base text-terracotta">{t(program.price)}</p>
                <ul className="mt-6 space-y-2 border-t border-ink/10 pt-6 font-serif text-sm text-ink/75">
                  {program.highlights.map((item) => (
                    <li key={item} className="flex gap-3"><span className="text-terracotta">?</span><span>{t(item)}</span></li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col items-start gap-4">
                  <Link href={`/programs/${program.slug}`} className="inline-block text-xs uppercase tracking-[0.22em] text-terracotta transition hover:text-ink">{t("Learn More")}</Link>
                  <Link href={intakeHrefForProgram(program.slug)} className="inline-block text-xs uppercase tracking-[0.22em] text-ink/70 transition hover:text-terracotta">{t("Begin consultation ?")}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LiveTreatments />

      <Vials />

      <section id="blood-testing" className="w-full bg-dune/30 py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/40 bg-sand/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-terracotta">? {t("Clinical Accuracy Guarantee")}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/40 bg-sand/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-terracotta">? {t("CLIA Certified & CAP Accredited")}</span>
              </div>
              <p className="mt-8 text-xs uppercase tracking-[0.3em] text-terracotta">{t("? At-Home Diagnostics")}</p>
              <h2 className="mt-6 font-serif text-5xl leading-[1.05] text-ink md:text-7xl">
                {t("Fast, painless,")} <em className="italic text-terracotta">{t("and cool.")}</em>
              </h2>
              <p className="mt-6 max-w-lg font-serif text-lg leading-relaxed text-ink/70">
                {t("At-home blood testing and biomarker tracking, built into the Pax experience. Actionable results in less than 72 hours ? reviewed by your Pax physician.")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href={DEFAULT_INTAKE_HREF} className="rounded-full bg-terracotta px-8 py-4 text-xs uppercase tracking-[0.22em] text-sand transition hover:bg-terracotta/90">{t("Order your kit")}</Link>
                <Link href={DEFAULT_INTAKE_HREF} className="rounded-full border border-ink/30 px-8 py-4 text-xs uppercase tracking-[0.22em] text-ink transition hover:border-ink hover:bg-ink hover:text-sand">{t("Subscribe & track")}</Link>
              </div>
              <ul className="mt-10 space-y-2 font-serif text-sm text-ink/75">
                <li>? {t("HSA / FSA Eligible")}</li>
                <li>? {t("Available in all 50 US States")}</li>
                <li>? {t("One-time kit or quarterly subscription tracking")}</li>
              </ul>
            </div>
            <div className="relative">
              <img src="/assets/diagnostics-abstract-BZ02QBZF.jpg" alt={t("Pax at-home blood collection device")} width="1024" height="1280" loading="lazy" className="w-full rounded-3xl object-cover shadow-xl" />
              <div className="absolute bottom-6 right-6 rounded-2xl border border-ink/10 bg-sand/95 px-5 py-3 font-serif text-sm text-ink shadow-md">{t("Results in < 72 hours")}</div>
            </div>
          </div>
          <div className="mt-20 border-t border-ink/15 pt-12">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <h3 className="font-serif text-3xl leading-tight text-ink md:text-4xl">{t("What we measure.")}</h3>
              <p className="max-w-md font-serif text-base text-ink/70">{t("A comprehensive longevity panel spanning every major system ? collected at home, analyzed in CLIA-certified labs.")}</p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {panels.map((panel) => (
                <div key={panel.title} className="rounded-2xl border border-ink/10 bg-sand p-8">
                  <p className="text-xs uppercase tracking-[0.22em] text-terracotta">{t(panel.title)}</p>
                  <ul className="mt-5 space-y-2 font-serif text-base text-ink/80">
                    {panel.markers.map((marker) => (
                      <li key={marker} className="flex gap-3"><span className="text-terracotta">?</span><span>{t(marker)}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="concierge" className="w-full bg-sand py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("? Intake Assessment")}</p>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
              {t("Personal guidance,")}<br />
              <em className="italic text-terracotta">{t("tailored to you.")}</em>
            </h2>
            <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-ink/70 md:text-xl">
              {t("Personalized guidance, physician-led protocols, advanced diagnostics, and a concierge telehealth experience designed around performance, recovery, longevity, and lifestyle.")}
            </p>
            <p className="mt-4 max-w-md font-serif text-lg leading-relaxed text-ink/70 md:text-xl">
              {t("Begin with a brief intake assessment ? your responses are reviewed by a licensed physician before we reach out.")}
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="flex h-full flex-col justify-between gap-10 rounded-2xl border border-ink/15 bg-white/40 p-8 md:p-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.26em] text-ink/45">{t("A guided 5-step assessment ? ~3 minutes")}</p>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-ink md:text-4xl">
                  {t("Begin your")} <em className="italic text-terracotta">{t("intake assessment.")}</em>
                </h3>
                <ul className="mt-8 space-y-3 border-t border-ink/10 pt-6 font-serif text-base text-ink/75">
                  {["Share your goals, history, and current protocols", "Reviewed by our medical team within one business day", "Confirmation email sent as soon as you submit"].map((item) => (
                    <li key={item} className="flex gap-3"><span className="text-terracotta">?</span><span>{t(item)}</span></li>
                  ))}
                </ul>
              </div>
              <Link href={DEFAULT_INTAKE_HREF} className="inline-flex w-full items-center justify-center rounded-full bg-forest px-7 py-4 text-xs uppercase tracking-[0.22em] text-sand transition hover:bg-forest/90 sm:w-auto sm:self-start">
                {t("Begin intake assessment ?")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="location" className="relative w-full overflow-hidden bg-forest text-sand">
        <img src="/assets/miami-g2PmITGi.jpg" alt="Aerial view of Miami coastline at golden hour" width="1600" height="900" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-12 md:px-10 md:py-40">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-dune">{t("? Nationwide")}</p>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] md:text-6xl">
              {t("Rooted in Miami.")} <em className="italic text-dune">{t("Delivered everywhere.")}</em>
            </h2>
            <p className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-sand/80 md:text-xl">
              {t("Pax Health is a fully virtual practice ? secure consultations, physician oversight, and discreet, climate-controlled pharmacy shipping to nearly every U.S. state. No waiting rooms. No commutes. Just care that meets you where you are.")}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-10 self-end md:col-span-5">
            {[["50", "states served"], ["24/7", "secure messaging"], ["7", "core programs"], ["1:1", "physician care"]].map(([n, label]) => (
              <div key={label}>
                <dt className="font-serif text-5xl text-dune md:text-6xl">{n}</dt>
                <dd className="mt-2 text-xs uppercase tracking-[0.22em] text-sand/70">{t(label)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="waitlist" className="w-full bg-sand py-28 md:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("? Founding membership")}</p>
          <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-ink md:text-6xl">
            {t("Join the waitlist.")}<br />
            <em className="italic text-terracotta">{t("Arrive early.")}</em>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-serif text-lg leading-relaxed text-ink/70 md:text-xl">
            {t("Founding members receive priority intake, baseline bloodwork, and a year of physician-guided protocols designed around their biology.")}
          </p>
          {joined ? (
            <p className="mt-12 font-serif text-2xl italic text-forest">{t("Thank you ? we'll be in touch soon.")}</p>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (email) setJoined(true);
              }}
              className="mx-auto mt-12 flex max-w-xl flex-col gap-3 border-b border-ink/30 pb-3 sm:flex-row sm:items-center sm:gap-0"
            >
              <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t("your@email.com")} aria-label={t("Email address")} className="w-full flex-1 bg-transparent px-1 py-3 text-base text-ink placeholder:text-ink/40 focus:outline-none" />
              <button type="submit" className="rounded-full bg-forest px-7 py-3 text-xs uppercase tracking-[0.22em] text-sand transition hover:bg-ink">{t("Request access")}</button>
            </form>
          )}
        </div>
      </section>

      <footer className="home-footer w-full bg-forest py-16 text-sand/80">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="flex items-center gap-3 font-serif text-2xl text-sand"><BrandSeal className="h-12 w-12 md:h-12 md:w-12" /><span>Pax<span className="italic text-dune"> Health</span></span></p>
              <p className="mt-3 max-w-xs font-serif text-base leading-relaxed">{t("A modern telehealth clinic for longevity, recovery, and the long life.")}</p>
            </div>
            <Link href="/how-pax-works" className="text-xs uppercase tracking-[0.22em] text-sand transition hover:text-dune">{t("How it works")}</Link>
            <p className="text-xs uppercase tracking-[0.22em] text-sand/50">? {new Date().getFullYear()} Pax Health. {t("All rights reserved.")}</p>
          </div>
          <div className="footer-trust" role="group" aria-label={t("Pharmacy compounding, licensed provider review, and data protection")}>
            <span className="footer-trust__legitscript">
              <img alt="LegitScript" width="73" height="79" src="/brand/legitscript-seal.png" />
            </span>
            <div className="footer-trust__badge footer-trust__badge--flag">
              <span className="footer-trust__icon footer-trust__icon--flag">
                <img alt="" width="38" height="26" src="/brand/badge-usa-flag.svg" />
              </span>
              <span className="footer-trust__copy">
                <span className="footer-trust__kicker">{t("Compounded by")}</span>
                <span className="footer-trust__title">{t("Licensed Pharmacies in the USA")}</span>
              </span>
            </div>
            <div className="footer-trust__badge footer-trust__badge--seal">
              <span className="footer-trust__seal">
                <img alt="" width="64" height="64" src="/brand/badge-licensed-provider.svg" />
              </span>
              <span className="footer-trust__copy">
                <span className="footer-trust__kicker">{t("Reviewed by")}</span>
                <span className="footer-trust__title">{t("Licensed U.S. Providers")}</span>
                <span className="footer-trust__sub">{t("Verified")}</span>
              </span>
            </div>
            <div className="footer-trust__badge footer-trust__badge--seal">
              <span className="footer-trust__seal">
                <img alt="" width="64" height="64" src="/brand/badge-hipaa-caduceus.svg" />
              </span>
              <span className="footer-trust__copy">
                <span className="footer-trust__kicker">{t("Data protected")}</span>
                <span className="footer-trust__title footer-trust__title--hipaa">HIPAA</span>
                <span className="footer-trust__sub">{t("Compliant")}</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
