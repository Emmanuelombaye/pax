"use client";
import { useState } from "react";
import Link from "next/link";
import { BrandSeal, Icon, icons } from "@/components/Chrome";

const pathways = [
  { label: "Refer", audience: "For coaches, creators, and wellness professionals.", desc: "Introduce clients to physician-guided longevity programs and earn recurring revenue.", icon: icons.share },
  { label: "Practice", audience: "For physicians, nurse practitioners, and physician assistants.", desc: "Join a nationwide network delivering modern longevity care.", icon: icons.heart },
  { label: "Expand", audience: "For gyms, wellness centers, and performance businesses.", desc: "Offer hormone optimization, weight management, diagnostics, and recovery solutions to your members.", icon: icons.dumbbell },
  { label: "Launch", audience: "For founders and entrepreneurs.", desc: "Build your own longevity clinic using Pax's clinical, operational, and technology infrastructure.", icon: icons.rocket },
];

const partners = [
  { icon: icons.users, title: "Health Coaches & Influencers", desc: "Help your audience access physician-guided longevity programs while creating recurring revenue." },
  { icon: icons.stethoscope, title: "Physicians & Providers", desc: "Practice modern longevity medicine with access to infrastructure, pharmacy partners, diagnostics, and operational support." },
  { icon: icons.dumbbell, title: "Gym Owners & Wellness Centers", desc: "Offer weight management, hormone optimization, recovery, and longevity solutions to your members." },
  { icon: icons.building, title: "Longevity Clinic Founders", desc: "Launch a physician-guided longevity practice without spending years assembling technology, compliance, provider networks, laboratories, and pharmacy relationships." },
  { icon: icons.pill, title: "Compounding Pharmacies", desc: "Partner with a rapidly growing longevity network and expand patient access nationwide." },
  { icon: icons.flask, title: "Laboratory Partners", desc: "Power personalized healthcare through diagnostics, biomarker testing, and continuous health optimization." },
];

const reasons = [
  { icon: icons.layers, title: "Clinical Infrastructure", desc: "Physician networks, pharmacy partners, compliance systems, patient onboarding, and operational workflows already built." },
  { icon: icons.activity, title: "Diagnostics & Data", desc: "Biomarker testing, longitudinal tracking, and health intelligence that improve outcomes over time." },
  { icon: icons.trend, title: "Recurring Revenue", desc: "Memberships, subscriptions, diagnostics, and ongoing care designed to create sustainable growth." },
  { icon: icons.earth, title: "Nationwide Reach", desc: "Licensed providers and fulfillment capabilities across the United States." },
];

const pillars = [
  { name: "Pax Protocol", desc: "The clinical playbook — physician-designed longevity programs and prescribing standards." },
  { name: "Pax Longevity", desc: "The telehealth practice with live clinical intake for Semaglutide, Tirzepatide, and NAD+ nationwide." },
  { name: "Pax Labs", desc: "At-home diagnostics, biomarker testing, and longitudinal health tracking designed to transform data into personalized action. The intelligence layer powering modern longevity." },
  { name: "Pax Miami", desc: "The flagship concierge sanctuary — in-person care, recovery, and longevity experiences." },
];

const partnerTypes = ["Health Coach", "Nutrition Coach", "Fitness Coach", "Influencer / Creator", "Physician", "Nurse Practitioner", "Physician Assistant", "Gym Owner", "Wellness Business", "Med Spa Owner", "Clinic Founder", "Compounding Pharmacy", "Laboratory", "Investor", "Other"];
const audienceSizes = ["0–100", "100–500", "500–1,000", "1,000–5,000", "5,000+"];
const reaches = ["Local", "Regional", "National"];
const interests = ["Weight Optimization", "Hormone Optimization", "Longevity", "Diagnostics & Blood Testing", "Peptides", "Recovery & Performance", "Cognitive Health", "Women's Health", "Men's Health", "Corporate Wellness", "White-Label Clinic Launch"];
const timelines = ["Immediately", "30 Days", "60 Days", "90+ Days"];
const stepNames = ["About You", "Partner Type", "Your Audience", "Areas Of Interest", "Partnership Goals", "Final"];

