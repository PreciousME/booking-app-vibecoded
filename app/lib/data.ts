import { Merchant, TimeSlot } from './types';

export const merchant: Merchant = {
    id: '1',
    name: 'Precious Beauty Shop',
    rating: 4.2,
    reviewCount: 59,
    address: '24 Abeokuta Way, NBC 340, Nigeria',
    about: `Welcome to our beauty studio, where expert care meets a calm, uplifting atmosphere. We specialize in salon services designed to enhance your natural beauty — from flawless facials and rejuvenating treatments to precision nail care, creative hair styling and professional waxing. Whether you're preparing for a special event or enjoying self-care time, our experienced team is here to help you look and feel your absolute best.

Using only high-quality products and techniques tailored to your needs, we provide a relaxing, personalized experience every visit. Your beauty, our passion — we're here to make it effortless.`,
    images: [
        '/images/service-1.jpg',
        '/images/service-2.jpg',
        '/images/service-3.jpg',
        '/images/service-4.jpg',
    ],
    services: [
        { id: '1', name: 'Builder gel infills with gel polish', duration: '1 hour', price: 35, category: 'Gellows' },
        { id: '2', name: 'Builder gel infills with gel polish', duration: '1 hour', price: 35, category: 'Gellows' },
        { id: '3', name: 'Builder gel infills with gel polish', duration: '1 hour', price: 35, category: 'Gellows' },
        { id: '4', name: 'Builder gel infills with gel polish', duration: '1 hour', price: 35, category: 'Gellows' },
        { id: '5', name: 'Deluxe Manicure', duration: '45 min', price: 25, category: 'Nails' },
        { id: '6', name: 'Gel Polish Application', duration: '30 min', price: 20, category: 'Nails' },
        { id: '7', name: 'Deep Hydration Facial', duration: '1 hour', price: 55, category: 'Facials' },
        { id: '8', name: 'Anti-Aging Treatment', duration: '1.5 hours', price: 75, category: 'Facials' },
        { id: '9', name: 'Full Leg Wax', duration: '45 min', price: 40, category: 'Waxing' },
        { id: '10', name: 'Bikini Wax', duration: '30 min', price: 30, category: 'Waxing' },
    ],
    reviews: [
        {
            id: '1',
            author: 'Julia Doe',
            rating: 5,
            date: 'Nov 22, 2024',
            comment: 'Excellent service',
        },
        {
            id: '2',
            author: 'Julia Doe',
            rating: 5,
            date: 'Nov 20, 2024',
            comment: 'Excellent service',
        },
    ],
    openingHours: [
        { day: 'Monday', hours: '9:00 am - 8:00 pm' },
        { day: 'Tuesday', hours: '9:00 am - 8:00 pm' },
        { day: 'Wednesday', hours: '9:00 am - 8:00 pm' },
        { day: 'Thursday', hours: '9:00 am - 8:00 pm' },
        { day: 'Friday', hours: '9:00 am - 8:00 pm' },
        { day: 'Saturday', hours: 'Closed' },
        { day: 'Sunday', hours: 'Closed' },
    ],
    phone: '+234 123 456 7890',
};

export const categories = ['Gellows', 'Nails', 'Facials', 'Waxing'];

export const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const times = [
        '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
        '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
        '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm',
        '5:00 pm', '5:30 pm', '6:00 pm',
    ];

    times.forEach((time) => {
        slots.push({
            time,
            available: Math.random() > 0.3, // Random availability for demo
        });
    });

    return slots;
};
