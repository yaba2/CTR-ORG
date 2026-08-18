import { Target, Eye, Shield, Award, Users, TrendingUp } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { usePage } from '../context/CmsContext';

const valueIcons = { Shield, Award, Users, TrendingUp };

export default function About() {
  const page = usePage('about');
  const values = (page.values?.items || []).map((item) => ({
    ...item,
    icon: valueIcons[item.icon] || Shield,
  }));

  return (
    <div className="pt-24">
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-navy-800 to-navy-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
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

      <section className="py-14 sm:py-20 lg:py-28 bg-white">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <ScrollReveal>
              <span className="text-gold-600 font-semibold text-sm tracking-wide uppercase">{page.story.eyebrow}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mt-3 mb-6">
                {page.story.title}
              </h2>
              {page.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-gray-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-6">
                {page.story.stats.map((stat, index) => (
                  <div key={stat.label} className={`${index % 3 === 1 || index === 2 ? 'bg-gold-50' : 'bg-navy-50'} rounded-2xl p-8 text-center`}>
                    <div className={`text-4xl font-bold mb-2 ${index % 3 === 1 || index === 2 ? 'text-gold-600' : 'text-navy-800'}`}>{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28 bg-gray-50">
        <div className="site-container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold-600 font-semibold text-sm tracking-wide uppercase">{page.mission.eyebrow}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mt-3">
                {page.mission.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                <div className="w-14 h-14 bg-navy-50 text-navy-700 rounded-xl flex items-center justify-center mb-5">
                  <Target size={26} />
                </div>
                <h3 className="font-serif font-bold text-navy-800 text-xl mb-4">{page.mission.missionTitle}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {page.mission.mission}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                <div className="w-14 h-14 bg-gold-50 text-gold-600 rounded-xl flex items-center justify-center mb-5">
                  <Eye size={26} />
                </div>
                <h3 className="font-serif font-bold text-navy-800 text-xl mb-4">{page.mission.visionTitle}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {page.mission.vision}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28 bg-white">
        <div className="site-container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-gold-600 font-semibold text-sm tracking-wide uppercase">{page.values.eyebrow}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mt-3">
                {page.values.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 100}>
                <div className="bg-gray-50 rounded-2xl p-7 hover:shadow-md transition-shadow h-full">
                  <div className="w-12 h-12 bg-navy-800 text-gold-400 rounded-xl flex items-center justify-center mb-4">
                    <v.icon size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-navy-800 text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
