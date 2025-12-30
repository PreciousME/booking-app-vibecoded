'use client';

import React from 'react';

interface HeaderProps {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    showActions?: boolean;
    onFavorite?: () => void;
    onMore?: () => void;
}

export function Header({ title, showBack = true, onBack, showActions = false, onFavorite, onMore }: HeaderProps) {
    return (
        <header className="flex items-center justify-between px-4 py-2 pb-8 pt-8 sticky top-0 bg-[#F2F2F7] z-50">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-50"
                aria-label="Go back"
            >
                {showBack && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 12H3M3 12L10 5M3 12L10 19" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                )}
            </button>

            {title && <span className="text-[17px] font-semibold flex-1 text-center">{title}</span>}

            {/* Right Actions */}
            <div className="flex gap-2">
                {showActions && (
                    <>
                        {/* Heart/Favorite Button */}
                        <button
                            onClick={onFavorite}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-50"
                            aria-label="Add to favorites"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 14.0004C26.7886 6.24298 15.5 -1.99928 12.0001 6.99979C8.50006 -1.99928 -2.65695 6.24302 4.13155 14.0004C7.63156 18 10.5001 19.5001 12.0001 20.9995C13.5 19.5001 16.5 17.9999 20 14.0004Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>

                        {/* More Button */}
                        <button
                            onClick={onMore}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-50"
                            aria-label="More options"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="5" cy="12" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="19" cy="12" r="2" />
                            </svg>
                        </button>
                    </>
                )}

                {!showActions && <div className="w-10" />}
            </div>
        </header>
    );
}
