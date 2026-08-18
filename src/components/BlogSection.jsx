import { useBlogPosts } from '../hooks/useBlogPosts';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';
import { usePage } from '../context/CmsContext';

export default function BlogSection() {
  const { posts, loading, error } = useBlogPosts(4);
  const { blog } = usePage('home');

  return (
    <section className="py-20 bg-white">
      <div className="site-container">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-navy-800 mb-2">{blog.title}</h2>
            <p className="text-navy-600">{blog.subtitle}</p>
          </div>
          <Link 
            to="/blog" 
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-white rounded-lg font-medium hover:bg-navy-700 transition-colors"
          >
            View All Posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {error ? (
          <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center text-red-700">
            Blog posts could not be loaded right now.
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-navy-50 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-navy-600">No blog posts available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-white rounded-lg font-medium hover:bg-navy-700 transition-colors"
          >
            View All Posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
