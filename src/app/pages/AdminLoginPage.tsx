import { useState } from "react";
import { useNavigate } from "react-router";
import { Label, PageShell } from "@/app/components/shared";
import { useAuth } from "@/app/context/AuthContext";
import { T } from "@/app/lib/theme";

export function AdminLoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@gysc.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const user = await login(email, password);
      if (user.role !== "admin" && user.role !== "super_admin") {
        setError("This account does not have admin access.");
        return;
      }
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <PageShell>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <div className="page-header" style={{ border: "none", marginBottom: 24 }}>
          <Label>Admin</Label>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: T.navy, marginBottom: 8 }}>GYSC Admin Login</h1>
          <p style={{ color: T.muted, fontSize: 15 }}>Sign in to manage website content, newsletters, and founders.</p>
        </div>

        <form className="cta-panel" onSubmit={handleSubmit} style={{ maxWidth: "none" }}>
          {error && (
            <div style={{ background: "#FEE2E2", color: "#991B1B", padding: "12px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
              {error}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            <input type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ height: 46, padding: "0 16px" }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ height: 46, padding: "0 16px" }} />
          </div>
          <button className="btn btn-primary btn-fw" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in to Admin"}
          </button>
        </form>
      </div>
    </PageShell>
  );
}
