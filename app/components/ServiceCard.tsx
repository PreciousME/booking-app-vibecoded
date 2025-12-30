'use client';

import React from 'react';
import { Service } from '../lib/types';
import { useBooking } from '../lib/BookingContext';

interface ServiceCardProps {
    service: Service;
    showCategory?: boolean;
}

export function ServiceCard({ service, showCategory = false }: ServiceCardProps) {
    const { isServiceSelected, addService, removeService } = useBooking();
    const isSelected = isServiceSelected(service.id);

    const handleToggle = () => {
        if (isSelected) {
            removeService(service.id);
        } else {
            addService(service);
        }
    };

    return (
        <div className="border-b border-gray-100 last:border-b-0 animate-fade-in">
            <div className="flex justify-between items-center py-4 px-5">
                {/* Left: Service details stacked vertically */}
                <div className="flex-1">
                    {showCategory && (
                        <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">
                            {service.category}
                        </span>
                    )}
                    <h4 className="text-[16px] font-semibold text-gray-900 mb-0.5">{service.name}</h4>
                    <p className="text-[13px] text-gray-400 mb-1">{service.duration}</p>
                    <p className="text-[15px] font-semibold text-gray-900">£{service.price}</p>
                </div>

                {/* Right: Just the button */}
                <button
                    onClick={handleToggle}
                    className={`w-12 h-12 bg-[#F2F2F7] rounded-full flex items-center justify-center transition-all text-lg
                        ${isSelected
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-400 hover:text-gray-900'
                        }`}
                    aria-label={isSelected ? 'Remove service' : 'Add service'}
                >
                    {isSelected ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12L9 18L21 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20M4 12H20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
