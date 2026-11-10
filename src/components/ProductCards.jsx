"use client";
import Link from "next/link";
import { useLang } from "@/i18n";
import { canStartIntake, priceLabel } from "@/brand/productMap.js";
import MediaImage from "@/components/MediaImage";
import "@/styles/vial-page.css";

export default function ProductCards({ treatments }) {
  const { t } = useLang();

  return (
    <div className="pax-products">
      {treatments.map((item) => (
        <article key={item.slug} className="pax-product">
          <div className="pax-product-content">
            <h3>
              <Link href={`/treatments/${item.slug}`}>{t(item.name)}</Link>
            </h3>
            <p className="pax-product-price">{priceLabel(item, t)}</p>
            <p className="pax-product-body">{t(item.summary)}</p>
            <div className="pax-product-actions">
              <Link href={`/treatments/${item.slug}`} className="pax-product-more">{t("Learn More")}</Link>
              {canStartIntake(item) ? (
                <a href={item.intakeUrl} className="pax-product-more is-outline">{t("Start intake →")}</a>
              ) : null}
            </div>
          </div>
          <Link href={`/treatments/${item.slug}`} className="pax-product-image">
            <MediaImage src={item.image} alt={item.imageAlt} width={960} height={960} sizes="(max-width: 640px) 100vw, 400px" />
          </Link>
        </article>
      ))}
    </div>
  );
}
