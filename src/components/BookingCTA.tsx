import { motion } from 'motion/react';
import { Calendar, PhoneCall } from 'lucide-react';

interface BookingCTAProps {
  onBookClick: () => void;
}

export default function BookingCTA({ onBookClick }: BookingCTAProps) {
  return (
    <section className="relative py-24 bg-luxury-black overflow-hidden flex items-center justify-center">
      {/* Blurred background luxury lights */}
      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-luxury-gold/10 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-luxury-gold/10 blur-[100px]" />

      {/* Repeating fine pattern or subtle overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.95),rgba(22,22,22,0.95))] pointer-events-none" />

      {/* Decorative center gold line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-luxury-gold/20 to-transparent hidden lg:block" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo element */}
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-luxury-gold bg-luxury-black text-luxury-gold mb-2">
            <span className="font-serif text-base tracking-widest pl-0.5">L</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight font-light">
            Ready for Your Next <br />
            <span className="italic font-normal text-gold-gradient">Transformation?</span>
          </h2>

          <div className="h-[1.5px] w-16 bg-luxury-gold mx-auto" />

          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed font-light">
            Reserve your bespoke consultation and pamper session. Let Elena, Marcus, and our team of licensed aestheticians craft your personal masterwork.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto bg-gold-gradient text-luxury-black font-sans text-xs uppercase tracking-[0.2em] font-bold px-8 py-4 rounded-full shadow-lg hover:scale-[1.03] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>Book Appointment</span>
            </button>

            <a
              href="tel:+441212430944"
              className="w-full sm:w-auto bg-transparent text-white border border-luxury-gold/50 hover:border-luxury-gold hover:bg-luxury-gold/10 font-sans text-xs uppercase tracking-[0.2em] font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <PhoneCall className="h-4 w-4 shrink-0" />
              <span>Call Concierge</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
