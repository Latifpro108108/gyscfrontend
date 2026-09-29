import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { PageShell } from "@/app/components/shared";
import { useContent } from "@/app/context/ContentContext";
import { ActivityPost, api } from "@/app/lib/api";

 type PostFilter = "all" | "activity" | "collaboration";

function formatPostDate(post: ActivityPost) {
  if (post.eventDate) return post.eventDate;
  if (!post.publishedAt) return "";
  const date = new Date(post.publishedAt);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

function PostMeta({ post }: { post: ActivityPost }) {
  return (
    <div className="updates-meta">
      <span>{post.category === "collaboration" ? "Collaboration" : "Activity"}</span>
      {formatPostDate(post) && <><span aria-hidden="true">/</span><time>{formatPostDate(post)}</time></>}
    </div>
  );
}

export function UpdatesPage() {
  const { loading } = useContent();
  const [posts, setPosts] = useState<ActivityPost[]>([]);
  const [archiveLoading, setArchiveLoading] = useState(true);
  const [filter, setFilter] = useState<PostFilter>("all");
  const visiblePosts = filter === "all" ? posts : posts.filter((post) => post.category === filter);

  useEffect(() => {
    let active = true;
    api.getPublicPosts()
      .then((data) => { if (active) setPosts(data); })
      .catch(() => { if (active) setPosts([]); })
      .finally(() => { if (active) setArchiveLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <PageShell>
      <header className="updates-archive-header">
        <p className="updates-kicker">GYSC / Dispatches</p>
        <h1>Work in motion.</h1>
        <p>Activities, ideas, and collaborations from across our global youth network.</p>
      </header>

      <div className="updates-filter-row" aria-label="Filter updates">
        {(["all", "activity", "collaboration"] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={`updates-filter${filter === option ? " active" : ""}`}
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {option === "all" ? "All stories" : option === "activity" ? "Activities" : "Collaborations"}
          </button>
        ))}
        <span className="updates-count">{visiblePosts.length} {visiblePosts.length === 1 ? "story" : "stories"}</span>
      </div>

      {visiblePosts.length === 0 ? (
        <div className="updates-empty" role={loading ? "status" : undefined}>
          <p>{archiveLoading || loading ? "Loading recent work…" : filter === "all" ? "Stories from our work will appear here." : "No stories in this category yet."}</p>
        </div>
      ) : (
        <div className="updates-archive-grid">
          {visiblePosts.map((post) => (
            <article key={post._id} className="updates-card">
              <Link to={`/updates/${post.slug}`} className="updates-card-image" aria-label={`Read ${post.title}`}>
                {post.coverImageUrl ? <img src={post.coverImageUrl} alt="" loading="lazy" /> : <span className="updates-image-empty">GYSC / FIELD NOTES</span>}
              </Link>
              <div className="updates-card-copy">
                <PostMeta post={post} />
                <h2><Link to={`/updates/${post.slug}`}>{post.title}</Link></h2>
                <p>{post.excerpt}</p>
                {post.partner && <p className="updates-partner">With <strong>{post.partner}</strong></p>}
                <Link to={`/updates/${post.slug}`} className="updates-read-link">Read story <ArrowUpRight size={15} /></Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
}

export function UpdatePostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { posts } = useContent();
  const [post, setPost] = useState<ActivityPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    api.getPost(slug)
      .then((data) => { if (active) setPost(data); })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : "This story could not be loaded.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  const summary = posts.find((item) => item.slug === slug);

  if (loading) {
    return <PageShell><div className="updates-empty" role="status"><p>Loading story…</p></div></PageShell>;
  }
  if (!post) {
    return (
      <PageShell>
        <div className="updates-empty">
          <p>{error || "This story could not be found."}</p>
          <Link to="/updates" className="updates-read-link"><ArrowLeft size={15} /> Back to updates</Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell narrow>
      <article className="update-article">
        <Link to="/updates" className="update-back-link"><ArrowLeft size={15} /> All updates</Link>
        <header className="update-article-header">
          <PostMeta post={post} />
          <h1>{post.title}</h1>
          <p className="update-article-excerpt">{post.excerpt}</p>
          {post.partner && <p className="updates-partner">In collaboration with <strong>{post.partner}</strong></p>}
        </header>
        {(post.coverImageUrl || summary?.coverImageUrl) && (
          <img className="update-article-cover" src={post.coverImageUrl || summary?.coverImageUrl} alt="" />
        )}
        <div className="update-article-body">{post.body}</div>
        <footer className="update-article-footer">
          <span>Global Youth Sustainability Council</span>
          <Link to="/updates" className="updates-read-link">More updates <ArrowRight size={15} /></Link>
        </footer>
      </article>
    </PageShell>
  );
}
