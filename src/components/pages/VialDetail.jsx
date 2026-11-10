"use client";
import Link from "next/link";
import { useLang } from "@/i18n";
import { SAFETY, canStartIntake, priceLabel, supplyLabel } from "@/brand/productMap.js";
import "@/styles/vial-page.css";

const consult = [
  ["Biomarker test", "$65"],
  ["Membership", "Basic $25/month or Premium $155/month"],
];

function IntakeButton({ item, t }) {
  if (!canStartIntake(item)) {
    return <span className="vial-cta is-disabled">{t("Coming soon")}</span>;
  }
  return (
    <a href={item.intakeUrl} className="vial-cta">
      {t("Start intake")}
    </a>
  );
}

export default function VialDetail({ item, others = [] }) {
  const { t } = useLang();
  const price = priceLabel(item, t);
  const supply = supplyLabel(item, t);
  const facts = [
    price,
    supply,
    item.requiresVideoConsult ? t("Includes a video visit") : t("Online provider review"),
    item.shippingPrice === 0 ? t("Free shipping") : null,
  ].filter(Boolean);

  return (
    <main className="vial-scope">
      <section className="vial-hero">
        <div className="vial-copy">
          <p className="vial-crumb">
            <Link href="/">{t("Home")}</Link>
            <span>/</span>
            <Link href={`/programs/${item.categorySlug}`}>{t(item.category)}</Link>
            <span>/</span>
            <span>{t(item.label)}</span>
          </p>
          <h1>{t(item.name)}</h1>
          <p className="vial-price">{item.inStock ? t("Live clinical intake") : t("Currently unavailable")}</p>
          {price ? <p className="vial-price">{price}</p> : null}
          <p className="vial-summary">{t(item.summary)}</p>
          <ul className="vial-chips">
            {facts.filter((fact) => fact !== price).slice(0, 3).map((fact) => (
              <li key={fact}><i />{fact}</li>
            ))}
          </ul>
          <p className="vial-note">
            {t("Prescription products require an online consultation with a healthcare provider who will determine if a prescription is appropriate.")}
          </p>
          {item.blockedStates.length > 0 ? (
            <p className="vial-note">
              {t("Not available to ship to")}: {item.blockedStates.join(", ")}
            </p>
          ) : null}
          <IntakeButton item={item} t={t} />
        </div>
        <div className="vial-photo">
          <img src={item.image} alt={item.imageAlt} />
        </div>
      </section>

      <section className="vial-block">
        <div className="vial-block-inner">
          <h2>{t(item.category)}</h2>
          <ul className="vial-benefits">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
            <li>{t("Prescribed only if a clinician approves")}</li>
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
            {SAFETY.map((entry) => (
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
            <li>
              <span>{t("Medication")}</span>
              <span>{price ? `${price} — ${t("charged only after a clinician approves")}` : t("Coming soon")}</span>
            </li>
          </ul>
          <IntakeButton item={item} t={t} />
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
                  <h3><Link href={`/treatments/${other.slug}`}>{t(other.name)}</Link></h3>
                  <p className="pax-product-price">{priceLabel(other, t)}</p>
                  <p className="pax-product-body">{t(other.summary)}</p>
                  <Link href={`/treatments/${other.slug}`} className="pax-product-more">{t("Learn More")}</Link>
                </div>
                <Link href={`/treatments/${other.slug}`} className="pax-product-image">
                  <img src={other.image} alt={other.imageAlt} loading="lazy" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
