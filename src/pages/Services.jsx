import { Link } from 'react-router-dom';
import { BookOpen, Users, Briefcase, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { usePage } from '../context/CmsContext';

const serviceMeta = [
  { icon: BookOpen, color: 'bg-blue-600', lightBg: 'bg-blue-50', textColor: 'text-blue-600' },
  { icon: Users, color: 'bg-emerald-600', lightBg: 'bg-emerald-50', textColor: 'text-emerald-600' },
  { icon: Briefcase, color: 'bg-amber-600', lightBg: 'bg-amber-50', textColor: 'text-amber-600' },
  { icon: Heart, color: 'bg-rose-600', lightBg: 'bg-rose-50', textColor: 'text-rose-600' },
];

export default function Services() {
  const page = usePage('services');
  const services = (page.items || []).map((item, i) => ({ ...serviceMeta[i % serviceMeta.length], ...item }));

  return (
    <div className="pt-24">
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-navy-800 to-navy-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative site-container">
          <ScrollReveal>
            <span className="text-gold-400 font-semibold text-sm tracking-wide uppercase">{page.hero.eyebrow}</span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4 sm:mb-6">
              {page.hero.title}
            </h1>
            <p className="text-navy-200 text-base sm:text-lg max-w-3xl leading-relaxed">
              {page.hero.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {services.map((service, i) => (
        <section
          key={service.title}
          className={`py-14 sm:py-20 lg:py-28 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="site-container">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
              <ScrollReveal>
                <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                  <div className={`w-16 h-16 ${service.color} text-white rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon size={30} />
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy-800 text-white rounded-lg font-semibold hover:bg-navy-700 transition-colors shadow-sm hover:shadow-md"
                  >
                    Get Started <ArrowRight size={18} />
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                  <div className={`${service.lightBg} rounded-2xl p-8`}>
                    <h3 className="font-serif font-bold text-navy-800 text-lg mb-6">Key Benefits</h3>
                    <ul className="space-y-4">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <CheckCircle size={20} className={`${service.textColor} shrink-0 mt-0.5`} />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      <section className="py-14 sm:py-20 lg:py-28 bg-gradient-to-br from-navy-800 to-navy-900">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-5 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
              {page.cta.title}
            </h2>
            <p className="text-navy-200 text-lg mb-8">
              {page.cta.subtitle}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 rounded-lg font-semibold hover:bg-gold-400 transition-all shadow-lg"
            >
              {page.cta.button} <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
