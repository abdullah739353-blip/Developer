import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate luxury loader timing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 600); // Wait for fade-out animation
          }, 400);
          return 100;
        }
        return prev + 2.5;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-luxury-black text-white"
        >
          {/* Ambient visual lights */}
          <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-luxury-gold/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-luxury-gold/5 blur-[120px]" />

          <div className="relative flex flex-col items-center">
            {/* Elegant Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex h-24 w-24 items-center justify-center rounded-full border border-luxury-gold/30 bg-luxury-black mb-6 relative"
            >
              <div className="absolute inset-1.5 rounded-full border border-luxury-gold/10" />
              <span className="font-serif text-4xl text-luxury-gold tracking-widest pl-1">L</span>
            </motion.div>

            {/* Brand Text */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-3xl md:text-4xl text-luxury-gold tracking-[0.25em] font-light mb-1"
            >
              LUX SALON
            </motion.h1>
            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-[10px] text-gray-500 uppercase tracking-[0.4em] mb-12"
            >
              Birmingham &bull; United Kingdom
            </motion.p>

            {/* Progress Bar Container */}
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-gray-900 relative">
              <motion.div
                className="h-full bg-gold-gradient"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Percent Text */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-[9px] text-luxury-gold mt-2 tracking-widest"
            >
              {Math.round(progress)}%
            </motion.span>
          </div>

          {/* Footer Copyright */}
          <div className="absolute bottom-8 text-center">
            <p className="font-sans text-[9px] text-gray-600 uppercase tracking-[0.3em]">
              EST. 2014 &bull; Premium Aesthetics
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
