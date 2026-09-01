import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../lib/api';
import { pageOutlines, publicPath } from './pageEditors';

export default function PagesList() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    apiGet('/pages').then(setPages);
  }, []);

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-ink-800 mb-2">Pages</h1>
      <p className="text-ink-600 mb-8">
        Open a page to edit every section as it appears on the website.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {pages.map((page) => {
          const sections = pageOutlines[page.slug] || [];
          const path = publicPath[page.slug] || '/';
          return (
            <Link
              key={page.slug}
              to={`/admin/pages/${page.slug}`}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-navy-200 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-800">{page.title}</h2>
                  <p className="text-sm text-ink-500">{path}</p>
                </div>
                <span className="text-sm font-semibold text-ink-800">Edit →</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <span
                    key={section.id}
                    className="text-xs bg-navy-50 text-ink-700 rounded-full px-2.5 py-1"
                  >
                    {section.label}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
