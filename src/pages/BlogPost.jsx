import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const imageMarkdown = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const imageUrlOnly = /^(https?:\/\/|\/)[^\s]+\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i;

function ContentBlock({ block, index }) {
  const text = String(block || '').trim();
  const markdown = text.match(imageMarkdown);
  if (markdown) {
    return (
      <img
        src={markdown[2]}
        alt={markdown[1] || ''}
        className="max-w-full w-auto h-auto max-h-[640px] mx-auto rounded-2xl shadow-md my-2 object-contain bg-white"
      />
    );
  }
  if (imageUrlOnly.test(text)) {
    return <img src={text} alt="" className="max-w-full w-auto h-auto max-h-[640px] mx-auto rounded-2xl shadow-md my-2 object-contain bg-white" />;
  }
  return <p key={index}>{block}</p>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const { getPost, loading } = useCms();
  const post = getPost(slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-50 py-28 text-center text-ink-600">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-navy-50 py-28">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-5 text-center">
          <h1 className="text-3xl font-serif font-bold text-ink-800 mb-4">Post not found</h1>
          <p className="text-ink-600 mb-8">This article is no longer available.</p>
          <Link to="/blog" className="text-ink-800 font-medium hover:text-ink-600">
            Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-navy-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-5">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-ink-600 hover:text-ink-800 font-medium mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <p className="text-sm text-ink-500 font-medium mb-3">{post.publishedDate}</p>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-800 mb-6">
          {post.title}
        </h1>

        {post.featuredImage && (
          <div className="w-full mb-8 rounded-2xl bg-white shadow-md p-3 sm:p-4 flex items-center justify-center min-h-[200px]">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="max-w-full w-auto h-auto max-h-[520px] object-contain rounded-xl"
            />
          </div>
        )}

        <div className="space-y-5 text-ink-700 leading-relaxed text-base sm:text-lg">
          {Array.isArray(post.content) &&
            post.content.map((block, index) => (
              <ContentBlock key={`${index}-${String(block).slice(0, 24)}`} block={block} index={index} />
            ))}
        </div>
      </div>
    </article>
  );
}
