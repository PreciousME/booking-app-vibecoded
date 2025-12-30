'use client';

import { BookingProvider } from './lib/BookingContext';
import { BookingFlow } from './components/BookingFlow';

export default function Home() {
  return (
    <BookingProvider>
      <BookingFlow />
    </BookingProvider>
  );
}
