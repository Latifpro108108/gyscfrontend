import { Link } from "react-router";
import { ReactNode } from "react";
import { T } from "@/app/lib/theme";

export function AuthCard({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="auth-page">
      <div className="auth-bg" aria-hidden />
      <div className="auth-card">
        <div className="auth-card-header">
          <p className="auth-eyebrow">GYSC Member Portal</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
        {footer && <div className="auth-footer">{footer}</div>}
      </div>
    </div>
  );
}

export function AuthLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} style={{ color: T.teal, fontWeight: 600, textDecoration: "none" }}>
      {children}
    </Link>
  );
}
