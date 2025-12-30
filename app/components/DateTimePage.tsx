'use client';

import React, { useMemo, useEffect } from 'react';
import { Header } from '../components/Header';
import { Calendar } from '../components/Calendar';
import { TimeSlotsGrid } from '../components/TimeSlot';
import { useBooking } from '../lib/BookingContext';
import { generateTimeSlots } from '../lib/data';

export function DateTimePage() {
    const {
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        goToPreviousStep,
        goToNextStep,
        selectedServices,
        getTotalPrice,
        getTotalDuration,
    } = useBooking();

    // Set today as default date when component mounts
    useEffect(() => {
        if (selectedDate === null) {
            setSelectedDate(new Date());
        }
    }, []);

    const timeSlots = useMemo(() => generateTimeSlots(), []);

    const canContinue = selectedDate !== null && selectedTime !== null;

    return (
        <div className="max-w-[430px] mx-auto min-h-screen bg-[#F2F2F7] relative overflow-x-hidden">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 pt-3 pb-2 text-sm font-semibold">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l11 11c.18.18.43.29.71.29.28 0 .53-.11.71-.29l11-11c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z" />
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 22h20V2z" />
                    </svg>
                </div>
            </div>

            {/* Custom Header - No title, just back button */}
            <Header onBack={goToPreviousStep} />

            {/* Main Title */}
            <div className="px-5 mb-6">
                <h1 className="text-2xl font-bold">Select time</h1>
            </div>

            {/* Calendar Section */}
            <div className="px-5 mb-6">
                <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            </div>

            {/* Time Slots - White container */}
            <div className="mx-4 bg-white rounded-[30px] overflow-hidden mb-40">
                <TimeSlotsGrid
                    slots={timeSlots}
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                />
            </div>

            {/* Bottom CTA */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] animate-slide-up">
                <div className="border-gray-100 border-t-[0.75px] bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text font-bold">£{getTotalPrice()}</p>
                            <p className="text-sm text-gray-500">
                                {selectedServices.length} {selectedServices.length === 1 ? 'service' : 'services'} · {getTotalDuration()}
                            </p>
                        </div>
                        <button
                            onClick={goToNextStep}
                            disabled={!canContinue}
                            className="px-8 py-3 bg-gray-900 text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
