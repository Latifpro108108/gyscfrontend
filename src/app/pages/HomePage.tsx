import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ArrowUpRight, Globe, Lock, UserCircle, Users,
} from "lucide-react";
import { MissionPulse } from "@/app/components/MissionPulse";
import { NewsletterSection } from "@/app/components/NewsletterSection";
import { SDGWheel } from "@/app/components/SDGWheel";
import { Label, Reveal, SectionIntro } from "@/app/components/shared";
import { useContent } from "@/app/context/ContentContext";
import { useSiteNavigation } from "@/app/lib/navigation";
import { T } from "@/app/lib/theme";



export function HomePage() {
  const { goTo } = useSiteNavigation();
  const { text, image, founders } = useContent();
  const [amount, setAmount] = useState("$25");
  const [freq, setFreq] = useState<"one-time" | "monthly">("one-time");
  const [custom, setCustom] = useState("");
  const [donating, setDonating] = useState(false);
  const [donated, setDonated] = useState(false);

  const heroBg = image("hero_background");
  const aboutImg = image("about_image");

  function handleDonate() {
    setDonating(true);
    setTimeout(() => { setDonating(false); setDonated(true); }, 1600);
  }

  const governance = [
    { title: "General Assembly", body: "Supreme governing body of three elected representatives per National Office" },
    { title: "National Councils", body: "Primary engines for national policy, recruitment, and local outreach" },
    { title: "Local Offices", body: "Grassroots implementation of policy and community projects" },
    { title: "Leadership Team", body: "Cross-regional strategy and international representation" },
  ];

  const govRef = useRef<HTMLElement>(null);
  const pillarsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const govEl = govRef.current;
    if (!govEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const leftCol = govEl.querySelector(".gov-left") as HTMLElement;
          const line = govEl.querySelector(".gov-timeline-line") as HTMLElement;
          const rows = govEl.querySelectorAll(".gov-tier-row");

          if (leftCol) {
            leftCol.style.willChange = "transform, opacity";
            setTimeout(() => {
              leftCol.classList.remove("hidden-anim");
              setTimeout(() => {
                leftCol.style.willChange = "auto";
                leftCol.classList.remove("animating");
              }, 500);
            }, 0);
          }

          if (line) {
            line.style.willChange = "transform";
            setTimeout(() => {
              line.classList.remove("hidden-anim");
              setTimeout(() => {
                line.style.willChange = "auto";
                line.classList.remove("animating");
              }, 800);
            }, 0);
          }

          rows.forEach((rowEl, i) => {
            const row = rowEl as HTMLElement;
            row.style.willChange = "transform, opacity";
            const delay = 800 + i * 120;
            setTimeout(() => {
              row.classList.remove("hidden-anim");
              setTimeout(() => {
                row.style.willChange = "auto";
                row.classList.remove("animating");
              }, 400);
            }, delay);
          });

          observer.unobserve(govEl);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(govEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pillarsEl = pillarsRef.current;
    if (!pillarsEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const header = pillarsEl.querySelector(".pillars-header") as HTMLElement;
          const policy = pillarsEl.querySelector(".policy-card") as HTMLElement;
          const leadership = pillarsEl.querySelector(".leadership-card") as HTMLElement;
          const sustainability = pillarsEl.querySelector(".sustainability-card") as HTMLElement;

          if (header) {
            header.style.willChange = "transform, opacity";
            setTimeout(() => {
              header.classList.remove("hidden-anim");
              setTimeout(() => {
                header.style.willChange = "auto";
                header.classList.remove("animating");
              }, 400);
            }, 0);
          }

          if (policy) {
            policy.style.willChange = "transform, opacity";
            setTimeout(() => {
              policy.classList.remove("hidden-anim");
              setTimeout(() => {
                policy.style.willChange = "auto";
                policy.classList.remove("animating");
              }, 500);
            }, 100);
          }

          if (leadership) {
            leadership.style.willChange = "transform, opacity";
            setTimeout(() => {
              leadership.classList.remove("hidden-anim");
              setTimeout(() => {
                leadership.style.willChange = "auto";
                leadership.classList.remove("animating");
              }, 500);
            }, 200);
          }

          if (sustainability) {
            sustainability.style.willChange = "transform, opacity";
            setTimeout(() => {
              sustainability.classList.remove("hidden-anim");
              setTimeout(() => {
                sustainability.style.willChange = "auto";
                sustainability.classList.remove("animating");
              }, 500);
            }, 350);
          }

          observer.unobserve(pillarsEl);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(pillarsEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-main">
      {/* --- Ambient Background Layer --- */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <svg className="ambient-particle" style={{ top: '15%', left: '5%', animation: 'floatParticle 20s infinite ease-in-out' }} width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" />
          <path d="M10 20h20M20 10v20" />
        </svg>
        <svg className="ambient-particle" style={{ top: '65%', right: '8%', animation: 'spinSlow 30s infinite linear' }} width="40" height="40" viewBox="0 0 40 40">
          <rect x="8" y="8" width="24" height="24" rx="4" />
        </svg>
        <svg className="ambient-particle" style={{ top: '40%', right: '4%', animation: 'floatParticle 25s infinite ease-in-out reverse' }} width="30" height="30" viewBox="0 0 30 30">
          <path d="M15 5v20M5 15h20" />
        </svg>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="hero-overlay" />
        <div className="hero-shapes" aria-hidden>
          <div className="hero-glow" />
          <div className="float-orb float-orb-a" />
          <div className="float-orb float-orb-b" />
          <div className="float-orb float-orb-c" />
          <div className="float-dot float-dot-a" />
          <div className="float-dot float-dot-b" />
          <div className="hero-accent-bar" />
        </div>

        <div className="container hero-content">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-eyebrow anim-slide-right">
                <span className="eyebrow-bar" />
                <span>{text("hero_eyebrow", "Global Youth Sustainability Council")}</span>
              </div>

              <h1 className="hero-title">
                <span className="hero-line anim-fade-up d1">
                  <span style={{color: '#0f9f6f'}}>{text("hero_line1", "Young people.").split(' ')[0]}</span> {text("hero_line1", "Young people.").split(' ').slice(1).join(' ')}
                </span>
                <span className="hero-line anim-fade-up d2">
                  <span className="hero-highlight">
                    <span style={{color: '#38bdf8'}}>{text("hero_line2", "Real policy.").split(' ')[0]}</span> {text("hero_line2", "Real policy.").split(' ').slice(1).join(' ')}
                    <span className="hero-underline anim-line-grow" />
                  </span>
                </span>
                <span className="hero-line anim-fade-up d3">
                  <span style={{color: '#fbbf24'}}>{text("hero_line3", "Global impact.").split(' ')[0]}</span> {text("hero_line3", "Global impact.").split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="hero-desc anim-fade-up d4" dangerouslySetInnerHTML={{ 
                __html: text("hero_description", "GYSC unites delegates from every continent — turning youth conviction into policies that reach the highest levels of global governance.")
                  .replace("youth conviction", "<span style='color: #0f9f6f; font-weight: 600'>youth conviction</span>")
                  .replace("global governance", "<span style='color: #0f9f6f; font-weight: 600'>global governance</span>")
              }} />

              <div className="hero-btns anim-fade-up d5">
                <button className="btn btn-white" onClick={() => goTo("/register")}>Join GYSC <ArrowRight size={16} /></button>
                <button className="btn btn-outline-white" onClick={() => goTo("/partner")}>Partner With Us</button>
              </div>
            </div>

            <div className="hero-visual anim-fade-up d4">
              <img src={heroBg} alt="" className="hero-side-image" />
            </div>
          </div>
        </div>
      </section>

      <MissionPulse />

      {/* ── OUR STORY ── */}
      <section id="about" className="section story-section">
        <div className="story-bg" aria-hidden />
        <div className="container">
          <div className="story-layout">
            <Reveal cls="rev-l">
              <div className="story-visual">
                <div className="story-image-frame">
                  <img src={aboutImg} alt="GYSC delegates at a global youth summit" className="story-image" />
                  <div className="story-image-overlay" aria-hidden />
                </div>
                <div className="story-float-card story-float-card--badge">
                  <span className="story-float-pulse" aria-hidden />
                  <span className="story-float-label">Canadian NGO · Global network</span>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="story-content">
                <Label>Our Story</Label>
                <blockquote className="story-quote">
                  <span className="story-quote-glyph" aria-hidden>"</span>
                  {text("about_quote", "One shared conviction — youth deserve a permanent seat at the global policy table.")}
                </blockquote>
                <div className="story-paragraphs">
                  {(["about_p1", "about_p2", "about_p3"] as const).map((key, i) => (
                    <p key={key} className="story-para">
                      <span className="story-para-index">{String(i + 1).padStart(2, "0")}</span>
                      {text(key, "")}
                    </p>
                  ))}
                </div>
                <button className="teal-link" onClick={() => goTo("/founders")}>
                  Meet the founders <ArrowUpRight size={15} />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section id="newsletter" className="section section-white">
        <div className="container">
          <Reveal>
            <SectionIntro label="Publications" title={text("newsletter_title", "GYSC Newsletter")} description={text("newsletter_desc", "")} />
          </Reveal>
          <NewsletterSection />
        </div>
      </section>

      {/* ── GOVERNANCE ── */}
      <section id="governance" ref={govRef} className="governance-section">
        <div className="container">
          <div className="governance-grid">
            {/* Left Column (40%) */}
            <div className="gov-left animating hidden-anim">
              <div className="gov-left-label">GOVERNANCE</div>
              <div className="gov-left-bar-container">
                <div className="gov-left-bar" />
                <h2 className="gov-left-heading">{text("gov_title", "How GYSC is Structured")}</h2>
              </div>
              <p className="gov-left-body">
                {text("gov_desc", "A four-tier structure designed for democratic participation at every level — from community projects to international policy.")}
              </p>
              <hr className="gov-left-hr" />
              <div className="gov-left-stat">{text("gov_stat", "4 levels of governance")}</div>
            </div>

            {/* Right Column (60%) */}
            <div className="gov-timeline-container">
              <div className="gov-timeline-line animating hidden-anim" />
              <div className="gov-timeline">
                {governance.map(({ title, body }) => (
                  <div key={title} className="gov-tier-row animating hidden-anim">
                    <div className="gov-circle" />
                    <h3 className="gov-tier-name">{title}</h3>
                    <p className="gov-tier-desc">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section id="pillars" ref={pillarsRef} className="pillars-section">
        <div className="container">
          <div className="pillars-header animating hidden-anim pillars-header-container">
            <div className="pillars-label">OUR WORK</div>
            <h2 className="pillars-heading">{text("pillars_title", "What We Stand For")}</h2>
            <p className="pillars-subtext">{text("pillars_desc", "Three pillars guiding youth-led policy, leadership, and sustainable action worldwide.")}</p>
          </div>

          <div className="pillars-layout">
            {/* Policy card */}
            <article className="pillar-card policy-card animating hidden-anim">
              <div className="pillar-accent-bar" />
              <h3 className="pillar-name">{text("pillar_1_title", "Policy")}</h3>
              <p className="pillar-body">{text("pillar_1_body", "We advocate for youth-led policy recommendations in international frameworks and governmental processes.")}</p>
            </article>

            {/* Leadership card */}
            <article className="pillar-card leadership-card animating hidden-anim">
              <div className="pillar-accent-bar" />
              <h3 className="pillar-name">{text("pillar_2_title", "Leadership")}</h3>
              <p className="pillar-body">{text("pillar_2_body", "We build awareness, create spaces for engagement, and empower young people to raise their voices at local, national, and international levels.")}</p>
            </article>

            {/* Sustainability card */}
            <article className="pillar-card sustainability-card animating hidden-anim">
              <div className="pillar-accent-bar" />
              <h3 className="pillar-name">{text("pillar_3_title", "Sustainability")}</h3>
              <p className="pillar-body">{text("pillar_3_body", "All our work aligns with the UN SDGs — connecting youth action to the global frameworks shaping our future.")}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── SDG ── */}
      <section id="sdg" className="section-tight section-sdg">
        <div className="sdg-grid-bg" aria-hidden />
        <div className="container sdg-inner">
          <Reveal>
            <div className="section-header-row">
              <div>
                <Label light>UN Sustainable Development Goals</Label>
                <h2 className="sdg-title">Every goal. Every action.</h2>
                <p className="sdg-hint">Scroll to spin the wheel · hover any tile to explore</p>
              </div>
            </div>
          </Reveal>
          <SDGWheel />
          <p className="sdg-disclaimer">GYSC operates in alignment with — not on behalf of — the United Nations.</p>
        </div>
      </section>

      {/* ── DONATE ── */}
      <section id="donate" className="section section-surface">
        <div className="container">
          <div className="donate-grid">
            <Reveal cls="rev-l">
              <Label>Support Our Work</Label>
              <h2 className="section-title">{text("donate_title", "")}</h2>
              <p className="body-text mb-lg">{text("donate_description", "")}</p>
              <div className="trust-list">
                {[{ Icon: Lock, text: "Secure payment processing" }, { Icon: Globe, text: "Registered NGO, Canada" }, { Icon: Users, text: "100% funds youth programs directly" }].map(({ Icon, text: t }) => (
                  <div key={t} className="trust-item">
                    <div className="trust-icon"><Icon size={16} color={T.teal} /></div>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <div className="donate-panel">
                <p className="donate-label">Make a Contribution</p>
                <p className="donate-heading">Choose your impact</p>
                <div className="freq-toggle">
                  {(["one-time", "monthly"] as const).map((f) => (
                    <button key={f} className={`freq-btn ${freq === f ? "on" : "off"}`} onClick={() => setFreq(f)}>{f === "one-time" ? "One-time" : "Monthly"}</button>
                  ))}
                </div>
                <div className="amount-row">
                  {["$10", "$25", "$50", "$100", "Custom"].map((a) => (
                    <button key={a} className={`amount-chip ${amount === a ? "sel" : "unsel"}`} onClick={() => setAmount(a)}>{a}</button>
                  ))}
                </div>
                {amount === "Custom" && (
                  <div className="custom-amount">
                    <span>$</span>
                    <input type="number" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Enter amount" />
                  </div>
                )}
                <button className="btn btn-teal btn-fw" onClick={handleDonate} style={{ height: 50 }}>{donating ? "Processing..." : "Donate Now"}</button>
                <p className={`donate-note${donated ? " success" : ""}`}>
                  {donated ? "Thank you — payment processing coming soon." : "You will be redirected to our secure payment processor."}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOUNDERS STRIP ── */}
      <section id="founders" className="section section-white">
        <div className="container">
          <Reveal>
            <div className="section-header-row">
              <div>
                <Label>Our People</Label>
                <h2 className="section-title">{text("founders_strip_title", "Meet the founders")}</h2>
              </div>
              <button className="btn btn-ghost" onClick={() => goTo("/founders")}>See all founders <ArrowRight size={16} /></button>
            </div>
          </Reveal>
          <div className="founders-strip-grid">
            {founders.map((f, i) => (
              <Reveal key={f._id} delay={i * 50}>
                <div className="founder-strip-item">
                  <div className="founder-avatar ring-pulse">
                    {f.imageUrl ? <img src={f.imageUrl} alt={f.name} /> : <UserCircle size={36} color={T.border} />}
                  </div>
                  <span className="founder-name">{f.name}</span>
                  <span className="founder-country">{f.country}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
