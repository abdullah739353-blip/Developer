import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Compass, Heart } from 'lucide-react';

function Counter({ value, suffix = '', duration = 1500 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(progress * value);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-serif">
      {Number(count).toFixed(value % 1 === 0 ? 0 : 1)}
      {suffix}
    </span>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState<'story' | 'mission' | 'values'>('story');

  const tabContents = {
    story: {
      title: 'Our Heritage',
      text: 'Founded in 2014 in the heart of Birmingham, LUX Salon UK has established itself as an elite sanctuary for discerning clients seeking couture hair and luxury beauty treatments. We believe that hair and beauty are forms of self-expression and personal fine art. Our award-winning therapists and master stylists study international trends from London, Paris, and Milan to deliver bespoke services that reveal your organic radiance.'
    },
    mission: {
      title: 'Our Mission & Vision',
      text: 'Our mission is to offer an exceptional bespoke experience that integrates creative hair-artistry, clinical-grade skincare relaxation, and a calm, indulgent environment. We envision a world where luxury beauty acts as an empowering ritual of self-care. At LUX Salon, we reject cookie-cutter styling, dedicating detailed attention to every client to sculpt a look that feels uniquely, impeccably yours.'
    },
    values: {
      title: 'Our Core Values',
      text: 'Integrity, artistry, and tailored customer care define every ritual we perform. We use exclusively premium, sustainable, cruelty-free botanicals. Our stylists engage in continuous global education to master cutting-edge chemical applications and scalp therapies, guaranteeing safety, clinical accuracy, and gorgeous finishes in every single treatment.'
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Exquisite Overlapping Image Layout */}
          <div className="lg:col-span-5 relative">
            {/* Background luxury shape */}
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-luxury-beige rounded-full -z-10" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-luxury-gold/5 rounded-full -z-10" />
            
            {/* Primary Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl border border-luxury-gold/10 aspect-[3/4]"
            >
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800"
                alt="Hair Styling Treatment"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              {/* Overlay golden filter */}
              <div className="absolute inset-0 bg-luxury-gold/5 pointer-events-none mix-blend-overlay" />
            </motion.div>

            {/* Overlapping Secondary Image */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-10 -right-6 md:-right-10 w-1/2 overflow-hidden rounded-xl shadow-2xl border-4 border-white aspect-square hidden sm:block"
            >
              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600"
                alt="Precision Stylist Cutting"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Right Side: Narrative and Tabs */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Overtitle */}
              <span className="block font-sans text-xs uppercase tracking-[0.35em] text-luxury-gold font-semibold mb-3">
                Uncompromising Aesthetics
              </span>
              
              {/* Section Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-black tracking-tight mb-8 font-light leading-tight">
                Crafting Personal Icons & <br />
                <span className="italic font-normal text-gold-gradient">Luxury Beauty</span>
              </h2>

              {/* Story / Tab Navigation */}
              <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
                {(['story', 'mission', 'values'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-sans text-xs uppercase tracking-[0.2em] font-semibold pb-4 mr-8 border-b-2 transition-all duration-300 relative whitespace-nowrap cursor-pointer ${
                      activeTab === tab
                        ? 'text-luxury-gold border-luxury-gold'
                        : 'text-gray-400 border-transparent hover:text-luxury-black'
                    }`}
                  >
                    {tab === 'story' ? 'Our Story' : tab === 'mission' ? 'Mission & Vision' : 'Artistic Values'}
                  </button>
                ))}
              </div>

              {/* Tab Text Content */}
              <div className="min-h-[140px] mb-12">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed font-light">
                    {tabContents[activeTab].text}
                  </p>
                </motion.div>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                
                {/* Stat 1 */}
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl text-luxury-gold font-serif font-light mb-1">
                    <Counter value={30} suffix="+" />
                  </div>
                  <p className="font-sans text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest leading-snug">
                    Client Reviews
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl text-luxury-gold font-serif font-light mb-1">
                    <Counter value={4.7} suffix="★" />
                  </div>
                  <p className="font-sans text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest leading-snug">
                    Average Rating
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl text-luxury-gold font-serif font-light mb-1">
                    <Counter value={100} suffix="%" />
                  </div>
                  <p className="font-sans text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest leading-snug">
                    Professional Care
                  </p>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
