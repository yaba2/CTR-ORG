import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGet, apiSend } from '../lib/api';
import { defaultPages, deepMerge } from '../data/cmsDefaults';
import { pageEditors, pageOutlines, publicPath } from './pageEditors';
import { useCms } from '../context/CmsContext';

export default function PageEditor() {
  const { slug } = useParams();
  const { refresh } = useCms();
  const [page, setPage] = useState(null);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setPage(null);
    setMessage('');
    apiGet(`/pages/${slug}`).then((data) => {
      const defaults = defaultPages[slug]?.content || {};
      setPage({
        ...data,
        title: data.title || defaultPages[slug]?.title || slug,
        content: deepMerge(defaults, data.content),
      });
    });
  }, [slug]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const saved = await apiSend(`/pages/${slug}`, 'PUT', {
        title: page.title,
        content: page.content,
      });
      setPage({
        ...saved,
        content: deepMerge(defaultPages[slug]?.content || {}, saved.content),
      });
      setMessage('Saved. Refresh the public page to see the changes.');
      refresh();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!page) return <div className="text-navy-600">Loading page content...</div>;

  const Editor = pageEditors[slug];
  const outline = pageOutlines[slug] || [];
  const viewUrl = publicPath[slug] || '/';

  return (
    <form onSubmit={save} className="pb-8">
      <div className="sticky top-0 z-20 -mx-6 lg:-mx-10 px-6 lg:px-10 py-4 mb-6 bg-slate-100/95 backdrop-blur border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link to="/admin/pages" className="text-sm text-navy-500 hover:text-navy-800">
              ← All pages
            </Link>
            <h1 className="font-serif text-3xl font-bold text-navy-800 mt-1">Edit {page.title}</h1>
            <p className="text-sm text-navy-500 mt-1">
              Each block below is a section on the live website.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={viewUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-navy-800 font-medium hover:bg-slate-50"
            >
              View page
            </a>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-lg bg-navy-800 text-white font-semibold hover:bg-navy-700 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div className="mb-6 text-sm text-navy-800 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
          {message}
        </div>
      )}

      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-8 items-start">
        <nav className="lg:sticky lg:top-28 space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-2">
            On this page
          </div>
          {outline.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block text-sm text-navy-600 hover:text-navy-900 px-3 py-2 rounded-lg hover:bg-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <label className="block">
              <span className="block text-sm font-semibold text-navy-800 mb-1.5">CMS page name</span>
              <input
                value={page.title}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
                className="w-full max-w-md px-3.5 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-navy-500"
              />
            </label>
          </section>

          {Editor ? (
            <Editor
              content={page.content}
              onChange={(content) => setPage({ ...page, content })}
            />
          ) : (
            <p className="text-navy-600">No editor is available for this page yet.</p>
          )}
        </div>
      </div>
    </form>
  );
}
