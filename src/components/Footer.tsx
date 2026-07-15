import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, Phone, MapPin, Mail, ArrowRight, Instagram, Facebook, Twitter, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address.');
      return;
    }

    setIsSubscribed(true);
    setEmail('');
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-luxury-black text-gray-400 font-sans pt-20 pb-8 border-t border-luxury-gold/10 relative overflow-hidden">
      {/* Background ambient gold shine */}
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-luxury-gold/5 blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-gray-900">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-3 group text-left cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold bg-luxury-black transition-transform duration-300 group-hover:scale-105">
                <span className="font-serif text-lg text-luxury-gold tracking-widest pl-0.5">L</span>
              </div>
              <div>
                <span className="block font-serif text-lg text-white tracking-[0.2em] uppercase font-light">
                  LUX SALON
                </span>
                <span className="block font-sans text-[8px] text-luxury-gold uppercase tracking-[0.3em] -mt-0.5 font-medium">
                  United Kingdom
                </span>
              </div>
            </button>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
              An award-winning elite sanctuary of beauty and hair design in Birmingham. We integrate world-class master styling, clinical-grade skincare therapies, and unparalleled comfort to reveal your inner poise.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' }
              ].map((soc, idx) => {
                const IconComponent = soc.icon;
                return (
                  <a
                    key={idx}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="h-9 w-9 rounded-full bg-gray-950 border border-luxury-gold/15 text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black hover:border-luxury-gold transition-all duration-300"
                    aria-label={soc.label}
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-serif text-sm text-white font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-xs uppercase tracking-widest font-semibold">
              {[
                { id: 'about', label: 'About Story' },
                { id: 'why-us', label: 'Why Choose Us' },
                { id: 'services', label: 'Our Services' },
                { id: 'gallery', label: 'Studio Portfolio' },
                { id: 'contact', label: 'Location Map' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="hover:text-luxury-gold transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services categories (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-serif text-sm text-white font-semibold uppercase tracking-wider">
              Popular Rituals
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-light text-gray-500">
              {[
                'Couture Hair Cutting & Finish',
                'Balayage & Bespoke Colouring',
                'Red Carpet Blowout & Styling',
                'Caviar Lift & Firm Facial',
                'Imperial Bridal Makeup',
                '24K Gold Gel Manicure'
              ].map((s, idx) => (
                <li key={idx} className="hover:text-white transition-colors cursor-default">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-serif text-sm text-white font-semibold uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              Subscribe to unlock seasonal couture collections, priority scheduling notifications, and luxury beauty advice.
            </p>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="subscribe-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="space-y-2.5"
                  noValidate
                >
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className={`w-full bg-gray-950 border text-xs text-white rounded-xl pl-4 pr-10 py-3 font-sans outline-none transition-colors duration-300 ${
                        error ? 'border-red-500' : 'border-luxury-gold/25 focus:border-luxury-gold'
                      }`}
                      placeholder="Enter email address..."
                    />
                    <button
                      type="submit"
                      className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-luxury-gold text-luxury-black hover:bg-white hover:text-luxury-black transition-colors flex items-center justify-center cursor-pointer"
                      aria-label="Subscribe button"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {error && <span className="text-[10px] text-red-400 font-sans mt-1 block">{error}</span>}
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl font-sans"
                >
                  <Check className="h-4.5 w-4.5 shrink-0" />
                  <span>Subscribed to LUX Chronicles.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Line Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-widest text-gray-600">
          <div>
            <p>&copy; {new Date().getFullYear()} LUX Salon UK &bull; Birmingham &bull; Est. 2014</p>
          </div>

          {/* Quick Contact Inline */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-500">
            <div className="flex items-center space-x-2">
              <Phone className="h-3.5 w-3.5 text-luxury-gold/50" />
              <span>+44 121 243 0944</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-3.5 w-3.5 text-luxury-gold/50" />
              <span>Birmingham B25 8TN</span>
            </div>
          </div>

          {/* Scroll to Top Trigger */}
          <button
            onClick={handleBackToTop}
            className="flex h-9 w-9 rounded-full border border-gray-800 text-gray-500 items-center justify-center hover:bg-luxury-gold hover:text-luxury-black hover:border-luxury-gold transition-all duration-300 cursor-pointer shadow-md"
            title="Scroll to Top"
          >
            <ChevronUp className="h-4.5 w-4.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
