import { ArrowRight } from "lucide-react";
import { Label, PageShell } from "@/app/components/shared";
import { T } from "@/app/lib/theme";

export function PartnerPage() {
  return (
    <PageShell>
      <div className="page-header">
        <Label>Collaborate</Label>
        <h1 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, color: T.navy, letterSpacing: "-0.8px", lineHeight: 1.1, marginBottom: 12 }}>
          Partner with GYSC
        </h1>
        <p style={{ fontSize: 17, color: T.body, lineHeight: 1.75, maxWidth: 580 }}>
          Universities, NGOs, governments, and institutions can collaborate with GYSC to amplify youth voices in global sustainability policy.
        </p>
      </div>

      <div className="cta-panel">
        <h2 style={{ fontSize: 24, fontWeight: 800, color: T.navy, marginBottom: 12 }}>Start a partnership conversation</h2>
        <p style={{ fontSize: 16, color: T.body, lineHeight: 1.8, marginBottom: 28 }}>
          Tell us about your organisation and how you would like to work with GYSC. Our partnerships team will follow up with next steps.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <input type="text" placeholder="Organisation name" style={{ height: 46, padding: "0 16px" }} />
          <input type="email" placeholder="Contact email" style={{ height: 46, padding: "0 16px" }} />
          <textarea placeholder="How would you like to partner with GYSC?" rows={4} style={{ padding: "14px 16px", resize: "vertical" }} />
        </div>
        <button className="btn btn-primary btn-fw">
          Submit inquiry <ArrowRight size={16} />
        </button>
      </div>
    </PageShell>
  );
}
