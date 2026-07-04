import { useEffect, useState } from "react";

type Consent = "all" | "essential" | "custom";

const COOKIE_NAME = "gysc_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!document.cookie.includes(`${COOKIE_NAME}=`)) setVisible(true);
  }, []);

  function save(choice: Consent) {
    const value = choice === "custom"
      ? `custom:f${functional ? 1 : 0}a${analytics ? 1 : 0}`
      : choice;
    document.cookie = `${COOKIE_NAME}=${value}; max-age=${365 * 24 * 60 * 60}; path=/; SameSite=Strict`;
    setVisible(false);
    setPrefsOpen(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        {!prefsOpen ? (
          <>
            <p>
              We use cookies to keep you signed in and improve your experience. We do not sell your data.
            </p>
            <div className="cookie-banner-actions">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => save("all")}>Accept All</button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => save("essential")}>Essential Only</button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPrefsOpen(true)}>Manage Preferences</button>
            </div>
          </>
        ) : (
          <>
            <p className="cookie-prefs-title">Cookie preferences</p>
            <label className="cookie-toggle"><input type="checkbox" checked disabled /> Strictly Necessary (required)</label>
            <label className="cookie-toggle"><input type="checkbox" checked={functional} onChange={(e) => setFunctional(e.target.checked)} /> Functional</label>
            <label className="cookie-toggle"><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /> Analytics</label>
            <div className="cookie-banner-actions">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => save("custom")}>Save preferences</button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPrefsOpen(false)}>Back</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function openCookiePreferences() {
  document.cookie = document.cookie.replace(/gysc_cookie_consent=[^;]+;?/, "");
  window.location.reload();
}
