import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Trash2, ShieldAlert, Sparkles } from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onBookNewClick: () => void;
}

export default function AppointmentsDashboard({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onBookNewClick
}: AppointmentsDashboardProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-end bg-luxury-black/80 backdrop-blur-md">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slider Drawer Canvas */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="relative bg-white text-luxury-black max-w-md w-full h-full shadow-2xl border-l border-luxury-gold/15 flex flex-col z-10"
      >
        {/* Drawer Header */}
        <div className="bg-luxury-black text-white p-6 md:p-8 flex items-center justify-between border-b border-luxury-gold/10">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-semibold block mb-1">
              Client Portal
            </span>
            <h3 className="font-serif text-lg md:text-xl tracking-wide font-light">
              Your Booked Rituals
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Portal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          <AnimatePresence mode="popLayout">
            {appointments.length === 0 ? (
              // Empty State
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="h-16 w-16 rounded-full bg-luxury-beige border border-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-semibold text-luxury-black">
                    No Scheduled Bookings
                  </h4>
                  <p className="font-sans text-xs text-gray-400 max-w-xs leading-relaxed">
                    You do not have any upcoming luxury treatments scheduled. Pamper yourself by reserving a couture session today.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onBookNewClick();
                  }}
                  className="bg-gold-gradient text-luxury-black font-sans text-xs uppercase tracking-[0.2em] font-bold px-8 py-3.5 rounded-full shadow-md hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                >
                  Book A Ritual
                </button>
              </motion.div>
            ) : (
              // Active Bookings List
              <div className="space-y-4">
                <p className="font-sans text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  Upcoming Reservations ({appointments.length})
                </p>
                {appointments.map((apt) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 rounded-2xl bg-luxury-beige border border-luxury-gold/15 shadow-sm space-y-4 relative overflow-hidden group"
                  >
                    {/* Corner price accent */}
                    <div className="absolute top-4 right-4 text-right">
                      <span className="font-serif text-base font-semibold text-luxury-black">
                        &pound;{apt.price}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* Service Title */}
                      <div className="pr-12">
                        <span className="font-sans text-[8px] uppercase tracking-widest text-luxury-gold bg-luxury-black/5 px-2 py-0.5 rounded-full font-bold">
                          Appointment ID: {apt.id.split('-')[1]?.toUpperCase() || 'LUX'}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-luxury-black mt-2">
                          {apt.serviceName}
                        </h4>
                      </div>

                      {/* Info lines */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3.5 w-3.5 text-luxury-gold" />
                          <span>
                            {new Date(apt.date).toLocaleDateString('en-GB', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3.5 w-3.5 text-luxury-gold" />
                          <span>{apt.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 col-span-2">
                          <User className="h-3.5 w-3.5 text-luxury-gold" />
                          <span>Stylist: {apt.stylistName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="border-t border-luxury-gold/10 pt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-[10px] text-gray-400 font-sans">
                        <ShieldAlert className="h-3.5 w-3.5 text-luxury-gold shrink-0" />
                        <span>Reschedule policy applies</span>
                      </div>
                      
                      <button
                        onClick={() => onCancelAppointment(apt.id)}
                        className="flex items-center space-x-1 text-red-500 hover:text-red-700 text-xs font-sans font-semibold border border-transparent hover:border-red-100 bg-transparent px-2.5 py-1.5 rounded-lg hover:bg-red-50/50 transition-all cursor-pointer"
                        title="Cancel appointment"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex flex-col space-y-3">
          <p className="font-sans text-[9px] text-gray-400 leading-relaxed text-center">
            Need to reschedule? Our concierge can move your slot anytime up to 24 hours in advance at +44 121 243 0944.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
