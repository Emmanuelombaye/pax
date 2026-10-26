"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Booking() {
  const { token } = useParams();
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    setPhase("missing");
  }, [token]);

  return (
    <main className="min-h-screen bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-terracotta">? Pax Health Concierge</p>
        <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
          Manage your <em className="italic text-terracotta">consultation</em>
        </h1>
        {phase === "loading" && <p className="mt-10 font-serif text-lg text-ink/60">Loading your booking?</p>}
        {phase === "missing" && <p className="mt-10 font-serif text-lg text-terracotta">We could not find this booking. The link may have expired.</p>}
      </div>
    </main>
  );
}
