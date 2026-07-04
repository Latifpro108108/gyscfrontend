import { Label, PageShell } from "@/app/components/shared";
import { T } from "@/app/lib/theme";

export function TermsPage() {
  return (
    <PageShell>
      <div className="page-header">
        <Label>Legal</Label>
        <h1 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: T.navy, letterSpacing: "-1px", lineHeight: 1.08, marginBottom: 12 }}>
          Terms of Use
        </h1>
        <p style={{ fontSize: 16, color: T.muted }}>Last updated: June 2025</p>
      </div>

      <div className="legal-content">
        <p>
          By accessing and using the GYSC website, you agree to these Terms of Use. If you do not agree, please do not use this site.
        </p>
        <h2>Use of content</h2>
        <p>
          Materials on this website, including text, graphics, logos, and publications, are owned by or licensed to GYSC unless otherwise stated. You may not reproduce or distribute content without prior written permission.
        </p>
        <h2>Programme participation</h2>
        <p>
          Applications to GYSC programmes are subject to separate eligibility criteria and agreements. Submission of an inquiry or interest form does not guarantee membership or partnership approval.
        </p>
        <h2>Disclaimer</h2>
        <p>
          GYSC operates in alignment with the UN Sustainable Development Goals framework but is an independent organisation and does not represent the United Nations or any government entity.
        </p>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of Canada, consistent with GYSC's registration as a Canadian non-profit organisation.
        </p>
      </div>
    </PageShell>
  );
}
