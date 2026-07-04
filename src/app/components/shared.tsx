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
  const h = Math.round(size * 0.6);
  return (
    <svg width={size} height={h} viewBox="0 0 60 36" style={{ borderRadius: 3, flexShrink: 0 }}>
      <rect width="60" height="36" fill="#fff" />
      <rect width="15" height="36" fill="#D52B1E" />
      <rect x="45" width="15" height="36" fill="#D52B1E" />
      <path d="M30 4 L32 10 L38 9 L34 13 L36 19 L30 16 L24 19 L26 13 L22 9 L28 10 Z" fill="#D52B1E" />
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
