import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { usePage } from '../context/CmsContext';

export default function GrandOpening() {
  const { grandOpening } = usePage('home');
  const images = (grandOpening.images || []).filter((image) => image?.src);
  const [current, setCurrent] = useState(0);
  const total = images.length;

  useEffect(() => {
    setCurrent(0);
  }, [total]);

  useEffect(() => {
    if (!total) return undefined;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(interval);
  }, [total]);

  if (!total) return null;

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-white overflow-hidden">
      <div className="site-container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-gold-600 font-semibold text-sm tracking-wide uppercase">{grandOpening.eyebrow}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mt-3 mb-4">
              {grandOpening.title}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              {grandOpening.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="relative max-w-6xl mx-auto">
            <div className="relative h-[300px] sm:h-[520px] lg:h-[680px] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
              {images.map((image, index) => (
                <img
                  key={`${image.src}-${index}`}
                  src={image.src}
                  alt={image.alt || `Grand opening ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                    index === current ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />
            </div>

            <button
              type="button"
              onClick={previousSlide}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center text-navy-800 hover:bg-navy-800 hover:text-white transition-colors"
              aria-label="Previous grand opening image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center text-navy-800 hover:bg-navy-800 hover:text-white transition-colors"
              aria-label="Next grand opening image"
            >
              <ChevronRight size={24} />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {images.map((image, index) => (
                <button
                  key={`${image.src}-dot-${index}`}
                  type="button"
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === current ? 'w-8 bg-navy-800' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to grand opening image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
