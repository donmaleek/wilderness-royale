// src/components/TourCard.js
'use client'; // MUST be the very first line

import { useState } from 'react';
import Image from 'next/image';
import BookingForm from './BookingForm';


export default function TourCard({ tour }) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <>
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <Image 
          src={tour.image}
          width={400}
          height={300}
          alt={tour.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold">{tour.name}</h3>
          <p className="text-gray-600 my-2">{tour.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold">${tour.price}</span>
            <button 
              onClick={() => setShowBookingModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Book {tour.name}</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <BookingForm tour={tour} onClose={() => setShowBookingModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}