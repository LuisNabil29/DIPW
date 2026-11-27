import { Link } from "react-router-dom";
import { formatPostDate } from "../../lib/blog";

function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group bg-white rounded-lg shadow-lg p-6 flex flex-col text-left font-raleway border border-transparent hover:border-rose-700 hover:shadow-2xl transition"
    >
      {post.cover && (
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-44 object-cover rounded-md mb-4"
          loading="lazy"
        />
      )}
      <span className="text-xs font-semibold uppercase tracking-wide text-prop-red mb-2">
        {post.category}
      </span>
      <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2 group-hover:text-prop-red transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-gray-700 mb-4 flex-grow">{post.excerpt}</p>
      <div className="text-xs text-gray-500 flex justify-between">
        <span>{formatPostDate(post.date)}</span>
        <span>{post.readTime} min de lectura</span>
      </div>
    </Link>
  );
}

export default BlogCard;
