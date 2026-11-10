"use client";
import { useRef } from "react";
import Link from "next/link";
import { useLang } from "@/i18n";
import MediaImage from "@/components/MediaImage";
import { CATEGORY_COPY, groupByCategory, priceLabel } from "@/brand/productMap.js";
import "@/styles/lineup.css";

function LineupRow({ group }) {
  const { t } = useLang();
  const rowRef = useRef(null);
  const copy = CATEGORY_COPY[group.slug];
  const scroll = (direction) => {
    const row = rowRef.current;
    if (row) row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="lineup" aria-labelledby={`lineup-${group.slug}`}>
      <div className="lineup__head">
        <div>
          <p className="lineup__eyebrow">{t(group.name)}</p>
          <h2 id={`lineup-${group.slug}`} className="lineup__title">
            {copy ? (
              <>
                {t(copy.title)} <em>{t(copy.accent)}</em>
              </>
            ) : (
              t(group.name)
            )}
          </h2>
          {copy?.lead ? <p className="lineup__lead">{t(copy.lead)}</p> : null}
        </div>
        <div className="lineup__controls">
          <Link href={`/programs/${group.slug}`} className="lineup__all">
            {t("See all")} →
          </Link>
          {group.items.length > 2 ? (
            <span className="lineup__arrows">
              <button type="button" aria-label={t("Previous")} onClick={() => scroll(-1)}>‹</button>
              <button type="button" aria-label={t("Next")} onClick={() => scroll(1)}>›</button>
            </span>
          ) : null}
        </div>
      </div>

      <ul ref={rowRef} className="lineup__row">
        {group.items.map((item) => (
          <li key={item.slug} className="lineup__item">
            <Link href={`/treatments/${item.slug}`} className="lineup-card">
              <span className="lineup-card__media">
                <MediaImage
                  src={item.image}
                  alt={item.imageAlt}
                  width={600}
                  height={750}
                  sizes="(max-width: 640px) 75vw, 300px"
                  quality={70}
                />
                {item.badge ? <span className="lineup-card__badge">{t(item.badge)}</span> : null}
                {!item.inStock ? <span className="lineup-card__badge is-muted">{t("Currently unavailable")}</span> : null}
              </span>
              <span className="lineup-card__body">
                <span className="lineup-card__name">{t(item.label)}</span>
                {item.subtitle ? <span className="lineup-card__form">{t(item.subtitle)}</span> : null}
                <span className="lineup-card__price">
                  {t("From")} {priceLabel(item, t)} <sup>†</sup>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="lineup__fine">
        † {t("Price is for medication only and is charged only if a licensed provider prescribes it. Membership and lab testing are billed separately.")}
      </p>
    </section>
  );
}

export default function TreatmentLineup({ treatments = [] }) {
  const groups = groupByCategory(treatments);
  if (groups.length === 0) return null;
  return (
    <div className="lineups">
      {groups.map((group) => (
        <LineupRow key={group.slug} group={group} />
      ))}
    </div>
  );
}