const empty = { fullName: "", email: "", phone: "", company: "", website: "", linkedin: "", instagram: "", partnerTypes: [], audience: "", reach: "", interests: [], goals: "", timeline: "" };

function Field({ label, value, onChange, type = "text", required }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-ink/60">
        {label} {required && <span className="text-terracotta">*</span>}
      </span>
      <input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-dune/60 bg-sand/50 px-4 py-3 font-serif text-base text-ink outline-none transition focus:border-terracotta" />
    </label>
  );
}

function Chips({ label, options, selected, onToggle, single }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-ink/60">{label}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => {
          const on = selected.includes(option);
          return (
            <button key={option} type="button" onClick={() => onToggle(option)} className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${on ? "border-terracotta bg-terracotta text-sand" : "border-dune/60 bg-sand/50 text-ink/70 hover:border-terracotta/60 hover:text-ink"}`}>
              {single && on && <Icon icon={icons.check} size={24} strokeWidth={2} className="mr-1 inline h-3 w-3" />}
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Network() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(empty);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const toggle = (key, value) =>
    setForm((current) => ({
      ...current,
      [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value],
    }));

  return (
    <div className="network-page min-h-screen bg-sand text-ink">
      <header className="absolute inset-x-0 top-0 z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 text-ink md:px-10">
          <Link href="/" className="inline-flex shrink-0 items-center gap-3 font-serif text-2xl tracking-tight"><BrandSeal /><span>Pax<span className="italic text-terracotta"> Health</span></span></Link>
          <ul className="ml-auto hidden flex-nowrap gap-6 pr-4 text-xs uppercase tracking-[0.18em] md:flex">
            <li><Link href="/" className="hover:text-terracotta">Home</Link></li>
            <li><Link href="/network" className="text-terracotta active" aria-current="page">Network</Link></li>
          </ul>
          <a href="#assessment" className="hidden whitespace-nowrap rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.16em] text-sand transition hover:bg-ink md:inline-block">Apply</a>
        </nav>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-sand to-sand pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-terracotta/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-forest/15 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-terracotta">The Pax Network</p>
          <h1 className="font-serif text-5xl leading-[1.05] text-ink md:text-7xl">Build your practice. <em className="italic text-terracotta">Grow your impact.</em></h1>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg leading-relaxed text-ink/70 md:text-xl">Whether you're a coach, physician, gym owner, wellness entrepreneur, or clinic founder, Pax provides the clinical infrastructure, technology, diagnostics, and operational support to help you scale.</p>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink/60 md:text-xl">Pax handles the complexity. You focus on changing lives.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#assessment" className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-xs uppercase tracking-[0.18em] text-sand transition hover:bg-ink">Apply To Join The Pax Network <Icon icon={icons.arrow} size={24} strokeWidth={2} className="h-4 w-4" /></a>
            <a href="#assessment" className="inline-flex items-center gap-2 rounded-full border border-forest/40 px-6 py-3 text-xs uppercase tracking-[0.18em] text-forest transition hover:border-forest hover:bg-forest hover:text-sand">Schedule A Discovery Call</a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sand via-white to-sand py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Partnership Pathways</p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Four ways to build <em className="italic text-terracotta">with Pax</em>.</h2>
            <p className="mx-auto mt-6 max-w-2xl font-serif text-base leading-relaxed text-ink/70 md:text-lg">Choose the model that best fits your goals. Whether you're referring clients or launching your own clinic, Pax provides the infrastructure to help you grow.</p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pathways.map((item) => (
              <div key={item.label} className="group relative overflow-hidden rounded-2xl border border-dune/40 bg-[oklch(0.92_0.02_135)] p-8 transition hover:border-terracotta/60 shadow-sm hover:shadow-xl hover:-translate-y-1">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-dune/30 text-forest transition group-hover:bg-terracotta/20 group-hover:text-terracotta"><Icon icon={item.icon} size={24} strokeWidth={2} className="h-5 w-5" /></div>
                <p className="text-xs uppercase tracking-[0.22em] text-terracotta">{item.label}</p>
                <p className="mt-3 font-serif text-base italic text-ink/70">{item.audience}</p>
                <p className="mt-4 font-serif text-base leading-relaxed text-ink/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Partner Network</p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">One platform. <em className="italic text-terracotta">Multiple paths to growth.</em></h2>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-base leading-relaxed text-ink/70 md:text-lg">Pax supports healthcare providers, coaches, wellness businesses, laboratories, pharmacies, and founders building the future of personalized healthcare.</p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-2xl border border-dune/40 bg-[oklch(0.92_0.02_135)] p-8 transition hover:border-terracotta/60 shadow-sm hover:shadow-xl hover:-translate-y-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-dune/30 text-forest transition group-hover:bg-terracotta/20 group-hover:text-terracotta"><Icon icon={item.icon} size={24} strokeWidth={2} className="h-5 w-5" /></div>
              <h3 className="font-serif text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 font-serif text-base leading-relaxed text-ink/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-sand via-white to-sand py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Why Build With Pax</p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">The infrastructure behind <em className="italic text-terracotta">modern longevity</em>.</h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((item) => (
              <div key={item.title} className="rounded-2xl border border-dune/40 bg-[oklch(0.92_0.02_135)] p-7 backdrop-blur">
                <Icon icon={item.icon} size={24} strokeWidth={2} className="h-6 w-6 text-terracotta" />
                <h3 className="mt-5 font-serif text-xl text-ink">{item.title}</h3>
                <p className="mt-2 font-serif text-base leading-relaxed text-ink/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest py-24 text-sand md:py-32">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-terracotta/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sand/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Launch With Pax</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Launch your own <em className="italic text-terracotta">longevity clinic</em>.</h2>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg leading-relaxed text-sand/80 md:text-xl">Pax provides the infrastructure behind modern healthcare brands — including telehealth technology, diagnostics, providers, pharmacy relationships, compliance support, and operational systems.</p>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg leading-relaxed text-sand/70 md:text-xl">You bring the vision. We'll help power the platform.</p>
          <div className="mt-10">
            <a href="#assessment" className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-xs uppercase tracking-[0.18em] text-sand transition hover:bg-sand hover:text-forest">Schedule A Founder Call <Icon icon={icons.arrow} size={24} strokeWidth={2} className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">The Pax Ecosystem</p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Four pillars. <em className="italic text-terracotta">One integrated platform.</em></h2>
        </div>
        <div className="relative mt-20">
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-terracotta/40 lg:block" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-forest/20 lg:block" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest px-6 py-3 font-serif text-sand lg:block">Pax</div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item, index) => (
              <div key={item.name} className={`relative rounded-2xl border border-dune/40 bg-[oklch(0.92_0.02_135)] p-8 transition hover:border-terracotta/60 shadow-sm hover:shadow-xl hover:-translate-y-1 ${index % 2 === 0 ? "lg:translate-y-6" : ""}`}>
                <div className="font-serif text-2xl text-terracotta">0{index + 1}</div>
                <h3 className="mt-3 font-serif text-2xl text-ink">{item.name}</h3>
                <p className="mt-3 font-serif text-base leading-relaxed text-ink/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="assessment" className="bg-gradient-to-b from-sand via-white to-sand py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Partnership Assessment</p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Tell us about <em className="italic text-terracotta">your vision</em>.</h2>
            <p className="mx-auto mt-6 max-w-xl font-serif text-base leading-relaxed text-ink/70">Every partnership starts with alignment. Share your goals, audience, and ambitions, and our team will determine how Pax can best support your growth.</p>
          </div>
          <div className="mt-12 rounded-3xl border border-dune/40 bg-[oklch(0.92_0.02_135)] p-8 shadow-sm md:p-12">
            {done ? (
              <div className="py-16 text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest text-sand"><Icon icon={icons.check} size={24} strokeWidth={2} /></div>
                <h3 className="mt-6 font-serif text-3xl text-ink">Thank you.</h3>
                <p className="mx-auto mt-4 max-w-md font-serif text-base leading-relaxed text-ink/70">Thank you for your interest in joining the Pax Network. Our team reviews every application personally and will reach out shortly if there appears to be a strong fit.</p>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setBusy(true);
                  setTimeout(() => {
                    setBusy(false);
                    setDone(true);
                  }, 400);
                }}
              >
                <div className="mb-8">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-ink/50">
                    <span>Step {step + 1} of {stepNames.length}</span>
                    <span>{stepNames[step]}</span>
                  </div>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-dune/40">
                    <div className="h-full bg-terracotta transition-all" style={{ width: `${((step + 1) / stepNames.length) * 100}%` }} />
                  </div>
                </div>
                {step === 0 && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Full Name" value={form.fullName} onChange={(value) => set("fullName", value)} required />
                    <Field label="Email" type="email" value={form.email} onChange={(value) => set("email", value)} required />
                    <Field label="Phone" value={form.phone} onChange={(value) => set("phone", value)} />
                    <Field label="Company Name" value={form.company} onChange={(value) => set("company", value)} />
                    <Field label="Website" value={form.website} onChange={(value) => set("website", value)} />
                    <Field label="LinkedIn" value={form.linkedin} onChange={(value) => set("linkedin", value)} />
                    <div className="md:col-span-2"><Field label="Instagram" value={form.instagram} onChange={(value) => set("instagram", value)} /></div>
                  </div>
                )}
                {step === 1 && <Chips label="Which best describes you?" options={partnerTypes} selected={form.partnerTypes} onToggle={(value) => toggle("partnerTypes", value)} />}
                {step === 2 && (
                  <div className="space-y-8">
                    <Chips label="How many clients, patients, members, or followers do you currently serve?" options={audienceSizes} selected={form.audience ? [form.audience] : []} onToggle={(value) => set("audience", value)} single />
                    <Chips label="Geographic reach" options={reaches} selected={form.reach ? [form.reach] : []} onToggle={(value) => set("reach", value)} single />
                  </div>
                )}
                {step === 3 && <Chips label="Areas of interest" options={interests} selected={form.interests} onToggle={(value) => toggle("interests", value)} />}
                {step === 4 && (
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-ink/60">What are you hoping to accomplish through a partnership with Pax?</label>
                    <textarea value={form.goals} onChange={(event) => set("goals", event.target.value)} rows={8} className="mt-3 w-full rounded-xl border border-dune/60 bg-sand/50 p-4 font-serif text-base text-ink outline-none transition focus:border-terracotta" placeholder="Share what you're hoping to build together..." />
                  </div>
                )}
                {step === 5 && <Chips label="How soon would you like to get started?" options={timelines} selected={form.timeline ? [form.timeline] : []} onToggle={(value) => set("timeline", value)} single />}
                <div className="mt-10 flex items-center justify-between">
                  <button type="button" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0} className="text-xs uppercase tracking-[0.18em] text-ink/60 transition hover:text-ink disabled:opacity-30">← Back</button>
                  {step < stepNames.length - 1 ? (
                    <button type="button" onClick={() => setStep((current) => Math.min(current + 1, stepNames.length - 1))} className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-xs uppercase tracking-[0.18em] text-sand transition hover:bg-ink">Continue <Icon icon={icons.arrow} size={24} strokeWidth={2} className="h-4 w-4" /></button>
                  ) : (
                    <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-xs uppercase tracking-[0.18em] text-sand transition hover:bg-ink disabled:opacity-60">{busy ? "Submitting…" : "Apply To Join The Pax Network"}</button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-dune/40 bg-sand py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-xs uppercase tracking-[0.18em] text-ink/60 md:px-10">
          <Link href="/" className="inline-flex items-center gap-3 font-serif text-lg normal-case tracking-tight text-ink"><BrandSeal className="h-10 w-10 md:h-10 md:w-10" /><span>Pax<span className="italic text-terracotta"> Health</span></span></Link>
          <p>© {new Date().getFullYear()} Pax Health</p>
        </div>
      </footer>
    </div>
  );
}
