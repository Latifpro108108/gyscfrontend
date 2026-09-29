import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { useContent } from "@/app/context/ContentContext";
import { ActivityPost } from "@/app/lib/api";

function postDate(post: ActivityPost) {
  if (post.eventDate) return post.eventDate;
  if (!post.publishedAt) return "";
  const date = new Date(post.publishedAt);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

function PostMeta({ post }: { post: ActivityPost }) {
  return (
    <div className="updates-meta">
      <span>{post.category === "collaboration" ? "Collaboration" : "Activity"}</span>
      {postDate(post) && <><span aria-hidden="true">/</span><time>{postDate(post)}</time></>}
    </div>
  );
}

export function UpdatesSection() {
  const { posts, loading } = useContent();
  const homePosts = posts.slice(0, 4);

  return (
    <section className="updates-section" aria-labelledby="updates-title">
      <div className="container">
        <header className="updates-heading">
          <div>
            <p className="updates-kicker">From the field</p>
            <h2 id="updates-title">Activities &amp; collaborations</h2>
            <p className="updates-intro">A record of the people, partnerships, and work moving our mission forward.</p>
          </div>
          <Link to="/updates" className="updates-all-link">All updates <ArrowRight size={16} /></Link>
        </header>

        {homePosts.length > 0 ? (
          <div className="updates-home-grid" aria-label="Recent activities and collaborations">
            {homePosts.map((post) => (
              <article key={post._id} className="updates-card updates-home-card">
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
        ) : (
          <div className="updates-empty" role={loading ? "status" : undefined}>
            <p>{loading ? "Loading recent work…" : "Stories from our work will appear here."}</p>
          </div>
        )}
      </div>
    </section>
  );
}
