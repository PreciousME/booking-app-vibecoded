export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  category: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Merchant {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  about: string;
  images: string[];
  services: Service[];
  reviews: Review[];
  openingHours: {
    day: string;
    hours: string;
  }[];
  phone: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingData {
  merchant: Merchant;
  services: Service[];
  date: Date | null;
  time: string | null;
  notes: string;
  paymentMethod: 'none' | 'card' | 'cash';
}

export type BookingStep = 'merchant' | 'services' | 'datetime' | 'review' | 'confirmation';
