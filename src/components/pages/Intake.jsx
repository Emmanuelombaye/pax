"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BrandSeal, LanguageToggle } from "@/components/Chrome";
import { useLang } from "@/i18n";
import {
  listStorefrontProducts,
  startProductIntake,
} from "@/brand/connect.js";
import {
  fallbackProducts,
  findProductForTreatment,
  hostedIntakeUrl,
  LIVE_TREATMENTS,
  resolveTreatmentId,
} from "@/brand/productMap.js";

function Header() {
  const { t } = useLang();
  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-10">
      <Link href="/" aria-label={t("Pax Longevity home")}>
        <BrandSeal className="h-10 w-10" />
      </Link>
      <LanguageToggle />
    </header>
  );
}

function HostedIntakeRedirect() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const treatmentId = resolveTreatmentId(searchParams.get("treatment"));
  const [state, setState] = useState({
    status: "loading",
    error: null,
    productName: null,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const knownUrl = hostedIntakeUrl(treatmentId);
        if (knownUrl) {
          const liveName = LIVE_TREATMENTS.find((item) => item.id === treatmentId)?.name || null;
          if (cancelled) return;
          setState({
            status: "redirecting",
            error: null,
            productName: liveName,
          });
          startProductIntake(knownUrl);
          return;
        }

        let products;
        try {
          products = await listStorefrontProducts();
        } catch {
          products = fallbackProducts();
        }
        if (cancelled) return;

        const product = findProductForTreatment(products, treatmentId);
        if (product?.intakeUrl) {
          setState({
            status: "redirecting",
            error: null,
            productName: product.name,
          });
          startProductIntake(product);
          return;
        }

        setState({
          status: "failed",
          error: "No hosted intake URL for this treatment yet.",
          productName: product?.name || null,
        });
      } catch (err) {
        if (cancelled) return;
        setState({
          status: "failed",
          error: err?.message || "Could not open clinical intake.",
          productName: null,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [treatmentId]);

  return (
    <main className="min-h-screen w-full bg-sand">
      <Header />
      <section className="mx-auto max-w-2xl px-6 py-28 md:px-10 md:py-40">
        <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
          {t("Clinical intake")}
        </p>
        <h1 className="mt-6 font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
          {state.status === "failed"
            ? t("Intake unavailable")
            : t("Opening your secure intake")}
          {state.productName ? (
            <>
              {" "}
              <em className="italic text-terracotta">{state.productName}</em>
            </>
          ) : null}
          .
        </h1>
        <p className="mt-6 font-serif text-lg leading-relaxed text-ink/75">
          {state.status === "failed"
            ? state.error ||
              t("Hosted intake could not be opened. Please try again or contact support.")
            : t(
                "You’re being redirected to VirtualClinicOS hosted intake for payment hold, account setup, and clinical questions.",
              )}
        </p>
        {state.status === "failed" ? (
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex rounded-full bg-forest px-7 py-3 text-xs uppercase tracking-[0.22em] text-sand transition hover:bg-ink"
            >
              {t("Try again")}
            </button>
            <Link
              href="/"
              className="inline-flex rounded-full border border-ink/20 px-7 py-3 text-xs uppercase tracking-[0.22em] text-ink transition hover:border-forest"
            >
              {t("Back to Pax Longevity")}
            </Link>
          </div>
        ) : (
          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-ink/45">
            {t("Please wait…")}
          </p>
        )}
      </section>
    </main>
  );
}

export default function Intake() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen w-full bg-sand">
          <Header />
          <section className="mx-auto max-w-2xl px-6 py-28 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Clinical intake</p>
            <h1 className="mt-6 font-serif text-4xl text-ink">Opening your secure intake…</h1>
          </section>
        </main>
      }
    >
      <HostedIntakeRedirect />
    </Suspense>
  );
}
