import { motion } from 'motion/react';
import { Award, Gem, UserCheck, Coins, Sparkles, Heart } from 'lucide-react';

interface FeatureItem {
  id: string;
  icon: any;
  title: string;
  description: string;
}

export default function WhyChooseUs() {
  const features: FeatureItem[] = [
    {
      id: 'stylists',
      icon: Award,
      title: 'Experienced Stylists',
      description: 'Our award-winning hair directors have trained at top academies in London, Milan, and Paris, bringing global runway expertise straight to Birmingham.'
    },
    {
      id: 'products',
      icon: Gem,
      title: 'Luxury Products',
      description: 'We believe your hair and skin deserve only the finest. We use organic, luxury-certified formulas from Olaplex, Oribe, Kérastase, and Charlotte Tilbury.'
    },
    {
      id: 'experts',
      icon: UserCheck,
      title: 'Professional Beauty Experts',
      description: 'Our licensed skin aestheticians and makeup artists deliver high-definition results customized meticulously to your specific bone structure and skin type.'
    },
    {
      id: 'luxury',
      icon: Coins,
      title: 'Affordable Luxury',
      description: 'Indulge in an incredibly premium experience—complete with complimentary champagne, custom consulting, and elite comfort—at highly transparent prices.'
    },
    {
      id: 'equipment',
      icon: Sparkles,
      title: 'Modern Equipment',
      description: 'Our boutique studio features advanced vapor scalp steamers, ergonomic washbeds, clinical-grade facial light therapies, and high-precision tools.'
    },
    {
      id: 'service',
      icon: Heart,
      title: 'Friendly Service',
      description: 'Step into a warm, serene sanctuary. Our dedicated concierge and helpful staff treat you with the warmth and personal care of a long-term friend.'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="why-us" className="py-24 md:py-32 bg-luxury-beige relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-60 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold/5 rounded-full opacity-60 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
            Why LUX Salon
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-black tracking-tight font-light mb-6">
            The Golden Standard of <span className="italic font-normal text-gold-gradient">Client Care</span>
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/50 mx-auto mb-6" />
          <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
            We transcend standard cosmetic pampering to deliver an exquisite luxury ritual of rejuvenation, leaving you profoundly confident and glowing.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="bg-white p-8 md:p-10 rounded-2xl border border-luxury-gold/10 hover:border-luxury-gold transition-all duration-300 shadow-sm hover:shadow-xl gold-glow-hover flex flex-col group clickable"
              >
                {/* Icon Circle */}
                <div className="h-14 w-14 rounded-full bg-luxury-beige text-luxury-gold flex items-center justify-center mb-6 group-hover:bg-luxury-black group-hover:text-luxury-gold transition-all duration-300">
                  <IconComponent className="h-6 w-6 transition-transform duration-500 group-hover:rotate-12" />
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-lg text-luxury-black font-semibold tracking-wide mb-3 group-hover:text-luxury-gold transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
