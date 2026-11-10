"use client";
import Link from "next/link";
import { useLang } from "@/i18n";
import ProductCards from "@/components/ProductCards";
import "@/styles/vial-page.css";

export default function ProgramVials({ program }) {
  const { t } = useLang();

  return (
    <main className="vial-scope">
      <header className="program-intro">
        <p>{t("Live treatments")}</p>
        <h1>{t(program.name)}</h1>
        <p className="program-lead">
          {t("Prescribed only after a licensed provider reviews your intake.")}{" "}
          <Link href="/treatments">{t("See all treatments →")}</Link>
        </p>
      </header>
      <div className="pax-products-intro">
        <h2 className="pax-products-title">{t("Treatments in this program")}</h2>
      </div>
      <ProductCards treatments={program.items} />
    </main>
  );
}
