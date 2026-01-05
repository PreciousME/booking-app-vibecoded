'use client';

import React from 'react';
import { Header } from '../components/Header';
import { StarRating } from '../components/StarRating';
import { useBooking } from '../lib/BookingContext';

export function ReviewConfirmPage() {
    const {
        merchant,
        selectedServices,
        selectedDate,
        selectedTime,
        notes,
        setNotes,
        getTotalPrice,
        getTotalDuration,
        goToPreviousStep,
        goToNextStep,
    } = useBooking();

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="max-w-[430px] mx-auto min-h-screen bg-[#F2F2F7] relative overflow-x-hidden">
            <Header onBack={goToPreviousStep} />

            {/* Main Title */}
            <div className="px-5 mb-6">
                <h1 className="text-2xl font-bold">Review & Confirm</h1>
            </div>

            {/* Merchant Summary - NOT in white container */}
            <div className="px-5 mb-6">
                <div className="flex items-center gap-4">
                    <img
                        src="/images/shop-cover-photo-1.png"
                        alt={merchant.name}
                        className="w-20 h-20 rounded-2xl object-cover"
                    />
                    <div className="flex-1 space-y-1">
                        <h3 className="font-semibold text-[17px]">{merchant.name}</h3>
                        <div className="flex items-center gap-1 text-sm">
                            <span>{merchant.rating}</span>
                            <StarRating rating={merchant.rating} size="sm" />
                            <span className="underline text-gray-500">{merchant.reviewCount}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{merchant.address}</p>
                    </div>
                </div>
            </div>

            {/* Services Card */}
            <div className="mx-4 bg-white rounded-[24px] overflow-hidden mb-6">
                {/* Services */}
                <div className="px-5">
                    {selectedServices.map((service, index) => (
                        <div key={service.id} className={`flex justify-between items-start py-4 ${index !== selectedServices.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <div>
                                <p className="font-medium text-[15px]">{service.name}</p>
                                <p className="text-sm text-gray-500">{service.duration}</p>
                            </div>
                            <span className="font-semibold">£{service.price}</span>
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div className="px-5 py-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Total</span>
                        <span className="text font-bold">£{getTotalPrice()}</span>
                    </div>
                </div>
            </div>

            {/* Date & Time */}
            <div className="px-5 mb-2">
                <h3 className="text font-semibold">Date & Time</h3>
            </div>
            <div className="mx-4 bg-white rounded-[24px] overflow-hidden mb-6">
                <div className="px-5 py-4">
                    <span className="font-medium text-[15px]">
                        {selectedDate && formatDate(selectedDate)}{selectedTime && `, ${selectedTime}`}
                    </span>
                </div>
            </div>

            {/* Payment Method */}
            <div className="px-5 mb-2">
                <h3 className="text font-semibold">Payment method</h3>
            </div>
            <div className="mx-4 bg-white rounded-[24px] overflow-hidden mb-6">
                <div className="px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F2F2F7] rounded-xl flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="2" y="5" width="20" height="14" rx="2" />
                                <path d="M2 10h20" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium text-[15px]">No payment method</p>
                            <p className="text-sm text-gray-500">Add credit/debit card</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-semibold text-gray-900 bg-[#F2F2F7] rounded-full hover:bg-gray-200 transition-colors">Add</button>
                </div>
            </div>

            {/* Notes */}
            <div className="px-5 mb-2">
                <h3 className="text font-semibold">Notes</h3>
            </div>
            <div className="mx-4 bg-white rounded-[24px] overflow-hidden mb-6">
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add comments of requests about your booking"
                    className="w-full min-h-[120px] p-5 text-[15px] bg-white rounded-[24px] resize-none focus:outline-none placeholder:text-gray-400"
                />
            </div>

            {/* Spacer for bottom CTA */}
            <div className="h-32"></div>

            {/* Bottom CTA */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px]">
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
                            className="px-8 py-3 bg-gray-900 text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-colors"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
