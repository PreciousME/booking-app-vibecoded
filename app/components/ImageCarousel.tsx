'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

const images = [
    { id: 1, src: '/images/shop-cover-photo-1.png', alt: 'Beauty shop interior' },
    { id: 2, src: '/images/shop-cover-photo-2.png', alt: 'Nail services showcase' },
    { id: 3, src: '/images/shop-cover-photo-3.png', alt: 'Beauty treatments' },
];

export function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef<number | null>(null);
    const endX = useRef<number | null>(null);

    const minSwipeDistance = 50; // Minimum distance for a swipe to register

    // Handle swipe/drag end logic
    const handleSwipeEnd = () => {
        if (startX.current === null || endX.current === null) return;

        const distance = startX.current - endX.current;
        const isSwipeLeft = distance > minSwipeDistance;
        const isSwipeRight = distance < -minSwipeDistance;

        if (isSwipeLeft && currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (isSwipeRight && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }

        // Reset values
        startX.current = null;
        endX.current = null;
    };

    // Touch events (mobile)
    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
        endX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        endX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        handleSwipeEnd();
    };

    // Mouse events (desktop)
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent image drag
        setIsDragging(true);
        startX.current = e.clientX;
        endX.current = null;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        endX.current = e.clientX;
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        handleSwipeEnd();
    };

    const handleMouseLeave = () => {
        if (!isDragging) return;
        setIsDragging(false);
        handleSwipeEnd();
    };

    return (
        <div className="relative px-2 pb-2">
            {/* Image Container */}
            <div
                className="relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing select-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="w-full flex-shrink-0 aspect-[4/3] relative"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover rounded-[24px] pointer-events-none"
                                draggable={false}
                                priority
                            />
                        </div>
                    ))}
                </div>

                {/* Dots Indicator - Positioned on the image */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white' : 'bg-gray-900/40'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

