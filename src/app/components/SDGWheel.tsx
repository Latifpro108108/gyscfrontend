import { useEffect, useRef, useState } from "react";
import { ALL_SDGS } from "@/app/lib/theme";

export function SDGWheel() {
  const rotRef = useRef(0);
  const targetRef = useRef(0);
  const lastScrollY = useRef(0);
  const rafRef = useRef<number>();
  const [rot, setRot] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const TILE = 54;
  const RADIUS = 152;

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY.current;
      targetRef.current += delta * 0.07;
      lastScrollY.current = window.scrollY;
    };

    const tick = () => {
      rotRef.current += (targetRef.current - rotRef.current) * 0.08;
      const normDeg = ((rotRef.current % 360) + 360) % 360;
      const topAngle = (360 - normDeg + 270) % 360;
      const idx = Math.round((topAngle / 360) * 17) % 17;
      setActiveIdx(idx);
      setRot(rotRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const displayIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;
  const active = ALL_SDGS[displayIdx];
  const SIZE = 360;
  const CENTER = SIZE / 2;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: "100%" }}>
      <svg width={SIZE} height={SIZE} style={{ overflow: "visible", flexShrink: 0, maxWidth: "100%" }}>
        <circle cx={CENTER} cy={CENTER} r={RADIUS + TILE / 2 + 14} stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS - TILE / 2 - 14} stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />

        <g transform={`rotate(${rot}, ${CENTER}, ${CENTER})`}>
          {ALL_SDGS.map((sdg, i) => {
            const angleDeg = (i / 17) * 360 - 90;
            const rad = (angleDeg * Math.PI) / 180;
            const cx = CENTER + RADIUS * Math.cos(rad);
            const cy = CENTER + RADIUS * Math.sin(rad);
            const isActive = i === displayIdx;
            const tx = cx - TILE / 2;
            const ty = cy - TILE / 2;

            return (
              <g
                key={sdg.n}
                transform={`translate(${tx + TILE / 2},${ty + TILE / 2}) rotate(${-rot}) translate(${-TILE / 2},${-TILE / 2})`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ cursor: "pointer" }}
              >
                <rect x={0} y={0} width={TILE} height={TILE} rx={10} ry={10} fill={sdg.color} opacity={isActive ? 1 : 0.82} style={{ transition: "opacity .3s" }} />
                {isActive && (
                  <rect x={-3} y={-3} width={TILE + 6} height={TILE + 6} rx={13} ry={13} fill="none" stroke="#fff" strokeWidth="2.5" opacity={0.9} />
                )}
                <text x={TILE / 2} y={TILE / 2} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={isActive ? 17 : 15} fontWeight={800} fontFamily="Inter,sans-serif">
                  {sdg.n}
                </text>
              </g>
            );
          })}
        </g>

        <circle cx={CENTER} cy={CENTER} r={82} fill={active.color} opacity={0.13} />
        <circle cx={CENTER} cy={CENTER} r={72} fill="rgba(255,255,255,0.04)" />
        <text x={CENTER} y={CENTER - 18} textAnchor="middle" fill="#fff" fontSize={28} fontWeight={900} fontFamily="Inter,sans-serif">
          {active.n}
        </text>
        <foreignObject x={CENTER - 62} y={CENTER - 4} width={124} height={52}>
          <div style={{ color: "#fff", fontSize: 9.5, fontWeight: 600, textAlign: "center", lineHeight: 1.4 }}>{active.label}</div>
        </foreignObject>
      </svg>
    </div>
  );
}
