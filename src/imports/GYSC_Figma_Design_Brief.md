# GYSC Website — Figma Design Brief
**Global Youth Sustainability Council**
Version 1.0 | For Founder Review

---

## 1. Project Overview

Design a **multi-page website** for the Global Youth Sustainability Council (GYSC), a Canadian-registered international NGO whose policy framework — the Eunpyeong Declaration — was authored by youth delegates in Seoul. The site must read as **serious, institutional, and youth-powered** simultaneously. It should feel at home alongside UNFCCC, UN Youth, and Commonwealth Youth Programme digital properties — not a student club site.

**Primary audience:** Youth delegates (18–30), institutional partners, universities, national governments, and potential donors.

**The site's single job:** Establish GYSC's legitimacy, attract new members and partners, and convert interest into action (apply / partner / donate).

---

## 2. Design System — Tokens

### 2.1 Color Palette

All colors derived from brand assets (logo + brand board).

| Token | Hex | Role |
|---|---|---|
| `--color-navy` | `#1B365D` | Primary text, headings, nav, footer |
| `--color-blue` | `#4287F5` | Interactive elements, links, CTAs |
| `--color-blue-mid` | `#3A6EA5` | Secondary buttons, card borders |
| `--color-teal` | `#0f9f6f` | Accent, active states, highlight |
| `--color-green` | `#34c759` | Success states, SDG accent strip |
| `--color-green-dark` | `#15803d` | Hover on green elements |
| `--color-white` | `#FFFFFF` | Backgrounds, reversed text |
| `--color-surface` | `#F4F7FC` | Section backgrounds (light wash) |
| `--color-border` | `#DDE4EE` | Dividers, card outlines |
| `--color-text-body` | `#2D3748` | Body copy |
| `--color-text-muted` | `#64748B` | Captions, meta labels |

> **Rule:** No purple, no gradients unless referencing the logo's green-to-blue globe gradient. No black backgrounds.

### 2.2 Typography

| Token | Family | Weight | Size | Use |
|---|---|---|---|---|
| `--type-display` | Inter | 800 | 56–72px | Hero headline only |
| `--type-h1` | Inter | 700 | 40px | Page titles |
| `--type-h2` | Inter | 700 | 28px | Section headings |
| `--type-h3` | Inter | 600 | 20px | Card titles, sub-sections |
| `--type-body-lg` | Inter | 400 | 18px | Intro paragraphs |
| `--type-body` | Inter | 400 | 16px | Default body text |
| `--type-caption` | Inter | 500 | 13px | Labels, tags, metadata |
| `--type-button` | Inter | 600 | 15px | All buttons |

**Line heights:** Display 1.1 · Headings 1.25 · Body 1.65 · Captions 1.4

**Letter spacing:** Display −0.5px · Headings −0.2px · Body 0px · Captions +0.4px · Buttons +0.3px

### 2.3 Spacing Scale (8px base grid)

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  24px
--space-6:  32px
--space-7:  48px
--space-8:  64px
--space-9:  96px
--space-10: 128px
```

### 2.4 Border Radius

```
--radius-sm:  4px   → tags, chips, inputs
--radius-md:  8px   → cards, buttons
--radius-lg:  16px  → modals, feature panels
```

> Only these three values. No pill shapes. No circles except avatar images.

### 2.5 Shadows

```
--shadow-card:   0 1px 4px rgba(27,54,93,0.08), 0 4px 16px rgba(27,54,93,0.06)
--shadow-raised: 0 4px 8px rgba(27,54,93,0.12), 0 8px 24px rgba(27,54,93,0.08)
--shadow-none:   none
```

### 2.6 Animation

```
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)
--ease-enter:    cubic-bezier(0, 0, 0.2, 1)
--ease-exit:     cubic-bezier(0.4, 0, 1, 1)

