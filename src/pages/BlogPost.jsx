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
        className="w-full rounded-2xl shadow-md my-2 object-contain bg-white"
      />
    );
  }
  if (imageUrlOnly.test(text)) {
    return <img src={text} alt="" className="w-full rounded-2xl shadow-md my-2 object-contain bg-white" />;
  }
  return <p key={index}>{block}</p>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const { getPost, loading } = useCms();
  const post = getPost(slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-50 py-28 text-center text-navy-600">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-navy-50 py-28">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-5 text-center">
          <h1 className="text-3xl font-serif font-bold text-navy-800 mb-4">Post not found</h1>
          <p className="text-navy-600 mb-8">This article is no longer available.</p>
          <Link to="/blog" className="text-navy-800 font-medium hover:text-navy-600">
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
          className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-800 font-medium mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <p className="text-sm text-navy-500 font-medium mb-3">{post.publishedDate}</p>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy-800 mb-6">
          {post.title}
        </h1>

        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-md mb-8"
          />
        )}

        <div className="space-y-5 text-navy-700 leading-relaxed text-base sm:text-lg">
          {Array.isArray(post.content) &&
            post.content.map((block, index) => (
              <ContentBlock key={`${index}-${String(block).slice(0, 24)}`} block={block} index={index} />
            ))}
        </div>
      </div>
    </article>
  );
}
