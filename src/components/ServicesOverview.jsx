import { Link } from 'react-router-dom';
import { BookOpen, Users, Briefcase, Heart, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { usePage } from '../context/CmsContext';

const serviceMeta = [
  { icon: BookOpen, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100', hover: 'hover:border-blue-200' },
  { icon: Users, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100', hover: 'hover:border-emerald-200' },
  { icon: Briefcase, color: 'bg-amber-50 text-amber-600', border: 'border-amber-100', hover: 'hover:border-amber-200' },
  { icon: Heart, color: 'bg-rose-50 text-rose-600', border: 'border-rose-100', hover: 'hover:border-rose-200' },
];

export default function ServicesOverview() {
  const { services } = usePage('home');
  const items = (services.items || []).map((item, i) => ({ ...serviceMeta[i % serviceMeta.length], ...item }));

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-gray-50">
      <div className="site-container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-600 font-semibold text-sm tracking-wide uppercase">{services.eyebrow}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mt-3 mb-4">
              {services.title}
            </h2>
            <p className="text-gray-600 text-lg">
              {services.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 100}>
              <div className={`bg-white rounded-2xl p-7 border ${service.border} ${service.hover} transition-all duration-300 hover:shadow-lg group h-full flex flex-col`}>
                <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <service.icon size={26} />
                </div>
                <h3 className="font-serif font-bold text-navy-800 text-lg mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{service.description}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-navy-700 font-semibold text-sm mt-5 hover:gap-2.5 transition-all"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
