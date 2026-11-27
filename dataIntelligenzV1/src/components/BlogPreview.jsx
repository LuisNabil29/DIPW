import { Link } from "react-router-dom";
import { getFeaturedPosts } from "../lib/blog";
import BlogCard from "./Blog/BlogCard";

function BlogPreview() {
  const posts = getFeaturedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="w-full bg-white py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Blog</span>
            <h2 className="section-title mt-3">Ideas para automatizar y decidir mejor</h2>
            <p className="section-lead">
              Casos prácticos sobre inteligencia artificial, automatización de procesos y datos.
            </p>
          </div>
          <Link to="/blog" className="btn-secondary">Ver todos los artículos</Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogPreview;
