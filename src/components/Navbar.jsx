import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const logoSrc = '/uploads/rdc-logo.png?v=2';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Students', path: '/students' },
  { name: 'Government', path: '/government' },
  { name: 'Blog', path: '/blog' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="site-container">
        <div className="flex items-center justify-between h-[4.75rem] lg:h-[5.5rem]">
          <Link to="/" className="flex items-center shrink-0 mr-4">
            <img
              src={logoSrc}
              alt="CTR - Center for Training & Research"
              className="h-[3.75rem] sm:h-16 lg:h-[4.75rem] w-auto max-w-[240px] sm:max-w-[300px] lg:max-w-[360px] object-contain object-left"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2.5 py-2 rounded-md text-base font-semibold transition-colors ${
                  location.pathname === link.path
                    ? 'text-ink-800 bg-navy-50'
                    : 'text-ink-600 hover:text-ink-800 hover:bg-navy-50/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 px-5 py-2.5 bg-navy-800 text-white rounded-lg text-base font-semibold hover:bg-navy-700 transition-colors shadow-sm hover:shadow-md"
            >
              Book a Consultation
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-ink-700 hover:bg-navy-50 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-navy-100 px-3 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2.5 rounded-md text-base font-semibold transition-colors ${
                location.pathname === link.path
                  ? 'text-ink-800 bg-navy-50'
                  : 'text-ink-600 hover:text-ink-800 hover:bg-navy-50/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block mt-2 px-5 py-2.5 bg-navy-800 text-white rounded-lg text-base font-semibold hover:bg-navy-700 transition-colors text-center"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
}
