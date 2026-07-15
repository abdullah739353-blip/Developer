import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { OPENING_HOURS, SERVICES } from '../constants/data';

export default function Contact() {
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  // Statuses
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Full Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email Address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!message.trim()) newErrors.message = 'Message text is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate luxury API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // reset fields
      setName('');
      setEmail('');
      setPhone('');
      setService('');
      setMessage('');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-black tracking-tight font-light mb-6">
            Begin Your <span className="italic font-normal text-gold-gradient">Transformation</span>
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/50 mx-auto mb-6" />
          <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
            Have custom inquiries, wedding events, or group pampering requests? Reach our Birmingham studio concierge team directly or fill out our luxury consultation form.
          </p>
        </div>

        {/* Contact Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block: Business Info + Opening Hours + Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-luxury-beige p-8 rounded-3xl border border-luxury-gold/15 space-y-6">
              <h3 className="font-serif text-lg text-luxury-black font-semibold tracking-wide">
                Birmingham Studio
              </h3>

              {/* Info Elements */}
              <div className="space-y-4 text-sm font-sans text-gray-600">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-white border border-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block font-bold text-luxury-black text-xs uppercase tracking-wider mb-0.5">
                      Address
                    </span>
                    <p className="font-light leading-relaxed text-xs sm:text-sm text-gray-500">
                      540 Hob Moor Rd<br />
                      Birmingham B25 8TN<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-white border border-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block font-bold text-luxury-black text-xs uppercase tracking-wider mb-0.5">
                      Phone Concierge
                    </span>
                    <a
                      href="tel:+441212430944"
                      className="font-semibold text-luxury-black hover:text-luxury-gold text-xs sm:text-sm transition-colors"
                    >
                      +44 121 243 0944
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening hours list */}
              <div className="border-t border-luxury-gold/10 pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="h-4 w-4 text-luxury-gold" />
                  <span className="font-serif text-sm font-bold text-luxury-black">Opening Hours</span>
                </div>
                <div className="space-y-2.5">
                  {OPENING_HOURS.map((oh) => (
                    <div key={oh.day} className="flex justify-between text-xs font-sans">
                      <span className="text-gray-400 font-light">{oh.day}</span>
                      <span className="font-semibold text-luxury-black">{oh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Embed Map Frame with rounded borders */}
            <div className="rounded-3xl overflow-hidden border border-luxury-gold/15 shadow-md aspect-[16/10] bg-gray-100">
              <iframe
                title="LUX Salon UK Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.4071477755353!2d-1.8315185233159958!3d52.47171447204918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bb7e68db30ad%3A0x8f2eb8b83921868a!2s540%20Hob%20Moor%20Rd%2C%20Birmingham%20B25%208TN%2C%20UK!5e0!3m2!1sen!2suk!4v1710000000000!5m2!1sen!2suk"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Block: Elegant Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-luxury-gold/15 shadow-xl gold-glow relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <div className="border-b border-gray-100 pb-4 mb-4">
                    <h3 className="font-serif text-xl text-luxury-black font-semibold">
                      Luxury Consultation Form
                    </h3>
                    <p className="font-sans text-xs text-gray-400 mt-1">
                      Fill out your details below and a concierge will contact you within 2 business hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name input */}
                    <div>
                      <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm font-sans outline-none transition-all duration-300 focus:bg-white ${
                          errors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-100 focus:border-luxury-gold/60'
                        }`}
                        placeholder="Jane Doe"
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-500 font-sans mt-1 block">{errors.name}</span>
                      )}
                    </div>

                    {/* Email input */}
                    <div>
                      <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm font-sans outline-none transition-all duration-300 focus:bg-white ${
                          errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-100 focus:border-luxury-gold/60'
                        }`}
                        placeholder="jane@example.com"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-500 font-sans mt-1 block">{errors.email}</span>
                      )}
                    </div>

                    {/* Phone input */}
                    <div>
                      <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                        }}
                        className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm font-sans outline-none transition-all duration-300 focus:bg-white ${
                          errors.phone ? 'border-red-400 focus:border-red-400' : 'border-gray-100 focus:border-luxury-gold/60'
                        }`}
                        placeholder="+44 7123 456789"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-500 font-sans mt-1 block">{errors.phone}</span>
                      )}
                    </div>

                    {/* Service selection dropdown */}
                    <div>
                      <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">
                        Interested Service
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 focus:border-luxury-gold/60 focus:bg-white rounded-xl px-4 py-3 text-sm font-sans outline-none transition-all duration-300 text-gray-500"
                      >
                        <option value="">Select a service category...</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name} (&pound;{s.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message body input */}
                    <div className="sm:col-span-2">
                      <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">
                        Your Inquiry Message *
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                        }}
                        className={`w-full bg-gray-50 border rounded-xl p-4 text-sm font-sans outline-none transition-all duration-300 resize-none focus:bg-white ${
                          errors.message ? 'border-red-400 focus:border-red-400' : 'border-gray-100 focus:border-luxury-gold/60'
                        }`}
                        placeholder="Detail your beauty goals or ask any custom scheduling questions..."
                      />
                      {errors.message && (
                        <span className="text-[10px] text-red-500 font-sans mt-1 block">{errors.message}</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-luxury-black text-luxury-gold hover:text-white font-sans text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-xl shadow-lg border border-luxury-gold hover:border-white transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Dispatching Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                // Success message
                <motion.div
                  key="submit-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-luxury-black tracking-wide font-light">
                      Inquiry Dispatched Successfully!
                    </h3>
                    <p className="font-sans text-xs text-gray-500 max-w-sm leading-relaxed mx-auto">
                      Your consultation details have been logged. Our brand concierge will review your message and contact you shortly. We look forward to welcoming you to LUX Salon UK.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-luxury-black text-luxury-gold px-8 py-3 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-luxury-gold hover:text-luxury-black border border-luxury-gold transition-all duration-300 mt-4 cursor-pointer"
                  >
                    Submit Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
