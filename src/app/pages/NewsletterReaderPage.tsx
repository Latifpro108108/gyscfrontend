import { lazy, Suspense } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { PageShell } from "@/app/components/shared";
import { useContent } from "@/app/context/ContentContext";
import { newsletterDownloadName } from "@/app/lib/newsletter";
import { T } from "@/app/lib/theme";

const PdfViewer = lazy(() => import("@/app/components/PdfViewer").then((m) => ({ default: m.PdfViewer })));

export function NewsletterReaderPage() {
  const { id } = useParams<{ id: string }>();
  const { newsletters } = useContent();
  const newsletter = newsletters.find((n) => n._id === id);

  if (!newsletter) {
    return <Navigate to="/404" replace />;
  }

  const fileName = newsletterDownloadName(newsletter.issue, newsletter.title);
  // Use server proxy endpoints — same origin avoids CORS issues with Cloudinary
  const viewUrl = `/api/content/newsletters/${newsletter._id}/pdf`;
  const downloadUrl = `/api/content/newsletters/${newsletter._id}/download`;

  return (
    <PageShell>
      <div className="newsletter-reader">
        <Link to="/#newsletter" className="newsletter-reader-back">
          <ArrowLeft size={16} /> Back to publications
        </Link>

        <header className="newsletter-reader-header">
          <div>
            <p className="newsletter-reader-issue">{newsletter.issue}</p>
            <h1 className="newsletter-reader-title">{newsletter.title}</h1>
            <p className="newsletter-reader-meta">{newsletter.date}</p>
          </div>

          {newsletter.pdfUrl?.trim() && (
            <a href={downloadUrl} download={fileName} className="btn btn-outline-teal btn-sm">
              <Download size={14} /> Download PDF
            </a>
          )}
        </header>

        {newsletter.pdfUrl?.trim() ? (
          <Suspense fallback={<div className="newsletter-reader-empty"><p style={{ color: T.muted }}>Loading reader…</p></div>}>
            <PdfViewer url={viewUrl} title={`${newsletter.issue} — ${newsletter.title}`} />
          </Suspense>
        ) : (
          <div className="newsletter-reader-empty">
            <p style={{ fontSize: 16, color: T.body, lineHeight: 1.7, marginBottom: 8 }}>
              This edition has not been published with a PDF yet.
            </p>
            <p style={{ fontSize: 14, color: T.muted }}>Check back soon — our team uploads each issue from the admin panel.</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
