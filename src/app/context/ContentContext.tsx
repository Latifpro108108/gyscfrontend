import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ActivityPost, api, Founder, Newsletter, SiteContent, SiteImage, SiteText } from "@/app/lib/api";
import defaultLogo from "@/imports/IMG-20260607-WA0005-removebg-preview.png";
import { ABOUT_IMG, HERO_BG } from "@/app/lib/theme";

const IMAGE_FALLBACKS: Record<string, string> = {
  site_logo: defaultLogo,
  hero_background: HERO_BG,
  about_image: ABOUT_IMG,
};
const CONTENT_CACHE_KEY = "gysc_public_content_v1";

function readCachedContent(): SiteContent | null {
  try {
    const value = localStorage.getItem(CONTENT_CACHE_KEY);
    if (!value) return null;
    const content = JSON.parse(value) as SiteContent;
    if (
      !content ||
      !Array.isArray(content.images) ||
      !Array.isArray(content.texts) ||
      !Array.isArray(content.founders) ||
      !Array.isArray(content.newsletters) ||
      !content.textMap ||
      !content.imageMap
    ) return null;
    return { ...content, posts: Array.isArray(content.posts) ? content.posts : [] };
  } catch {
    return null;
  }
}

interface ContentContextValue {
  loading: boolean;
  images: SiteImage[];
  texts: SiteText[];
  founders: Founder[];
  newsletters: Newsletter[];
  posts: ActivityPost[];
  text: (key: string, fallback?: string) => string;
  image: (key: string, fallback?: string) => string;
  refresh: () => Promise<boolean>;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(readCachedContent);
  const [loading, setLoading] = useState(() => content === null);

  const refresh = useCallback(async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);
    try {
      const data = await api.getContent(controller.signal);
      setContent(data);
      try {
        localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(data));
      } catch {
        // Continue without persistence if storage is unavailable or full.
      }
      return true;
    } catch (e) {
      if (!(e instanceof DOMException && e.name === "AbortError")) {
        console.error("Failed to load site content", e);
      }
      return false;
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let retryTimer: number | undefined;

    async function loadContent() {
      const loaded = await refresh();
      if (!loaded && !cancelled) {
        retryTimer = window.setTimeout(() => void loadContent(), 10_000);
      }
    }

    void loadContent();
    return () => {
      cancelled = true;
      if (retryTimer !== undefined) window.clearTimeout(retryTimer);
    };
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
      posts: content?.posts ?? [],
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
