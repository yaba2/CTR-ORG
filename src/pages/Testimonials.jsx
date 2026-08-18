import { Quote, Star } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useCms, usePage } from '../context/CmsContext';

export default function Testimonials() {
  const { testimonials } = useCms();
  const page = usePage('testimonials');

  return (
    <div className="pt-24">
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-navy-800 to-navy-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <Quote size={32} className="text-gold-300 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating || 5 }).map((_, j) => (
                      <Star key={j} size={16} className="text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1 mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <div className="w-11 h-11 bg-navy-800 rounded-full flex items-center justify-center text-white font-serif font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-navy-800 text-sm">{t.name}</div>
                      <div className="text-gray-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-5 text-center">
          <ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-8">
              {page.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-navy-800 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
