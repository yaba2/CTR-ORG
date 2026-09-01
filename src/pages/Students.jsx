import { Link } from 'react-router-dom';
import { Lightbulb, FileText, Beaker, BarChart3, BookCheck, ArrowRight, CheckCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { usePage } from '../context/CmsContext';

const stepIcons = [Lightbulb, FileText, Beaker, BarChart3, BookCheck];

export default function Students() {
  const page = usePage('students');
  const steps = (page.process?.steps || []).map((step, i) => ({
    ...step,
    icon: stepIcons[i % stepIcons.length],
  }));
  const programs = page.programs?.items || [];

  return (
    <div className="pt-24">
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-navy-800 to-navy-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
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
              <span className="text-gold-600 font-semibold text-sm tracking-wide uppercase">{page.process.eyebrow}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-800 mt-3 mb-4">
                {page.process.title}
              </h2>
              <p className="text-gray-600 text-lg">
                {page.process.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 100}>
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
                  <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-navy-800 text-gold-400 rounded-xl flex items-center justify-center">
                        <step.icon size={24} />
                      </div>
                      <span className="text-gold-500 font-bold text-sm">Step {step.number}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-ink-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>

                  <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <ul className="space-y-3">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-3">
                            <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden lg:flex justify-center my-4">
                    <div className="w-px h-8 bg-navy-200" />
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="site-container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold-600 font-semibold text-sm tracking-wide uppercase">{page.programs.eyebrow}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-800 mt-3 mb-4">
                {page.programs.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {programs.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-shadow h-full">
                  <h3 className="font-serif font-bold text-ink-800 text-lg mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{p.description}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-ink-700 font-semibold text-sm hover:gap-2.5 transition-all"
                  >
                    Get Started <ArrowRight size={16} />
                  </Link>
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