--duration-fast:   150ms
--duration-base:   250ms
--duration-slow:   400ms
```

- Hover lifts: max `translateY(-3px)` on cards
- No glow effects, no sparkles, no rotation on hover
- Scroll reveals: `opacity 0→1` + `translateY(16px→0)`, staggered 80ms per item

---

## 3. Layout Rules

- **Max content width:** 1200px, centered
- **Page gutters:** 80px desktop · 24px mobile
- **Column grid:** 12-column with 24px gutters
- **Section vertical padding:** `--space-9` (96px) top and bottom
- All section headings are left-aligned (not centered), with a 3px `--color-teal` left border accent rule, 32px tall, placed inline left of the heading text
- Cards on the same row must be identical height (use CSS Grid with `align-items: stretch`)

---

## 4. Global Components

### Navigation Bar
- Height: 72px
- Background: `--color-white`, bottom border `--color-border` 1px
- Left: GYSC logo (use exact provided logo SVG/PNG)
- Right: Nav links → About · Governance · Pillars · Founders · Donate + primary CTA button "Join GYSC" (`--color-blue` fill, white text, `--radius-md`)
- Active link: `--color-teal` underline 2px
- Sticky on scroll; no color change on scroll — only add `--shadow-card` when scrolled past hero

### Footer
- Background: `--color-navy`
- 4-column layout: Logo + tagline · Quick links · Social (only verified/functional accounts — no placeholder icons) · Legal
- Text: white at 80% opacity for body, 100% for headings
- Bottom strip: thin `--color-teal` line, then copyright line

### Buttons

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| Primary | `--color-blue` | white | none | `darken 8%` + `translateY(-2px)` |
| Secondary | transparent | `--color-navy` | 1.5px `--color-navy` | `--color-surface` bg |
| Teal accent | `--color-teal` | white | none | `--color-green-dark` |
| Ghost | transparent | `--color-blue` | none | `--color-surface` bg |

All buttons: height 44px · padding `12px 24px` · `--radius-md` · `--type-button` · `--ease-standard` `--duration-base` transition

**Loading state:** Spinner replaces button text, button width locked — no layout shift.

---

## 5. Page 1 — Homepage

### Section 1: Hero

**Layout:** Full-width · height 92vh minimum · split into 60% content / 40% visual

**Left column (content):**
- Eyebrow label (tag chip): `EUNPYEONG DECLARATION · SEOUL, SOUTH KOREA` — `--color-teal` text on `rgba(15,159,111,0.1)` background · `--radius-sm` · `--type-caption`
- Headline (Inter 800, 64px, `--color-navy`):
  ```
  A global community
  of young people shaping
  a sustainable future.
  ```
- Body (Inter 400, 18px, `--color-text-body`, max-width 520px):
  ```
  The Global Youth Sustainability Council brings together delegates from
  every continent to turn youth-led policy into real global impact.
  ```
- Button row (gap 16px):
  - `[Join GYSC]` → Primary button
  - `[Partner With Us]` → Secondary button
  - `[About GYSC]` → Ghost button

**Right column (visual):**
- Placeholder: A 480×520px image frame, `--color-surface` background, dashed `--color-border` border, label "Hero Image — e.g. delegate group photo, Seoul conference"
- Behind image frame: A subtle geometric arc shape in `--color-blue` at 6% opacity — echoing the globe arc in the logo. Not a gradient blob.

**Below hero fold — Statistics Strip:**
- Background: `--color-navy`
- 4 stats in a row, separated by 1px `--color-blue-mid` vertical dividers:
  - `9` · Founding Members
  - `95` · Page Policy Framework
  - `_` · Countries Represented *(TBC — placeholder)*
  - `1` · Official Declaration
- Stat number: Inter 700 48px white · Label: Inter 400 14px `--color-text-muted` white 70%

---

### Section 2: About GYSC

**Layout:** 2-column, 50/50

**Left:**
- Section label: `WHO WE ARE` (teal accent rule)
- H2: `Empowering youth in global policy`
- Body paragraphs:
  ```
  The GYSC is a global initiative focused on empowering democratic participation
  and impact around sustainable development for young people on a global stage —
  through policy, leadership opportunities, and community initiatives.

  We form policy recommendations and disseminate them across the globe.
  Our vision is to enable young people's participation and influence in policy,
  leadership, and public life.
  ```
- Link: `Read the Eunpyeong Declaration →` (teal, underlined on hover)

**Right:**
- Placeholder image: 540×400px, labeled "About image — e.g. conference hall or delegates in session"

---

### Section 3: Governance

**Background:** `--color-surface`

**Heading:** `How We Are Structured`

**Layout:** 4 cards in a row (on desktop), 2×2 on tablet, 1 column on mobile

Each card (`--radius-md`, `--shadow-card`, white bg, 32px padding):

**Card 1 — General Assembly**
- Icon: A simple gavel or assembly icon (16×16, `--color-teal`)
- Title: `General Assembly`
- Body: `Our supreme governing body, comprising three elected representatives from each National Office. They drive strategic direction and oversee all formal operations.`

**Card 2 — National Councils**
- Icon: Map/flag icon
- Title: `National Councils`
- Body: `Regional hubs that act as the primary engines for our work — responsible for national policy, managing recruitment, and organizing local outreach.`

**Card 3 — Local Offices**
- Icon: Building/location icon
- Title: `Local Offices`
- Body: `Operating under National Council guidance, these local units implement policies and drive impactful community projects at the grassroots level.`

**Card 4 — Leadership Team**
- Icon: Group/people icon
- Title: `Leadership Team`
- Body: `Our elected leaders coordinate cross-regional strategy, represent GYSC in international forums, and guide the council's long-term vision.`
- Tag: `Announcements coming soon` chip (`--color-border` bg, `--type-caption`)

