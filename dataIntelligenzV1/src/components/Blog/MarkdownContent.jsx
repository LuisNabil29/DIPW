import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";

function MarkdownLink({ href = "", children }) {
  if (href.startsWith("/")) {
    return <Link to={href}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function MarkdownContent({ content, className = "" }) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: MarkdownLink }}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownContent;
