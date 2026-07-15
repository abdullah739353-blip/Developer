import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Clock,
  User,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  Gem,
  Award,
  Star
} from 'lucide-react';
import { SERVICES, STYLISTS } from '../constants/data';
import { Service, Stylist, Appointment } from '../types';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  onBookingSuccess: (appointment: Appointment) => void;
}

export default function BookingWizard({
  isOpen,
  onClose,
  initialServiceId,
  onBookingSuccess
}: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // Validation error states
  const [validationError, setValidationError] = useState('');

  // Handle pre-filled initial service selection on open
  useEffect(() => {
    if (initialServiceId) {
      const service = SERVICES.find((s) => s.id === initialServiceId);
      if (service) {
        setSelectedService(service);
        setCurrentStep(2); // Jump straight to stylist selection!
      }
    } else {
      setSelectedService(null);
      setCurrentStep(1);
    }
  }, [initialServiceId, isOpen]);

  // Reset wizard state on close or success reset
  const resetWizard = () => {
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate('');
    setSelectedTime('');
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setValidationError('');
    setCurrentStep(1);
  };

  if (!isOpen) return null;

  // Generate date slots for next 14 days (excluding Sundays/Mondays depending on selection or styling them)
  const getDateSlots = () => {
    const slots = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      
      const dayName = futureDate.toLocaleDateString('en-GB', { weekday: 'short' });
      const dayNum = futureDate.getDate();
      const monthName = futureDate.toLocaleDateString('en-GB', { month: 'short' });
      const fullDateStr = futureDate.toISOString().split('T')[0]; // YYYY-MM-DD
      
      slots.push({
        dayName,
        dayNum,
        monthName,
        fullDateStr,
        dayOfWeek: futureDate.getDay() // 0 is Sunday, 1 is Monday, etc.
      });
    }
    return slots;
  };

  // Generate times slots (e.g., late nights on Thursday/Friday, early closing Sundays)
  const getTimeSlots = (dateString: string) => {
    if (!dateString) return [];
    const dateObj = new Date(dateString);
    const dayOfWeek = dateObj.getDay();

    const normalHours = [
      '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ];

    if (dayOfWeek === 4 || dayOfWeek === 5) {
      // Thursday or Friday - late nights
      return [...normalHours, '06:00 PM', '07:00 PM'];
    }
    if (dayOfWeek === 0) {
      // Sunday - early close
      return ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];
    }
    
    return normalHours;
  };

  const handleNextStep = () => {
    setValidationError('');
    
    if (currentStep === 1 && !selectedService) {
      setValidationError('Please select a service to proceed.');
      return;
    }
    if (currentStep === 2 && !selectedStylist) {
      setValidationError('Please select a stylist (or Any Stylist) to proceed.');
      return;
    }
    if (currentStep === 3 && (!selectedDate || !selectedTime)) {
      setValidationError('Please select an available date and time slot.');
      return;
    }
    if (currentStep === 4) {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        setValidationError('Please complete all required fields (*).');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setValidationError('Please enter a valid email address.');
        return;
      }

      // Build and trigger success
      const newAppointment: Appointment = {
        id: `apt-${Math.random().toString(36).substr(2, 9)}`,
        serviceId: selectedService!.id,
        serviceName: selectedService!.name,
        price: selectedService!.price,
        stylistId: selectedStylist!.id,
        stylistName: selectedStylist!.name,
        date: selectedDate,
        time: selectedTime,
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        notes: notes || undefined,
        createdAt: new Date().toISOString()
      };

      onBookingSuccess(newAppointment);
      setCurrentStep(5); // Transition to success step
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setValidationError('');
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-luxury-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white text-luxury-black max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-luxury-gold/15 max-h-[92vh] flex flex-col"
      >
        {/* Header Block */}
        <div className="bg-luxury-black text-white p-6 md:p-8 flex items-center justify-between border-b border-luxury-gold/10">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-semibold block mb-1">
              LUX Imperial Booking
            </span>
            <h3 className="font-serif text-lg sm:text-xl tracking-wide font-light">
              {currentStep === 5 ? 'Booking Confirmed' : 'Configure Your Salon Experience'}
            </h3>
          </div>
          {currentStep < 5 && (
            <button
              onClick={() => {
                resetWizard();
                onClose();
              }}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close Booking"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Step Progress Bar */}
        {currentStep < 5 && (
          <div className="bg-gray-100 h-1.5 w-full flex">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-full transition-all duration-500 flex-1 ${
                  currentStep >= step ? 'bg-gold-gradient' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        )}

        {/* Content Body Area */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 max-h-[62vh]">
          {/* Validation error message */}
          {validationError && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-xs font-sans">
              <AlertCircle className="h-4.5 w-4.5 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: Select Service */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <p className="font-sans text-xs text-gray-500 uppercase tracking-widest font-semibold">
                  Step 1: Choose Luxury Service
                </p>
                <div className="grid grid-cols-1 gap-4 max-h-[350px] overflow-y-auto pr-1 no-scrollbar">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                        selectedService?.id === service.id
                          ? 'bg-luxury-beige border-luxury-gold shadow-md'
                          : 'bg-white border-gray-100 hover:border-luxury-gold/50 hover:bg-luxury-beige/20'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                            selectedService?.id === service.id
                              ? 'bg-luxury-black text-luxury-gold'
                              : 'bg-luxury-beige text-luxury-gold'
                          }`}
                        >
                          <Gem className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-semibold text-luxury-black">
                            {service.name}
                          </h4>
                          <p className="font-sans text-[11px] text-gray-500 mt-1 max-w-sm sm:max-w-md line-clamp-2 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right pl-3 shrink-0">
                        <span className="font-serif text-base font-semibold block text-luxury-black">
                          &pound;{service.price}
                        </span>
                        <span className="font-sans text-[9px] text-gray-400 block uppercase tracking-wider mt-0.5">
                          {service.duration}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Choose Stylist */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <p className="font-sans text-xs text-gray-500 uppercase tracking-widest font-semibold">
                  Step 2: Choose Artisan Stylist
                </p>

                {/* Any Stylist Option */}
                <button
                  onClick={() =>
                    setSelectedStylist({
                      id: 'any',
                      name: 'Any Available Artisan',
                      role: 'Recommended Stylist',
                      rating: 4.8,
                      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=200',
                      bio: 'Let us pair you with our available expert matching your exact service selection perfectly.',
                      specialties: ['All services']
                    })
                  }
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    selectedStylist?.id === 'any'
                      ? 'bg-luxury-beige border-luxury-gold shadow-md'
                      : 'bg-white border-gray-100 hover:border-luxury-gold/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full border border-luxury-gold/40 bg-luxury-black text-luxury-gold flex items-center justify-center">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-luxury-black">
                        Any Available Stylist (Recommended)
                      </h4>
                      <p className="font-sans text-[11px] text-gray-500 mt-0.5">
                        Guarantees the best available time slot match.
                      </p>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-luxury-gold flex items-center justify-center">
                    {selectedStylist?.id === 'any' && (
                      <div className="h-2.5 w-2.5 bg-luxury-gold rounded-full" />
                    )}
                  </div>
                </button>

                {/* Stylist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[250px] overflow-y-auto pr-1 no-scrollbar">
                  {STYLISTS.map((stylist) => (
                    <button
                      key={stylist.id}
                      onClick={() => setSelectedStylist(stylist)}
                      className={`text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                        selectedStylist?.id === stylist.id
                          ? 'bg-luxury-beige border-luxury-gold shadow-md'
                          : 'bg-white border-gray-100 hover:border-luxury-gold/50'
                      }`}
                    >
                      <img
                        src={stylist.image}
                        alt={stylist.name}
                        className="h-14 w-14 rounded-full object-cover border border-luxury-gold/20"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-sm font-semibold text-luxury-black">
                            {stylist.name}
                          </h4>
                          <span className="font-sans text-[10px] text-luxury-gold font-bold flex items-center gap-0.5">
                            <Star className="h-2.5 w-2.5 fill-current" />
                            {stylist.rating}
                          </span>
                        </div>
                        <p className="font-sans text-[10px] text-gray-500 tracking-wider">
                          {stylist.role}
                        </p>
                        <p className="font-sans text-[10px] text-gray-400 line-clamp-2 mt-1 italic">
                          &ldquo;{stylist.bio}&rdquo;
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Choose Date & Time */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <p className="font-sans text-xs text-gray-500 uppercase tracking-widest font-semibold">
                  Step 3: Schedule Date & Time
                </p>

                {/* Date Horizon Slider */}
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-400 mb-3 font-semibold">
                    Select Appointment Date
                  </label>
                  <div className="flex space-x-3 overflow-x-auto pb-3 no-scrollbar">
                    {getDateSlots().map((slot) => {
                      const isSunday = slot.dayOfWeek === 0;
                      return (
                        <button
                          key={slot.fullDateStr}
                          disabled={slot.dayOfWeek === 1} // Monday Closed
                          onClick={() => {
                            setSelectedDate(slot.fullDateStr);
                            setSelectedTime(''); // reset time on date change
                          }}
                          className={`flex flex-col items-center justify-center p-3.5 min-w-[65px] rounded-2xl border transition-all duration-300 cursor-pointer ${
                            selectedDate === slot.fullDateStr
                              ? 'bg-luxury-black text-white border-luxury-black shadow-lg scale-102'
                              : slot.dayOfWeek === 1
                              ? 'bg-gray-50 border-gray-100 text-gray-300 opacity-50 cursor-not-allowed'
                              : 'bg-white border-gray-100 hover:border-luxury-gold/50'
                          }`}
                        >
                          <span className="font-sans text-[9px] uppercase tracking-wider text-gray-400">
                            {slot.dayOfWeek === 1 ? 'Closed' : slot.dayName}
                          </span>
                          <span className="font-serif text-lg font-bold mt-1.5">
                            {slot.dayNum}
                          </span>
                          <span className="font-sans text-[9px] tracking-wider uppercase mt-1">
                            {slot.monthName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Grid */}
                <AnimatePresence mode="wait">
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-400 mb-3 font-semibold">
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {getTimeSlots(selectedDate).map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 rounded-xl border text-xs font-sans font-semibold tracking-wider text-center transition-all duration-300 cursor-pointer ${
                              selectedTime === time
                                ? 'bg-luxury-gold text-luxury-black border-luxury-gold shadow-md'
                                : 'bg-white border-gray-100 hover:border-luxury-gold/50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* STEP 4: Add Contacts & Finalize */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <p className="font-sans text-xs text-gray-500 uppercase tracking-widest font-semibold">
                  Step 4: Review & Finalize
                </p>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 focus:border-luxury-gold/60 focus:bg-white rounded-xl px-4 py-3 text-sm font-sans outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 focus:border-luxury-gold/60 focus:bg-white rounded-xl px-4 py-3 text-sm font-sans outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div>
                      <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+44 7123 456789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 focus:border-luxury-gold/60 focus:bg-white rounded-xl px-4 py-3 text-sm font-sans outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">
                      Special Requests / Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please let us know if you have any allergies or styling preferences..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 focus:border-luxury-gold/60 focus:bg-white rounded-xl p-4 text-sm font-sans outline-none transition-all duration-300 resize-none"
                    />
                  </div>
                </div>

                {/* Fine Summary Breakdown */}
                <div className="p-5 rounded-2xl bg-luxury-beige border border-luxury-gold/15 space-y-3.5">
                  <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-luxury-black border-b border-luxury-gold/10 pb-2">
                    Reservation Summary
                  </h5>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-sans">
                    <div>
                      <span className="text-gray-400">Treatment:</span>
                      <p className="font-semibold text-luxury-black mt-0.5">
                        {selectedService?.name}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Duration & Cost:</span>
                      <p className="font-semibold text-luxury-black mt-0.5">
                        {selectedService?.duration} &bull; &pound;{selectedService?.price}
                      </p>
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-400">Artisan Stylist:</span>
                      <p className="font-semibold text-luxury-black mt-0.5">
                        {selectedStylist?.name}
                      </p>
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-400">Date & Time:</span>
                      <p className="font-semibold text-luxury-black mt-0.5">
                        {selectedDate && new Date(selectedDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} &bull; {selectedTime}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Success Receipt Card */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6 flex flex-col items-center"
              >
                <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-2xl text-luxury-black tracking-wide font-light">
                    Your Ritual is Booked!
                  </h4>
                  <p className="font-sans text-xs text-gray-500 max-w-sm leading-relaxed">
                    Thank you, <span className="font-semibold text-luxury-black">{name}</span>. An elegant confirmation receipt has been dispatched to your email (<span className="text-luxury-black font-medium">{email}</span>).
                  </p>
                </div>

                {/* Interactive Receipt */}
                <div className="w-full max-w-sm border-2 border-dashed border-luxury-gold/20 p-6 rounded-2xl bg-luxury-beige/45 space-y-4 text-left">
                  <div className="flex justify-between items-center border-b border-luxury-gold/15 pb-3">
                    <span className="font-serif text-xs font-semibold text-luxury-gold uppercase tracking-widest">
                      Receipt Code
                    </span>
                    <span className="font-mono text-xs font-semibold text-luxury-black">
                      LUX-{Math.floor(100000 + Math.random() * 900000)}
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs font-sans">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Service:</span>
                      <span className="font-semibold text-luxury-black text-right max-w-[200px]">
                        {selectedService?.name}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Stylist:</span>
                      <span className="font-semibold text-luxury-black">{selectedStylist?.name}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="font-semibold text-luxury-black">
                        {selectedDate && new Date(selectedDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Time Slot:</span>
                      <span className="font-semibold text-luxury-black">{selectedTime}</span>
                    </div>

                    <div className="flex justify-between border-t border-luxury-gold/15 pt-3 font-serif text-sm">
                      <span className="font-bold text-luxury-gold uppercase tracking-widest">
                        Total Due:
                      </span>
                      <span className="font-bold text-luxury-black">&pound;{selectedService?.price}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col space-y-2.5 w-full max-w-sm">
                  <p className="font-sans text-[10px] text-gray-400 leading-relaxed text-center">
                    Please arrive 10 minutes prior to your slot to enjoy our complimentary tea and champagne ritual. Secure parking is reserved under your name.
                  </p>
                  <button
                    onClick={() => {
                      resetWizard();
                      onClose();
                    }}
                    className="w-full bg-luxury-black text-luxury-gold py-3.5 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 mt-4 cursor-pointer"
                  >
                    Done & Return
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation Bar */}
        {currentStep < 5 && (
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
            {currentStep > 1 ? (
              <button
                onClick={handlePrevStep}
                className="flex items-center space-x-1 text-gray-500 hover:text-luxury-black text-xs font-sans font-bold cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNextStep}
              className="bg-gold-gradient text-luxury-black font-sans text-xs uppercase tracking-[0.2em] font-bold px-7 py-3 rounded-full flex items-center space-x-2 group cursor-pointer"
            >
              <span>{currentStep === 4 ? 'Confirm & Book' : 'Continue'}</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
