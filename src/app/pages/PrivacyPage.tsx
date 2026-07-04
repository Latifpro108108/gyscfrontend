import { Label, PageShell } from "@/app/components/shared";
import { T } from "@/app/lib/theme";

export function PrivacyPage() {
  return (
    <PageShell>
      <div className="page-header">
        <Label>Legal</Label>
        <h1 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: T.navy, letterSpacing: "-1px", lineHeight: 1.08, marginBottom: 12 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 16, color: T.muted }}>Last updated: June 2025</p>
      </div>

      <div className="legal-content">
        <p>
          The Global Youth Sustainability Council ("GYSC") is a Canadian-registered international NGO. This policy explains what personal data we collect, how we use it, and your rights as a member or visitor.
        </p>

        <h2>Data we collect</h2>
        <p>
          When you register, subscribe to our newsletter, or contact us, we may collect your name, email address, country, date of birth, areas of interest, and any information you voluntarily provide in forms or correspondence.
        </p>

        <h2>How we use your data</h2>
        <p>
          GYSC uses personal data only for membership administration, communications, events, reporting, and organisational operations. We do not sell personal data. We do not use advertising SDKs or data brokers.
        </p>

        <h2>Data sharing</h2>
        <p>
          We do not sell or rent your information. We may share limited data with trusted service providers (such as email or hosting services) who assist our operations under strict confidentiality and security obligations. We may disclose information when required by law.
        </p>

        <h2>Cookies</h2>
        <p>
          We use strictly necessary cookies to keep you signed in and remember your cookie preferences. Functional and analytics cookies are only enabled with your explicit consent. You can manage preferences at any time via the cookie settings link in the footer.
        </p>

        <h2>Your rights</h2>
        <p>
          Members may access, correct, export, or delete their personal data at any time through Account Settings. Email changes require re-verification. Account deletion anonymizes your record — we replace identifying fields rather than permanently erasing audit-required records.
        </p>
        <p>
          We retain data only as long as necessary for our stated purposes. Accounts inactive for three or more years may be flagged for review.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related questions or requests, contact{" "}
          <a href="mailto:privacy@gysc.ca" style={{ color: T.teal, fontWeight: 600 }}>privacy@gysc.ca</a>.
        </p>
      </div>
    </PageShell>
  );
}
