"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { BrandSeal, LanguageToggle } from "@/components/Chrome";
import { useLang } from "@/i18n";

const genders = ["Male", "Female", "Prefer not to say"];
const goalGroups = [
  { label: "Metabolic", items: ["Weight Loss", "Fat Loss", "Appetite Control", "Metabolic Health", "Blood Sugar Support"] },
  { label: "Recovery", items: ["Injury Recovery", "Joint Health", "Tendon & Ligament Support", "Chronic Inflammation", "Athletic Recovery"] },
  { label: "Cognitive", items: ["Brain Fog", "Focus", "Memory", "Mood", "Anxiety", "Mental Performance"] },
  { label: "Longevity", items: ["Healthy Aging", "Cellular Health", "Vitality", "Energy", "Performance Optimization"] },
  { label: "Hormonal", items: ["Low Testosterone", "Hormonal Balance", "Menopause Support", "Libido Support"] },
];
const conditions = ["Diabetes / Prediabetes", "High Blood Pressure", "High Cholesterol", "Thyroid Condition", "Autoimmune Condition", "Cancer History", "Chronic Pain", "Sleep Disorder", "Anxiety", "Depression", "None of the Above"];
const symptomGroups = [
  { label: "Sleep", items: ["Trouble Falling Asleep", "Frequent Wakeups", "Wake Up Tired"] },
  { label: "Energy", items: ["Fatigue", "Low Motivation", "Afternoon Energy Crash"] },
  { label: "Body Composition", items: ["Weight Gain", "Stubborn Body Fat", "Difficulty Building Muscle"] },
  { label: "Recovery", items: ["Joint Pain", "Chronic Inflammation", "Slow Healing", "Poor Workout Recovery"] },
  { label: "Cognitive", items: ["Brain Fog", "Poor Focus", "Memory Issues", "Mental Fatigue"] },
  { label: "Mood", items: ["Anxiety", "Stress", "Mood Swings", "Irritability"] },
  { label: "Hormonal", items: ["Low Libido", "Low Testosterone", "Menopause Symptoms"] },
];
const compoundGroups = [
  { label: "Metabolic", items: ["Tirzepatide", "Retatrutide", "Tesamorelin", "MOTS-c", "CJC-1295 + Ipamorelin"] },
  { label: "Structural / Recovery", items: ["BPC-157", "TB-500", "KPV", "Thymosin Alpha-1"] },
  { label: "Neural / Cognitive", items: ["Semax", "Selank", "Cerebrolysin", "DSIP"] },
  { label: "Cellular / Longevity", items: ["NAD+", "Epitalon", "GHK-Cu"] },
  { label: "Advanced", items: ["Kisspeptin", "PT-141", "SS-31", "LL-37", "FOXO4-DRI"] },
  { label: "Other", items: ["I'm New To Peptides", "Not Sure Yet"] },
];
const usedGroups = [
  { label: "Metabolic / GLP-1", items: ["Semaglutide", "Tirzepatide", "Retatrutide", "Liraglutide", "Cagrilintide", "AOD-9604", "MOTS-c", "5-Amino-1MQ"] },
  { label: "Growth Hormone Secretagogues", items: ["CJC-1295", "Ipamorelin", "Sermorelin", "Tesamorelin", "Hexarelin", "GHRP-2", "GHRP-6", "MK-677 (Ibutamoren)", "IGF-1 LR3", "IGF-1 DES", "Follistatin"] },
  { label: "Healing / Structural", items: ["BPC-157", "TB-500", "KPV", "GHK-Cu", "Thymosin Alpha-1", "Thymulin", "LL-37", "Pentosan"] },
  { label: "Cognitive / Neural", items: ["Semax", "N-Acetyl Semax", "Selank", "N-Acetyl Selank", "Cerebrolysin", "DSIP", "Dihexa", "P21", "FGL"] },
  { label: "Cellular / Longevity", items: ["NAD+", "Epitalon", "SS-31 (Elamipretide)", "Humanin", "FOXO4-DRI"] },
  { label: "Sexual / Hormonal", items: ["PT-141 (Bremelanotide)", "Melanotan II", "Kisspeptin", "Gonadorelin", "HCG", "Oxytocin"] },
  { label: "Immune & Other", items: ["Thymalin", "Adipotide", "Snap-8"] },
];
const timelineOptions = ["Immediately", "Within 30 Days", "Within 90 Days", "Just Researching"];
const contactOptions = ["Email", "Text Message", "Phone Call"];

