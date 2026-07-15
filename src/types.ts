export interface Service {
  id: string;
  name: string;
  category: 'Hair' | 'Skin' | 'Makeup' | 'Nails & Waxing' | 'Packages';
  price: number;
  duration: string;
  description: string;
  iconName: string; // Lucide icon identifier
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  rating: number;
  image: string;
  bio: string;
  specialties: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  treatment: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: 'Salon' | 'Hair' | 'Nails' | 'Makeup' | 'Products';
  title: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  stylistId: string;
  stylistName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  createdAt: string;
}
