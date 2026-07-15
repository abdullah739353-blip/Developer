import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 5 seconds to grab attention gracefully
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppRedirect = () => {
    // Salon phone number: +44 121 243 0944
    const url = `https://wa.me/441212430944?text=Hello%20LUX%20Salon%20UK,%20I%20would%20like%20to%20inquire%20about%20your%20services.`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="pointer-events-auto mb-3 max-w-xs rounded-xl bg-luxury-black text-white p-3.5 shadow-xl border border-luxury-gold/30 text-xs text-right select-none relative"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-luxury-black font-bold text-[9px] hover:bg-white transition-colors duration-200 pointer-events-auto"
            >
              ×
            </button>
            <p className="font-serif text-luxury-gold font-medium mb-1">LUX Concierge</p>
            <p className="text-gray-300 font-sans leading-relaxed">
              Have questions? Let our beauty concierge assist you instantly on WhatsApp.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleWhatsAppRedirect}
        onMouseEnter={() => setShowTooltip(true)}
        className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-luxury-black text-luxury-gold shadow-2xl border border-luxury-gold hover:text-white hover:border-white transition-all duration-300 gold-glow hover:scale-105 active:scale-95 group"
        aria-label="Chat on WhatsApp"
        id="whatsapp-floating-btn"
      >
        {/* Pulsing glow effect */}
        <span className="absolute inset-0 rounded-full bg-luxury-gold/20 animate-ping" />
        <MessageCircle className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
      </button>
    </div>
  );
}
