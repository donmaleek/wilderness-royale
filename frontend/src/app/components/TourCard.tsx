'use client';

import { useState } from 'react';
import Image from 'next/image';
import BookingForm from './BookingForm';
import { Tour } from '../types';

export default function TourCard({ tour }: { tour: Tour }) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const bookingTour = {
    ...tour,
    id: tour.id.toString()
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow w-full">
        <div className="relative aspect-square md:aspect-video">
          <Image 
            src={tour.image}
            fill
            alt={tour.name}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg md:text-xl font-bold line-clamp-1">{tour.name}</h3>
          <p className="text-gray-600 my-2 text-sm md:text-base line-clamp-2">{tour.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-base md:text-lg">${tour.price}</span>
            <button 
              onClick={() => setShowBookingModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 md:px-4 md:py-2 rounded text-sm md:text-base transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg md:text-xl font-bold">Book {tour.name}</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <BookingForm tour={bookingTour} onClose={() => setShowBookingModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}