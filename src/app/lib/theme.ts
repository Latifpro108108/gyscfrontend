export const T = {
  navy: "#1B365D",
  blue: "#4287F5",
  teal: "#0f9f6f",
  green: "#34c759",
  surface: "#F4F7FC",
  border: "#DDE4EE",
  body: "#2D3748",
  muted: "#64748B",
} as const;

export const HERO_BG =
  "https://images.unsplash.com/photo-1561489413-985b06da5bee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600";
export const ABOUT_IMG =
  "https://images.unsplash.com/photo-1603478804503-dc909c7f5ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900";

export const ALL_SDGS = [
  { n: 1, label: "No Poverty", color: "#E5243B", desc: "End poverty in all its forms everywhere." },
  { n: 2, label: "Zero Hunger", color: "#DDA63A", desc: "End hunger, achieve food security and promote sustainable agriculture." },
  { n: 3, label: "Good Health & Well-Being", color: "#4C9F38", desc: "Ensure healthy lives and promote well-being for all." },
  { n: 4, label: "Quality Education", color: "#C5192D", desc: "Ensure inclusive and equitable quality education for all." },
  { n: 5, label: "Gender Equality", color: "#FF3A21", desc: "Achieve gender equality and empower all women and girls." },
  { n: 6, label: "Clean Water & Sanitation", color: "#26BDE2", desc: "Ensure availability and sustainable management of water and sanitation." },
  { n: 7, label: "Affordable & Clean Energy", color: "#FCC30B", desc: "Ensure access to affordable, reliable and sustainable energy." },
  { n: 8, label: "Decent Work & Economic Growth", color: "#A21942", desc: "Promote sustained, inclusive and sustainable economic growth." },
  { n: 9, label: "Industry, Innovation & Infrastructure", color: "#FD6925", desc: "Build resilient infrastructure and foster innovation." },
  { n: 10, label: "Reduced Inequalities", color: "#DD1367", desc: "Reduce inequality within and among countries." },
  { n: 11, label: "Sustainable Cities", color: "#FD9D24", desc: "Make cities inclusive, safe, resilient and sustainable." },
  { n: 12, label: "Responsible Consumption", color: "#BF8B2E", desc: "Ensure sustainable consumption and production patterns." },
  { n: 13, label: "Climate Action", color: "#3F7E44", desc: "Take urgent action to combat climate change and its impacts." },
  { n: 14, label: "Life Below Water", color: "#0A97D9", desc: "Conserve and sustainably use the oceans, seas and marine resources." },
  { n: 15, label: "Life on Land", color: "#56C02B", desc: "Protect, restore and promote sustainable use of terrestrial ecosystems." },
  { n: 16, label: "Peace, Justice & Strong Institutions", color: "#00689D", desc: "Promote peaceful and inclusive societies and access to justice." },
  { n: 17, label: "Partnerships for the Goals", color: "#19486A", desc: "Strengthen means of implementation and revitalize global partnerships." },
];

export const NEWSLETTERS = [
  {
    issue: "Vol. 01",
    date: "September 2025",
    title: "Inaugural Edition — The Council Is Here",
    excerpt: "A message from the co-founders on the birth of GYSC, our mission, and what comes next for youth in global policy.",
    color: T.teal,
  },
  {
    issue: "Vol. 02",
    date: "October 2025",
    title: "First Policy Forum Recap",
    excerpt: "Over 200 delegates joined our inaugural virtual policy forum. Here's what we discussed, what was resolved, and what it means.",
    color: T.blue,
  },
  {
    issue: "Vol. 03",
    date: "November 2025",
    title: "Growing Our Global Network",
    excerpt: "New National Councils are taking shape across Africa, Asia, and the Americas. Meet the leads driving our global expansion.",
    color: "#A21942",
  },
];

export const NAV_LINKS = [
  { label: "About", to: "/#about" },
  { label: "Founders", to: "/founders" },
  { label: "Donate", to: "/#donate" },
] as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Navigate",
    items: [
      { label: "About GYSC", to: "/#about" },
      { label: "Our Work", to: "/#pillars" },
      { label: "Founders", to: "/founders" },
      { label: "Newsletter", to: "/#newsletter" },
      { label: "Donate", to: "/#donate" },
    ],
  },
  {
    heading: "Initiatives",
    items: [
      { label: "SDG Alignment", to: "/#sdg" },
      { label: "Policy Work", to: "/#pillars" },
      { label: "Join the Council", to: "/register" },
      { label: "Member Login", to: "/login" },
      { label: "Partner With Us", to: "/partner" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Use", to: "/terms" },
      { label: "NGO Registration", to: "/#about" },
    ],
  },
] as const;
