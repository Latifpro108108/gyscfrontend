import { MapPin, UserCircle } from "lucide-react";
import { ImgBox, Label, PageShell, Reveal } from "@/app/components/shared";
import { useContent } from "@/app/context/ContentContext";
import { T } from "@/app/lib/theme";

export function FoundersPage() {
  const { founders, text } = useContent();

  return (
    <PageShell>
      <div className="page-header">
        <Label>Founding Members</Label>
        <h1 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, color: T.navy, letterSpacing: "-0.8px", lineHeight: 1.1, marginBottom: 12 }}>
          {text("founders_page_title", "The people behind GYSC")}
        </h1>
        <p style={{ fontSize: 17, color: T.body, lineHeight: 1.75, maxWidth: 560 }}>
          {text("founders_page_desc", "Nine co-founders who gathered in South Korea, authored a landmark policy document, and built the Council to carry it forward.")}
        </p>
      </div>

      <div className="founders-grid">
        {founders.map((f, i) => (
          <Reveal key={f._id} delay={i * 55}>
            <div className="founder-card">
              {f.imageUrl ? (
                <img src={f.imageUrl} alt={f.name} style={{ width: "100%", height: 250, objectFit: "cover", display: "block" }} />
              ) : (
                <ImgBox label="[Image: Founder photo]" height={250} radius={0} />
              )}
              <div style={{ padding: "26px 28px 32px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: T.navy, marginBottom: 4 }}>{f.name}</h3>
                <p style={{ fontSize: 13, fontWeight: 600, color: T.teal, letterSpacing: "0.2px", marginBottom: 10 }}>{f.role}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
                  <MapPin size={13} color={T.muted} />
                  <span style={{ fontSize: 13, color: T.muted }}>{f.country}</span>
                </div>
                <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 18, flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: T.muted, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 10 }}>A message</p>
                  <p style={{ fontSize: 14.5, color: T.body, lineHeight: 1.78, fontStyle: "italic" }}>"{f.message}"</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
