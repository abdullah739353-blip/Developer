import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar } from 'lucide-react';

import { Appointment } from './types';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import BookingCTA from './components/BookingCTA';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BookingWizard from './components/BookingWizard';
import AppointmentsDashboard from './components/AppointmentsDashboard';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [showMobileStickyBar, setShowMobileStickyBar] = useState(false);

  // Load appointments from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lux_appointments');
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error parsing stored appointments:', e);
    }

    // Scroll listener for mobile sticky booking button
    const handleScroll = () => {
      setShowMobileStickyBar(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save appointments to localStorage
  const saveAppointments = (newApts: Appointment[]) => {
    setAppointments(newApts);
    try {
      localStorage.setItem('lux_appointments', JSON.stringify(newApts));
    } catch (e) {
      console.error('Error writing appointments to localStorage:', e);
    }
  };

  const handleBookingSuccess = (newApt: Appointment) => {
    const updated = [newApt, ...appointments];
    saveAppointments(updated);
  };

  const handleCancelAppointment = (id: string) => {
    const filtered = appointments.filter((apt) => apt.id !== id);
    saveAppointments(filtered);
  };

  const handleServiceSelect = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const triggerGeneralBooking = () => {
    setPreselectedServiceId(undefined);
    setIsBookingOpen(true);
  };

  return (
    <>
      {/* 1. Immersive Luxury Welcome Loading Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* Main Content Area (Unveiled once load state is ready) */}
      {!isLoading && (
        <div className="font-sans antialiased text-luxury-charcoal selection:bg-luxury-gold/20 relative">
          
          {/* 2. Custom Gold Ring Cursor (Desktop only) */}
          <CustomCursor />

          {/* 3. Sticky Header Navigation Bar */}
          <Navbar
            onBookClick={triggerGeneralBooking}
            onAppointmentsClick={() => setIsDashboardOpen(true)}
            appointmentsCount={appointments.length}
          />

          {/* 4. Luxury Cinematic Hero Area */}
          <Hero onBookClick={triggerGeneralBooking} />

          {/* 5. Salon Heritage Story & Values */}
          <About />

          {/* 6. Precision Value Pillars Cards */}
          <WhyChooseUs />

          {/* 7. Comprehensive Service Treatment Menu */}
          <Services onServiceSelect={handleServiceSelect} />

          {/* 8. Conversion-focused Booking Banner */}
          <BookingCTA onBookClick={triggerGeneralBooking} />

          {/* 9. Bento Portfolio Gallery with Lightbox */}
          <Gallery />

          {/* 10. Reviews & Testimonials Draggable Carousel */}
          <Testimonials />

          {/* 11. Custom FAQ Accordion */}
          <FAQ />

          {/* 12. Contact Hub: Hours, Interactive Map, Forms */}
          <Contact />

          {/* 13. Luxury Dark-themed Footer */}
          <Footer />

          {/* 14. Dedicated Floating WhatsApp Liaison */}
          <FloatingWhatsApp />

          {/* 15. Sticky Booking Button on Mobile Viewports */}
          <AnimatePresence>
            {showMobileStickyBar && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-0 left-0 right-0 z-40 bg-luxury-black/95 backdrop-blur-md border-t border-luxury-gold/20 px-6 py-4 flex items-center justify-between lg:hidden"
              >
                <div>
                  <span className="block font-serif text-sm text-white font-semibold">LUX Salon UK</span>
                  <span className="block font-sans text-[10px] text-luxury-gold uppercase tracking-wider -mt-0.5">
                    Artisan beauty studio
                  </span>
                </div>
                <button
                  onClick={triggerGeneralBooking}
                  className="bg-gold-gradient text-luxury-black font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg cursor-pointer"
                >
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>Reserve Slot</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 16. Multi-step Interactive Booking Funnel Modal */}
          <AnimatePresence>
            {isBookingOpen && (
              <BookingWizard
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                initialServiceId={preselectedServiceId}
                onBookingSuccess={handleBookingSuccess}
              />
            )}
          </AnimatePresence>

          {/* 17. Client Booked Appointments Sliding Sidebar Drawer */}
          <AnimatePresence>
            {isDashboardOpen && (
              <AppointmentsDashboard
                isOpen={isDashboardOpen}
                onClose={() => setIsDashboardOpen(false)}
                appointments={appointments}
                onCancelAppointment={handleCancelAppointment}
                onBookNewClick={triggerGeneralBooking}
              />
            )}
          </AnimatePresence>

        </div>
      )}
    </>
  );
}
