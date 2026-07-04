import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "@/app/components/layout/Layout";
import { AdminDashboard } from "@/app/pages/AdminDashboard";
import { AccountSettingsPage } from "@/app/pages/AccountSettingsPage";
import { AdminLoginPage } from "@/app/pages/AdminLoginPage";
import { FoundersPage } from "@/app/pages/FoundersPage";
import { HomePage } from "@/app/pages/HomePage";
import { JoinPage } from "@/app/pages/JoinPage";
import { LoginPage } from "@/app/pages/LoginPage";
import { NewsletterReaderPage } from "@/app/pages/NewsletterReaderPage";
import { PartnerPage } from "@/app/pages/PartnerPage";
import { PrivacyPage } from "@/app/pages/PrivacyPage";
import { RegisterPage } from "@/app/pages/RegisterPage";
import { TermsPage } from "@/app/pages/TermsPage";
import { Label, PageShell } from "@/app/components/shared";
import { T } from "@/app/lib/theme";
import { useSiteNavigation } from "@/app/lib/navigation";

function NotFoundPage() {
  const { goTo } = useSiteNavigation();
  return (
    <PageShell>
      <div className="page-header">
        <Label>404</Label>
        <h1 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: T.navy, letterSpacing: "-1px", lineHeight: 1.08, marginBottom: 20 }}>Page not found</h1>
        <p style={{ fontSize: 18, color: T.body, lineHeight: 1.8, maxWidth: 520, marginBottom: 28 }}>The page you are looking for does not exist or may have moved.</p>
        <button className="btn btn-primary" onClick={() => goTo("/")}>Back to home</button>
      </div>
    </PageShell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="founders" element={<FoundersPage />} />
          <Route path="join" element={<JoinPage />} />
          <Route path="newsletters/:id" element={<NewsletterReaderPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="account" element={<AccountSettingsPage />} />
          <Route path="account/settings" element={<AccountSettingsPage />} />
          <Route path="partner" element={<PartnerPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="privacy-policy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
