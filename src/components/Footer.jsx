import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const logoSrc = '/uploads/rdc-logo.png?v=2';

const footerLinks = {
  'Quick Links': [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ],
  Services: [
    { name: 'Research & Development', path: '/services' },
    { name: 'Academic Support', path: '/services' },
    { name: 'Consultation', path: '/services' },
    { name: 'Therapy & Support', path: '/services' },
  ],
  Resources: [
    { name: 'For Students', path: '/students' },
    { name: 'For Government', path: '/government' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'FAQ', path: '/contact' },
  ],
};

export default function Footer() {
  const { settings } = useCms();

  return (
    <footer className="bg-navy-900 text-white">
      <div className="site-container">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={logoSrc}
                  alt="CTR - Center for Training & Research"
                  className="h-16 sm:h-[4.5rem] w-auto max-w-[320px] object-contain object-left"
                />
              </div>
              <p className="text-navy-300 text-sm leading-relaxed mb-6 max-w-sm">
                {settings.footerText}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-navy-300 text-sm">
                  <Mail size={16} className="text-gold-400 shrink-0" />
                  <span>{settings.email}</span>
                </div>
                <div className="flex items-center gap-3 text-navy-300 text-sm">
                  <Phone size={16} className="text-gold-400 shrink-0" />
                  <span>{settings.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-navy-300 text-sm">
                  <MapPin size={16} className="text-gold-400 shrink-0" />
                  <span>{settings.address}</span>
                </div>
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-serif font-semibold text-sm mb-4 text-gold-400">{title}</h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-navy-300 text-sm hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-navy-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-sm">
            &copy; {new Date().getFullYear()} Center for Training & Research. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-navy-400 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="text-navy-400 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/admin/login"
              className="px-3.5 py-1.5 rounded-lg border border-navy-600 text-navy-200 text-sm font-medium hover:bg-white hover:text-navy-900 hover:border-white transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>

        <div className="border-t border-navy-800 py-3 text-center">
          <p className="text-navy-400 text-xs sm:text-sm">
            Powered by LevelUp IT Solutions :{' '}
            <a href="tel:0904515006" className="hover:text-white transition-colors">
              0904515006
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
