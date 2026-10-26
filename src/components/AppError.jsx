"use client";
import { Component } from "react";

function copy(kind) {
  let es = false;
  try {
    es = localStorage.getItem("pax-lang") === "es";
  } catch {
    es = false;
  }
  if (kind === "crash") {
    return es
      ? { title: "Algo sali? mal", body: "Actualiza la p?gina o vuelve al inicio.", home: "Ir al inicio" }
      : { title: "Something went wrong", body: "Refresh the page or return home.", home: "Go home" };
  }
  return es
    ? { title: "P?gina no encontrada", body: "Esta direcci?n no est? en Pax Health.", home: "Ir al inicio" }
    : { title: "Page not found", body: "This address is not on Pax Health.", home: "Go home" };
}

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fdf5e9",
  color: "#1d1713",
  textAlign: "center",
  padding: "24px",
  fontFamily: '"Work Sans", sans-serif',
};

const titleStyle = {
  fontFamily: '"Instrument Serif", Georgia, serif',
  fontSize: "4rem",
  fontWeight: 400,
  lineHeight: 1,
  margin: "12px 0",
};

const linkStyle = {
  display: "inline-block",
  marginTop: "24px",
  background: "#2d5338",
  color: "#fdf5e9",
  textDecoration: "none",
  padding: "12px 22px",
  borderRadius: "999px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontSize: "12px",
};

export function PageNotice({ kind = "missing" }) {
  const text = copy(kind);
  return (
    <main style={pageStyle}>
      <div>
        <p style={{ letterSpacing: "0.22em", textTransform: "uppercase", fontSize: "12px" }}>Pax Health</p>
        <h1 style={titleStyle}>{text.title}</h1>
        <p style={{ maxWidth: "26rem", margin: "0 auto" }}>{text.body}</p>
        <a href="/" style={linkStyle}>{text.home}</a>
      </div>
    </main>
  );
}

export class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <PageNotice kind="crash" />;
    return this.props.children;
  }
}
