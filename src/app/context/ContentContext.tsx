import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, Founder, Newsletter, SiteContent, SiteImage, SiteText } from "@/app/lib/api";
import defaultLogo from "@/imports/IMG-20260607-WA0005-removebg-preview.png";
import { ABOUT_IMG, HERO_BG } from "@/app/lib/theme";

const IMAGE_FALLBACKS: Record<string, string> = {
  site_logo: defaultLogo,
  hero_background: HERO_BG,
  about_image: ABOUT_IMG,
};

interface ContentContextValue {
  loading: boolean;
  images: SiteImage[];
  texts: SiteText[];
  founders: Founder[];
  newsletters: Newsletter[];
  text: (key: string, fallback?: string) => string;
  image: (key: string, fallback?: string) => string;
  refresh: () => Promise<void>;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await api.getContent();
      setContent(data);
    } catch (e) {
      console.error("Failed to load site content", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const text = useCallback(
    (key: string, fallback = "") => content?.textMap[key] ?? fallback,
    [content],
  );

  const image = useCallback(
    (key: string, fallback?: string) => {
      const url = content?.imageMap[key];
      if (url) return url;
      return fallback ?? IMAGE_FALLBACKS[key] ?? "";
    },
    [content],
  );

  const value = useMemo(
    () => ({
      loading,
      images: content?.images ?? [],
      texts: content?.texts ?? [],
      founders: content?.founders ?? [],
      newsletters: content?.newsletters ?? [],
      text,
      image,
      refresh,
    }),
    [loading, content, text, image, refresh],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
