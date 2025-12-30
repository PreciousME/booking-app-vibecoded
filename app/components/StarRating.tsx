'use client';

import React from 'react';

interface StarRatingProps {
    rating: number;
    size?: 'sm' | 'md' | 'lg';
}

function StarIcon({ filled, size }: { filled: boolean; size: number }) {
    const color = filled ? '#000000' : '#CCCCE0';
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.875 7.5C4.98158 7.5 7.5 4.98158 7.5 1.875C7.5 4.98158 10.0184 7.5 13.125 7.5C10.0184 7.5 7.5 10.0184 7.5 13.125C7.5 10.0184 4.98158 7.5 1.875 7.5Z"
                fill={color}
                stroke={color}
                strokeWidth="0.9375"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function StarRating({ rating, size = 'md' }: StarRatingProps) {
    const sizes = {
        sm: 12,
        md: 15,
        lg: 20,
    };

    const iconSize = sizes[size];

    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} filled={star <= rating} size={iconSize} />
            ))}
        </div>
    );
}
