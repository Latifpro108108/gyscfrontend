import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { ImagePlus, LogOut, Newspaper, Trash2, Type, Users } from "lucide-react";
import { AdminLayout, AdminSection, AdminStatCard } from "@/app/components/admin/AdminLayout";
import { useAuth } from "@/app/context/AuthContext";
import { useContent } from "@/app/context/ContentContext";
import { api, AuthUser, Founder, Newsletter } from "@/app/lib/api";
import { T } from "@/app/lib/theme";

type ContentTab = "images" | "texts";

export function AdminDashboard() {
  const { user, isAdmin, logout } = useAuth();
  const { images, texts, founders, newsletters, refresh } = useContent();
  const [section, setSection] = useState<AdminSection>("dashboard");
  const [contentTab, setContentTab] = useState<ContentTab>("texts");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  async function run(action: () => Promise<unknown>, success = "Saved successfully") {
    setBusy(true);
    setMsg("");
    try {
      await action();
      await refresh();
      setMsg(success);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminLayout section={section} onSection={setSection}>
      <div className="admin-toolbar">
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, color: T.teal, letterSpacing: "1.4px", textTransform: "uppercase" }}>Admin CMS</p>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: T.navy }}>{sectionLabel(section)}</h1>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/" className="btn btn-ghost btn-sm">View site</a>
          <button className="btn btn-outline-teal btn-sm" type="button" onClick={() => void logout()}><LogOut size={14} /> Logout</button>
        </div>
      </div>

      {msg && (
        <div style={{ background: msg.includes("fail") || msg.includes("Invalid") ? "#FEE2E2" : "#D1FAE5", color: msg.includes("fail") || msg.includes("Invalid") ? "#991B1B" : "#065F46", padding: "12px 16px", borderRadius: 8, marginBottom: 20, fontSize: 14 }}>
          {msg}
        </div>
      )}

      {section === "dashboard" && <DashboardPanel />}
      {section === "members" && <MembersPanel />}
      {section === "newsletter" && <NewslettersTab newsletters={newsletters} run={run} busy={busy} />}
      {section === "content" && (
        <>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            <button type="button" className={`btn btn-sm ${contentTab === "texts" ? "btn-primary" : "btn-ghost"}`} onClick={() => setContentTab("texts")}><Type size={14} /> Text Content</button>
            <button type="button" className={`btn btn-sm ${contentTab === "images" ? "btn-primary" : "btn-ghost"}`} onClick={() => setContentTab("images")}><ImagePlus size={14} /> Images</button>
          </div>
          {contentTab === "texts" && <TextsTab texts={texts} run={run} busy={busy} />}
          {contentTab === "images" && <ImagesTab images={images} run={run} busy={busy} />}
        </>
      )}
      {section === "founders" && <FoundersTab founders={founders} run={run} busy={busy} />}
      {section === "settings" && user.role === "super_admin" && <SettingsPanel />}
    </AdminLayout>
  );
}

function sectionLabel(s: AdminSection) {
  const labels: Record<AdminSection, string> = {
    dashboard: "Dashboard",
    members: "Members",
    newsletter: "Newsletter",
    content: "Content Manager",
    founders: "Founders",
    settings: "Settings",
  };
  return labels[s];
}

