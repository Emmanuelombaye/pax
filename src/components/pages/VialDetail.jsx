"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLang } from "@/i18n";
import { findProgram, findVial, relatedVials } from "@/data/vial-programs";
import { intakeHref, isLiveTreatment } from "@/brand/productMap.js";
import NotFound from "@/components/pages/NotFound";
import "@/styles/vial-page.css";

const consult = [
  ["Biomarker test", "$65"],
  ["Membership", "Basic $25/month or Premium $155/month"],
  ["Medication", "Billed separately, after a clinician approves"],
];

export default function VialDetail() {
  const { slug } = useParams();
  const item = findVial(slug);
  const { t } = useLang();
  if (!item) return <NotFound />;
  const program = findProgram(item.program);
  const others = relatedVials(item);
  const live = isLiveTreatment(item.slug);

  return (
    <main className="vial-scope">
      <section className="vial-hero">
        <div className="vial-copy">
          <p className="vial-crumb">
            <Link href="/">{t("Home")}</Link>
            <span>/</span>
            <Link href={`/programs/${program.slug}`}>{t(program.title)}</Link>
            <span>/</span>
            <span>{t(item.title)}</span>
          </p>
          <h1>{t(item.title)}</h1>
          {live ? <p className="vial-price">{t("Live clinical intake")}</p> : null}
          <p className="vial-price">{t(item.price)}</p>
          <p className="vial-summary">{t(item.summary)}</p>
          <ul className="vial-chips">
            {item.benefits.slice(0, 3).map((benefit) => (
              <li key={benefit}><i />{t(benefit)}</li>
            ))}
          </ul>
          <p className="vial-note">
            {t("Prescription products require an online consultation with a healthcare provider who will determine if a prescription is appropriate.")}
          </p>
          <Link href={intakeHref(item.slug)} className="vial-cta">{t("Request to discuss")}</Link>
        </div>
        <div className="vial-photo">
          <img src={item.image} alt={item.alt} />
        </div>
      </section>

      <section className="vial-block">
        <div className="vial-block-inner">
          <h2>{t(program.title)}</h2>
          <ul className="vial-benefits">
            {item.benefits.map((benefit) => (
              <li key={benefit}>{t(benefit)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="vial-block">
        <div className="vial-block-inner">
          {item.about.map((block) => (
            <div key={block.title} className="vial-about">
              <h3>{t(block.title)}</h3>
              <p>{t(block.body)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vial-block">
        <div className="vial-block-inner">
          <h2>{t("Safety")}</h2>
          <div className="vial-safety">
            {item.safety.map((entry) => (
              <details key={entry.title}>
                <summary>{t(entry.title)}</summary>
                <p>{t(entry.body)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="vial-block vial-consult">
        <div className="vial-block-inner">
          <h2>{t("Get your consultation")}</h2>
          <ul>
            {consult.map(([title, note]) => (
              <li key={title}>
                <span>{t(title)}</span>
                <span>{t(note)}</span>
              </li>
            ))}
          </ul>
          <Link href={intakeHref(item.slug)} className="vial-cta">{t("Request to discuss")}</Link>
        </div>
      </section>

      {others.length > 0 ? (
        <section>
          <div className="pax-products-intro">
            <h2 className="pax-products-title">{t("Explore Other Treatment Options")}</h2>
          </div>
          <div className="pax-products">
            {others.map((other) => (
              <article key={other.slug} className="pax-product">
                <div className="pax-product-content">
                  <h3><Link href={`/treatments/${other.slug}`}>{t(other.title)}</Link></h3>
                  <p className="pax-product-price">{t(other.price)}</p>
                  <p className="pax-product-body">{t(other.summary)}</p>
                  <Link href={`/treatments/${other.slug}`} className="pax-product-more">{t("Learn More")}</Link>
                </div>
                <Link href={`/treatments/${other.slug}`} className="pax-product-image">
                  <img src={other.image} alt={other.alt} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
