"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLang } from "@/i18n";
import { findProgram, vialsForProgram } from "@/data/vial-programs";
import { intakeHref, isLiveTreatment } from "@/brand/productMap.js";
import NotFound from "@/components/pages/NotFound";
import "@/styles/vial-page.css";

export default function ProgramVials() {
  const { slug } = useParams();
  const program = findProgram(slug);
  const { t } = useLang();
  if (!program) return <NotFound />;
  const vials = vialsForProgram(program.slug);

  return (
    <main className="vial-scope">
      <header className="program-intro">
        <p>{t("? Programs")}</p>
        <h1>{t(program.title)}</h1>
        <p className="program-lead">{t(program.description)}</p>
      </header>
      <div className="pax-products-intro">
        <h2 className="pax-products-title">{t("The vials in this program")}</h2>
      </div>
      <div className="pax-products">
        {vials.map((item) => (
          <article key={item.slug} className="pax-product">
            <div className="pax-product-content">
              <h3>
                <Link href={`/treatments/${item.slug}`}>{t(item.title)}</Link>
              </h3>
              <p className="pax-product-price">{t(item.price)}</p>
              {isLiveTreatment(item.slug) ? (
                <p className="pax-product-body" style={{ color: "var(--terracotta, #C17C74)" }}>
                  {t("Live clinical intake available")}
                </p>
              ) : null}
              <p className="pax-product-body">{t(item.summary)}</p>
              <Link href={`/treatments/${item.slug}`} className="pax-product-more">{t("Learn More")}</Link>
              {isLiveTreatment(item.slug) ? (
                <Link href={intakeHref(item.slug)} className="pax-product-more" style={{ marginTop: "0.5rem" }}>
                  {t("Start intake →")}
                </Link>
              ) : null}
            </div>
            <Link href={`/treatments/${item.slug}`} className="pax-product-image">
              <img src={item.image} alt={item.alt} />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
