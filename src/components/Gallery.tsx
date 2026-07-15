import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { GALLERY_IMAGES } from '../constants/data';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Salon' | 'Hair' | 'Nails' | 'Makeup' | 'Products'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: 'All', label: 'All' },
    { id: 'Salon', label: 'The Studio' },
    { id: 'Hair', label: 'Couture Hair' },
    { id: 'Makeup', label: 'Makeup Glam' },
    { id: 'Nails', label: 'Luxury Nails' },
    { id: 'Products', label: 'Curated' }
  ];

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    if (activeFilter === 'All') return true;
    return img.category === activeFilter;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev! + 1));
    }
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-luxury-beige relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
            Portfolio & Studio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-black tracking-tight font-light mb-6">
            Our Instagram <span className="italic font-normal text-gold-gradient">Inspirations</span>
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/50 mx-auto mb-6" />
          <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
            Witness the transformations created by our master artisans. From red-carpet blowouts to clinical-grade skincare finishes, explore our luxury portfolio.
          </p>
        </div>

        {/* Gallery Filter Tab Bar */}
        <div className="flex justify-center mb-12 overflow-x-auto no-scrollbar pb-2">
          <div className="flex space-x-1 border border-luxury-gold/10 bg-white/60 p-1.5 rounded-full backdrop-blur-md">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`font-sans text-[10px] sm:text-xs uppercase tracking-widest px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 relative cursor-pointer ${
                  activeFilter === filter.id
                    ? 'text-white'
                    : 'text-gray-500 hover:text-luxury-black bg-transparent'
                }`}
              >
                {activeFilter === filter.id && (
                  <motion.div
                    layoutId="activeGalleryFilterBg"
                    className="absolute inset-0 bg-luxury-black rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Bento Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square shadow-sm hover:shadow-xl transition-all duration-500 bg-gray-100 border border-luxury-gold/5 clickable"
              >
                {/* Image */}
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  {/* Icon */}
                  <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <Maximize2 className="h-4 w-4" />
                  </div>

                  {/* Text details */}
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-flex items-center space-x-1 bg-luxury-gold/20 border border-luxury-gold/30 text-luxury-gold font-sans text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2">
                      <Camera className="h-2 w-2 mr-0.5" />
                      <span>{img.category}</span>
                    </span>
                    <h3 className="font-serif text-white text-sm font-semibold tracking-wide">
                      {img.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Immersive Carousel Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-luxury-black/95 backdrop-blur-xl p-4 md:p-8 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-luxury-black hover:scale-105 transition-all duration-300 z-50 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 h-12 w-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/15 hover:border-white transition-all duration-300 z-40 cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 h-12 w-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/15 hover:border-white transition-all duration-300 z-40 cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Stage */}
            <div
              className="relative max-w-5xl max-h-[75vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-full max-h-full flex flex-col items-center justify-center"
                >
                  <img
                    src={filteredImages[lightboxIndex].url}
                    alt={filteredImages[lightboxIndex].title}
                    className="max-w-full max-h-[68vh] object-contain rounded-xl border border-luxury-gold/20 shadow-2xl"
                  />
                  
                  {/* Photo Title */}
                  <div className="text-center mt-6">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold block mb-1">
                      {filteredImages[lightboxIndex].category} Collection
                    </span>
                    <h4 className="font-serif text-white text-lg tracking-wide">
                      {filteredImages[lightboxIndex].title}
                    </h4>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
