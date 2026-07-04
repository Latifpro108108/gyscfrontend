import { CanadaFlag } from "@/app/components/shared";

import { useAuth } from "@/app/context/AuthContext";
import { useContent } from "@/app/context/ContentContext";
import { useSiteNavigation } from "@/app/lib/navigation";
import { FOOTER_COLUMNS, T } from "@/app/lib/theme";

export function Footer() {
  const { goTo } = useSiteNavigation();
  const { text } = useContent();
  const { user, logout } = useAuth();

  return (
    <footer style={{ background: T.navy, paddingTop: 56 }}>
      <div className="container">
        <div className="foot-grid">
          <div>
            <div style={{ marginBottom: 20 }}>
              <CanadaFlag size={48} />
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.8, maxWidth: 280, marginBottom: 16 }}>
              {text("footer_tagline", "Empowering young people to shape global policy on sustainable development — from every corner of the world.")}
            </p>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>Registered NGO · Canada</span>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 22 }}>{col.heading}</p>
              {col.items.map((item) => {
                if (item.label === "Member Login" && user) return null;
                return (
                  <div key={item.label} style={{ marginBottom: 13 }}>
                    <button className="footer-link" onClick={() => goTo(item.to)}>{item.label}</button>
                  </div>
                );
              })}
              {col.heading === "Initiatives" && user && (
                <>
                  <div style={{ marginBottom: 13 }}>
                    <button className="footer-link" onClick={() => goTo("/account")}>My account</button>
                  </div>
                  <div style={{ marginBottom: 13 }}>
                    <button className="footer-link" onClick={() => void logout()}>Log out</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>© {new Date().getFullYear()} Global Youth Sustainability Council.</p>
          <div className="foot-bottom-links">
            {user && (
              <button className="footer-link" onClick={() => goTo("/account")} style={{ fontSize: 12 }}>Account</button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
