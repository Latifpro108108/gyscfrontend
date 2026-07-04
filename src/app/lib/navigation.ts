import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

export function useSiteNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = useCallback(
    (to: string) => {
      const hashIndex = to.indexOf("#");
      const path = hashIndex >= 0 ? to.slice(0, hashIndex) || "/" : to;
      const hash = hashIndex >= 0 ? to.slice(hashIndex + 1) : "";

      const currentPath = location.pathname;
      const normalizedPath = path === "" ? "/" : path;

      if (currentPath !== normalizedPath) {
        navigate(to);
        return;
      }

      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [location.pathname, navigate],
  );

  return { goTo, pathname: location.pathname };
}
