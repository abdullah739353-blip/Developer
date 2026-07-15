import { motion } from 'motion/react';
import { Calendar, Compass, Star } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const offsetTop = servicesSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-luxury-black overflow-hidden py-24"
    >
      {/* Cinematic Hero Background with precise overlay filters */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1600"
          alt="Luxury Salon Interior"
          className="h-full w-full object-cover object-center scale-[1.03] filter brightness-[0.38] contrast-[1.05]"
        />
        {/* Gradients to blend sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/70 via-transparent to-luxury-black/70" />
      </div>

      {/* Floating Elegant Gold Elements */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Orb 1 */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360, 0],
            opacity: [0.12, 0.2, 0.12]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-[20%] left-[10%] h-64 w-64 rounded-full bg-luxury-gold/10 blur-[90px]"
        />
        {/* Orb 2 */}
        <motion.div
          animate={{
            y: [0, 40, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-[20%] right-[10%] h-80 w-80 rounded-full bg-luxury-gold/5 blur-[100px]"
        />

        {/* Floating Monograms or shapes */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[15%] top-[25%] hidden md:flex flex-col items-center p-4 rounded-xl border border-luxury-gold/20 glass-morphism-dark opacity-45"
        >
          <Compass className="h-6 w-6 text-luxury-gold animate-pulse mb-1" />
          <span className="font-serif text-[10px] text-luxury-gold tracking-widest uppercase">Est. 2014</span>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 md:px-12 text-center text-white">
        {/* Stars / Trust Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 border border-luxury-gold/35 bg-luxury-black/60 backdrop-blur-md px-4 py-2 rounded-full mb-8"
        >
          <div className="flex text-luxury-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
          <span className="font-sans text-[10px] md:text-xs tracking-wider text-gray-200 uppercase font-medium">
            LUXURY SALON Birmingham &bull; Rated 4.7★ (30 Reviews)
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] mb-8 font-light"
        >
          Luxury Hair &{' '}
          <span className="italic text-gold-gradient font-normal">Beauty</span> Experience
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-sans text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed tracking-wide mb-12 font-light"
        >
          Professional Hair Styling, Beauty Treatments, Hair Colouring, Makeup and Premium Salon
          Services in Birmingham. Indulge in an exquisite environment tailored exclusively to your wellness.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto bg-gold-gradient text-luxury-black font-sans text-xs uppercase tracking-[0.25em] font-bold px-9 py-4.5 rounded-full shadow-[0_4px_30px_rgba(200,169,106,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 group clickable"
          >
            <Calendar className="h-4 w-4 mr-1 transition-transform group-hover:scale-110" />
            <span>Book Appointment</span>
          </button>

          <button
            onClick={scrollToServices}
            className="w-full sm:w-auto bg-transparent text-white border border-luxury-gold/50 font-sans text-xs uppercase tracking-[0.25em] font-semibold px-9 py-4.5 rounded-full hover:bg-luxury-gold/10 hover:border-luxury-gold transition-all duration-300 backdrop-blur-sm clickable"
          >
            Explore Services
          </button>
        </motion.div>
      </div>

      {/* Elegant scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <span className="font-sans text-[8px] text-luxury-gold uppercase tracking-[0.4em] mb-2 font-medium">
            Scroll down
          </span>
          <div className="h-10 w-[1.5px] bg-luxury-gold/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-luxury-gold animate-[bounce_2s_infinite]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
