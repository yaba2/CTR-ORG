import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FileText,
  Home,
  Info,
  Briefcase,
  GraduationCap,
  Landmark,
  Newspaper,
  Quote,
  Mail,
  Palette,
  LayoutDashboard,
  LogOut,
  Globe,
} from 'lucide-react';
import { apiGet, apiSend } from '../lib/api';

const pageLinks = [
  { to: '/admin/pages/home', label: 'Home', icon: Home },
  { to: '/admin/pages/about', label: 'About', icon: Info },
  { to: '/admin/pages/services', label: 'Services', icon: Briefcase },
  { to: '/admin/pages/students', label: 'Students', icon: GraduationCap },
  { to: '/admin/pages/government', label: 'Government', icon: Landmark },
  { to: '/admin/pages/blog', label: 'Blog', icon: Newspaper },
  { to: '/admin/pages/testimonials', label: 'Testimonials', icon: Quote },
  { to: '/admin/pages/contact', label: 'Contact', icon: Mail },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    apiGet('/auth/me')
      .then(setUser)
      .catch(() => navigate('/admin/login'))
      .finally(() => setChecking(false));
  }, [navigate]);

  const logout = async () => {
    await apiSend('/auth/logout', 'POST');
    navigate('/admin/login');
  };

  if (checking) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center text-navy-600">Loading CMS...</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-navy-950 text-white flex flex-col shrink-0">
        <div className="px-5 py-6 border-b border-white/10">
          <div className="font-serif font-bold text-lg">CTR CMS</div>
          <div className="text-xs text-navy-300 mt-1">{user.email}</div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-auto">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                isActive ? 'bg-white/10 text-white' : 'text-navy-200 hover:bg-white/5'
              }`
            }
          >
            <LayoutDashboard size={16} />
            Dashboard
          </NavLink>

          <div className="pt-4 pb-1 px-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
            Pages
          </div>
          {pageLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                  isActive ? 'bg-white/10 text-white' : 'text-navy-200 hover:bg-white/5'
                }`
              }
            >
              <link.icon size={16} />
              {link.label}
            </NavLink>
          ))}

          <div className="pt-4 pb-1 px-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
            Content
          </div>
          <NavLink
            to="/admin/posts"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                isActive ? 'bg-white/10 text-white' : 'text-navy-200 hover:bg-white/5'
              }`
            }
          >
            <Newspaper size={16} />
            Blog posts
          </NavLink>
          <NavLink
            to="/admin/pages"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                isActive ? 'bg-white/10 text-white' : 'text-navy-200 hover:bg-white/5'
              }`
            }
          >
            <FileText size={16} />
            All pages
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                isActive ? 'bg-white/10 text-white' : 'text-navy-200 hover:bg-white/5'
              }`
            }
          >
            <Palette size={16} />
            Settings
          </NavLink>
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link to="/" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-navy-200 hover:bg-white/5">
            <Globe size={16} />
            View website
          </Link>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-navy-200 hover:bg-white/5"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
