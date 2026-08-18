import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Newspaper, Quote, Palette } from 'lucide-react';
import { apiGet } from '../lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ pages: 0, posts: 0, testimonials: 0 });

  useEffect(() => {
    Promise.all([apiGet('/pages'), apiGet('/posts'), apiGet('/testimonials')]).then(
      ([pages, posts, testimonials]) => {
        setStats({
          pages: pages.length,
          posts: posts.length,
          testimonials: testimonials.length,
        });
      }
    );
  }, []);

  const cards = [
    { label: 'Pages', value: stats.pages, to: '/admin/pages', icon: FileText },
    { label: 'Blog posts', value: stats.posts, to: '/admin/posts', icon: Newspaper },
    { label: 'Testimonials', value: stats.testimonials, to: '/admin/testimonials', icon: Quote },
    { label: 'Theme & contact', value: 'Edit', to: '/admin/settings', icon: Palette },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy-800 mb-2">Dashboard</h1>
      <p className="text-navy-600 mb-8">Manage website content, blog posts, and appearance.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <card.icon size={20} className="text-navy-700 mb-3" />
            <div className="text-2xl font-bold text-navy-800">{card.value}</div>
            <div className="text-sm text-navy-500">{card.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
