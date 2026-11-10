"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n";
import "@/styles/site-header.css";

export function LanguageToggle({ className = "" }) {
  const { lang, setLang } = useLang();
  const item = (code, label) =>
    `px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] transition rounded-full ${
      lang === code ? "bg-current/15 font-medium" : "opacity-70 hover:opacity-100"
    }`;

  return (
    <div className={`inline-flex items-center gap-1 rounded-full border border-current/40 p-0.5 ${className}`}>
      <button type="button" aria-pressed={lang === "en"} className={item("en", "EN")} onClick={() => setLang("en")}>
        EN
      </button>
      <button type="button" aria-pressed={lang === "es"} className={item("es", "ES")} onClick={() => setLang("es")}>
        ES
      </button>
    </div>
  );
}

export function BrandSeal({ className = "", size = "h-16 w-16 md:h-24 md:w-24" }) {
  return (
    <img
      src="/brand/pax-circular-seal-header.webp"
      alt="Pax Longevity"
      width={96}
      height={96}
      className={`${size} shrink-0 rounded-full bg-sand object-contain ${className}`}
    />
  );
}

function HeaderLink({ href, className, onClick, children, ...rest }) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

export function SiteHeader({
  tone = "onDark",
  brandHref = "/",
  links,
  joinHref,
  joinLabel,
  primaryHref,
  primaryLabel,
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeRef = useRef(null);
  const onDark = tone === "onDark";
  const items = links ?? [
    { href: "/#membership", label: t("Membership") },
    { href: "/#philosophy", label: t("Philosophy") },
    { href: "/network", label: t("Partners") },
  ];

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);
  const accent = onDark && !open ? "text-dune" : "text-terracotta";
  const barText = open ? "text-forest" : onDark ? "text-sand" : "text-ink";

  return (
    <header className={`absolute inset-x-0 top-0 z-50 ${open ? "bg-sand/95 text-forest shadow-sm backdrop-blur-md" : barText}`}>
      <nav className="site-nav relative z-50 mx-auto flex max-w-7xl items-center justify-between">
        <HeaderLink
          href={brandHref}
          className="site-brand inline-flex shrink-0 items-center font-serif tracking-tight"
          onClick={close}
        >
          <BrandSeal size="site-seal" />
          <span className="site-wordmark whitespace-nowrap">
            Pax<span className={`italic ${accent}`}> Health</span>
          </span>
        </HeaderLink>

        <div className="site-desktop hidden min-w-0 flex-1 items-center justify-end md:flex">
          <ul className="site-links flex flex-nowrap items-center text-xs uppercase">
            {items.map((item) => (
              <li key={item.href + item.label} className="shrink-0">
                <HeaderLink
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={`whitespace-nowrap transition hover:opacity-80 ${item.current ? (onDark ? "text-dune" : "text-terracotta") : ""}`}
                >
                  {item.label}
                </HeaderLink>
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle className={onDark ? "text-sand" : "text-ink"} />
            {joinHref ? (
              <HeaderLink
                href={joinHref}
                className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs uppercase tracking-[0.16em] transition ${
                  onDark
                    ? "border-sand/60 hover:border-sand hover:bg-sand hover:text-forest"
                    : "border-ink/20 hover:border-forest hover:bg-forest hover:text-sand"
                }`}
              >
                {joinLabel}
              </HeaderLink>
            ) : null}
            {primaryHref ? (
              <HeaderLink
                href={primaryHref}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-xs uppercase tracking-[0.16em] transition ${
                  onDark ? "bg-sand text-forest hover:bg-dune" : "bg-forest text-sand hover:bg-ink"
                }`}
              >
                {primaryLabel}
              </HeaderLink>
            ) : null}
          </div>
        </div>

        <button
          ref={closeRef}
          type="button"
          className={`inline-flex h-12 shrink-0 items-center justify-center rounded-full px-6 text-xs uppercase tracking-[0.22em] transition md:hidden ${
            open
              ? "bg-forest text-sand"
              : onDark
                ? "bg-sand text-forest hover:bg-dune"
                : "bg-forest text-sand hover:bg-ink"
          }`}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? t("Close menu") : t("Open menu")}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? t("Close") : t("Menu")}
        </button>
      </nav>

      <div
        id={panelId}
        className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          className={`fixed inset-0 z-40 bg-ink/45 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          aria-label={t("Close menu")}
          onClick={close}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("Menu")}
          className={`fixed inset-y-0 right-0 z-40 flex w-full flex-col overflow-y-auto border-l border-dune/40 bg-sand pt-40 text-forest shadow-[-24px_0_80px_rgba(29,23,19,0.18)] transition-transform duration-300 ease-out sm:max-w-md ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex min-h-full flex-1 flex-col px-7 pb-10 sm:px-10">
            <p className="text-[10px] uppercase tracking-[0.28em] text-terracotta">{t("Navigate")}</p>
            <ul className="mt-5 flex flex-col gap-1">
              {items.map((item) => (
                <li key={`sheet-${item.href}-${item.label}`}>
                  <HeaderLink
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className="flex min-h-12 items-center border-b border-forest/10 font-serif text-3xl tracking-tight text-ink transition hover:text-terracotta"
                    onClick={close}
                  >
                    {item.label}
                  </HeaderLink>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-4 pt-8">
              <LanguageToggle className="self-start text-forest" />
              <div className="flex flex-col gap-3">
                {joinHref ? (
                  <HeaderLink
                    href={joinHref}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-forest/25 px-5 text-xs uppercase tracking-[0.18em] text-forest transition hover:border-forest hover:bg-forest hover:text-sand"
                    onClick={close}
                  >
                    {joinLabel}
                  </HeaderLink>
                ) : null}
                {primaryHref ? (
                  <HeaderLink
                    href={primaryHref}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-5 text-xs uppercase tracking-[0.18em] text-sand transition hover:bg-ink"
                    onClick={close}
                  >
                    {primaryLabel}
                  </HeaderLink>
                ) : null}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

/** Horizontal lockup for checkout / dark bars / wide headers */
export function BrandLogo({ className = "", onDark = false }) {
  return (
    <img
      src={onDark ? "/brand/pax-horizontal-on-dark.svg" : "/brand/pax-horizontal.svg"}
      alt="Pax Longevity"
      width={200}
      height={112}
      className={`h-10 w-auto object-contain md:h-12 ${className}`}
    />
  );
}

export function HomeButton() {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-sand shadow-lg backdrop-blur transition hover:bg-forest/90"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-4 w-4" aria-hidden="true">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
      <span>Home</span>
    </Link>
  );
}

export function Icon({ icon, size = 22, className = "", strokeWidth = 1.5 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={[icon.lucide, className].filter(Boolean).join(" ")} aria-hidden="true">
      {icon.node}
    </svg>
  );
}

export const icons = {
  stethoscope: { lucide: "lucide lucide-stethoscope", node: (
    <>
      <path d="M11 2v2" />
      <path d="M5 2v2" />
      <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
      <path d="M8 15a6 6 0 0 0 12 0v-3" />
      <circle cx="20" cy="10" r="2" />
    </>
  ) },
  flask: { lucide: "lucide lucide-flask-conical", node: (
    <>
      <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
      <path d="M6.453 15h11.094" />
      <path d="M8.5 2h7" />
    </>
  ) },
  badge: { lucide: "lucide lucide-badge-check", node: (
    <>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ) },
  shield: { lucide: "lucide lucide-shield-check", node: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ) },
  arrow: { lucide: "lucide lucide-arrow-right", node: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ) },
  check: { lucide: "lucide lucide-check", node: <path d="M20 6 9 17l-5-5" /> },
  activity: { lucide: "lucide lucide-activity", node: <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" /> },
  share: { lucide: "lucide lucide-share2 lucide-share-2", node: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </>
  ) },
  heart: { lucide: "lucide lucide-heart-pulse", node: (
    <>
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </>
  ) },
  dumbbell: { lucide: "lucide lucide-dumbbell", node: (
    <>
      <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
      <path d="m2.5 21.5 1.4-1.4" />
      <path d="m20.1 3.9 1.4-1.4" />
      <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
      <path d="m9.6 14.4 4.8-4.8" />
    </>
  ) },
  rocket: { lucide: "lucide lucide-rocket", node: (
    <>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
      <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
    </>
  ) },
  users: { lucide: "lucide lucide-users", node: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
    </>
  ) },
  building: { lucide: "lucide lucide-building2 lucide-building-2", node: (
    <>
      <path d="M10 12h4" />
      <path d="M10 8h4" />
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    </>
  ) },
  pill: { lucide: "lucide lucide-pill", node: (
    <>
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </>
  ) },
  earth: { lucide: "lucide lucide-earth", node: (
    <>
      <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
      <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
      <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
      <circle cx="12" cy="12" r="10" />
    </>
  ) },
  layers: { lucide: "lucide lucide-layers", node: (
    <>
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
      <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
      <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
    </>
  ) },
  trend: { lucide: "lucide lucide-trending-up", node: (
    <>
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
    </>
  ) },
};
