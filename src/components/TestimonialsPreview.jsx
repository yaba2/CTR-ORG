import { Link } from 'react-router-dom';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useState, useEffect, useRef } from 'react';
import { useCms, usePage } from '../context/CmsContext';

function TestimonialCard({ t }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 relative hover:shadow-lg transition-shadow duration-300 h-full flex flex-col min-w-0">
      <Quote size={28} className="text-gold-300 mb-3" />
      <p className="text-gray-700 leading-relaxed flex-1 mb-5 text-sm sm:text-base">"{t.text}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <div className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center text-white font-serif font-bold text-sm shrink-0">
          {t.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-navy-800 text-sm truncate">{t.name}</div>
          <div className="text-gray-500 text-xs truncate">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsPreview() {
  const { testimonials } = useCms();
  const { testimonials: copy } = usePage('home');
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const total = testimonials.length;

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  useEffect(() => {
    if (isPaused || !total) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, total]);

  if (!total) return null;

  const maxIndex = Math.max(0, total - cardsPerView);
  const safeCurrent = Math.min(current, maxIndex);

  const prev = () => setCurrent((safeCurrent - 1 + total) % total);
  const next = () => setCurrent((safeCurrent + 1) % total);

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < cardsPerView; i++) {
      const idx = (safeCurrent + i) % total;
      cards.push(testimonials[idx]);
    }
    return cards;
  };

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-white overflow-hidden">
      <div className="site-container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-gold-600 font-semibold text-sm tracking-wide uppercase">{copy.eyebrow}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mt-3 mb-4">
              {copy.title}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              {copy.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {getVisibleCards().map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="animate-fade-in"
                style={{ animationDuration: '0.4s' }}
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-navy-700 hover:bg-navy-800 hover:text-white transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-navy-700 hover:bg-navy-800 hover:text-white transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i > maxIndex ? maxIndex : i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i >= safeCurrent && i < safeCurrent + cardsPerView
                  ? 'bg-navy-800 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-10 sm:mt-12">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-navy-700 font-semibold hover:text-navy-900 transition-colors"
            >
              Read More Testimonials
              <span className="text-gold-500">→</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
