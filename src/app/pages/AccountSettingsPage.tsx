import { useState } from "react";
import { PageShell } from "@/app/components/shared";
import { useAuth } from "@/app/context/AuthContext";
import { api } from "@/app/lib/api";
import { useSiteNavigation } from "@/app/lib/navigation";

export function AccountSettingsPage() {
  const { user, logout } = useAuth();
  const { goTo } = useSiteNavigation();
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    country: user?.country || "",
    newsletterOptIn: user?.newsletterOptIn ?? true,
  });
  const [confirmDelete, setConfirmDelete] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [msg, setMsg] = useState("");

  if (!user) {
    return (
      <PageShell narrow>
        <div className="account-minimal">
          <p className="account-muted">Sign in to manage your account.</p>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => goTo("/login")}>Sign in</button>
        </div>
      </PageShell>
    );
  }

  async function saveProfile() {
    try {
      await api.updateProfile(profile);
      setMsg("Saved.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Could not save.");
    }
  }

  async function downloadData() {
    try {
      const data = await api.exportAccountData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "gysc-my-data.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Download failed.");
    }
  }

  async function deleteAccount() {
    try {
      await api.deleteAccount(confirmDelete);
      await logout();
      window.location.href = "/";
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Delete failed.");
    }
  }

  return (
    <PageShell narrow>
      <div className="account-minimal">
        <h1>Account</h1>
        <p className="account-email">{user.email}</p>
        {msg && <p className="account-msg">{msg}</p>}

        <div className="account-fields">
          <input value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} placeholder="First name" aria-label="First name" />
          <input value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} placeholder="Last name" aria-label="Last name" />
          <input value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })} placeholder="Country" aria-label="Country" />
        </div>

        <label className="account-check">
          <input type="checkbox" checked={profile.newsletterOptIn} onChange={(e) => setProfile({ ...profile, newsletterOptIn: e.target.checked })} />
          Newsletter
        </label>

        <button className="btn btn-teal btn-sm account-save" type="button" onClick={() => void saveProfile()}>Save</button>

        <div className="account-extra">
          <button type="button" className="account-text-btn" onClick={() => void downloadData()}>Download my data</button>
          <span aria-hidden>·</span>
          <button type="button" className="account-text-btn account-text-danger" onClick={() => setShowDelete((v) => !v)}>
            {showDelete ? "Cancel" : "Delete account"}
          </button>
        </div>

        {showDelete && (
          <div className="account-delete">
            <input value={confirmDelete} onChange={(e) => setConfirmDelete(e.target.value)} placeholder='Type "DELETE"' aria-label="Confirm delete" />
            <button type="button" className="btn btn-outline-teal btn-sm" onClick={() => void deleteAccount()} disabled={confirmDelete !== "DELETE"}>
              Confirm delete
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
