"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n";
import { BrandSeal, Icon, SiteHeader, icons } from "@/components/Chrome";
import MediaImage from "@/components/MediaImage";
import Vials from "@/components/Vials";
import ProgramCards from "@/components/ProgramCards";
import { DEFAULT_INTAKE_HREF, joinCategories } from "@/brand/productMap.js";
import { LEGAL_LINKS } from "@/data/legalContent.js";
import { LAB_PANELS } from "@/data/labPanels.js";
import "@/styles/footer-badges.css";
import "@/styles/legal.css";
import "@/styles/lab-cards.css";
const panels = LAB_PANELS;

export default function Home({ treatments = [] }) {
  const { t } = useLang();
  const careAreas = joinCategories(treatments, t);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <main className="bg-sand">
      <section id="top" className="relative min-h-screen w-full overflow-hidden bg-forest">
        <MediaImage
          src="/assets/hero-BUD68560.jpg"
          alt="Warm, sunlit Pax Health brand imagery evoking calm and vitality"
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/80" />
        <SiteHeader
          tone="onDark"
          brandHref="#top"
          links={[
            { href: "#membership", label: t("Membership") },
            { href: "#philosophy", label: t("Philosophy") },
            { href: "/network", label: t("Partners") },
          ]}
          joinHref="#waitlist"
          joinLabel={t("Join")}
          primaryHref={DEFAULT_INTAKE_HREF}
          primaryLabel={t("Take Assessment")}
        />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 pt-40 md:px-10 md:pb-28">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-dune">{t("Telehealth · Longevity · Performance")}</p>
          <h1 className="max-w-5xl font-serif text-5xl leading-[1.02] text-sand md:text-7xl lg:text-[6.5rem]">
            {t("A modern telehealth clinic for the")} <em className="italic text-dune">{t("long life")}</em>.
          </h1>
          <p className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-sand/80 md:text-xl">
            {t("Pax Health is a physician-led virtual practice.")}{" "}
            {careAreas
              ? `${t("Live clinical intake for")} ${careAreas} — ${t("prescribed by licensed U.S. doctors and shipped to your door.")}`
              : t("Treatments prescribed by licensed U.S. doctors and shipped to your door.")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#membership" className="rounded-full bg-sand px-8 py-4 text-xs uppercase tracking-[0.22em] text-forest transition hover:bg-dune">{t("Membership")}</a>
            <a href="#philosophy" className="text-xs uppercase tracking-[0.22em] text-sand/80 hover:text-sand">{t("Discover the practice →")}</a>
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
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta md:col-span-3">{t("— Our philosophy")}</p>
          <div className="md:col-span-9">
            <h2 className="font-serif text-4xl leading-[1.1] text-ink md:text-6xl">
              {t("We believe longevity is a daily practice →")}
              <em className="italic text-terracotta"> {t("not a prescription.")}</em>
            </h2>
            <p className="mt-10 max-w-2xl font-serif text-xl leading-relaxed text-ink/75 md:text-2xl">
              {t("Pax is Latin for peace. In a culture that rarely slows down, we've built a quiet counterweight: a virtual practice that helps you train intelligently, recover completely, and measure what matters. Our protocols draw from contemplative tradition and cutting-edge performance science in equal measure — delivered through a secure telehealth experience, nationwide.")}
            </p>
            <div className="mt-16 grid gap-10 border-t border-ink/10 pt-12 sm:grid-cols-3">
              {[
                ["01", "Physician-led", "Licensed U.S. doctors guiding every protocol from intake to refill."],
                ["02", "Guided by data", "Bloodwork, biomarkers, and ongoing labs translated into clear practice."],
                ["03", "Built for life", "Treatments prescribed after a licensed review and shipped to your door."],
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
          <ProgramCards />
        </div>
      </section>

      <Vials treatments={treatments} />

      <section id="blood-testing" className="w-full bg-dune/30 py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/40 bg-sand/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-terracotta">• {t("Clinical Accuracy Guarantee")}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/40 bg-sand/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-terracotta">• {t("CLIA Certified & CAP Accredited")}</span>
              </div>
              <p className="mt-8 text-xs uppercase tracking-[0.3em] text-terracotta">{t("— Bloodwork")}</p>
              <h2 className="mt-6 font-serif text-5xl leading-[1.05] text-ink md:text-7xl">
                {t("Labs when you need them,")} <em className="italic text-terracotta">{t("without a kit.")}</em>
              </h2>
              <p className="mt-6 max-w-lg font-serif text-lg leading-relaxed text-ink/70">
                {t("Bloodwork is arranged through GetLabs or Brandons — mobile phlebotomy or partner draw sites. Results feed your Pax physician for review; no Pax mail-order kit.")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href={DEFAULT_INTAKE_HREF} className="rounded-full bg-terracotta px-8 py-4 text-xs uppercase tracking-[0.22em] text-sand transition hover:bg-terracotta/90">{t("Begin intake")}</Link>
                <a href="#what-we-measure" className="rounded-full border border-ink/30 px-8 py-4 text-xs uppercase tracking-[0.22em] text-ink transition hover:border-ink hover:bg-ink hover:text-sand">{t("See what we measure")}</a>
              </div>
              <ul className="mt-10 space-y-2 font-serif text-sm text-ink/75">
                <li>• {t("Drawn via GetLabs or Brandons")}</li>
                <li>• {t("CLIA-certified partner labs")}</li>
                <li>• {t("Reviewed by your Pax physician")}</li>
              </ul>
            </div>
            <div className="relative">
              <MediaImage
                src="/images/pax-bloodwork-home-v4-hq.webp"
                alt={t("Quiet clinical still life — Pax bloodwork and diagnostics")}
                width={1024}
                height={1280}
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={68}
                className="h-auto w-full rounded-3xl object-cover shadow-xl"
              />
              <div className="absolute bottom-6 right-6 rounded-2xl border border-ink/10 bg-sand/95 px-5 py-3 font-serif text-sm text-ink shadow-md">{t("GetLabs · Brandons")}</div>
            </div>
          </div>
          <div className="mt-20 border-t border-ink/15 pt-12">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <h3 id="what-we-measure" className="font-serif text-3xl leading-tight text-ink md:text-4xl">{t("What we measure.")}</h3>
              <p className="max-w-md font-serif text-base text-ink/70">{t("A comprehensive longevity panel spanning every major system — drawn through GetLabs or Brandons, analyzed in CLIA-certified labs.")}</p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {panels.map((panel) => (
                <article key={panel.slug} className="lab-card">
                  <p className="lab-card__title">{t(panel.title)}</p>
                  <ul className="lab-card__list">
                    {panel.markers.map((marker) => (
                      <li key={marker.name}>{t(marker.name)}</li>
                    ))}
                  </ul>
                  <Link href={`/labs/${panel.slug}`} className="lab-card__btn">
                    <span>{t("Explore panel")}</span>
                    <span className="lab-card__btn-arrow" aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="concierge" className="w-full bg-sand py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("— Intake Assessment")}</p>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
              {t("Personal guidance,")}<br />
              <em className="italic text-terracotta">{t("tailored to you.")}</em>
            </h2>
            <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-ink/70 md:text-xl">
              {t("Personalized guidance, physician-led protocols, advanced diagnostics, and a concierge telehealth experience designed around performance, recovery, longevity, and lifestyle.")}
            </p>
            <p className="mt-4 max-w-md font-serif text-lg leading-relaxed text-ink/70 md:text-xl">
              {t("Begin with a brief intake assessment — your responses are reviewed by a licensed physician before we reach out.")}
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="flex h-full flex-col justify-between gap-10 rounded-2xl border border-ink/15 bg-white/40 p-8 md:p-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.26em] text-ink/45">{t("A guided 5-step assessment — ~3 minutes")}</p>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-ink md:text-4xl">
                  {t("Begin your")} <em className="italic text-terracotta">{t("intake assessment.")}</em>
                </h3>
                <ul className="mt-8 space-y-3 border-t border-ink/10 pt-6 font-serif text-base text-ink/75">
                  {["Share your goals, history, and current protocols", "Reviewed by our medical team within one business day", "Confirmation email sent as soon as you submit"].map((item) => (
                    <li key={item} className="flex gap-3"><span className="text-terracotta">•</span><span>{t(item)}</span></li>
                  ))}
                </ul>
              </div>
              <Link href={DEFAULT_INTAKE_HREF} className="inline-flex w-full items-center justify-center rounded-full bg-forest px-7 py-4 text-xs uppercase tracking-[0.22em] text-sand transition hover:bg-forest/90 sm:w-auto sm:self-start">
                {t("Begin intake assessment →")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="location" className="relative w-full overflow-hidden bg-forest text-sand">
        <MediaImage
          src="/assets/miami.webp"
          alt="Aerial view of Miami coastline at golden hour"
          fill
          sizes="100vw"
          quality={65}
          className="object-cover opacity-25"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-12 md:px-10 md:py-40">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-dune">{t("— Nationwide")}</p>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] md:text-6xl">
              {t("Rooted in Miami.")} <em className="italic text-dune">{t("Delivered everywhere.")}</em>
            </h2>
            <p className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-sand/80 md:text-xl">
              {t("Pax Health is a fully virtual practice — secure consultations, physician oversight, and discreet, climate-controlled pharmacy shipping to nearly every U.S. state. No waiting rooms. No commutes. Just care that meets you where you are.")}
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
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("— Founding membership")}</p>
          <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-ink md:text-6xl">
            {t("Join the waitlist.")}<br />
            <em className="italic text-terracotta">{t("Arrive early.")}</em>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-serif text-lg leading-relaxed text-ink/70 md:text-xl">
            {t("Founding members receive priority intake, baseline bloodwork, and a year of physician-guided protocols designed around their biology.")}
          </p>
          {joined ? (
            <p className="mt-12 font-serif text-2xl italic text-forest">{t("Thank you — we'll be in touch soon.")}</p>
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
            <div className="footer-links-col footer-links-col--legal">
              <span className="footer-col-title">Legal</span>
              {LEGAL_LINKS.map((link) => (
                <Link key={link.id} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-trust" role="group" aria-label={t("Pharmacy compounding, licensed provider review, and data protection")}>
            <span className="footer-trust__legitscript">
              <img alt="LegitScript" width="73" height="79" src="/brand/legitscript-seal.png" />
            </span>
            <div className="footer-trust__badge footer-trust__badge--flag">
              <span className="footer-trust__icon footer-trust__icon--flag">
                <img alt="" width="80" height="56" src="/brand/badge-usa-flag.svg" />
              </span>
              <span className="footer-trust__copy">
                <span className="footer-trust__kicker">{t("Compounded by Licensed")}</span>
                <span className="footer-trust__kicker">{t("Pharmacies in the")}</span>
                <span className="footer-trust__usa-title">★&nbsp;USA</span>
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
          <p className="footer-disclaimer">
            Pax Longevity® is a telehealth platform that connects eligible patients with independent US-licensed providers and
            licensed pharmacy partners. Pax Longevity® is not a pharmacy and does not itself practice medicine. Prescription
            products are provided only if clinically appropriate after review by a US-licensed provider. Individual results
            may vary.
          </p>
          <p className="footer-disclaimer">
            <strong>Service availability:</strong> Services may not be available in all states. Availability may vary by
            treatment, provider licensure, pharmacy fulfillment, and patient eligibility.
          </p>
          <p className="footer-disclaimer">
            <strong>Pharmacy &amp; fulfillment:</strong> Pax Longevity® is not a pharmacy, drug manufacturer, outsourcing
            facility, or compounding facility, and does not compound, manufacture, dispense, or physically fulfill
            medications. If prescription treatment is clinically appropriate, medication may be fulfilled through a
            licensed dispensing pharmacy pursuant to a patient-specific prescription. Compounded medications are not
            FDA-approved as finished branded products. *Timing not guaranteed.
          </p>
          <p className="footer-disclaimer">
            <strong>Product imagery:</strong> Displayed product imagery is intended solely for illustrative purposes and
            is not intended to imply that Pax Longevity® compounds, manufactures, dispenses, or physically fulfills
            medications. Actual medication packaging and pharmacy labeling may differ.
          </p>
          <div className="footer-bottom">
            <p className="footer-copy">
              Pax Longevity LLC d/b/a Pax Longevity® · © {new Date().getFullYear()} Pax Longevity®. {t("All rights reserved.")}
            </p>
            <nav className="footer-legal-links" aria-label="Legal">
              {LEGAL_LINKS.map((link) => (
                <Link key={`bottom-${link.id}`} href={link.href} className="footer-legal-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
