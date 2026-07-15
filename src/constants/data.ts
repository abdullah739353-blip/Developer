import { Service, Stylist, Testimonial, GalleryImage, FAQItem } from '../types';

export const SERVICES: Service[] = [
  // HAIR CUTTING & STYLING
  {
    id: 'hair-cutting',
    name: 'Couture Hair Cutting & Finish',
    category: 'Hair',
    price: 65,
    duration: '60 mins',
    description: 'Bespoke consult, luxury wash with scalp massage, signature cut, and a premium salon blowout.',
    iconName: 'Scissors'
  },
  {
    id: 'hair-styling',
    name: 'Red Carpet Blowout & Styling',
    category: 'Hair',
    price: 45,
    duration: '45 mins',
    description: 'Signature luxury blowout, customized volume, loose curls, or sleek glass finish using high-end tools.',
    iconName: 'Sparkles'
  },
  {
    id: 'hair-colouring',
    name: 'Balayage & Bespoke Colouring',
    category: 'Hair',
    price: 145,
    duration: '150 mins',
    description: 'Expert hand-painted golden hues or full multidimensional highlights, completed with custom gloss toner.',
    iconName: 'Paintbrush'
  },
  {
    id: 'hair-spa',
    name: 'Botanical Hair & Scalp Spa',
    category: 'Hair',
    price: 55,
    duration: '50 mins',
    description: 'Deep conditioning treatment with vapor mist, nourishing oils, and an ultra-relaxing acupressure scalp massage.',
    iconName: 'Sparkles'
  },
  {
    id: 'hair-treatments',
    name: 'Olaplex Bond Rebuilder',
    category: 'Hair',
    price: 60,
    duration: '45 mins',
    description: 'Premium active molecular system designed to repair and reinforce compromised hair bonds from root to tip.',
    iconName: 'Flame'
  },
  {
    id: 'keratin-treatment',
    name: 'Premium Keratin Smoothing',
    category: 'Hair',
    price: 195,
    duration: '180 mins',
    description: 'Intense protein restructuring to eliminate frizz, seal cuticle, and deliver dazzling shine for up to 4 months.',
    iconName: 'Sparkles'
  },

  // SKIN CARE
  {
    id: 'facial',
    name: 'Caviar Lift & Firm Facial',
    category: 'Skin',
    price: 85,
    duration: '75 mins',
    description: 'Regenerating skin treatment infused with premium caviar extract, micro-current contouring, and cold therapy.',
    iconName: 'HeartPulse'
  },
  {
    id: 'skin-care',
    name: 'Hydra-Infusion Glow Skin Care',
    category: 'Skin',
    price: 75,
    duration: '60 mins',
    description: 'Advanced multi-step deep vacuum exfoliation, salicylic cleansing, and heavy peptide/antioxidant serums infusion.',
    iconName: 'Sun'
  },

  // MAKEUP
  {
    id: 'bridal-makeup',
    name: 'Imperial Bridal Makeup Artistry',
    category: 'Makeup',
    price: 250,
    duration: '120 mins',
    description: 'High-definition trial & wedding-day luxury makeup, premium strip lashes, and whole-day airbrush setting.',
    iconName: 'Crown'
  },
  {
    id: 'party-makeup',
    name: 'Sultry Soiree & Party Makeup',
    category: 'Makeup',
    price: 80,
    duration: '60 mins',
    description: 'Flawless glamorous camera-ready full face makeup with professional contouring and signature eyeshadow drama.',
    iconName: 'Palette'
  },

  // NAILS & WAXING
  {
    id: 'eyebrow-threading',
    name: 'Signature Eyebrow Design & Thread',
    category: 'Nails & Waxing',
    price: 18,
    duration: '20 mins',
    description: 'Surgical-precision threading contouring tailored to your facial bone structure and brow density.',
    iconName: 'Compass'
  },
  {
    id: 'waxing',
    name: 'Smooth Silk Waxing (Full Body)',
    category: 'Nails & Waxing',
    price: 90,
    duration: '90 mins',
    description: 'Ultra-gentle professional hypoallergenic hot wax strip treatment leaving the skin impeccably silky and soft.',
    iconName: 'Layers'
  },
  {
    id: 'manicure',
    name: '24K Gold Gel Manicure',
    category: 'Nails & Waxing',
    price: 45,
    duration: '45 mins',
    description: 'Nail shaping, premium cuticle care, gold dust scrub, hand hydration massage, and indestructible gel lacquer finish.',
    iconName: 'Hand'
  },
  {
    id: 'pedicure',
    name: 'Royal Botanical Pedicure Spa',
    category: 'Nails & Waxing',
    price: 55,
    duration: '60 mins',
    description: 'Deep foot soak in essential oils, rose scrub exfoliation, hot stone heel massage, and ultimate gel finishing.',
    iconName: 'Footprints'
  },

  // PACKAGES
  {
    id: 'luxury-beauty-package',
    name: 'LUX Imperial Signature Ritual',
    category: 'Packages',
    price: 280,
    duration: '240 mins',
    description: 'The ultimate royal pampering: Couture Cut & Styling, Hydra-Infusion Glow Facial, and 24K Gold Gel Manicure.',
    iconName: 'Gem'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Master Hairstyle Director',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600',
    bio: 'With over 12 years of experience in London and Milan, Elena specializes in high-fashion editorial haircuts and structural styling.',
    specialties: ['Couture Cuts', 'Red Carpet Styling', 'Keratin Treatments']
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Art Director & Master Colourist',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600',
    bio: 'Marcus is a renowned balayage artist who has trained globally. He creates stunning, multidimensional, natural-looking hair colour.',
    specialties: ['Balayage Colouring', 'Bespoke Highlights', 'Olaplex Treatments']
  },
  {
    id: 'sophia',
    name: 'Sophia Sterling',
    role: 'Senior Makeup & Beauty Artist',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600',
    bio: 'Sophia is the bridal beauty icon of the West Midlands, specializing in clean airbrush artistry and facial sculpting.',
    specialties: ['Imperial Bridal Makeup', 'Party Glamour', 'Skin Consultations']
  },
  {
    id: 'amara',
    name: 'Amara Vance',
    role: 'Senior Aesthetician & Spa Specialist',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600',
    bio: 'Amara delivers clinical-grade skincare relaxation. She specializes in deep hydra-facials and royal body wellness rituals.',
    specialties: ['Caviar Facials', 'Hydra-Infusion', 'Hot Stone Pedicures']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Victoria Pemberton',
    rating: 5,
    review: 'LUX Salon is simply the gold standard of beauty. Elena completely transformed my hair with a custom couture cut and blowout. The ivory interior, the complementary champagne, the sublime head massage—it feels like stepping into a Parisian palace.',
    date: '2026-06-18',
    treatment: 'Couture Hair Cutting'
  },
  {
    id: 't2',
    name: 'Lady Henrietta Cavendish',
    rating: 5,
    review: 'Marcus Vance is a absolute genius with colour. I have been looking for an expert Balayage stylist for years in Birmingham, and Marcus exceeded every expectation. The multi-dimensional blonde tones look incredibly expensive and natural.',
    date: '2026-07-02',
    treatment: 'Balayage Colouring'
  },
  {
    id: 't3',
    name: 'Charlotte Dubois',
    rating: 5,
    review: 'I booked the Imperial Bridal Makeup Package for my wedding day, and Sophia Sterling made me feel like royalty. The airbrush finish survived 14 hours of dancing and crying. Truly professional, calming, and exceptionally talented.',
    date: '2026-07-10',
    treatment: 'Imperial Bridal Makeup'
  },
  {
    id: 't4',
    name: 'Dr. Evelyn Hawthorne',
    rating: 5,
    review: 'The Caviar Lift Facial with Amara was magnificent. The atmosphere is quiet, deeply relaxing, and highly sophisticated. My skin has never looked so firm, luminous, and youthful. I have already booked my next appointment.',
    date: '2026-07-12',
    treatment: 'Caviar Lift & Firm Facial'
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800',
    category: 'Salon',
    title: 'Luxury Salon Studio Interior'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800',
    category: 'Hair',
    title: 'Relaxing Botanical Scalp Therapy'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800',
    category: 'Hair',
    title: 'Precision Hairstyling'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1620331708272-91361c47285f?q=80&w=800',
    category: 'Hair',
    title: 'Multidimensional Balayage Highlights'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800',
    category: 'Products',
    title: 'Hydra-Infusion Facial Therapy'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800',
    category: 'Makeup',
    title: 'Flawless Imperial Bridal Glamour'
  },
  {
    id: 'g7',
    url: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=800',
    category: 'Products',
    title: 'LUX Signature Beauty Products'
  },
  {
    id: 'g8',
    url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800',
    category: 'Nails',
    title: '24K Gold Gel Manicure Polish'
  },
  {
    id: 'g9',
    url: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=800',
    category: 'Nails',
    title: 'Royal Botanical Pedicure Soak'
  },
  {
    id: 'g10',
    url: 'https://images.unsplash.com/photo-1593150501174-d58ce972e00e?q=80&w=800',
    category: 'Hair',
    title: 'Couture Shear Precision Haircut'
  },
  {
    id: 'g11',
    url: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=800',
    category: 'Makeup',
    title: 'High-Definition Glamour Palette'
  },
  {
    id: 'g12',
    url: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=800',
    category: 'Salon',
    title: 'The LUX Reception Experience'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How far in advance should I book my appointment?',
    answer: 'We highly recommend booking at least 1 to 2 weeks in advance for weekdays, and 3 to 4 weeks in advance for prime weekend slots, particularly for master stylists Elena and Marcus.'
  },
  {
    id: 'faq2',
    question: 'What is your cancellation or rescheduling policy?',
    answer: 'We understand schedules change. We require at least 24 hours notice to cancel or reschedule appointments without charge. Cancellations under 24 hours may incur a fee of 50% of the service cost.'
  },
  {
    id: 'faq3',
    question: 'Do you offer bridal trials, and can I bring guests?',
    answer: 'Yes! Our Imperial Bridal Makeup package includes a comprehensive, relaxed trial session at our studio. You are welcome to bring up to two guests to enjoy our premium tea and champagne selection during your consultation.'
  },
  {
    id: 'faq4',
    question: 'Which hair care and beauty product lines do you use?',
    answer: 'We use exclusively premium, organic, cruelty-free luxury brands such as Olaplex, Oribe, Kérastase, and Charlotte Tilbury to protect and enhance your natural beauty.'
  },
  {
    id: 'faq5',
    question: 'Is there parking available at the Birmingham studio?',
    answer: 'Yes, LUX Salon UK features private, secure guest parking at our Hob Moor Road location. Valet service is also available upon request for premium imperial package appointments.'
  }
];

export const OPENING_HOURS = [
  { day: 'Monday', hours: '10:00 AM - 06:00 PM' },
  { day: 'Tuesday', hours: '09:00 AM - 07:00 PM' },
  { day: 'Wednesday', hours: '09:00 AM - 07:00 PM' },
  { day: 'Thursday', hours: '09:00 AM - 08:00 PM' }, // Late night
  { day: 'Friday', hours: '09:00 AM - 08:00 PM' }, // Late night
  { day: 'Saturday', hours: '09:00 AM - 06:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 04:00 PM' }
];
