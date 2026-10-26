"use client";

import { usePathname } from "next/navigation";
import { HomeButton } from "@/components/Chrome";

export function RouteChrome() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;
  return <HomeButton />;
}
