import { useEffect, useMemo, useState } from "react";
import { getAllPosts, getBlogCategories } from "../lib/blog";
import BlogCard from "../components/Blog/BlogCard";

const ALL = "Todos";

function Blog() {
  const posts = getAllPosts();
  const categories = [ALL, ...getBlogCategories()];
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Blog | DataIntelligenz";
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return posts.filter((post) => {
      const inCategory = category === ALL || post.category === category;
      const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
      return inCategory && (!term || haystack.includes(term));
    });
  }, [posts, category, query]);

  return (
    <div className="w-full px-6 py-16 md:px-20 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold font-poppins text-center mt-8 mb-3">
        Blog DataIntelligenz
      </h1>
      <p className="text-center font-raleway max-w-2xl mx-auto mb-10">
        Inteligencia artificial, automatización de procesos empresariales y datos
        para decidir mejor.
      </p>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                category === cat
                  ? "bg-prop-red text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artículos..."
          aria-label="Buscar artículos"
          className="w-full md:w-72 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-rose-700"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          No encontramos artículos con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
