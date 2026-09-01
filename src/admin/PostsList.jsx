import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet, apiSend } from '../lib/api';
import { useCms } from '../context/CmsContext';

export default function PostsList() {
  const { refresh } = useCms();
  const [posts, setPosts] = useState([]);

  const load = () => apiGet('/posts').then(setPosts);

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await apiSend(`/posts/${id}`, 'DELETE');
    load();
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink-800 mb-2">Blog posts</h1>
          <p className="text-ink-600">Create, edit, and unpublish articles.</p>
        </div>
        <Link
          to="/admin/posts/new"
          className="px-5 py-2.5 rounded-lg bg-navy-800 text-white font-semibold hover:bg-navy-700"
        >
          New post
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-100 last:border-0">
            <div>
              <div className="font-semibold text-ink-800">{post.title}</div>
              <div className="text-sm text-ink-500">
                {post.published ? 'Published' : 'Draft'} · {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link to={`/admin/posts/${post.id}`} className="text-sm font-medium text-ink-800 hover:underline">
                Edit
              </Link>
              <button type="button" onClick={() => remove(post.id)} className="text-sm text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <div className="px-5 py-8 text-ink-500">No posts yet.</div>}
      </div>
    </div>
  );
}
