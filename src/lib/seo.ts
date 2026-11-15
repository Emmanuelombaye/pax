export const SITE = "https://www.paxlongevity.com";
export const BRAND = "Pax Health";

/** schema.org BreadcrumbList from [name, path] pairs. */
export function breadcrumbs(items: Array<[string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE}${path}`,
    })),
  };
}

export const NOINDEX = { robots: { index: false, follow: false } } as const;
