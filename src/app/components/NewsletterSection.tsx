import { Download, FileText } from "lucide-react";
import { Link } from "react-router";
import { Reveal } from "@/app/components/shared";
import { useContent } from "@/app/context/ContentContext";
import { groupNewslettersByYear, newsletterDownloadName } from "@/app/lib/newsletter";

export function NewsletterSection() {
  const { newsletters } = useContent();
  const grouped = groupNewslettersByYear(newsletters);

  return (
    <div className="newsletter-academic">
      {newsletters.length === 0 ? (
        <p className="newsletter-empty">No publications yet. New issues will appear here once uploaded by the GYSC team.</p>
      ) : (
        grouped.map(([year, items], gi) => (
          <Reveal key={year} delay={gi * 60}>
            <section className="pub-year-block">
              <h3 className="pub-year-heading">{year}</h3>
              <ul className="pub-list">
                {items.map((n) => {
                  const hasPdf = Boolean(n.pdfUrl?.trim());
                  const fileName = newsletterDownloadName(n.issue, n.title);

                  return (
                    <li key={n._id} className="pub-list-item">
                      <div className="pub-list-main">
                        <p className="pub-list-meta">
                          <span className="pub-list-issue">{n.issue}</span>
                          <span className="pub-list-sep">·</span>
                          <span>{n.date}</span>
                        </p>
                        <h4 className="pub-list-title">{n.title}</h4>
                        <p className="pub-list-excerpt">{n.excerpt}</p>
                        {!hasPdf && <p className="pub-list-pending">PDF not yet available</p>}
                      </div>
                      <div className="pub-list-actions">
                        {hasPdf ? (
                          <>
                            <Link to={`/newsletters/${n._id}`} className="pub-link pub-link-primary">
                              <FileText size={15} /> View
                            </Link>
                            <a href={`/api/content/newsletters/${n._id}/download`} download={fileName} className="pub-link">
                              <Download size={15} /> Download
                            </a>
                          </>
                        ) : (
                          <>
                            <span className="pub-link pub-link-disabled"><FileText size={15} /> View</span>
                            <span className="pub-link pub-link-disabled"><Download size={15} /> Download</span>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </Reveal>
        ))
      )}

      <p className="pub-footnote">Publications are uploaded by the GYSC admin team. Use View to read in your browser or Download to save a copy.</p>
    </div>
  );
}
