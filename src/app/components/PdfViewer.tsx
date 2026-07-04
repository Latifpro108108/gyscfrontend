import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PdfViewerProps {
  url: string;
  title?: string;
}

export function PdfViewer({ url, title = "Publication" }: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [scale, setScale] = useState(1.15);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let blobUrl: string | null = null;
    setLoading(true);
    setError("");
    setPdf(null);
    setPage(1);

    async function load() {
      try {
        const res = await fetch(url);
        const contentType = res.headers.get("content-type") || "";

        if (!res.ok || contentType.includes("application/json")) {
          let message = "Unable to load this PDF.";
          try {
            const data = contentType.includes("json") ? await res.json() : await res.clone().json();
            if (data?.message) message = data.message;
          } catch {
            /* not JSON */
          }
          if (!cancelled) {
            setError(message);
            setLoading(false);
          }
          return;
        }

        const blob = await res.blob();
        blobUrl = URL.createObjectURL(blob);
        const doc = await pdfjsLib.getDocument(blobUrl).promise;
        if (cancelled) return;
        setPdf(doc);
        setTotal(doc.numPages);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("Unable to load this PDF. Try downloading the file instead.");
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [url]);

  const renderPage = useCallback(async () => {
    if (!pdf || !canvasRef.current) return;
    const pageObj = await pdf.getPage(page);
    const viewport = pageObj.getViewport({ scale });
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await pageObj.render({ canvasContext: ctx, viewport, canvas }).promise;
  }, [pdf, page, scale]);

  useEffect(() => {
    renderPage().catch(() => setError("Failed to render PDF page."));
  }, [renderPage]);

  function goPrev() {
    setPage((p) => Math.max(1, p - 1));
  }

  function goNext() {
    setPage((p) => Math.min(total, p + 1));
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <div className="pdf-toolbar-group">
          <button type="button" className="pdf-tool-btn" onClick={goPrev} disabled={page <= 1 || loading} aria-label="Previous page">
            <ChevronLeft size={18} />
          </button>
          <span className="pdf-page-info">
            Page {page} of {total || "—"}
          </span>
          <button type="button" className="pdf-tool-btn" onClick={goNext} disabled={page >= total || loading} aria-label="Next page">
            <ChevronRight size={18} />
          </button>
        </div>

        <span className="pdf-toolbar-title">{title}</span>

        <div className="pdf-toolbar-group">
          <button type="button" className="pdf-tool-btn" onClick={() => setScale((s) => Math.max(0.6, s - 0.15))} disabled={loading} aria-label="Zoom out">
            <ZoomOut size={18} />
          </button>
          <span className="pdf-zoom-label">{Math.round(scale * 100)}%</span>
          <button type="button" className="pdf-tool-btn" onClick={() => setScale((s) => Math.min(2.5, s + 0.15))} disabled={loading} aria-label="Zoom in">
            <ZoomIn size={18} />
          </button>
        </div>
      </div>

      <div className="pdf-canvas-wrap" ref={wrapRef}>
        {loading && (
          <div className="pdf-state">
            <Loader2 size={28} className="pdf-spinner" />
            <p>Loading publication…</p>
          </div>
        )}
        {error && !loading && (
          <div className="pdf-state pdf-state-error">
            <p>{error}</p>
          </div>
        )}
        <canvas ref={canvasRef} className="pdf-canvas" aria-label={`${title}, page ${page}`} />
      </div>
    </div>
  );
}
