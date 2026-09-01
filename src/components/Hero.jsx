import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Briefcase, Heart } from 'lucide-react';
import { usePage } from '../context/CmsContext';

export default function Hero() {
  const { hero } = usePage('home');
  const backgroundImage = hero.backgroundImage;

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 overflow-hidden">
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-950/70" />
        </>
      ) : (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-400 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-300 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative site-container py-24 sm:py-32 lg:py-36">
        <div className={`grid items-center ${backgroundImage ? 'max-w-3xl' : 'lg:grid-cols-2 gap-12'}`}>
          <div>
            <div className="inline-flex items-center gap-2 bg-gold-200/15 border border-gold-200/40 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <div className="w-2 h-2 bg-gold-200 rounded-full" />
              <span className="text-gold-200 text-sm font-medium">{hero.badge}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 sm:mb-6 animate-fade-in-up">
              {hero.title}{' '}
              <span className="text-gold-200">{hero.titleHighlight}</span>
            </h1>

            <p className="text-navy-200 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-lg animate-fade-in-up animate-delay-200">
              {hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fade-in-up animate-delay-300">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 bg-gold-500 text-navy-900 rounded-lg font-semibold hover:bg-gold-400 transition-all shadow-lg hover:shadow-xl hover:shadow-gold-500/20 text-sm sm:text-base"
              >
                {hero.primaryCta}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/students"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20 text-sm sm:text-base"
              >
                {hero.secondaryCta}
              </Link>
            </div>

            <div className="mt-8 sm:mt-12 flex items-center gap-5 sm:gap-8 animate-fade-in-up animate-delay-400">
              {hero.stats.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-5 sm:gap-8">
                  {index > 0 && <div className="w-px h-12 bg-navy-600" />}
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-navy-300 text-xs sm:text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`hidden lg:block relative ${backgroundImage ? 'lg:hidden' : ''}`}>
            <div className="relative animate-fade-in">
              <svg viewBox="0 0 500 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
                <rect x="60" y="40" width="380" height="280" rx="20" fill="#1a2846" stroke="#34508c" strokeWidth="2"/>
                <rect x="80" y="60" width="340" height="240" rx="12" fill="#0d1423"/>
                <rect x="100" y="80" width="300" height="200" rx="8" fill="#1a2846"/>
                <circle cx="250" cy="170" r="60" fill="#34508c" opacity="0.3"/>
                <circle cx="250" cy="170" r="40" fill="#4164af" opacity="0.4"/>
                <path d="M230 170 L250 150 L270 170 L250 190 Z" fill="#e5a830" opacity="0.8"/>
                <rect x="120" y="100" width="80" height="8" rx="4" fill="#6783bf" opacity="0.5"/>
                <rect x="120" y="120" width="60" height="8" rx="4" fill="#6783bf" opacity="0.3"/>
                <rect x="300" y="100" width="80" height="8" rx="4" fill="#6783bf" opacity="0.5"/>
                <rect x="300" y="120" width="60" height="8" rx="4" fill="#6783bf" opacity="0.3"/>
                <rect x="120" y="230" width="260" height="6" rx="3" fill="#34508c" opacity="0.3"/>
                <rect x="120" y="248" width="180" height="6" rx="3" fill="#34508c" opacity="0.2"/>
                <rect x="120" y="266" width="220" height="6" rx="3" fill="#34508c" opacity="0.2"/>
                <circle cx="150" cy="310" r="25" fill="#1a2846" stroke="#34508c" strokeWidth="2"/>
                <circle cx="150" cy="302" r="9" fill="#6783bf"/>
                <path d="M133 318 Q150 330 167 318" fill="#6783bf"/>
                <circle cx="250" cy="310" r="25" fill="#1a2846" stroke="#34508c" strokeWidth="2"/>
                <circle cx="250" cy="302" r="9" fill="#8da2cf"/>
                <path d="M233 318 Q250 330 267 318" fill="#8da2cf"/>
                <circle cx="350" cy="310" r="25" fill="#1a2846" stroke="#34508c" strokeWidth="2"/>
                <circle cx="350" cy="302" r="9" fill="#e5a830"/>
                <path d="M333 318 Q350 330 367 318" fill="#e5a830"/>
                <rect x="120" y="350" width="260" height="40" rx="10" fill="#1a2846" stroke="#34508c" strokeWidth="1.5"/>
                <rect x="140" y="362" width="60" height="16" rx="4" fill="#e5a830" opacity="0.7"/>
                <rect x="210" y="362" width="40" height="16" rx="4" fill="#34508c" opacity="0.5"/>
                <rect x="260" y="362" width="50" height="16" rx="4" fill="#34508c" opacity="0.5"/>
                <path d="M60 320 L40 380 L80 380 Z" fill="#e5a830" opacity="0.15"/>
                <path d="M440 320 L460 380 L420 380 Z" fill="#e5a830" opacity="0.15"/>
                <circle cx="440" cy="60" r="8" fill="#e5a830" opacity="0.4"/>
                <circle cx="460" cy="90" r="5" fill="#e5a830" opacity="0.3"/>
                <circle cx="60" cy="70" r="6" fill="#6783bf" opacity="0.4"/>
                <circle cx="40" cy="100" r="4" fill="#6783bf" opacity="0.3"/>
                <rect x="180" y="140" width="140" height="60" rx="8" fill="#1a2846" stroke="#e5a830" strokeWidth="1" opacity="0.6"/>
                <path d="M220 160 L250 175 L280 160" stroke="#e5a830" strokeWidth="2" fill="none" opacity="0.6"/>
                <rect x="210" y="180" width="80" height="4" rx="2" fill="#6783bf" opacity="0.4"/>
              </svg>

              <div className="absolute -top-4 -right-4 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-2xl p-4 animate-fade-in-up animate-delay-100 shadow-lg">
                <div className="w-10 h-10 bg-blue-500/30 text-blue-300 rounded-lg flex items-center justify-center mb-2">
                  <BookOpen size={20} />
                </div>
                <span className="text-white text-xs font-semibold">Research & Development</span>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-4 animate-fade-in-up animate-delay-200 shadow-lg">
                <div className="w-10 h-10 bg-emerald-500/30 text-emerald-300 rounded-lg flex items-center justify-center mb-2">
                  <Users size={20} />
                </div>
                <span className="text-white text-xs font-semibold">Academic Support</span>
              </div>

              <div className="absolute top-1/2 -right-8 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 rounded-2xl p-4 animate-fade-in-up animate-delay-300 shadow-lg">
                <div className="w-10 h-10 bg-amber-500/30 text-amber-300 rounded-lg flex items-center justify-center mb-2">
                  <Briefcase size={20} />
                </div>
                <span className="text-white text-xs font-semibold">Consultation</span>
              </div>

              <div className="absolute top-1/3 -left-8 bg-rose-500/20 backdrop-blur-md border border-rose-400/30 rounded-2xl p-4 animate-fade-in-up animate-delay-400 shadow-lg">
                <div className="w-10 h-10 bg-rose-500/30 text-rose-300 rounded-lg flex items-center justify-center mb-2">
                  <Heart size={20} />
                </div>
                <span className="text-white text-xs font-semibold">Therapy & Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
