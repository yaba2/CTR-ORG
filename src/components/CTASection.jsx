import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useCms, usePage } from '../context/CmsContext';

export default function CTASection() {
  const { cta } = usePage('home');
  const { settings } = useCms();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-navy-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-3 sm:px-4 lg:px-5 text-center">
        <ScrollReveal>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {cta.title}
          </h2>
          <p className="text-navy-200 text-base sm:text-lg lg:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto">
            {cta.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-gold-500 text-navy-900 rounded-lg font-semibold hover:bg-gold-400 transition-all shadow-lg hover:shadow-xl hover:shadow-gold-500/20 text-sm sm:text-base"
            >
              {cta.primaryCta}
              <ArrowRight size={18} />
            </Link>
            <a
              href={`tel:${settings.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20 text-sm sm:text-base"
            >
              <Phone size={18} />
              {cta.phoneCta}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
