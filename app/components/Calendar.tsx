'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';

interface CalendarProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
    const today = new Date();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [sheetMonth, setSheetMonth] = useState(today.getMonth());
    const [sheetYear, setSheetYear] = useState(today.getFullYear());

    const handleCloseSheet = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowBottomSheet(false);
            setIsClosing(false);
        }, 250);
    };

    // Use selectedDate or default to today
    const effectiveSelected = selectedDate || today;
    const displayedMonth = effectiveSelected.getMonth();
    const displayedYear = effectiveSelected.getFullYear();

    // Generate days for the current displayed month (starting from today if it's current month)
    const days = useMemo(() => {
        const result = [];
        const startDate = new Date(displayedYear, displayedMonth, 1);
        const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(displayedYear, displayedMonth, i);
            const dayOfWeek = date.getDay();
            const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

            result.push({
                date: i,
                month: displayedMonth,
                year: displayedYear,
                dayName: DAYS[dayOfWeek === 0 ? 6 : dayOfWeek - 1],
                fullDate: date,
                isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
                isPast: isPast,
            });
        }
        return result;
    }, [displayedMonth, displayedYear, today]);

    // Scroll to selected/today's date when component mounts or month changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            const targetDate = effectiveSelected.getDate();
            // Each day button is ~60px wide (48px + 12px gap)
            const scrollPosition = (targetDate - 1) * 60 - 20; // -20 for some padding
            scrollContainerRef.current.scrollTo({
                left: Math.max(0, scrollPosition),
                behavior: 'smooth'
            });
        }
    }, [displayedMonth, displayedYear, effectiveSelected]);

    const isSelected = (day: { date: number; month: number; year: number }) => {
        return (
            day.date === effectiveSelected.getDate() &&
            day.month === effectiveSelected.getMonth() &&
            day.year === effectiveSelected.getFullYear()
        );
    };

    const isSelectedInSheet = (dayNum: number) => {
        return (
            dayNum === effectiveSelected.getDate() &&
            sheetMonth === effectiveSelected.getMonth() &&
            sheetYear === effectiveSelected.getFullYear()
        );
    };

    const handleSelectDay = (day: { fullDate: Date; isWeekend: boolean; isPast: boolean }) => {
        if (!day.isWeekend && !day.isPast) {
            onSelectDate(day.fullDate);
        }
    };

    const handleSheetSelectDay = (dayNum: number) => {
        const date = new Date(sheetYear, sheetMonth, dayNum);
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (!isWeekend && !isPast) {
            onSelectDate(date);
            handleCloseSheet();
        }
    };

    const handlePrevMonth = () => {
        if (sheetMonth === 0) {
            setSheetMonth(11);
            setSheetYear(sheetYear - 1);
        } else {
            setSheetMonth(sheetMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (sheetMonth === 11) {
            setSheetMonth(0);
            setSheetYear(sheetYear + 1);
        } else {
            setSheetMonth(sheetMonth + 1);
        }
    };

    // Generate calendar grid for bottom sheet
    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 7 : day;
    };

    const sheetDays = useMemo(() => {
        const daysInMonth = getDaysInMonth(sheetMonth, sheetYear);
        const firstDay = getFirstDayOfMonth(sheetMonth, sheetYear);
        const days = [];

        for (let i = 1; i < firstDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    }, [sheetMonth, sheetYear]);

    const isDayDisabled = (dayNum: number) => {
        const date = new Date(sheetYear, sheetMonth, dayNum);
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return isWeekend || isPast;
    };

    const isToday = (dayNum: number) => {
        return (
            dayNum === today.getDate() &&
            sheetMonth === today.getMonth() &&
            sheetYear === today.getFullYear()
        );
    };

    return (
        <>
            <div className="animate-fade-in">
                {/* Month/Year Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-base font-semibold">
                        {MONTHS[displayedMonth]} {displayedYear}
                    </h3>
                    <button
                        onClick={() => setShowBottomSheet(true)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-50 transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                    </button>
                </div>

                {/* Horizontal Day Selector */}
                <div ref={scrollContainerRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    {days.map((day, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectDay(day)}
                            disabled={day.isWeekend || day.isPast}
                            className="flex flex-col items-center gap-2 transition-all"
                        >
                            {/* Circle container for number */}
                            <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all
                                ${isSelected(day)
                                    ? 'bg-gray-900 text-white'
                                    : (day.isWeekend || day.isPast)
                                        ? 'bg-white text-gray-300'
                                        : 'bg-white text-gray-900 hover:bg-gray-100'
                                }
                            `}>
                                <span className="text font-semibold">
                                    {day.date}
                                </span>
                            </div>
                            {/* Day name below */}
                            <span className={`text-xs font-medium ${(day.isWeekend || day.isPast) ? 'text-gray-300' : 'text-gray-900'}`}>
                                {day.dayName}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom Sheet Overlay - constrained to app frame with rounded corners */}
            {showBottomSheet && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div
                        className="relative w-full max-w-[430px] h-full flex items-end pointer-events-auto overflow-hidden rounded-[30px]"
                        onClick={handleCloseSheet}
                    >
                        {/* Background overlay - only within app frame */}
                        <div className={`absolute inset-0 bg-black/40 rounded-[36px] ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`} />

                        {/* Bottom Sheet */}
                        <div
                            className={`relative w-full bg-white rounded-t-[36px] p-6 ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header with Today and Close buttons */}
                            <div className="flex items-center justify-between mb-4">
                                {(sheetMonth !== today.getMonth() || sheetYear !== today.getFullYear()) ? (
                                    <button
                                        onClick={() => {
                                            setSheetMonth(today.getMonth());
                                            setSheetYear(today.getFullYear());
                                        }}
                                        className="px-3 py-1.5 text-sm font-semibold bg-[#F2F2F7] rounded-full hover:bg-gray-200 transition-colors"
                                    >
                                        Today
                                    </button>
                                ) : (
                                    <div className="w-14" />
                                )}
                                <h3 className="text-lg font-bold">Select date</h3>
                                <button
                                    onClick={handleCloseSheet}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Month Navigation */}
                            <div className="flex items-center justify-between gap-4 mb-6">
                                <button
                                    onClick={handlePrevMonth}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-100"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                                <h3 className="text-base font-semibold min-w-[150px] text-center">
                                    {MONTHS[sheetMonth]} {sheetYear}
                                </h3>
                                <button
                                    onClick={handleNextMonth}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-100"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>

                            {/* Day Headers */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {DAYS.map((day) => (
                                    <div key={day} className="text-center text-xs text-gray-500 font-medium py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 mb-6">
                                {sheetDays.map((day, index) => (
                                    <div
                                        key={index}
                                        onClick={() => day && handleSheetSelectDay(day)}
                                        className={`aspect-square flex items-center justify-center text-sm font-medium rounded-full cursor-pointer transition-all
                                        ${day === null ? 'invisible' : ''}
                                        ${day && isSelectedInSheet(day) ? 'bg-gray-900 text-white' : ''}
                                        ${day && isToday(day) && !isSelectedInSheet(day) ? 'border-2 border-gray-900' : ''}
                                        ${day && isDayDisabled(day) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                                    `}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Done Button */}
                            <button
                                onClick={handleCloseSheet}
                                className="w-full py-4 bg-gray-900 text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