Hover: `translateY(-3px)` · `--shadow-raised` · `--ease-standard` `--duration-base`

---

### Section 4: Three Pillars

**Heading:** `What We Stand For`

**Layout:** 3 equal-width cards, full bleed colored left border accent

**Card 1 — Policy**
- Left border: 4px `--color-blue`
- Icon: Document/scroll icon
- Title: `Policy`
- Body: `We author, advocate for, and disseminate youth-led policy recommendations into major international frameworks and governmental processes.`

**Card 2 — Leadership**
- Left border: 4px `--color-teal`
- Icon: Compass/star icon
- Title: `Leadership`
- Body: `We create structured pathways for young people to hold real decision-making roles at local, national, and international levels of representation.`

**Card 3 — Sustainability**
- Left border: 4px `--color-green`
- Icon: Leaf/globe icon
- Title: `Sustainability`
- Body: `All our work centers on the UN Sustainable Development Goals. We connect youth action directly to the global frameworks that shape our collective future.`

---

### Section 5: SDG Alignment

**Background:** `--color-navy`

**Heading (white):** `The SDGs We Champion`

**Sub-label (muted white):** `Selected from the UN's 17 Sustainable Development Goals based on the Eunpyeong Declaration's core policy focus areas.`

**Layout:** Horizontal scrollable row of SDG tiles (official colored tiles, square, 80×80px)

