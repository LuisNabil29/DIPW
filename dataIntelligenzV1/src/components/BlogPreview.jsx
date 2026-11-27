import { Link } from "react-router-dom";
import { getFeaturedPosts } from "../lib/blog";
import BlogCard from "./Blog/BlogCard";

function BlogPreview() {
  const posts = getFeaturedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-gray-200 w-full py-16 px-6 md:px-20">
      <h2 className="text-3xl font-bold font-poppins text-black mb-3 text-center">
        Blog
      </h2>
      <p className="text-center text-gray-700 font-raleway mb-10 max-w-2xl mx-auto">
        Ideas y casos prácticos sobre inteligencia artificial, automatización de
        procesos y datos para la toma de decisiones.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/blog"
          className="inline-block px-6 py-2 rounded-full bg-prop-red-button text-white font-semibold transition-colors"
        >
          Ver todos los artículos
        </Link>
      </div>
    </section>
  );
}

export default BlogPreview;
