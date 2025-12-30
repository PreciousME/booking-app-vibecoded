'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { StarRating } from '../components/StarRating';
import { ServiceCard } from '../components/ServiceCard';
import { ImageCarousel } from '../components/ImageCarousel';
import { useBooking } from '../lib/BookingContext';

const categories = ['Featured', 'Nails', 'Facials', 'Waxing'];

export function MerchantPage() {
    const { merchant, selectedServices, setCurrentStep, getTotalPrice, getTotalDuration } = useBooking();
    const [activeCategory, setActiveCategory] = useState('Featured');

    // Filter services based on category (Featured shows first 4 of all)
    const filteredServices = activeCategory === 'Featured'
        ? merchant.services.slice(0, 4)
        : merchant.services.filter(s => s.category === activeCategory);

    return (
        <div className="max-w-[430px] mx-auto min-h-screen bg-[#F2F2F7] relative overflow-x-hidden">

            <Header showActions />

            {/* Merchant Info Card */}
            <div className="mx-4 bg-white rounded-[30px] overflow-hidden mb-4">
                {/* Centered Text Content */}
                <div className="px-6 pt-6 pb-8 text-center">
                    <h1 className="text-2xl font-bold mb-2">{merchant.name}</h1>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                        <span className="font-medium">{merchant.rating}</span>
                        <StarRating rating={merchant.rating} size="sm" />
                        <span className="underline">{merchant.reviewCount}</span>
                    </div>
                    <p className="text-sm text-gray-500">{merchant.address}</p>
                </div>

                {/* Image Carousel */}
                <ImageCarousel />
            </div>

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

            {/* Services */}
            <div className="mx-4 bg-white rounded-[30px] overflow-hidden mb-4">
                <div className="py-2">
                    {filteredServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>

                <div className="px-5 pb-6">
                    <button
                        onClick={() => setCurrentStep('services')}
                        className="w-full py-3 text-sm font-semibold bg-[#F2F2F7] rounded-full hover:bg-gray-200 transition-colors"
                    >
                        View all services
                    </button>
                </div>
            </div>

            {/* Reviews */}
            <div className="mx-4 bg-white rounded-[30px] overflow-hidden mb-4">
                {/* Rating Summary - Centered */}
                <div className="py-6 text-center border-b border-gray-100">
                    <h3 className="text-base font-semibold mb-4">Reviews</h3>
                    <p className="text-4xl font-bold mb-2">{merchant.rating}</p>
                    <div className="flex justify-center mb-2">
                        <StarRating rating={merchant.rating} size="lg" />
                    </div>
                    <p className="text-sm text-gray-400">Top rated</p>
                </div>

                {/* Review Cards */}
                <div>
                    {merchant.reviews.slice(0, 2).map((review) => (
                        <div key={review.id} className="border-b border-gray-100 last:border-b-0">
                            <div className="px-5 py-4">
                                <div className="flex items-start gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium flex-shrink-0">
                                        {review.author.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-[15px] mb-0.5">{review.author}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{review.rating}</span>
                                            <StarRating rating={review.rating} size="sm" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[15px] text-gray-900 mb-1">{review.comment}</p>
                                <p className="text-sm text-gray-400">{review.date}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See All Button */}
                <div className="px-5 pb-6 pt-4">
                    <button className="w-full py-3 text-sm font-semibold bg-[#F2F2F7] rounded-full hover:bg-gray-200 transition-colors">
                        See all reviews
                    </button>
                </div>
            </div>

            {/* About Section */}
            <div className="mx-4 bg-white rounded-[30px] overflow-hidden mb-4 pb-32">
                {/* About */}
                <div className="px-5 py-6">
                    <h3 className="text font-bold mb-4">About</h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">
                        {merchant.about}
                    </p>
                </div>

                {/* Opening Hours */}
                <div className="px-5 py-6 border-t border-gray-100">
                    <h3 className="text font-bold mb-4">Opening hours</h3>
                    <div className="space-y-3">
                        {merchant.openingHours.map((item, index) => (
                            <div key={item.day} className="flex justify-between text-[15px]">
                                <span className={index === 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}>
                                    {item.day}
                                </span>
                                <span className={`${item.hours === 'Closed' ? 'text-gray-400' : ''} ${index === 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                                    {item.hours}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact & Address */}
                <div className="px-5 py-6 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text font-bold">Contact & address</h3>
                        <button className="px-5 py-2 text-sm font-semibold bg-[#F2F2F7] rounded-full hover:bg-gray-200 transition-colors">
                            Call
                        </button>
                    </div>
                    <p className="text-[15px] text-gray-500 leading-relaxed">{merchant.address}</p>
                </div>
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