function DashboardPanel() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [recent, setRecent] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboard()
      .then(({ stats: s, recent: r }) => { setStats(s); setRecent(r); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: T.muted }}>Loading dashboard…</p>;

  return (
    <>
      <div className="admin-stat-grid">
        <AdminStatCard label="Total members" value={stats.totalMembers ?? 0} />
        <AdminStatCard label="Newsletter subscribers" value={stats.subscribers ?? 0} />
        <AdminStatCard label="New this month" value={stats.newThisMonth ?? 0} />
        <AdminStatCard label="Active admins" value={stats.activeAdmins ?? 0} />
      </div>
      <h2 style={{ fontSize: 16, fontWeight: 800, color: T.navy, marginBottom: 12 }}>Recent registrations</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Country</th><th>Joined</th></tr>
          </thead>
          <tbody>
            {recent.length === 0 ? (
              <tr><td colSpan={4} style={{ color: T.muted }}>No registrations yet.</td></tr>
            ) : recent.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.country || "—"}</td>
                <td>{m.status || "active"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function MembersPanel() {
  const [members, setMembers] = useState<AuthUser[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ action: "suspend" | "delete"; member: AuthUser } | null>(null);
  const [busy, setBusy] = useState(false);

  function load(q = query) {
    setLoading(true);
    api.getMembers(q || undefined)
      .then(setMembers)
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(""); }, []);

  async function confirmAction() {
    if (!modal) return;
    setBusy(true);
    try {
      if (modal.action === "delete") {
        await api.deleteMember(modal.member.id);
      } else if (modal.action === "suspend") {
        await api.updateMember(modal.member.id, { status: "suspended" });
      } else {
        await api.updateMember(modal.member.id, { role: "admin" });
      }
      setModal(null);
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="admin-toolbar">
        <input className="admin-search" placeholder="Search by name or email…" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && load()} />
        <button type="button" className="btn btn-teal btn-sm" onClick={() => load()}>Search</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5}>Loading…</td></tr>
            ) : members.length === 0 ? (
              <tr><td colSpan={5} style={{ color: T.muted }}>No members found.</td></tr>
            ) : members.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.role}</td>
                <td>{m.status || "active"}</td>
                <td>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => alert(`${m.name}\n${m.email}\n${m.country || ""}`)}>View</button>
                    {m.status !== "suspended" && (
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setModal({ action: "suspend", member: m })}>Suspend</button>
                    )}
                    <button type="button" className="btn btn-outline-teal btn-sm" onClick={() => setModal({ action: "delete", member: m })}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="admin-modal-backdrop" role="dialog">
          <div className="admin-modal">
            <h3>Confirm {modal.action}</h3>
            <p>
              {modal.action === "delete" && `Permanently delete ${modal.member.email}? This cannot be undone.`}
              {modal.action === "suspend" && `Suspend ${modal.member.email}? They will lose access until reactivated.`}
            </p>
            <div className="admin-modal-actions">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setModal(null)} disabled={busy}>Cancel</button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => void confirmAction()} disabled={busy}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SettingsPanel() {
  const [logs, setLogs] = useState<Awaited<ReturnType<typeof api.getAuditLog>>>([]);

  useEffect(() => {
    api.getAuditLog().then(setLogs).catch(() => setLogs([]));
  }, []);

  return (
    <>
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, color: T.navy, marginBottom: 8 }}>Super Admin</h2>
        <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6 }}>
          The super admin account (admin@gysc.ca) is read-only and cannot be modified or deleted through this panel.
        </p>
      </div>
      <h2 style={{ fontSize: 16, fontWeight: 800, color: T.navy, marginBottom: 12 }}>Audit log</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Time</th><th>Actor</th><th>Action</th><th>Target</th><th>IP</th></tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr><td colSpan={5} style={{ color: T.muted }}>No audit entries yet.</td></tr>
            ) : logs.map((log, i) => (
              <tr key={i}>
                <td>{log.createdAt ? new Date(log.createdAt).toLocaleString() : "—"}</td>
                <td>{log.actorEmail}</td>
                <td>{log.action}</td>
                <td>{log.target}</td>
                <td>{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ImagesTab({ images, run, busy }: { images: ReturnType<typeof useContent>["images"]; run: Function; busy: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
      {images.map((img) => (
        <div key={img.key} className="card" style={{ padding: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: T.teal, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>{img.section}</p>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: T.navy, marginBottom: 12 }}>{img.label}</h3>
          <div style={{ height: 140, borderRadius: 10, overflow: "hidden", background: T.surface, border: `1px solid ${T.border}`, marginBottom: 14 }}>
            {img.url ? <img src={img.url} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: T.muted, fontSize: 13 }}>No image uploaded</div>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <label className="btn btn-primary btn-sm" style={{ flex: 1, cursor: "pointer" }}>
              Replace
              <input type="file" accept="image/*" hidden disabled={busy} onChange={(e) => { const f = e.target.files?.[0]; if (f) run(() => api.uploadSiteImage(img.key, f), "Image updated"); e.target.value = ""; }} />
            </label>
            {img.cloudinaryPublicId && (
              <button className="btn btn-outline-teal btn-sm" disabled={busy} onClick={() => run(() => api.deleteSiteImage(img.key), "Image removed")}>
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function TextsTab({ texts, run, busy }: { texts: ReturnType<typeof useContent>["texts"]; run: Function; busy: boolean }) {
  const grouped = texts.reduce<Record<string, typeof texts>>((acc, t) => {
    (acc[t.section] ||= []).push(t);
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {Object.entries(grouped).map(([section, items]) => (
        <div key={section}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: T.navy, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>{section}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((t) => (
              <TextField key={t.key} field={t} run={run} busy={busy} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TextField({ field, run, busy }: { field: { key: string; label: string; value: string }; run: Function; busy: boolean }) {
  const [value, setValue] = useState(field.value);
  useEffect(() => setValue(field.value), [field.value]);
  return (
    <div className="card" style={{ padding: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 8 }}>{field.label}</label>
      {value.length > 80 ? (
        <textarea value={value} onChange={(e) => setValue(e.target.value)} rows={3} style={{ width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, marginBottom: 10 }} />
      ) : (
        <input value={value} onChange={(e) => setValue(e.target.value)} style={{ width: "100%", height: 42, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, marginBottom: 10 }} />
      )}
      <button className="btn btn-teal btn-sm" disabled={busy} onClick={() => run(() => api.updateText(field.key, value))}>Save</button>
    </div>
  );
}

function FoundersTab({ founders, run, busy }: { founders: Founder[]; run: Function; busy: boolean }) {
  return (
    <div className="founders-grid">
      {founders.map((f) => (
        <FounderEditor key={f._id} founder={f} run={run} busy={busy} />
      ))}
    </div>
  );
}

function FounderEditor({ founder, run, busy }: { founder: Founder; run: Function; busy: boolean }) {
  const [form, setForm] = useState({ name: founder.name, role: founder.role, country: founder.country, message: founder.message });

  function save(withFile?: File) {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("country", form.country);
    fd.append("message", form.message);
    if (withFile) fd.append("image", withFile);
    run(() => api.updateFounder(founder._id, fd));
  }

  return (
    <div className="founder-card">
      <div style={{ height: 180, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {founder.imageUrl ? <img src={founder.imageUrl} alt={form.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ color: T.muted, fontSize: 13 }}>No photo</span>}
      </div>
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" style={{ height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.border}` }} />
        <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" style={{ height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.border}` }} />
        <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country" style={{ height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.border}` }} />
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Personal message" rows={3} style={{ padding: 12, borderRadius: 8, border: `1px solid ${T.border}`, fontFamily: "inherit" }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn btn-teal btn-sm" disabled={busy} onClick={() => save()}>Save text</button>
          <label className="btn btn-primary btn-sm" style={{ cursor: "pointer" }}>
            Upload photo
            <input type="file" accept="image/*" hidden disabled={busy} onChange={(e) => { const f = e.target.files?.[0]; if (f) save(f); e.target.value = ""; }} />
          </label>
          {founder.cloudinaryPublicId && (
            <button className="btn btn-outline-teal btn-sm" disabled={busy} onClick={() => run(() => api.deleteFounderImage(founder._id))}>Remove photo</button>
          )}
        </div>
      </div>
    </div>
  );
}

function NewslettersTab({ newsletters, run, busy }: { newsletters: Newsletter[]; run: Function; busy: boolean }) {
  const empty = { issue: "", date: "", title: "", excerpt: "", color: "#0f9f6f" };
  const [form, setForm] = useState(empty);
  const [pdf, setPdf] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [localError, setLocalError] = useState("");

  function buildFormData(data: typeof empty, p?: File | null) {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
    if (p) fd.append("pdf", p);
    return fd;
  }

  function resetForm() {
    setForm(empty);
    setPdf(null);
    setEditId(null);
    setLocalError("");
  }

  function submitNewsletter() {
    const existingPdf = editId ? newsletters.find((n) => n._id === editId)?.pdfUrl?.trim() : "";
    if (!editId && !pdf) {
      setLocalError("Attach a PDF file — visitors need it to read and download this issue.");
      return;
    }
    if (editId && !pdf && !existingPdf) {
      setLocalError("Attach a PDF file before saving this publication.");
      return;
    }
    setLocalError("");
    run(async () => {
      const fd = buildFormData(form, pdf);
      if (editId) await api.updateNewsletter(editId, fd);
      else await api.createNewsletter(fd);
      resetForm();
    }, editId ? "Newsletter updated" : "Newsletter created");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: T.navy, marginBottom: 16 }}>{editId ? "Edit Newsletter" : "Add Newsletter"}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginBottom: 12 }}>
          <input placeholder="Issue (e.g. Vol. 04)" value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} style={{ height: 42, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.border}` }} />
          <input placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={{ height: 42, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.border}` }} />
          <input placeholder="Accent color (#hex)" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={{ height: 42, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.border}` }} />
        </div>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={{ width: "100%", height: 42, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.border}`, marginBottom: 12 }} />
        <textarea placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} style={{ width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${T.border}`, fontFamily: "inherit", marginBottom: 12 }} />
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: T.body }}>PDF file (required for Read/Download): <input type="file" accept=".pdf,application/pdf" onChange={(e) => setPdf(e.target.files?.[0] || null)} /></label>
        </div>
        {editId && newsletters.find((n) => n._id === editId)?.pdfUrl && !pdf && (
          <p style={{ fontSize: 13, color: T.muted, marginBottom: 12 }}>
            Current PDF is live for visitors. Upload a new file to replace it, or{" "}
            <button
              type="button"
              className="teal-link"
              style={{ fontSize: 13 }}
              disabled={busy}
              onClick={() => run(() => api.deleteNewsletterPdf(editId!), "PDF removed")}
            >
              remove PDF
            </button>
            .
          </p>
        )}
        {localError && (
          <p style={{ fontSize: 13, color: "#991B1B", marginBottom: 12, fontWeight: 600 }}>{localError}</p>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn btn-teal btn-sm"
            disabled={busy}
            onClick={submitNewsletter}
          >
            {editId ? "Update" : "Create"} Newsletter
          </button>
          {editId && <button className="btn btn-ghost btn-sm" onClick={resetForm}>Cancel edit</button>}
        </div>
      </div>

      <div className="newsletter-grid">
        {newsletters.map((n) => (
          <div key={n._id} className="pub-card">
            <div className="pub-card-cover" style={{ background: n.coverImageUrl ? `url(${n.coverImageUrl}) center/cover` : `linear-gradient(135deg, ${n.color}, ${n.color}99)` }}>
              <span className="pub-card-issue">{n.issue}</span>
            </div>
            <div className="pub-card-body">
              <p className="pub-card-date">{n.date}</p>
              <h3 className="pub-card-title">{n.title}</h3>
              <p className="pub-card-excerpt">{n.excerpt}</p>
              <p style={{ fontSize: 12, color: n.pdfUrl ? T.teal : T.muted, fontWeight: 600, marginBottom: 8 }}>
                {n.pdfUrl ? "PDF published — visible on site" : "No PDF — visitors cannot read or download yet"}
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                <button className="btn btn-ghost btn-sm" onClick={() => { setEditId(n._id); setForm({ issue: n.issue, date: n.date, title: n.title, excerpt: n.excerpt, color: n.color }); }}>Edit</button>
                <button className="btn btn-outline-teal btn-sm" disabled={busy} onClick={() => run(() => api.deleteNewsletter(n._id), "Newsletter deleted")}><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
