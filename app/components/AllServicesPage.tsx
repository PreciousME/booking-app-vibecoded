'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ServiceCard } from '../components/ServiceCard';
import { useBooking } from '../lib/BookingContext';
import { categories } from '../lib/data';

export function AllServicesPage() {
    const { merchant, selectedServices, setCurrentStep, goToPreviousStep, getTotalPrice, getTotalDuration } = useBooking();
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    const filteredServices = merchant.services.filter(
        (service) => service.category === activeCategory
    );

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

            <Header title="All services" onBack={goToPreviousStep} />

            {/* Category Tabs */}
            <div className="flex gap-2 px-5 overflow-x-auto scrollbar-hide mb-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all
                            ${activeCategory === cat
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'border-gray-200 text-gray-900 hover:border-gray-900'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Services List */}
            <div className="mx-4 bg-white rounded-[30px] overflow-hidden mb-40">
                <div className="py-2">
                    {filteredServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>

                {filteredServices.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No services in this category
                    </div>
                )}
            </div>

            {/* Bottom CTA */}
            {selectedServices.length > 0 && (
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
                                onClick={() => setCurrentStep('datetime')}
                                className="px-8 py-3 bg-gray-900 text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
