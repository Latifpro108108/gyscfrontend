import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, LogIn } from "lucide-react";
import { AuthCard, AuthLink } from "@/app/components/AuthCard";
import { useAuth } from "@/app/context/AuthContext";

export function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const user = await login(email, password);
      if (user.role === "admin" || user.role === "super_admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your GYSC member account. The public website stays open to everyone — no login required to browse."
      footer={
        <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>
          Don't have an account? <AuthLink to="/register">Create one</AuthLink>
          {" · "}
          <AuthLink to="/admin/login">Admin login</AuthLink>
        </p>
      }
    >
      <form onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-fields">
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <p style={{ fontSize: 13, marginBottom: 16, color: "#64748B" }}>
          Forgot your password? Contact <a href="mailto:privacy@gysc.ca" style={{ color: "#0f9f6f", fontWeight: 600 }}>privacy@gysc.ca</a> for assistance.
        </p>
        <button className="btn btn-primary btn-fw" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"} <LogIn size={16} />
        </button>
      </form>
    </AuthCard>
  );
}
