import React, { useEffect, useRef } from "react";
import { T } from "@/app/lib/theme";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export function Reveal({
  children,
  cls = "reveal",
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  cls?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className={cls} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

export function Label({ children, light }: { children: string; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{ width: 3, height: 16, background: light ? "rgba(255,255,255,0.5)" : T.teal, borderRadius: 2 }} />
      <span
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
          color: light ? "rgba(255,255,255,0.55)" : T.teal,
        }}
      >
        {children}
      </span>
    </div>
  );
}

export function SectionIntro({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <div className="section-intro">
      <Label>{label}</Label>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function ImgBox({ label, height = 360, radius = 12 }: { label: string; height?: number; radius?: number }) {
  return (
    <div
      style={{
        background: T.surface,
        border: `1.5px dashed ${T.border}`,
        borderRadius: radius,
        height,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ color: T.muted, fontSize: 13, fontWeight: 500, textAlign: "center", padding: "0 20px", lineHeight: 1.6 }}>
        {label}
      </span>
    </div>
  );
}

export function CanadaFlag({ size = 28 }: { size?: number }) {
  const h = Math.round(size / 2);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 60 30"
      role="img"
      aria-label="Canadian flag"
      style={{ borderRadius: 2, flexShrink: 0 }}
    >
      <rect width="60" height="30" fill="#fff" />
      <rect width="15" height="30" fill="#D52B1E" />
      <rect x="45" width="15" height="30" fill="#D52B1E" />
      <path
        d="M30 3 32.3 9.4 35.1 7.5 35.4 11.7 39.1 10.8 37.8 14.3 42 14.9 38.3 17.2 39.7 20.1 34.8 19.3 35 24.3 31.2 21.7 30 27 28.8 21.7 25 24.3 25.2 19.3 20.3 20.1 21.7 17.2 18 14.9 22.2 14.3 20.9 10.8 24.6 11.7 24.9 7.5 27.7 9.4Z"
        fill="#D52B1E"
      />
    </svg>
  );
}

export function PageShell({ children, narrow }: { children: React.ReactNode; narrow?: boolean }) {
  return (
    <main className="site-main" style={{ background: "#fff" }}>
      <div className={`container page-content${narrow ? " page-content-narrow" : ""}`}>{children}</div>
    </main>
  );
}
