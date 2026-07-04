import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { AuthCard, AuthLink } from "@/app/components/AuthCard";
import { useAuth } from "@/app/context/AuthContext";
import { T } from "@/app/lib/theme";

const INTERESTS = [
  "Climate & Environment", "Education Policy", "Gender Equality", "Governance & Institutions",
  "Youth Leadership", "Sustainable Development", "Human Rights", "Digital Policy",
];

export function RegisterPage() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", country: "", dob: "",
    password: "", confirmPassword: "",
    interests: [] as string[], hearAbout: "", newsletterOptIn: true, terms: false,
  });

  function toggleInterest(item: string) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(item) ? f.interests.filter((i) => i !== item) : [...f.interests, item],
    }));
  }

  function validateStep() {
    if (step === 1) {
      if (!form.firstName || !form.lastName || !form.email || !form.country || !form.dob) {
        return "Please complete all required fields.";
      }
      if (form.password.length < 8) return "Password must be at least 8 characters.";
      if (form.password !== form.confirmPassword) return "Passwords do not match.";
    }
    if (step === 3 && !form.terms) return "You must accept the terms to register.";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateStep();
    if (err) { setError(err); return; }
    if (step < 3) { setError(""); setStep(step + 1); return; }

    setError("");
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        country: form.country,
        dob: form.dob,
        interests: form.interests,
        hearAbout: form.hearAbout,
        newsletterOptIn: form.newsletterOptIn,
      });
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  }

  if (success) {
    return (
      <AuthCard title="Welcome to GYSC" subtitle="Your membership account has been created.">
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <CheckCircle size={48} color={T.teal} style={{ marginBottom: 16 }} />
          <p style={{ color: T.teal, fontWeight: 600 }}>Registration successful! Redirecting…</p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Join the movement"
      subtitle={`Step ${step} of 3 — ${step === 1 ? "Your details" : step === 2 ? "Your interests" : "Review & submit"}`}
      footer={<p style={{ fontSize: 14, color: T.muted }}>Already have an account? <AuthLink to="/login">Sign in</AuthLink></p>}
    >
      <div className="reg-steps">
        {[1, 2, 3].map((n) => (
          <span key={n} className={`reg-step${step >= n ? " active" : ""}`}>{n}</span>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}

        {step === 1 && (
          <div className="auth-fields">
            <input required placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            <input required placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input required placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
            <input required type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
            <input required type="password" placeholder="Password (min 8 characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <input required type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
          </div>
        )}

        {step === 2 && (
          <>
            <p className="reg-label">Areas of interest</p>
            <div className="reg-chips">
              {INTERESTS.map((item) => (
                <button key={item} type="button" className={`reg-chip${form.interests.includes(item) ? " on" : ""}`} onClick={() => toggleInterest(item)}>
                  {item}
                </button>
              ))}
            </div>
            <input className="reg-input-full" placeholder="How did you hear about us?" value={form.hearAbout} onChange={(e) => setForm({ ...form, hearAbout: e.target.value })} />
            <label className="reg-check">
              <input type="checkbox" checked={form.newsletterOptIn} onChange={(e) => setForm({ ...form, newsletterOptIn: e.target.checked })} />
              Subscribe to GYSC newsletter updates
            </label>
          </>
        )}

        {step === 3 && (
          <div className="reg-summary">
            <p><strong>Name:</strong> {form.firstName} {form.lastName}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Country:</strong> {form.country}</p>
            <p><strong>Interests:</strong> {form.interests.length ? form.interests.join(", ") : "None selected"}</p>
            <label className="reg-check">
              <input type="checkbox" checked={form.terms} onChange={(e) => setForm({ ...form, terms: e.target.checked })} />
              I agree to the <AuthLink to="/terms">Terms of Use</AuthLink> and <AuthLink to="/privacy-policy">Privacy Policy</AuthLink>
            </label>
          </div>
        )}

        <div className="reg-nav">
          {step > 1 && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={14} /> Back
            </button>
          )}
          <button className="btn btn-teal btn-sm" type="submit" disabled={loading} style={{ marginLeft: "auto" }}>
            {loading ? "Submitting…" : step === 3 ? "Create account" : "Continue"} <ArrowRight size={14} />
          </button>
        </div>
      </form>
    </AuthCard>
  );
}
