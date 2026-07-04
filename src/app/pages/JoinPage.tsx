import { ArrowRight } from "lucide-react";
import { Label, PageShell } from "@/app/components/shared";
import { useSiteNavigation } from "@/app/lib/navigation";
import { T } from "@/app/lib/theme";

export function JoinPage() {
  const { goTo } = useSiteNavigation();
  return (
    <PageShell>
      <div className="page-header">
        <Label>Get Involved</Label>
        <h1 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, color: T.navy, letterSpacing: "-0.8px", lineHeight: 1.1, marginBottom: 12 }}>
          Join the Global Youth Sustainability Council
        </h1>
        <p style={{ fontSize: 17, color: T.body, lineHeight: 1.75, maxWidth: 580 }}>
          Become part of a growing network of youth delegates shaping policy on sustainability, education, and institutional reform — with members from countries around the world.
        </p>
      </div>

      <div className="cta-panel">
        <h2 style={{ fontSize: 24, fontWeight: 800, color: T.navy, marginBottom: 12 }}>Membership applications opening soon</h2>
        <p style={{ fontSize: 16, color: T.body, lineHeight: 1.8, marginBottom: 28 }}>
          We are preparing our membership portal for youth delegates, national council leads, and policy contributors. Leave your details and we will notify you when applications open.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <input type="text" placeholder="Full name" style={{ height: 46, padding: "0 16px" }} />
          <input type="email" placeholder="Email address" style={{ height: 46, padding: "0 16px" }} />
          <input type="text" placeholder="Country" style={{ height: 46, padding: "0 16px" }} />
        </div>
        <button className="btn btn-teal btn-fw" onClick={() => goTo("/register")}>
          Register as a member <ArrowRight size={16} />
        </button>
        <p style={{ fontSize: 14, color: T.muted, marginTop: 20, textAlign: "center" }}>
          Already registered?{" "}
          <button className="teal-link" onClick={() => goTo("/login")}>Sign in here</button>
        </p>
      </div>
    </PageShell>
  );
}