**Include ONLY these SDGs** (directly relevant to GYSC's mission):
- SDG 4 — Quality Education
- SDG 10 — Reduced Inequalities
- SDG 13 — Climate Action
- SDG 16 — Peace, Justice and Strong Institutions
- SDG 17 — Partnerships for the Goals

Each tile: official SDG color, white icon+number, label below in `--type-caption` white.

Below tiles, small disclaimer: `The GYSC acknowledges the UN SDG framework and operates in alignment with — not on behalf of — the United Nations.`

---

### Section 6: Donation

**Background:** `--color-surface`

**Layout:** 2-column — left: copy · right: donation widget panel

**Left:**
- Label: `SUPPORT OUR WORK`
- H2: `Help us put more young people in the room where decisions are made.`
- Body: `Your contribution funds delegate participation, policy research, and community initiatives across our national offices. Every amount matters.`
- Trust signals (horizontal row of icons + text):
  - 🔒 Secure payment (lock icon — not emoji — in teal)
  - Registered NGO, Canada
  - Funds youth programs directly

**Right — Donation Panel** (`--color-white`, `--shadow-raised`, `--radius-lg`, 40px padding):
- Label: `Make a Contribution`
- Amount selector chips (choose one):
  - `$10` · `$25` · `$50` · `$100` · `Custom`
  - Selected chip: `--color-blue` fill, white text · Unselected: `--color-surface` bg, `--color-navy` text
- Custom amount field (visible only when Custom selected): input with `$` prefix, `--radius-sm`
- Frequency toggle: `One-time` | `Monthly` (pill toggle, `--color-teal` active state)
- CTA button: `[Donate Now]` — teal accent variant, full width
- Microcopy below button: `You will be redirected to our secure payment processor.`

> **Note for dev:** Front-end only. No payment API wired — button shows loading spinner, then "Coming soon" inline message.

---

### Section 7: Founders Strip (Homepage teaser)

**Heading:** `Meet the Founders`

**Layout:** Horizontal row of 9 circular avatar placeholders (100px diameter each), centered, with name labels below in `--type-caption`.

Each placeholder: `--color-surface` circle, dashed `--color-border` border, person silhouette icon in center.

Name labels: `Founder Name` (to be filled)

CTA below row: `[Meet All Founders →]` — Ghost button, links to Founders page.

---

## 6. Page 2 — Founders

**Page title:** `The People Behind GYSC`

**Sub-heading:** `Nine founding members who brought the Eunpyeong Declaration to life — and built the Council to carry it forward.`

**Layout:** 3-column grid (3 rows of 3 cards)

Each Founder Card (`--radius-md`, `--shadow-card`, white bg, 32px padding):
- **Top:** Placeholder image — 280×280px, `--color-surface` bg, dashed border, label "Founder photo"
- **Name:** Inter 600 18px `--color-navy`
- **Role/Title:** Inter 500 13px `--color-teal` (e.g. "Co-Founder · Policy Lead")
- **Country flag icon** + country name in `--type-caption` `--color-text-muted`
- **Divider:** 1px `--color-border`
- **Message label:** `A MESSAGE FROM [NAME]` in `--type-caption` `--color-text-muted` uppercase tracking
- **Message body:** Inter 400 15px `--color-text-body` (italic), 4–6 lines
  > *Placeholder: "This space holds [Name]'s personal message to the world. To be filled by founder."*

Card hover: `translateY(-3px)` · `--shadow-raised`

---

## 7. Interaction States — Full Reference

| Element | Default | Hover | Active | Focus | Disabled |
|---|---|---|---|---|---|
| Primary button | `--color-blue` | darken 8% + Y−2px | darken 15% | 3px offset ring `--color-teal` | 40% opacity, no pointer |
| Card | `--shadow-card` | `--shadow-raised` + Y−3px | Y−1px | ring `--color-blue` | — |
| Input | `--color-border` 1px | border `--color-blue-mid` | border `--color-blue` | border `--color-blue` + ring | bg `--color-surface` |
| Nav link | `--color-navy` | `--color-blue` | `--color-teal` | underline `--color-teal` | — |
| Amount chip | `--color-surface` | `--color-border` border | `--color-blue` fill | ring `--color-blue` | 40% opacity |

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | < 640px | 1 column · stacked nav (hamburger) · reduced padding |
| Tablet | 640–1024px | 2 columns · condensed nav |
| Desktop | > 1024px | Full layout as specified |

---

## 9. Image Placeholder Standard

All images across all pages are placeholders during design review. Use this standard for every one:

- Background: `--color-surface` (#F4F7FC)
- Border: 1.5px dashed `--color-border`
- Border-radius: matches context (`--radius-md` for cards, `--radius-lg` for hero)
- Center label in `--type-caption` `--color-text-muted`:
  ```
  [Image: description of what goes here]
  ```
- No stock photo faces. No "Sarah Chen" names. No AI-generated placeholder portraits.

---

## 10. What to Avoid — Design Constraints

- **No purple or violet** anywhere
- **No gradient blobs** in backgrounds
- **No sparkle, star, or emoji** in any heading
- **No glowing ring hover effects**
- **No oversized display text paired with ultra-thin body** (weight contrast max: Bold + Regular)
- **No numbered step markers (01, 02, 03)** unless content is genuinely sequential
- **No fake testimonials or placeholder quotes** attributed to named individuals
- **No generic AI face stock images** in any frame
- **No non-functional social media icons** in footer — only include platforms GYSC actively uses
- **No em-dash overuse** in copy (use commas or restructure)
- **No vague CTAs:** "Explore," "Discover," "Transform" — use specific action verbs
- **Consistent border-radius** — only `--radius-sm`, `--radius-md`, `--radius-lg`
- **Consistent icon sizing** — 16px inline, 24px standalone, 32px feature icons. Never mix within same component

---

## 11. Figma Setup Instructions

1. Create a **Design System page** first — define all color styles, text styles, and effect styles from Section 2 before building any frames.
2. Use **auto-layout** on all cards and sections.
3. Define **components** for: NavBar, Footer, Button (all variants), Card (Governance, Pillar, Founder), Stat item, SDG tile, Amount chip, Founder card.
4. Create frames for: **Homepage**, **Founders Page**. (Additional pages — Join, Partner — are TBD.)
5. All placeholder image frames must use the standard from Section 9.
6. Prototype: Connect "Join GYSC" → show modal or placeholder page. Connect "Meet All Founders →" → Founders page.

---

*End of Brief — Version 1.0*
*GYSC · Global Youth Sustainability Council · gysc.ca (placeholder)*
