const API_BASE = import.meta.env.VITE_API_URL || "/api";

function getToken() {
  return localStorage.getItem("gysc_token");
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem("gysc_token", token);
  else localStorage.removeItem("gysc_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers, credentials: "include" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.error || "Request failed");
  return data as T;
}

export interface AuthUser {
  id: string;
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  role: "member" | "admin" | "super_admin";
  country?: string;
  dob?: string;
  interests?: string[];
  newsletterOptIn?: boolean;
  status?: string;
}

export interface SiteImage {
  _id: string;
  key: string;
  label: string;
  section: string;
  url: string;
  cloudinaryPublicId?: string;
}

export interface SiteText {
  _id: string;
  key: string;
  label: string;
  section: string;
  value: string;
}

export interface Founder {
  _id: string;
  name: string;
  role: string;
  country: string;
  message: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  order: number;
}

export interface Newsletter {
  _id: string;
  issue: string;
  date: string;
  title: string;
  excerpt: string;
  color: string;
  coverImageUrl?: string;
  pdfUrl?: string;
}

export interface SiteContent {
  images: SiteImage[];
  texts: SiteText[];
  textMap: Record<string, string>;
  imageMap: Record<string, string>;
  founders: Founder[];
  newsletters: Newsletter[];
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  dob: string;
  interests: string[];
  hearAbout: string;
  newsletterOptIn: boolean;
}

export const api = {
  getContent: () => request<SiteContent>("/content"),

  login: (email: string, password: string) =>
    request<{ token: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (data: RegisterPayload) =>
    request<{ token: string; user: AuthUser }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () => request<{ message: string }>("/auth/logout", { method: "POST" }),

  refresh: () => request<{ token: string; user: AuthUser }>("/auth/refresh", { method: "POST" }),

  getDashboard: () =>
    request<{ stats: Record<string, number>; recent: AuthUser[] }>("/admin/dashboard"),

  getMembers: (q?: string) =>
    request<AuthUser[]>(`/admin/members${q ? `?q=${encodeURIComponent(q)}` : ""}`),

  updateMember: (id: string, data: { status?: string; role?: string }) =>
    request<{ user: AuthUser }>(`/admin/members/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  deleteMember: (id: string) =>
    request<{ message: string }>(`/admin/members/${id}`, { method: "DELETE" }),

  getAuditLog: () =>
    request<{ actorEmail: string; actorRole: string; action: string; target: string; ipAddress: string; createdAt: string }[]>("/admin/audit-log"),

  exportAccountData: () => request<{ exportedAt: string; data: AuthUser }>("/account/export"),

  updateProfile: (data: Partial<Pick<AuthUser, "firstName" | "lastName" | "country" | "interests" | "newsletterOptIn">>) =>
    request<{ user: AuthUser }>("/account/profile", { method: "PUT", body: JSON.stringify(data) }),

  deleteAccount: (confirm: string) =>
    request<{ message: string }>("/account/account", { method: "DELETE", body: JSON.stringify({ confirm }) }),

  updateText: (key: string, value: string) =>
    request<SiteText>(`/admin/texts/${key}`, { method: "PUT", body: JSON.stringify({ value }) }),

  uploadSiteImage: (key: string, file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    return request<SiteImage>(`/admin/images/${key}`, { method: "PUT", body: fd });
  },

  deleteSiteImage: (key: string) =>
    request<SiteImage>(`/admin/images/${key}`, { method: "DELETE" }),

  updateFounder: (id: string, data: FormData) =>
    request<Founder>(`/admin/founders/${id}`, { method: "PUT", body: data }),

  deleteFounderImage: (id: string) =>
    request<Founder>(`/admin/founders/${id}/image`, { method: "DELETE" }),

  createNewsletter: (data: FormData) =>
    request<Newsletter>("/admin/newsletters", { method: "POST", body: data }),

  updateNewsletter: (id: string, data: FormData) =>
    request<Newsletter>(`/admin/newsletters/${id}`, { method: "PUT", body: data }),

  deleteNewsletter: (id: string) =>
    request<{ message: string }>(`/admin/newsletters/${id}`, { method: "DELETE" }),

  deleteNewsletterPdf: (id: string) =>
    request<Newsletter>(`/admin/newsletters/${id}/pdf`, { method: "DELETE" }),
};
