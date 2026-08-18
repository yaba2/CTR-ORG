import { Link } from 'react-router-dom';
import { Landmark, TrendingUp, Database, ArrowRight, CheckCircle, ShieldCheck, BarChart3, FileSearch } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { usePage } from '../context/CmsContext';

const serviceMeta = [
  { icon: FileSearch, color: 'bg-blue-600', lightBg: 'bg-blue-50', textColor: 'text-blue-600' },
  { icon: TrendingUp, color: 'bg-emerald-600', lightBg: 'bg-emerald-50', textColor: 'text-emerald-600' },
  { icon: Database, color: 'bg-amber-600', lightBg: 'bg-amber-50', textColor: 'text-amber-600' },
];
const trustIcons = [ShieldCheck, Landmark, BarChart3];

export default function Government() {
  const page = usePage('government');
  const services = (page.services?.items || []).map((item, i) => ({ ...serviceMeta[i % serviceMeta.length], ...item }));
  const trustPoints = (page.trust?.items || []).map((item, i) => ({ ...item, icon: trustIcons[i % trustIcons.length] }));

  return (
    <div className="pt-24">
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-navy-800 to-navy-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
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

      <section className="py-20 lg:py-28 bg-white">
        <div className="site-container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold-600 font-semibold text-sm tracking-wide uppercase">{page.services.eyebrow}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mt-3 mb-4">
                {page.services.title}
              </h2>
              <p className="text-gray-600 text-lg">
                {page.services.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100}>
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
                  <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                    <div className={`w-16 h-16 ${service.color} text-white rounded-2xl flex items-center justify-center mb-6`}>
                      <service.icon size={30} />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-800 mb-4">{service.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{service.description}</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-white rounded-lg font-semibold hover:bg-navy-700 transition-colors text-sm"
                    >
                      Get Started <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                    <div className={`${service.lightBg} rounded-2xl p-8`}>
                      <h4 className="font-serif font-bold text-navy-800 mb-5">Key Benefits</h4>
                      <ul className="space-y-3">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <CheckCircle size={18} className={`${service.textColor} shrink-0 mt-0.5`} />
                            <span className="text-gray-700 text-sm">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="site-container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold-600 font-semibold text-sm tracking-wide uppercase">{page.trust.eyebrow}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mt-3">
                {page.trust.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {trustPoints.map((tp, i) => (
              <ScrollReveal key={tp.title} delay={i * 150}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center h-full">
                  <div className="w-16 h-16 bg-navy-800 text-gold-400 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <tp.icon size={28} />
                  </div>
                  <h3 className="font-serif font-bold text-navy-800 text-lg mb-3">{tp.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tp.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-800 to-navy-900">
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
