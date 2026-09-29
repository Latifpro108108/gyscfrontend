import { FormEvent, useEffect, useState } from "react";
import { ImagePlus, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { ActivityPost, api } from "@/app/lib/api";

type PostForm = {
  title: string;
  excerpt: string;
  body: string;
  category: "activity" | "collaboration";
  partner: string;
  eventDate: string;
  status: "draft" | "published";
  featured: boolean;
};

const EMPTY_FORM: PostForm = {
  title: "",
  excerpt: "",
  body: "",
  category: "activity",
  partner: "",
  eventDate: "",
  status: "draft",
  featured: false,
};

export function PostsTab({ refreshPublicContent }: { refreshPublicContent: () => Promise<boolean> }) {
  const [posts, setPosts] = useState<ActivityPost[]>([]);
  const [form, setForm] = useState<PostForm>(EMPTY_FORM);
  const [cover, setCover] = useState<File | null>(null);
  const [editing, setEditing] = useState<ActivityPost | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadPosts() {
    setLoading(true);
    try {
      setPosts(await api.getAdminPosts());
      setError("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to load posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadPosts(); }, []);

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setCover(null);
  }

  function startNew() {
    setMessage("");
    setError("");
    setEditing(null);
    setForm(EMPTY_FORM);
    setCover(null);
    setFormOpen(true);
  }

  function startEdit(post: ActivityPost) {
    setMessage("");
    setError("");
    setEditing(post);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      body: post.body ?? "",
      category: post.category,
      partner: post.partner ?? "",
      eventDate: post.eventDate ?? "",
      status: post.status,
      featured: post.featured,
    });
    setCover(null);
    setFormOpen(true);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setError("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, String(value)));
    if (cover) data.append("cover", cover);

    try {
      if (editing) await api.updatePost(editing._id, data);
      else await api.createPost(data);
      await refreshPublicContent();
      await loadPosts();
      setMessage(editing ? "Post updated." : form.status === "published" ? "Post published." : "Draft saved.");
      closeForm();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to save post.");
    } finally {
      setBusy(false);
    }
  }

  async function deletePost(post: ActivityPost) {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    setDeletingId(post._id);
    setError("");
    setMessage("");
    try {
      await api.deletePost(post._id);
      await refreshPublicContent();
      await loadPosts();
      setMessage("Post deleted.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to delete post.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="admin-posts">
      <header className="admin-posts-heading">
        <div>
          <h2>Activities &amp; collaborations</h2>
          <p>Publish field reports, event recaps, and partner stories.</p>
        </div>
        {!formOpen && <button type="button" className="btn btn-primary btn-sm" onClick={startNew}><Plus size={15} /> New post</button>}
      </header>

      {(message || error) && <p className={`admin-posts-notice${error ? " is-error" : ""}`} role="status">{error || message}</p>}

      {formOpen && (
        <form className="admin-post-form" onSubmit={(event) => void submit(event)}>
          <div className="admin-post-form-header">
            <h3>{editing ? "Edit post" : "Create a post"}</h3>
            <button type="button" className="admin-post-icon-button" onClick={closeForm} aria-label="Close editor"><X size={18} /></button>
          </div>

          <label className="admin-post-field admin-post-field-wide">
            <span>Title</span>
            <input required maxLength={160} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="A clear headline for this story" />
          </label>

          <div className="admin-post-form-grid">
            <label className="admin-post-field">
              <span>Story type</span>
              <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as PostForm["category"] })}>
                <option value="activity">Activity</option>
                <option value="collaboration">Collaboration</option>
              </select>
            </label>
            <label className="admin-post-field">
              <span>Partner <small>Optional</small></span>
              <input maxLength={120} value={form.partner} onChange={(event) => setForm({ ...form, partner: event.target.value })} placeholder="Organization or partner" />
            </label>
            <label className="admin-post-field">
              <span>Activity date <small>Optional</small></span>
              <input type="date" value={form.eventDate} onChange={(event) => setForm({ ...form, eventDate: event.target.value })} />
            </label>
            <label className="admin-post-field">
              <span>Visibility</span>
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as PostForm["status"] })}>
                <option value="draft">Save as draft</option>
                <option value="published">Publish now</option>
              </select>
            </label>
          </div>

          <label className="admin-post-field admin-post-field-wide">
            <span>Summary</span>
            <textarea required maxLength={320} rows={3} value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} placeholder="A short introduction for the updates feed" />
            <small>{form.excerpt.length}/320</small>
          </label>

          <label className="admin-post-field admin-post-field-wide">
            <span>Story</span>
            <textarea required rows={9} value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} placeholder="Write the activity report or collaboration story. Line breaks are preserved." />
          </label>

          <div className="admin-post-form-bottom">
            <label className="admin-post-upload">
              <ImagePlus size={17} />
              <span>{cover ? cover.name : editing?.coverImageUrl ? "Replace cover image" : "Add cover image"}</span>
              <input type="file" accept="image/*" onChange={(event) => setCover(event.target.files?.[0] ?? null)} />
            </label>
            <label className="admin-post-featured">
              <input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} />
              Feature on homepage
            </label>
          </div>

          <div className="admin-post-form-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={closeForm} disabled={busy}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
              <Save size={15} /> {busy ? "Saving…" : form.status === "published" ? "Publish post" : "Save draft"}
            </button>
          </div>
        </form>
      )}

      <div className="admin-post-list">
        {loading ? (
          <p className="admin-posts-empty" role="status">Loading posts…</p>
        ) : posts.length === 0 ? (
          <p className="admin-posts-empty">No posts yet. Create one to start the updates feed.</p>
        ) : posts.map((post) => (
          <article key={post._id} className="admin-post-row">
            {post.coverImageUrl ? <img src={post.coverImageUrl} alt="" /> : <div className="admin-post-row-placeholder">GYSC</div>}
            <div className="admin-post-row-copy">
              <div className="admin-post-row-meta">
                <span>{post.category}</span>
                <span className={`admin-post-status ${post.status}`}>{post.status}</span>
                {post.featured && <span className="admin-post-featured-tag">Featured</span>}
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
            <div className="admin-post-row-actions">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => startEdit(post)}><Pencil size={14} /> Edit</button>
              <button type="button" className="btn btn-outline-teal btn-sm" disabled={deletingId === post._id} onClick={() => void deletePost(post)}><Trash2 size={14} /> {deletingId === post._id ? "Deleting…" : "Delete"}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
