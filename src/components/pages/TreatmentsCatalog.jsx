"use client";
import Link from "next/link";
import { useLang } from "@/i18n";
import { groupByCategory } from "@/brand/productMap.js";
import ProductCards from "@/components/ProductCards";
import "@/styles/vial-page.css";

export default function TreatmentsCatalog({ treatments }) {
  const { t } = useLang();
  const groups = groupByCategory(treatments);

  return (
    <main className="vial-scope">
      <header className="program-intro">
        <p>
          <Link href="/">{t("Pax Health")}</Link> · {t("Live treatments")}
        </p>
        <h1>{t("Choose your treatment.")}</h1>
        <p className="program-lead">
          {t("Every treatment here is open for clinical intake. A licensed provider reviews your intake and prescribes only if it is right for you.")}
        </p>
      </header>
      {groups.length === 0 ? (
        <p className="program-intro program-lead">{t("Treatments are being updated. Please check back shortly.")}</p>
      ) : (
        groups.map((group) => (
          <section key={group.slug} aria-labelledby={`cat-${group.slug}`}>
            <div className="pax-products-intro">
              <h2 id={`cat-${group.slug}`} className="pax-products-title">
                <Link href={`/programs/${group.slug}`}>{t(group.name)}</Link>
              </h2>
            </div>
            <ProductCards treatments={group.items} />
          </section>
        ))
      )}
    </main>
  );
}
