import { ReactNode } from "react";
import { LayoutDashboard, Mail, Newspaper, Settings, Users, FileText } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { T } from "@/app/lib/theme";

export type AdminSection = "dashboard" | "members" | "newsletter" | "content" | "founders" | "settings";

const NAV: { id: AdminSection; label: string; Icon: typeof LayoutDashboard; superOnly?: boolean }[] = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "members", label: "Members", Icon: Users },
  { id: "newsletter", label: "Newsletter", Icon: Mail },
  { id: "content", label: "Content Manager", Icon: FileText },
  { id: "founders", label: "Founders", Icon: Users },
  { id: "settings", label: "Settings", Icon: Settings, superOnly: true },
];

export function AdminLayout({
  section,
  onSection,
  children,
}: {
  section: AdminSection;
  onSection: (s: AdminSection) => void;
  children: ReactNode;
}) {
  const { user } = useAuth();
  const isSuper = user?.role === "super_admin";

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <p className="admin-sidebar-brand">GYSC Admin</p>
        <nav className="admin-sidebar-nav">
          {NAV.filter((item) => !item.superOnly || isSuper).map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className={`admin-sidebar-link${section === id ? " active" : ""}`}
              onClick={() => onSection(id)}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>
        <p className="admin-sidebar-user">{user?.email}</p>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}

export function AdminStatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="admin-stat-card">
      <p className="admin-stat-value">{value}</p>
      <p className="admin-stat-label">{label}</p>
    </div>
  );
}
