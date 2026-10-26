"use client";
import { useLayoutEffect, useRef, useState } from "react";

function paint(node, style) {
  if (node) node.setAttribute("style", style);
}

export default function Admin() {
  const [token, setToken] = useState("");
  const root = useRef(null);
  const card = useRef(null);
  const title = useRef(null);
  const copy = useRef(null);
  const input = useRef(null);
  const button = useRef(null);

  useLayoutEffect(() => {
    paint(root.current, "min-height:100vh;background:#f8fafc;padding:48px 20px;font-family:system-ui, -apple-system, sans-serif");
    paint(card.current, "max-width:480px;margin:0 auto;background:#fff;padding:32px;border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,.08)");
    paint(title.current, "font-size:24px;font-weight:700;margin-bottom:8px;color:#0f172a");
    paint(copy.current, "color:#64748b;margin-bottom:16px;font-size:14px");
    paint(input.current, "width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:14px;margin-bottom:12px;box-sizing:border-box");
    paint(button.current, "background:#2f5233;color:#fff;border:none;padding:8px 14px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer");
    input.current?.setAttribute("autofocus", "");
  });

  return (
    <div ref={root}>
      <div ref={card}>
        <h1 ref={title}>Pax Admin</h1>
        <p ref={copy}>Enter your admin dashboard token to continue.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input ref={input} type="password" placeholder="Admin token" autoFocus value={token} onChange={(event) => setToken(event.target.value)} />
          <button ref={button} type="submit" disabled={!token}>Sign in</button>
        </form>
      </div>
    </div>
  );
}
