import { Link } from "react-router-dom";
import { formatPostDate } from "../../lib/blog";

function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
    >
      {post.cover ? (
        <img src={post.cover} alt={post.title} className="aspect-[16/9] w-full object-cover" loading="lazy" />
      ) : (
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-slate-900 via-slate-800 to-brand p-6 flex items-end">
          <span className="font-display text-sm font-semibold text-white/80">{post.category}</span>
        </div>
      )}
      <div className="flex flex-grow flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="rounded-full bg-brand-soft px-2.5 py-1 font-semibold text-brand">{post.category}</span>
          <span>{post.readTime} min</span>
        </div>
        <h3 className="font-display mt-4 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand">
          {post.title}
        </h3>
        <p className="mt-3 flex-grow text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
        <span className="mt-5 text-xs text-slate-500">{formatPostDate(post.date)}</span>
      </div>
    </Link>
  );
}

export default BlogCard;
