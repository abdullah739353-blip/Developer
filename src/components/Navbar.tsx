import { Menu, X, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onBookClick: () => void;
  onAppointmentsClick: () => void;
  appointmentsCount: number;
}

export default function Navbar({ onBookClick, onAppointmentsClick, appointmentsCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple scroll spy logic
      const scrollPosition = window.scrollY + 120;
      const sections = ['hero', ...navLinks.map((link) => link.id)];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // height of sticky navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-luxury-black/95 border-b border-luxury-gold/10 py-3.5 shadow-xl backdrop-blur-md'
            : 'bg-gradient-to-b from-black/80 to-transparent py-6'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
          {/* Logo brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 group text-left cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold bg-luxury-black transition-all duration-300 group-hover:scale-105">
              <span className="font-serif text-lg text-luxury-gold tracking-widest pl-0.5">L</span>
            </div>
            <div>
              <span className="block font-serif text-lg md:text-xl text-white tracking-[0.2em] uppercase font-light">
                LUX SALON
              </span>
              <span className="block font-sans text-[8px] text-luxury-gold uppercase tracking-[0.3em] -mt-0.5 font-medium">
                United Kingdom
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`font-sans text-xs uppercase tracking-[0.25em] font-medium transition-colors duration-300 relative py-1 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-luxury-gold font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {/* Active Indicator Line */}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-luxury-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Appointments Dashboard Trigger */}
            <button
              onClick={onAppointmentsClick}
              className="relative p-2.5 rounded-full border border-luxury-gold/30 bg-luxury-black/30 text-luxury-gold hover:text-white hover:border-white transition-colors duration-300 group cursor-pointer"
              title="Your Appointments"
            >
              <CalendarCheck className="h-4 w-4" />
              {appointmentsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-luxury-black font-sans text-[9px] font-bold">
                  {appointmentsCount}
                </span>
              )}
            </button>

            {/* Book Now Button */}
            <button
              onClick={onBookClick}
              className="bg-gold-gradient text-luxury-black hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-semibold gold-glow cursor-pointer"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Right Icons (Appointments + Menu Trigger) */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={onAppointmentsClick}
              className="relative p-2 rounded-full border border-luxury-gold/30 bg-luxury-black/30 text-luxury-gold"
            >
              <CalendarCheck className="h-4 w-4" />
              {appointmentsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-luxury-black font-sans text-[9px] font-bold">
                  {appointmentsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-luxury-gold transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[70px] z-40 lg:hidden bg-luxury-black/98 border-t border-luxury-gold/10 backdrop-blur-lg overflow-y-auto"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left font-sans text-sm uppercase tracking-[0.3em] py-2 border-b border-gray-900 transition-colors duration-200 ${
                    activeSection === link.id ? 'text-luxury-gold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-6 flex flex-col space-y-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onAppointmentsClick();
                  }}
                  className="flex items-center justify-center space-x-3 border border-luxury-gold/40 text-luxury-gold py-3 rounded-full font-sans text-xs uppercase tracking-[0.2em] hover:bg-luxury-gold/10"
                >
                  <CalendarCheck className="h-4 w-4" />
                  <span>My Appointments ({appointmentsCount})</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="bg-gold-gradient text-luxury-black py-3 rounded-full font-sans text-xs uppercase tracking-[0.25em] font-bold text-center shadow-lg"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