const initial = {
  firstName: "", lastName: "", email: "", phone: "", age: "", gender: "", city: "", state: "",
  goals: [], ninetyDayGoal: "", conditions: [], currentMedications: "", currentSupplements: "",
  peptideExperience: "", peptidesUsedList: [], peptidesUsed: "",
  sleepQuality: 5, energyLevel: 5, stressLevel: 5, recoveryAbility: 5, symptoms: [],
  compoundsInterest: [], compoundsPrompt: "", timeline: "", contactPreference: "Email",
  additionalNotes: "", recentBloodwork: "", wantsBloodwork: "", rythmConsent: false,
};

const fieldClass = "mt-2 w-full appearance-none border-b border-ink/30 bg-transparent py-2 font-sans text-base text-ink placeholder:text-ink/30 focus:border-terracotta focus:outline-none";
const chip = (on) => `rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] transition ${on ? "border-forest bg-forest text-sand" : "border-ink/30 bg-transparent text-ink/70 hover:border-terracotta hover:text-terracotta"}`;

function Label({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-ink/60">{label}</span>
      {children}
    </label>
  );
}

function Group({ label, items, selected, onToggle, max, renderItem }) {
  const count = selected.filter((item) => items.includes(item)).length;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] uppercase tracking-[0.28em] text-terracotta">? {label}</p>
        {max ? <p className="text-[10px] uppercase tracking-[0.22em] text-ink/40">{count}/{max}</p> : null}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => {
          const on = selected.includes(item);
          const locked = !!max && !on && count >= max;
          return (
            <button key={item} type="button" disabled={locked} onClick={() => onToggle(item)} className={`${chip(on)} ${locked ? "cursor-not-allowed opacity-40" : ""}`}>
              {renderItem ? renderItem(item) : item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Slider({ label, value, onChange }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="block text-xs uppercase tracking-[0.2em] text-ink/60">{label}</span>
        <span className="font-serif text-lg text-ink">{value}<span className="text-ink/40">/10</span></span>
      </div>
      <input type="range" min="1" max="10" step="1" value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 w-full accent-forest" />
      <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.18em] text-ink/40"><span>Low</span><span>High</span></div>
    </div>
  );
}

export default function Intake() {
  const { t } = useLang();
  const [form, setForm] = useState(initial);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle");
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const toggle = (key, value) =>
    setForm((current) => {
      const list = current[key];
      return { ...current, [key]: list.includes(value) ? list.filter((item) => item !== value) : [...list, value] };
    });
  const toggleLimited = (key, group, value, max) =>
    setForm((current) => {
      const list = current[key];
      if (list.includes(value)) return { ...current, [key]: list.filter((item) => item !== value) };
      if (list.filter((item) => group.includes(item)).length >= max) return current;
      return { ...current, [key]: [...list, value] };
    });

  const experienced = form.peptideExperience === "Previously" || form.peptideExperience === "Currently";
  const steps = useMemo(
    () => [
      { eyebrow: "Step 1 of 5", title: "Tell us who you are.", valid: form.firstName.trim() && form.lastName.trim() && form.email.trim() && form.phone.trim() && form.age.trim() && form.gender && form.city.trim() && form.state.trim() },
      { eyebrow: "Step 2 of 5", title: "What are you hoping to improve?", valid: form.goals.length > 0 && form.ninetyDayGoal.trim().length > 0 },
      { eyebrow: "Step 3 of 5", title: "Your health background.", valid: form.conditions.length > 0 && form.currentMedications.trim() && form.currentSupplements.trim() && form.peptideExperience && (!experienced || form.peptidesUsedList.length > 0 || form.peptidesUsed.trim().length > 0) },
      { eyebrow: "Step 4 of 5", title: "Your day-to-day baseline.", valid: true },
      { eyebrow: "Step 5 of 5", title: "Compounds, bloodwork & how we follow up.", valid: !!form.timeline && !!form.contactPreference && !!form.recentBloodwork && (form.recentBloodwork === "Yes" || (!!form.wantsBloodwork && (form.wantsBloodwork === "No" || form.rythmConsent))) },
    ],
    [form, experienced]
  );
  const current = steps[step];
  const last = step === steps.length - 1;

  if (status === "success") {
    return (
      <main className="min-h-screen w-full bg-sand">
        <Header />
        <section className="mx-auto max-w-2xl px-6 py-28 md:px-10 md:py-40">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("? Assessment complete")}</p>
          <h1 className="mt-6 font-serif text-4xl leading-[1.05] text-ink md:text-5xl">{t("Thank you,")} <em className="italic text-terracotta">{form.firstName || t("friend")}</em>.</h1>
          <p className="mt-6 font-serif text-lg leading-relaxed text-ink/75">{t("Your protocol assessment has been sent to our medical team for review. A licensed physician will personally read through your responses before reaching out.")}</p>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink/75">{t("A confirmation email is on its way to")} <strong>{form.email}</strong>. {t("We'll follow up within one business day to coordinate your consultation.")}</p>
          <Link href="/" className="mt-10 inline-block rounded-full bg-forest px-7 py-3 text-xs uppercase tracking-[0.22em] text-sand transition hover:bg-ink">{t("? Back to Pax Longevity")}</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-sand">
      <Header />
      <section className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{t("? Intake Assessment")}</p>
          <h1 className="mt-4 font-serif text-3xl leading-[1.05] text-ink md:text-5xl">{t("A concierge protocol assessment,")} <em className="italic">{t("reviewed by a physician.")}</em></h1>
          <p className="mt-4 max-w-xl font-serif text-base leading-relaxed text-ink/70 md:text-lg">{t("Take a few minutes to share your goals, symptoms, and interests. Your answers go directly to our medical team so we can match you with the right Pax protocol.")}</p>
        </div>
        <div className="mb-10 flex items-center gap-2">
          {steps.map((_, index) => <div key={index} className={`h-[3px] flex-1 rounded-full transition ${index <= step ? "bg-forest" : "bg-ink/15"}`} />)}
        </div>
        <div className="rounded-2xl border border-ink/15 bg-white/50 p-6 md:p-10">
          <p className="text-[11px] uppercase tracking-[0.26em] text-ink/45">{t(current.eyebrow)}</p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-ink md:text-3xl">{t(current.title)}</h2>
          <div className="mt-8 grid gap-6">
            {step === 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Label label={t("First name")}><input type="text" required value={form.firstName} onChange={(event) => set("firstName", event.target.value)} className={fieldClass} /></Label>
                <Label label={t("Last name")}><input type="text" required value={form.lastName} onChange={(event) => set("lastName", event.target.value)} className={fieldClass} /></Label>
                <Label label={t("Email")}><input type="email" required value={form.email} onChange={(event) => set("email", event.target.value)} className={fieldClass} /></Label>
                <Label label={t("Phone")}><input type="tel" required value={form.phone} onChange={(event) => set("phone", event.target.value)} className={fieldClass} /></Label>
                <Label label={t("Age")}><input type="number" required min="13" max="120" value={form.age} onChange={(event) => set("age", event.target.value)} className={fieldClass} /></Label>
                <Label label={t("Gender")}>
                  <select required value={form.gender} onChange={(event) => set("gender", event.target.value)} className={fieldClass}>
                    <option value="">{t("Select?")}</option>
                    {genders.map((option) => <option key={option} value={option}>{t(option)}</option>)}
                  </select>
                </Label>
                <Label label={t("City")}><input type="text" required value={form.city} onChange={(event) => set("city", event.target.value)} className={fieldClass} /></Label>
                <Label label={t("State")}><input type="text" required value={form.state} onChange={(event) => set("state", event.target.value)} className={fieldClass} /></Label>
              </div>
            )}
            {step === 1 && (
              <>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">{t("Select up to 3 per category")}</p>
                  <div className="mt-5 grid gap-5">
                    {goalGroups.map((group) => (
                      <Group key={group.label} label={t(group.label)} items={group.items} renderItem={t} selected={form.goals} max={3} onToggle={(item) => toggleLimited("goals", group.items, item, 3)} />
                    ))}
                  </div>
                </div>
                <Label label={t("If you could improve one thing over the next 90 days, what would it be?")}>
                  <textarea required rows={4} maxLength={2000} value={form.ninetyDayGoal} onChange={(event) => set("ninetyDayGoal", event.target.value)} className={fieldClass} placeholder={t("One outcome you'd most like to see?")} />
                </Label>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">{t("Do any of the following apply to you? (select all that apply)")}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {conditions.map((item) => <button key={item} type="button" onClick={() => toggle("conditions", item)} className={chip(form.conditions.includes(item))}>{t(item)}</button>)}
                  </div>
                </div>
                <Label label={t("Current medications (write 'none' if not applicable)")}><textarea required rows={3} maxLength={2000} value={form.currentMedications} onChange={(event) => set("currentMedications", event.target.value)} className={fieldClass} /></Label>
                <Label label={t("Current supplements (write 'none' if not applicable)")}><textarea required rows={3} maxLength={2000} value={form.currentSupplements} onChange={(event) => set("currentSupplements", event.target.value)} className={fieldClass} /></Label>
                <Label label={t("Have you used peptides before?")}>
                  <select required value={form.peptideExperience} onChange={(event) => set("peptideExperience", event.target.value)} className={fieldClass}>
                    <option value="">{t("Select?")}</option>
                    <option value="Never">{t("Never")}</option>
                    <option value="Previously">{t("Previously")}</option>
                    <option value="Currently">{t("Currently")}</option>
                  </select>
                </Label>
                {experienced && (
                  <>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-ink/60">{t("What peptides have you used? (select all that apply)")}</p>
                      <div className="mt-5 grid gap-5">
                        {usedGroups.map((group) => <Group key={group.label} label={t(group.label)} items={group.items} selected={form.peptidesUsedList} onToggle={(item) => toggle("peptidesUsedList", item)} />)}
                      </div>
                    </div>
                    <Label label={t("Anything else? Dosages, duration, or peptides not listed (optional)")}>
                      <textarea rows={3} maxLength={2000} value={form.peptidesUsed} onChange={(event) => set("peptidesUsed", event.target.value)} className={fieldClass} placeholder={t("e.g. BPC-157 250mcg/day for 6 weeks?")} />
                    </Label>
                  </>
                )}
              </>
            )}
            {step === 3 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Slider label={t("Sleep quality")} value={form.sleepQuality} onChange={(value) => set("sleepQuality", value)} />
                  <Slider label={t("Energy level")} value={form.energyLevel} onChange={(value) => set("energyLevel", value)} />
                  <Slider label={t("Stress level")} value={form.stressLevel} onChange={(value) => set("stressLevel", value)} />
                  <Slider label={t("Recovery ability")} value={form.recoveryAbility} onChange={(value) => set("recoveryAbility", value)} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">{t("Select up to 3 per category")}</p>
                  <div className="mt-5 grid gap-5">
                    {symptomGroups.map((group) => (
                      <Group key={group.label} label={t(group.label)} items={group.items} renderItem={t} selected={form.symptoms} max={3} onToggle={(item) => toggleLimited("symptoms", group.items, item, 3)} />
                    ))}
                  </div>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <div>
                  <p className="font-serif text-base leading-relaxed text-ink/75">
                    {t("Are you interested in any of the specific peptides below? Selecting compounds is completely optional ? if you're unsure, simply choose")} <em className="italic">?{t("I'm New To Peptides")}?</em> {t("or")} <em className="italic">?{t("Not Sure Yet")}?</em> {t("at the bottom and continue. Our medical team will guide your recommendation.")}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-ink/60">{t("Optional ? up to 3 per category")}</p>
                  <div className="mt-5 grid gap-5">
                    {compoundGroups.map((group) => (
                      <Group key={group.label} label={t(group.label)} items={group.items} renderItem={t} selected={form.compoundsInterest} max={3} onToggle={(item) => toggleLimited("compoundsInterest", group.items, item, 3)} />
                    ))}
                  </div>
                </div>
                <Label label={t("What prompted your interest in these compounds? (optional)")}><textarea rows={3} maxLength={2000} value={form.compoundsPrompt} onChange={(event) => set("compoundsPrompt", event.target.value)} className={fieldClass} /></Label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Label label={t("Desired timeline")}>
                    <select required value={form.timeline} onChange={(event) => set("timeline", event.target.value)} className={fieldClass}>
                      <option value="">{t("Select?")}</option>
                      {timelineOptions.map((option) => <option key={option} value={option}>{t(option)}</option>)}
                    </select>
                  </Label>
                  <Label label={t("Preferred contact method")}>
                    <select required value={form.contactPreference} onChange={(event) => set("contactPreference", event.target.value)} className={fieldClass}>
                      {contactOptions.map((option) => <option key={option} value={option}>{t(option)}</option>)}
                    </select>
                  </Label>
                </div>
                <Label label={t("Anything else you'd like us to know? (optional)")}><textarea rows={3} maxLength={2000} value={form.additionalNotes} onChange={(event) => set("additionalNotes", event.target.value)} className={fieldClass} /></Label>
                <div className="mt-2 rounded-xl border border-ink/15 bg-sand/60 p-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-terracotta">? {t("Bloodwork")}</p>
                  <p className="mt-3 font-serif text-base leading-relaxed text-ink/80">{t("Have you had comprehensive bloodwork done in the last 2 months?")}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Yes", "No"].map((option) => <button key={option} type="button" onClick={() => set("recentBloodwork", option)} className={chip(form.recentBloodwork === option)}>{t(option)}</button>)}
                  </div>
                  {form.recentBloodwork === "No" && (
                    <div className="mt-6 border-t border-ink/10 pt-5">
                      <p className="font-serif text-base leading-relaxed text-ink/80">{t("Would you be open to getting bloodwork before speaking with our physician? We partner with Rythm Health for a simple at-home kit ? we'll email you the link to set up your account.")}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Yes", "No"].map((option) => <button key={option} type="button" onClick={() => set("wantsBloodwork", option)} className={chip(form.wantsBloodwork === option)}>{t(option)}</button>)}
                      </div>
                      {form.wantsBloodwork === "Yes" && (
                        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-ink/15 bg-sage/20 p-4">
                          <input type="checkbox" checked={form.rythmConsent} onChange={(event) => set("rythmConsent", event.target.checked)} className="mt-1 h-4 w-4 accent-forest" />
                          <span className="font-serif text-sm leading-relaxed text-ink/80">{t("I consent to Pax Health sharing my email address with Rythm Health so they can send me setup instructions for my at-home bloodwork kit.")}</span>
                        </label>
                      )}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{t("By submitting, your responses will be sent to our medical team for review. A confirmation email will be sent to you shortly after.")}</p>
              </>
            )}
          </div>
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
            <button type="button" onClick={() => setStep((currentStep) => Math.max(0, currentStep - 1))} disabled={step === 0} className="text-xs uppercase tracking-[0.22em] text-ink/60 transition hover:text-ink disabled:opacity-30">{t("? Back")}</button>
            {last ? (
              <button type="button" onClick={() => setStatus("success")} disabled={!current.valid} className="rounded-full bg-forest px-8 py-4 text-xs uppercase tracking-[0.22em] text-sand transition hover:bg-ink disabled:opacity-50">{t("Submit assessment")}</button>
            ) : (
              <button type="button" onClick={() => setStep((currentStep) => Math.min(steps.length - 1, currentStep + 1))} disabled={!current.valid} className="rounded-full bg-forest px-8 py-4 text-xs uppercase tracking-[0.22em] text-sand transition hover:bg-ink disabled:opacity-50">{t("Continue ?")}</button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Header() {
  const { t } = useLang();
  return (
    <header className="w-full border-b border-ink/10 bg-sand">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="inline-flex items-center gap-3 font-serif text-2xl tracking-tight text-ink"><BrandSeal /><span>Pax<span className="italic text-terracotta"> Longevity</span></span></Link>
        <div className="flex items-center gap-4 text-ink">
          <LanguageToggle />
          <Link href="/" className="text-xs uppercase tracking-[0.22em] text-ink/60 transition hover:text-ink">{t("? Back")}</Link>
        </div>
      </div>
    </header>
  );
}
