import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../constants/data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-luxury-beige relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[-15%] h-80 w-80 rounded-full bg-luxury-gold/5 blur-[100px] -z-10" />
      <div className="absolute bottom-[10%] right-[-15%] h-80 w-80 rounded-full bg-luxury-gold/5 blur-[100px] -z-10" />

      <div className="mx-auto max-w-4xl px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
            Questions & Answers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-black tracking-tight font-light mb-6">
            Bespoke Consultation <span className="italic font-normal text-gold-gradient">FAQs</span>
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/50 mx-auto mb-6" />
          <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
            Everything you need to prepare for your premium beauty transformation. Review our guides on arrivals, scheduling, and custom styling.
          </p>
        </div>

        {/* Accordion list container */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300 shadow-sm"
              >
                {/* Accordion Toggle Button */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center space-x-3.5">
                    <HelpCircle className="h-4.5 w-4.5 text-luxury-gold shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-serif text-sm sm:text-base font-semibold text-luxury-black group-hover:text-luxury-gold transition-colors duration-300">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`h-7 w-7 rounded-full bg-luxury-beige text-luxury-gold flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-luxury-black text-luxury-gold' : 'rotate-0'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Collapsible Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-gray-50">
                        <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
