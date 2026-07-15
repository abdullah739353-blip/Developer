import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants/data';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHovered) {
      autoplayTimer.current = setInterval(() => {
        handleNext();
      }, 6000);
    }

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
    };
  }, [isHovered]);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative luxury elements */}
      <div className="absolute top-[30%] left-[-10%] h-96 w-96 rounded-full bg-luxury-gold/5 blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] right-[-15%] h-96 w-96 rounded-full bg-luxury-gold/5 blur-[120px] -z-10 animate-pulse" />

      <div className="mx-auto max-w-5xl px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
            Client Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-black tracking-tight font-light mb-6">
            Words From Our <span className="italic font-normal text-gold-gradient">Gilded Guests</span>
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/50 mx-auto mb-6" />
        </div>

        {/* Testimonial Slider Stage */}
        <div
          className="relative px-4 sm:px-12 md:px-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Card Stage */}
          <div className="relative min-h-[360px] md:min-h-[290px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full bg-luxury-beige p-8 md:p-14 rounded-3xl border border-luxury-gold/15 shadow-xl relative text-center flex flex-col items-center gold-glow"
              >
                {/* Decorative golden big quote */}
                <div className="absolute -top-7 text-luxury-gold bg-white p-3.5 rounded-full border border-luxury-gold/20 shadow-md">
                  <Quote className="h-6 w-6 fill-current rotate-180" />
                </div>

                {/* Stars */}
                <div className="flex text-luxury-gold mb-6 space-x-1 justify-center">
                  {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="font-serif text-base sm:text-lg md:text-xl text-luxury-charcoal tracking-wide leading-relaxed font-light mb-8 italic max-w-3xl">
                  &ldquo;{TESTIMONIALS[activeIndex].review}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="mt-auto">
                  <cite className="not-italic font-serif text-sm sm:text-base text-luxury-black font-semibold block tracking-wide">
                    {TESTIMONIALS[activeIndex].name}
                  </cite>
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-luxury-gold mt-1.5 block font-medium">
                    {TESTIMONIALS[activeIndex].treatment} &bull; {new Date(TESTIMONIALS[activeIndex].date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Arrow Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-[-5px] sm:left-[-12px] top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-luxury-gold/30 bg-white/80 backdrop-blur-md text-luxury-black flex items-center justify-center hover:bg-luxury-black hover:text-luxury-gold hover:border-luxury-black transition-all duration-300 shadow-md z-10 cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-[-5px] sm:right-[-12px] top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-luxury-gold/30 bg-white/80 backdrop-blur-md text-luxury-black flex items-center justify-center hover:bg-luxury-black hover:text-luxury-gold hover:border-luxury-black transition-all duration-300 shadow-md z-10 cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bullet Progress Pagination */}
        <div className="flex justify-center mt-10 space-x-2.5">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === index ? 'w-8 bg-luxury-gold' : 'w-2 bg-gray-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
