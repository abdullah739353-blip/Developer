import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scissors,
  Sparkles,
  Paintbrush,
  Flame,
  HeartPulse,
  Sun,
  Crown,
  Palette,
  Compass,
  Layers,
  Hand,
  Footprints,
  Gem,
  Clock,
  ArrowRight
} from 'lucide-react';
import { SERVICES } from '../constants/data';
import { Service } from '../types';

interface ServicesProps {
  onServiceSelect: (serviceId: string) => void;
}

// Icon mapper helper
const getIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'Scissors':
      return <Scissors className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Paintbrush':
      return <Paintbrush className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    case 'Crown':
      return <Crown className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Hand':
      return <Hand className={className} />;
    case 'Footprints':
      return <Footprints className={className} />;
    case 'Gem':
      return <Gem className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export default function Services({ onServiceSelect }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Hair' | 'Skin' | 'Makeup' | 'Nails & Waxing' | 'Packages'>('All');

  const categories = [
    { id: 'All', label: 'All Rituals' },
    { id: 'Hair', label: 'Hair Sculpting' },
    { id: 'Skin', label: 'Skin Aesthetics' },
    { id: 'Makeup', label: 'Makeup Artistry' },
    { id: 'Nails & Waxing', label: 'Nails & Waxing' },
    { id: 'Packages', label: 'Bespoke Packages' }
  ];

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'All') return true;
    return service.category === activeCategory;
  });

  return (
    <section id="services" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
            Bespoke Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-black tracking-tight font-light mb-6">
            Elite Beauty & <span className="italic font-normal text-gold-gradient">Wellness Rituals</span>
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/50 mx-auto mb-6" />
          <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
            Every appointment begins with a personal lifestyle consultation. Discover our signature couture treatments designed using premier botanical formulations.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex justify-center mb-16 overflow-x-auto no-scrollbar pb-3 border-b border-gray-100 max-w-4xl mx-auto">
          <div className="flex space-x-2 sm:space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold px-4 sm:px-6 py-3 rounded-full transition-all duration-300 relative whitespace-nowrap cursor-pointer ${
                  activeCategory === category.id
                    ? 'text-white'
                    : 'text-gray-500 hover:text-luxury-black bg-transparent'
                }`}
              >
                {/* Active pill background */}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-luxury-black rounded-full -z-10 shadow-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards Grid with Animations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={service.id}
                className="group relative flex flex-col justify-between bg-white p-8 rounded-2xl border border-luxury-gold/10 hover:border-luxury-gold hover:shadow-xl transition-all duration-300 shadow-sm overflow-hidden clickable"
              >
                {/* Corner Golden Accent */}
                <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-tr from-transparent to-luxury-gold/10 rounded-bl-full transition-all duration-300 group-hover:scale-110" />

                <div>
                  {/* Service Icon & Price Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-luxury-beige text-luxury-gold flex items-center justify-center transition-colors duration-300 group-hover:bg-luxury-black group-hover:text-luxury-gold">
                      {getIcon(service.iconName, 'h-5 w-5')}
                    </div>
                    <div className="text-right">
                      <span className="block font-serif text-2xl text-luxury-black font-semibold tracking-tight group-hover:text-luxury-gold transition-colors duration-300">
                        &pound;{service.price}
                      </span>
                      <div className="flex items-center text-gray-400 text-[10px] uppercase tracking-widest mt-0.5 justify-end">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-serif text-lg text-luxury-black font-semibold tracking-wide mb-3">
                    {service.name}
                  </h3>

                  {/* Service Description */}
                  <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed font-light mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Book Ritual Action CTA */}
                <button
                  onClick={() => onServiceSelect(service.id)}
                  className="w-full flex items-center justify-center space-x-2 bg-luxury-beige text-luxury-black py-3 rounded-xl border border-luxury-gold/20 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-luxury-black hover:text-luxury-gold hover:border-luxury-black transition-all duration-300 group/btn"
                >
                  <span>Book This Ritual</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
