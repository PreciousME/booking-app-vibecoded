'use client';

import React from 'react';
import { TimeSlot as TimeSlotType } from '../lib/types';

interface TimeSlotProps {
    slot: TimeSlotType;
    isSelected: boolean;
    onSelect: () => void;
}

export function TimeSlot({ slot, isSelected, onSelect }: TimeSlotProps) {
    return (
        <button
            className={`w-full py-4 px-5 text-left border-b border-gray-100 last:border-b-0 transition-all flex items-center justify-between
                ${isSelected ? 'bg-white' : 'hover:bg-white'}
                ${!slot.available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
            onClick={slot.available ? onSelect : undefined}
            disabled={!slot.available}
        >
            <span className={`text-[17px] font-semibold text-gray-900`}>
                {slot.time}
            </span>
            {isSelected && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12L10 17L20 7" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </button>
    );
}

interface TimeSlotsGridProps {
    slots: TimeSlotType[];
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
}

export function TimeSlotsGrid({ slots, selectedTime, onSelectTime }: TimeSlotsGridProps) {
    return (
        <div className="flex flex-col animate-fade-in">
            {slots.map((slot) => (
                <TimeSlot
                    key={slot.time}
                    slot={slot}
                    isSelected={selectedTime === slot.time}
                    onSelect={() => onSelectTime(slot.time)}
                />
            ))}
        </div>
    );
}
