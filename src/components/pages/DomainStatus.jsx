"use client";
import { useEffect, useState } from "react";

const domains = ["https://pax-miami.com", "https://www.pax-miami.com"];

function Badge({ status }) {
  const styles = {
    checking: { label: "Checking?", dot: "bg-ink/40", text: "text-ink/60" },
    live: { label: "Live", dot: "bg-emerald-500", text: "text-emerald-700" },
    down: { label: "Unreachable", dot: "bg-red-500", text: "text-red-700" },
  }[status];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-ink/20 bg-sand px-4 py-2 text-xs uppercase tracking-[0.22em] ${styles.text}`}>
      <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
      {styles.label}
    </span>
  );
}

export default function DomainStatus() {
  const [rows, setRows] = useState(() => Object.fromEntries(domains.map((url) => [url, { status: "checking", lastChecked: null, latencyMs: null }])));
  const [busy, setBusy] = useState(false);

  async function check() {
    setBusy(true);
    await Promise.all(
      domains.map(async (url) => {
        const started = performance.now();
        let status = "down";
        try {
          await fetch(url, { method: "GET", mode: "no-cors", cache: "no-store" });
          status = "live";
        } catch {
          status = "down";
        }
        const latencyMs = Math.round(performance.now() - started);
        setRows((current) => ({ ...current, [url]: { status, lastChecked: new Date(), latencyMs } }));
      })
    );
    setBusy(false);
  }

  useEffect(() => {
    check();
    const timer = setInterval(check, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-sand px-6 py-20 text-ink md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-terracotta">? Status</p>
        <h1 className="mt-6 font-serif text-4xl leading-[1.05] md:text-6xl">Domain <em className="italic text-terracotta">status</em></h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70">Live reachability check for the Pax Health domains. Auto-refreshes every minute.</p>
        <div className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
          {domains.map((url) => {
            const row = rows[url];
            return (
              <div key={url} className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <a href={url} target="_blank" rel="noreferrer" className="font-serif text-2xl text-ink hover:text-terracotta">{url.replace(/^https?:\/\//, "")}</a>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ink/50">
                    Last checked: {row.lastChecked ? row.lastChecked.toLocaleTimeString() : "?"}
                    {row.latencyMs != null && row.status === "live" ? ` ? ${row.latencyMs}ms` : ""}
                  </p>
                </div>
                <Badge status={row.status} />
              </div>
            );
          })}
        </div>
        <button onClick={check} disabled={busy} className="mt-10 rounded-full bg-forest px-7 py-3 text-xs uppercase tracking-[0.22em] text-sand transition hover:bg-ink disabled:opacity-50">{busy ? "Checking?" : "Check now"}</button>
      </div>
    </main>
  );
}
