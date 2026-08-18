import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {post.featuredImage ? (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-navy-800 to-navy-600 flex items-center justify-center">
          <span className="text-white text-4xl font-serif font-bold opacity-20">RDC</span>
        </div>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-sm text-navy-500 mb-2 font-medium">
          {post.publishedDate}
        </div>
        
        <h3 className="text-xl font-serif font-bold text-navy-800 mb-3 line-clamp-2 group-hover:text-navy-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-navy-600 text-sm leading-relaxed flex-1">
          {post.summary}
        </p>
        
        <div className="mt-4 pt-4 border-t border-navy-100">
          <span className="text-navy-800 text-sm font-medium group-hover:text-navy-600 transition-colors inline-flex items-center gap-1">
            Read More
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
