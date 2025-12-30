'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Service, BookingStep, Merchant } from './types';
import { merchant as defaultMerchant } from './data';

interface BookingContextType {
    // Current step
    currentStep: BookingStep;
    setCurrentStep: (step: BookingStep) => void;

    // Merchant
    merchant: Merchant;

    // Selected services
    selectedServices: Service[];
    addService: (service: Service) => void;
    removeService: (serviceId: string) => void;
    isServiceSelected: (serviceId: string) => boolean;

    // Date & Time
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    selectedTime: string | null;
    setSelectedTime: (time: string | null) => void;

    // Notes
    notes: string;
    setNotes: (notes: string) => void;

    // Payment
    paymentMethod: 'none' | 'card' | 'cash';
    setPaymentMethod: (method: 'none' | 'card' | 'cash') => void;

    // Totals
    getTotalPrice: () => number;
    getTotalDuration: () => string;

    // Navigation
    goToNextStep: () => void;
    goToPreviousStep: () => void;

    // Reset
    resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [currentStep, setCurrentStep] = useState<BookingStep>('merchant');
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [notes, setNotes] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'none' | 'card' | 'cash'>('none');

    const merchant = defaultMerchant;

    const addService = (service: Service) => {
        setSelectedServices((prev) => [...prev, service]);
    };

    const removeService = (serviceId: string) => {
        setSelectedServices((prev) => prev.filter((s) => s.id !== serviceId));
    };

    const isServiceSelected = (serviceId: string) => {
        return selectedServices.some((s) => s.id === serviceId);
    };

    const getTotalPrice = () => {
        return selectedServices.reduce((sum, service) => sum + service.price, 0);
    };

    const getTotalDuration = () => {
        // Parse duration strings and sum them up
        let totalMinutes = 0;
        selectedServices.forEach((service) => {
            // Parse "1 hour" or "45 mins" etc
            const duration = service.duration.toLowerCase();
            if (duration.includes('hour')) {
                const hours = parseInt(duration) || 1;
                totalMinutes += hours * 60;
            } else if (duration.includes('min')) {
                const mins = parseInt(duration) || 0;
                totalMinutes += mins;
            }
        });

        if (totalMinutes === 0) return '0 mins';
        if (totalMinutes < 60) return `${totalMinutes} mins`;
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        if (mins === 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
        return `${hours}h ${mins}m`;
    };

    const stepOrder: BookingStep[] = ['merchant', 'services', 'datetime', 'review', 'confirmation'];

    const goToNextStep = () => {
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex < stepOrder.length - 1) {
            setCurrentStep(stepOrder[currentIndex + 1]);
        }
    };

    const goToPreviousStep = () => {
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(stepOrder[currentIndex - 1]);
        }
    };

    const resetBooking = () => {
        setCurrentStep('merchant');
        setSelectedServices([]);
        setSelectedDate(null);
        setSelectedTime(null);
        setNotes('');
        setPaymentMethod('none');
    };

    return (
        <BookingContext.Provider
            value={{
                currentStep,
                setCurrentStep,
                merchant,
                selectedServices,
                addService,
                removeService,
                isServiceSelected,
                selectedDate,
                setSelectedDate,
                selectedTime,
                setSelectedTime,
                notes,
                setNotes,
                paymentMethod,
                setPaymentMethod,
                getTotalPrice,
                getTotalDuration,
                goToNextStep,
                goToPreviousStep,
                resetBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
