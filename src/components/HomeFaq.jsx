"use client";
import { useId, useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import "@/styles/home-faq.css";

const ITEMS = [
  {
    label: "Getting started",
    question: "What is Pax Health?",
    answer:
      "Pax Health is a telehealth platform that connects eligible members with independent U.S.-licensed clinicians for longevity, hormone, recovery, and weight care. Pax is not a pharmacy. Fulfillment occurs through licensed pharmacy partners only when prescribed.",
  },
  {
    label: "Your intake",
    question: "How does the intake work?",
    answer:
      "Tell us your goals in a few minutes. A licensed provider reviews your answers and bloodwork, then builds a plan that fits your biology.",
  },
  {
    label: "Prescriptions",
    question: "Does joining guarantee a prescription?",
    answer:
      "No. Completing an assessment or becoming a member does not guarantee treatment. A licensed provider must determine that a medication is medically appropriate before anything is prescribed.",
  },
  {
    label: "Bloodwork",
    question: "How do I get my labs done?",
    answer:
      "Bloodwork is arranged through mobile phlebotomy or partner draw sites — there is no Pax mail-order kit. Samples are analyzed in CLIA-certified labs and reviewed by your Pax physician.",
  },
  {
    label: "Pricing",
    question: "What does membership cost?",
    answer:
      "Basic membership is $25/month and Premium is $155/month. Medication, when prescribed, is always a separate charge.",
  },
  {
    label: "Safety & FDA",
    question: "Are the medications FDA-approved?",
    answer:
      "Compounded medications are not FDA-approved. They may be prescribed for an individual patient when a licensed provider determines they are clinically appropriate.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <section id="faqs" className="pfaq" aria-labelledby="pfaq-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
      <div className="pfaq__media">
        <MediaImage
          src="/Gemini_Generated_Image_8yg7dm8yg7dm8yg7.jpg"
          alt="Smiling woman cycling a cream cruiser bicycle along Ocean Drive in Miami Beach at golden hour"
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          quality={72}
          className="pfaq__img"
          style={{ objectFit: "cover", objectPosition: "50% 30%" }}
        />
        <span className="pfaq__scrim" aria-hidden="true" />
        <h2 id="pfaq-title" className="pfaq__title">
          <span>Any questions?</span>
          <span>We&rsquo;ve got answers.</span>
        </h2>
      </div>

      <div className="pfaq__list">
        {ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-btn-${index}`;
          return (
            <div key={item.question} className={`pfaq__item${isOpen ? " is-open" : ""}`}>
              <h3 className="pfaq__heading">
                <button
                  type="button"
                  id={buttonId}
                  className="pfaq__trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.label}</span>
                  <span className="pfaq__icon" aria-hidden="true" />
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} className="pfaq__panel" inert={!isOpen}>
                <div className="pfaq__panel-inner">
                  <div className="pfaq__panel-body">
                    <p className="pfaq__question">{item.question}</p>
                    <p className="pfaq__answer">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <Link href="/how-pax-works" className="pfaq__more">
          <span>How Pax works</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
