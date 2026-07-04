import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useAuth } from "@/app/context/AuthContext";
import { useContent } from "@/app/context/ContentContext";
import { useSiteNavigation } from "@/app/lib/navigation";
import { NAV_LINKS } from "@/app/lib/theme";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { goTo } = useSiteNavigation();
  const { image } = useContent();
  const { user, isAdmin } = useAuth();
  const logo = image("site_logo");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function navigate(to: string) {
    setOpen(false);
    goTo(to);
  }

  return (
    <nav className={`site-nav${scrolled ? " scrolled" : ""}`}>
      <div className="container nav-inner">
        <button onClick={() => navigate("/")} className="nav-logo-btn" aria-label="GYSC home">
          <ImageWithFallback src={logo} alt="GYSC" style={{ height: 46, width: "auto", objectFit: "contain" }} />
        </button>

        <div className="desk nav-actions">
          {NAV_LINKS.map((link) => (
            <button key={link.to} className="nav-link" onClick={() => navigate(link.to)}>{link.label}</button>
          ))}
          {!user && (
            <>
              <button className="nav-link" onClick={() => navigate("/login")}>Login</button>
              <button className="btn btn-primary btn-sm" onClick={() => navigate("/register")}>Join</button>
            </>
          )}
          {isAdmin && (
            <button className="btn btn-primary btn-sm" style={{ backgroundColor: "#0f9f6f", borderColor: "#0f9f6f", color: "#fff" }} onClick={() => navigate("/admin")}>Edit Site</button>
          )}
        </div>

        <button className="mob nav-menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="mob-nav-panel">
          {NAV_LINKS.map((link) => (
            <button key={link.to} className="nav-link mob-nav-link" onClick={() => navigate(link.to)}>{link.label}</button>
          ))}
          {!user && (
            <div className="mob-nav-cta">
              <button className="btn btn-ghost btn-fw" onClick={() => navigate("/login")}>Login</button>
              <button className="btn btn-primary btn-fw" onClick={() => navigate("/register")}>Join</button>
            </div>
          )}
          {isAdmin && (
            <div className="mob-nav-cta">
              <button className="btn btn-primary btn-fw" style={{ backgroundColor: "#0f9f6f", borderColor: "#0f9f6f", color: "#fff" }} onClick={() => navigate("/admin")}>Edit Site</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
