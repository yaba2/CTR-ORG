import { useBlogPosts } from '../hooks/useBlogPosts';
import PostCard from '../components/PostCard';
import { usePage } from '../context/CmsContext';

export default function Blog() {
  const { posts, loading, error } = useBlogPosts();
  const page = usePage('blog');

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-50 py-20">
        <div className="site-container">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-navy-800 border-t-transparent"></div>
            <p className="mt-4 text-navy-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-navy-50 py-20">
        <div className="site-container">
          <div className="text-center">
            <p className="text-red-600 text-lg">Error: {error}</p>
            <p className="mt-2 text-navy-600">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-50 pt-32 pb-20">
      <div className="site-container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-navy-800 mb-4">{page.hero.title}</h1>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            {page.hero.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-navy-600 text-lg">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
