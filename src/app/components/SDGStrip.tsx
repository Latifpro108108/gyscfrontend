import React from "react";
import { ALL_SDGS } from "@/app/lib/theme";

const FEATURED = [4, 10, 13, 16, 17];

export function SDGStrip() {
  const sdgs = FEATURED.map((n) => ALL_SDGS.find((s) => s.n === n)!);

  return (
    <section id="sdg" className="section-tight sdg-strip">
      <div className="container">
        <p className="sdg-strip-label">UN Sustainable Development Goals</p>
        <h2 className="sdg-strip-title">The goals we advance through youth policy</h2>
        <div className="sdg-strip-grid">
          {sdgs.map((sdg) => (
            <div key={sdg.n} className="sdg-strip-item" style={{ "--sdg-color": sdg.color } as React.CSSProperties}>
              <span className="sdg-strip-num">{sdg.n}</span>
              <span className="sdg-strip-name">{sdg.label}</span>
            </div>
          ))}
        </div>
        <p className="sdg-strip-note">GYSC operates in alignment with — not on behalf of — the United Nations.</p>
      </div>
    </section>
  );
}
