export function getNewsletterApiUrls(id: string) {
  return {
    view: `/api/content/newsletters/${id}/pdf`,
    download: `/api/content/newsletters/${id}/download`,
  };
}

export function newsletterDownloadName(issue: string, title: string) {
  const safe = `${issue}-${title}`.replace(/[^\w\s.-]/g, "").trim().replace(/\s+/g, "-");
  return `GYSC-${safe || "newsletter"}.pdf`;
}

/** Extract a 4-digit year from newsletter date strings like "September 2025" */
export function newsletterYear(date: string) {
  const match = date.match(/\b(20\d{2})\b/);
  return match ? match[1] : "Publications";
}

export function groupNewslettersByYear<T extends { date: string }>(items: T[]) {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const year = newsletterYear(item.date);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(item);
  }
  return [...groups.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
}
