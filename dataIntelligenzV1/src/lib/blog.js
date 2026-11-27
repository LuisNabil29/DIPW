const rawPosts = import.meta.glob(
  ["../content/blog/*.md", "!../content/blog/README.md"],
  { query: "?raw", import: "default", eager: true }
);

const WORDS_PER_MINUTE = 200;

function parseValue(raw) {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => parseValue(item))
      .filter((item) => item !== "");
  }
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

// Solo admite pares `clave: valor` de una línea y listas `[a, b]`.
function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: source };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1 || line.trim().startsWith("#")) continue;
    const key = line.slice(0, separator).trim();
    if (key) data[key] = parseValue(line.slice(separator + 1));
  }
  return { data, content: match[2].trim() };
}

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

function estimateReadTime(content) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const posts = Object.entries(rawPosts)
  .map(([path, source]) => {
    const { data, content } = parseFrontmatter(source);
    return {
      slug: data.slug || slugFromPath(path),
      title: data.title || slugFromPath(path),
      date: String(data.date || ""),
      author: data.author || "DataIntelligenz",
      category: data.category || "General",
      excerpt: data.excerpt || "",
      cover: data.cover || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: data.featured === true,
      draft: data.draft === true,
      readTime: Number(data.readTime) || estimateReadTime(content),
      content,
    };
  })
  .filter((post) => !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts() {
  return posts;
}

export function getFeaturedPosts(limit = 3) {
  const featured = posts.filter((post) => post.featured);
  const rest = posts.filter((post) => !post.featured);
  return [...featured, ...rest].slice(0, limit);
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

export function getBlogCategories() {
  return [...new Set(posts.map((post) => post.category))];
}

export function getRelatedPosts(post, limit = 2) {
  return posts
    .filter((other) => other.slug !== post.slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) - Number(a.category === post.category)
    )
    .slice(0, limit);
}

export function formatPostDate(date) {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
