import { Outlet, useLocation } from "react-router";
import { ScrollToHash } from "@/app/components/ScrollToHash";
import { CookieConsent } from "@/app/components/CookieConsent";
import { Footer } from "@/app/components/layout/Footer";
import { NavBar } from "@/app/components/layout/NavBar";
import { T } from "@/app/lib/theme";

export function Layout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="site-shell" style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: T.navy }}>
      <ScrollToHash />
      {!isAdmin && <NavBar />}
      <Outlet />
      {!isAdmin && <Footer />}
      {!isAdmin && <CookieConsent />}
    </div>
  );
}
