'use client';

import React from 'react';
import { useBooking } from '../lib/BookingContext';

export function ConfirmationPage() {
    const {
        merchant,
        selectedDate,
        selectedTime,
        resetBooking,
    } = useBooking();

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="max-w-[430px] mx-auto min-h-screen bg-[#F2F2F7] relative overflow-x-hidden">
            {/* Success Content */}
            <div className="flex flex-col items-center px-5 pt-20 text-center animate-fade-in">
                {/* Success Icon - Black circle with checkmark */}
                <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold mb-8">Booking confirmed</h1>
            </div>

            {/* Booking Details Card */}
            <div className="mx-4 bg-white rounded-[24px] overflow-hidden mb-6">
                {/* Merchant */}
                <div className="px-5 py-5">
                    <p className="text-sm text-gray-400 mb-1">Merchant</p>
                    <p className="text-[17px] font-semibold">{merchant.name}</p>
                </div>

                {/* Date */}
                <div className="px-5 py-5 border-t border-gray-100">
                    <p className="text-sm text-gray-400 mb-1">Date</p>
                    <p className="text-[17px] font-semibold">{selectedDate && formatDate(selectedDate)}</p>
                </div>

                {/* Time */}
                <div className="px-5 py-5 border-t border-gray-100">
                    <p className="text-sm text-gray-400 mb-1">Time</p>
                    <p className="text-[17px] font-semibold">{selectedTime}</p>
                </div>
            </div>

            {/* Bottom Actions - Not fixed, just at bottom of page */}
            <div className="px-4 pb-8">
                <button
                    onClick={resetBooking}
                    className="w-full py-4 bg-gray-900 text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-colors mb-3"
                >
                    Done
                </button>
                <button className="w-full py-4 bg-white text-gray-900 rounded-full text-base font-semibold hover:bg-gray-50 transition-colors">
                    Add to calender
                </button>
            </div>
        </div>
    );
}
