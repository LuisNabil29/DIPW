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
      <div className="text-center px-6 py-32 text-gray-800">
        <h1 className="text-3xl font-bold font-poppins mb-4">Artículo no encontrado</h1>
        <Link to="/blog" className="text-prop-red font-semibold hover:underline">
          Volver al blog
        </Link>
      </div>
    );
  }

  const related = getRelatedPosts(post);

  return (
    <article className="w-full px-6 py-16 md:px-20 text-gray-800">
      <div className="max-w-3xl mx-auto mt-8">
        <Link to="/blog" className="text-sm text-prop-red font-semibold hover:underline">
          ← Volver al blog
        </Link>

        <span className="block mt-6 text-xs font-semibold uppercase tracking-wide text-prop-red">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold font-poppins mt-2 mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {post.author} · {formatPostDate(post.date)} · {post.readTime} min de lectura
        </p>

        {post.cover && (
          <img src={post.cover} alt={post.title} className="w-full rounded-lg mb-8" />
        )}

        <MarkdownContent
          content={post.content}
          className="prose prose-lg max-w-none font-raleway prose-headings:font-poppins prose-a:text-[#a9173e]"
        />

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-gray-200 text-xs text-gray-700">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 rounded-lg bg-gray-100 text-center">
          <p className="font-poppins font-bold text-lg mb-3">
            ¿Quieres aplicar esto en tu empresa?
          </p>
          <Link
            to="/contacto"
            className="inline-block px-6 py-2 rounded-full bg-prop-red-button text-white font-semibold transition-colors"
          >
            Hablemos
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold font-poppins mb-6">Sigue leyendo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default BlogPost;
