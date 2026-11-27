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
    <div className="w-full">
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <span className="section-eyebrow">Blog DataIntelligenz</span>
          <h1 className="section-title mt-3 md:!text-5xl max-w-3xl">
            Inteligencia artificial, automatización y datos para tu empresa
          </h1>
          <p className="section-lead max-w-2xl">
            Guías y casos prácticos para llevar IA y automatización a los procesos que ya
            corren en tu ERP.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === cat
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand"
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
            className="w-full md:w-80 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-slate-500">No encontramos artículos con esos filtros.</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
