import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { formatPostDate, getPostBySlug, getRelatedPosts } from "../lib/blog";
import MarkdownContent from "../components/Blog/MarkdownContent";
import BlogCard from "../components/Blog/BlogCard";

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    document.title = post
      ? `${post.title} | DataIntelligenz`
      : "Artículo no encontrado | DataIntelligenz";
  }, [post]);

  if (!post) {
    return (
      <div className="px-6 py-32 text-center">
        <h1 className="section-title">Artículo no encontrado</h1>
        <Link to="/blog" className="btn-secondary mt-8">Volver al blog</Link>
      </div>
    );
  }

  const related = getRelatedPosts(post);

  return (
    <article className="w-full">
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link to="/blog" className="text-sm font-semibold text-brand hover:underline">
            ← Volver al blog
          </Link>
          <div className="mt-8">
            <span className="section-eyebrow">{post.category}</span>
          </div>
          <h1 className="font-display mt-3 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-slate-600">{post.excerpt}</p>
          <p className="mt-6 text-sm text-slate-500">
            {post.author} · {formatPostDate(post.date)} · {post.readTime} min de lectura
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-14">
        {post.cover && <img src={post.cover} alt={post.title} className="mb-10 w-full rounded-2xl" />}

        <MarkdownContent
          content={post.content}
          className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-brand prose-strong:text-slate-900 prose-blockquote:border-l-brand prose-th:text-left"
        />

        {post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-slate-900 p-8 text-white">
          <div>
            <p className="font-display text-lg font-bold">¿Quieres aplicar esto en tu empresa?</p>
            <p className="mt-1 text-sm text-slate-300">Revisamos tu proceso y te proponemos un primer paso.</p>
          </div>
          <Link to="/contacto" className="btn-primary">Hablemos</Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="font-display text-2xl font-bold text-slate-900">Sigue leyendo</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default BlogPost;
