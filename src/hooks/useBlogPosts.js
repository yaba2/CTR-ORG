import { useCms } from '../context/CmsContext';

export function useBlogPosts(limit = null) {
  const { posts, loading } = useCms();
  const sorted = [...posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  return {
    posts: limit ? sorted.slice(0, limit) : sorted,
    loading,
    error: null,
  };
}
