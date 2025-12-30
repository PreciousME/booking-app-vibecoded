'use client';

import React from 'react';
import { useBooking } from '../lib/BookingContext';
import { MerchantPage } from './MerchantPage';
import { AllServicesPage } from './AllServicesPage';
import { DateTimePage } from './DateTimePage';
import { ReviewConfirmPage } from './ReviewConfirmPage';
import { ConfirmationPage } from './ConfirmationPage';

export function BookingFlow() {
    const { currentStep } = useBooking();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center md:p-[24px]">
            <div className="relative md:rounded-[40px] overflow-hidden">
                <div className="w-[430px] max-w-full">
                    {currentStep === 'merchant' && <MerchantPage />}
                    {currentStep === 'services' && <AllServicesPage />}
                    {currentStep === 'datetime' && <DateTimePage />}
                    {currentStep === 'review' && <ReviewConfirmPage />}
                    {currentStep === 'confirmation' && <ConfirmationPage />}
                </div>
            </div>
        </div>
    );
}
