"use client";

import Image from "next/image";

/**
 * Fast path for marketing images: Next optimizer + sensible defaults.
 * Use priority only for the LCP hero.
 */
export default function MediaImage({
  src,
  alt = "",
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  quality = 72,
  style,
}) {
  const common = {
    src,
    alt,
    className,
    sizes,
    quality,
    priority,
    decoding: "async",
    style,
    unoptimized: /^https?:\/\//.test(src) && !/\.supabase\.co\//.test(src),
  };

  if (fill) {
    return <Image {...common} fill />;
  }

  return <Image {...common} width={width || 1200} height={height || 900} />;
}
