'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type BookingFormProps = {
  tour: {
    id: string;
    name: string;
  };
  onClose: () => void;
};

type FormData = {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  paymentMethod: string;
  agreeToTerms: boolean;
};

type FormErrors = {
  checkInDate?: string;
  checkOutDate?: string;
  guests?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  specialRequests?: string;
  paymentMethod?: string;
  agreeToTerms?: string;
};

export default function BookingForm({ tour, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    checkInDate: null,
    checkOutDate: null,
    guests: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'credit',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (date: Date | null, field: keyof FormData) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.checkInDate) newErrors.checkInDate = 'Required';
    if (!formData.checkOutDate) newErrors.checkOutDate = 'Required';
    if (formData.checkInDate && formData.checkOutDate && formData.checkOutDate <= formData.checkInDate) {
      newErrors.checkOutDate = 'Must be after check-in';
    }
    if (formData.guests < 1) newErrors.guests = 'At least 1';
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!formData.phone.match(/^[0-9]{10,15}$/)) newErrors.phone = 'Invalid number';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Accept terms to continue';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Booking confirmed for ${tour.name}!\nDates: ${formData.checkInDate?.toLocaleDateString()} - ${formData.checkOutDate?.toLocaleDateString()}\nConfirmation sent to ${formData.email}`);
      onClose();
    } catch {
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-white z-50">
      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Book {tour.name}</h2>
            
            {/* Date Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {/* Check-in Date */}
              <div className="w-full">
                <label className="block mb-1 font-medium text-sm sm:text-base">Check-in Date*</label>
                <DatePicker
                  selected={formData.checkInDate}
                  onChange={(date) => handleDateChange(date, 'checkInDate')}
                  minDate={new Date()}
                  className={`border p-2 rounded w-full text-sm sm:text-base ${errors.checkInDate ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  selectsStart
                  startDate={formData.checkInDate}
                  endDate={formData.checkOutDate}
                  placeholderText="Select date"
                />
                {errors.checkInDate && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.checkInDate}</p>
                )}
              </div>

              {/* Check-out Date */}
              <div className="w-full">
                <label className="block mb-1 font-medium text-sm sm:text-base">Check-out Date*</label>
                <DatePicker
                  selected={formData.checkOutDate}
                  onChange={(date) => handleDateChange(date, 'checkOutDate')}
                  minDate={formData.checkInDate || new Date()}
                  className={`border p-2 rounded w-full text-sm sm:text-base ${errors.checkOutDate ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  selectsEnd
                  startDate={formData.checkInDate}
                  endDate={formData.checkOutDate}
                  disabled={!formData.checkInDate}
                  placeholderText="Select date"
                />
                {errors.checkOutDate && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.checkOutDate}</p>
                )}
              </div>
            </div>

            {/* Guests */}
            <div className="w-full sm:w-1/2 md:w-1/3">
              <label className="block mb-1 font-medium text-sm sm:text-base">Guests*</label>
              <input
                type="number"
                name="guests"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
                className={`border p-2 rounded w-full text-sm sm:text-base ${errors.guests ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              {errors.guests && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.guests}</p>
              )}
            </div>

            {/* Personal Information Section */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-3 text-base sm:text-lg">Personal Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {/* First Name */}
                <div className="w-full">
                  <label className="block mb-1 font-medium text-sm sm:text-base">First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`border p-2 rounded w-full text-sm sm:text-base ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="w-full">
                  <label className="block mb-1 font-medium text-sm sm:text-base">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`border p-2 rounded w-full text-sm sm:text-base ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="w-full">
                  <label className="block mb-1 font-medium text-sm sm:text-base">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`border p-2 rounded w-full text-sm sm:text-base ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="w-full">
                  <label className="block mb-1 font-medium text-sm sm:text-base">Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 254712345678"
                    className={`border p-2 rounded w-full text-sm sm:text-base ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-4 w-full">
                <label className="block mb-1 font-medium text-sm sm:text-base">Payment Method*</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="credit">Credit Card</option>
                  <option value="mpesa">M-Pesa</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {/* Special Requests */}
              <div className="mt-4 w-full">
                <label className="block mb-1 font-medium text-sm sm:text-base">Trip Preferences</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={3}
                  className="border border-gray-300 p-2 rounded w-full text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Dietary restrictions, accessibility needs, etc."
                />
              </div>

              {/* Terms Agreement */}
              <div className="mt-4 flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => {
                    if (!formData.agreeToTerms) {
                      setShowTermsModal(true);
                    } else {
                      handleChange(e);
                    }
                  }}
                  className="mt-1 mr-2 focus:ring-2 focus:ring-green-500"
                />
                <label className="text-xs sm:text-sm">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded"
                  >
                    terms and conditions
                  </button>
                  *
                  {errors.agreeToTerms && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.agreeToTerms}</p>
                  )}
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-green-600 text-white px-4 py-2 rounded transition text-sm sm:text-base ${isSubmitting ? 'opacity-70' : 'hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Confirm Booking'}
              </button>
            </div>
          </form>

          {/* Terms Modal */}
          {showTermsModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
              <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Wilderness Royale Adventures - Terms & Conditions</h3>
                  <button 
                    onClick={() => setShowTermsModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl p-1 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
                    aria-label="Close terms"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="prose prose-sm sm:prose-base max-w-none">
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Booking Terms</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Last updated: {new Date().toLocaleDateString()}</p>
                  </div>

                  <div className="space-y-6">
                    {/* Section 1 */}
                    <section className="border-b border-gray-100 pb-6">
                      <h5 className="text-base sm:text-lg font-medium text-green-700 mb-3 flex items-center">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-3 text-sm sm:text-base">1</span>
                        Prices & Payments
                      </h5>
                      <div className="pl-9 sm:pl-11">
                        <p className="text-gray-700 mb-3 text-sm sm:text-base">
                          All prices include expenses as outlined in our itineraries. Prices are subject to change based on supplier amendments. 
                          We will notify you of any changes before processing payments.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm sm:text-base">
                          <li>50% deposit required to confirm booking</li>
                          <li>Full payment due 14 days before arrival</li>
                          <li>Payments accepted via M-Pesa, credit card, or bank transfer</li>
                        </ul>
                      </div>
                    </section>

                    {/* Section 2 */}
                    <section className="border-b border-gray-100 pb-6">
                      <h5 className="text-base sm:text-lg font-medium text-green-700 mb-3 flex items-center">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-3 text-sm sm:text-base">2</span>
                        Cancellation Policy
                      </h5>
                      <div className="pl-9 sm:pl-11">
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white border border-gray-200 text-sm sm:text-base">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="py-2 px-3 sm:px-4 border-b text-left">When You Cancel</th>
                                <th className="py-2 px-3 sm:px-4 border-b text-left">Refund Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="hover:bg-gray-50">
                                <td className="py-2 px-3 sm:px-4 border-b">More than 30 days before</td>
                                <td className="py-2 px-3 sm:px-4 border-b">Full refund</td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="py-2 px-3 sm:px-4 border-b">15-30 days before</td>
                                <td className="py-2 px-3 sm:px-4 border-b">50% refund</td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="py-2 px-3 sm:px-4 border-b">Less than 15 days before</td>
                                <td className="py-2 px-3 sm:px-4 border-b">No refund</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </section>

                    {/* Section 3 */}
                    <section className="border-b border-gray-100 pb-6">
                      <h5 className="text-base sm:text-lg font-medium text-green-700 mb-3 flex items-center">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-3 text-sm sm:text-base">3</span>
                        Health & Safety
                      </h5>
                      <div className="pl-9 sm:pl-11">
                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-3">
                          <p className="text-blue-800 font-medium text-sm sm:text-base">Important Health Notice:</p>
                          <p className="text-blue-700 text-sm sm:text-base">
                            Yellow fever vaccination may be required. Consult your doctor 4-6 weeks before travel.
                          </p>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base">
                          Comprehensive travel insurance covering medical evacuation is mandatory for all guests. 
                          Wilderness Royale reserves the right to refuse participation to anyone without proper insurance.
                        </p>
                      </div>
                    </section>

                    {/* Section 4 */}
                    <section className="border-b border-gray-100 pb-6">
                      <h5 className="text-base sm:text-lg font-medium text-green-700 mb-3 flex items-center">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-3 text-sm sm:text-base">4</span>
                        Transportation
                      </h5>
                      <div className="pl-9 sm:pl-11">
                        <p className="text-gray-700 mb-3 text-sm sm:text-base">
                          All safaris include transportation in our modern 4x4 vehicles with pop-up roofs for optimal game viewing.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                            <p className="font-medium text-gray-800 text-sm sm:text-base">Standard Vehicles:</p>
                            <ul className="list-disc pl-4 sm:pl-5 mt-1 space-y-1 text-gray-700 text-xs sm:text-sm">
                              <li>4x4 Safari Vans</li>
                              <li>Land Cruisers</li>
                              <li>Tour Shuttles</li>
                            </ul>
                          </div>
                          <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                            <p className="font-medium text-gray-800 text-sm sm:text-base">Premium Options:</p>
                            <ul className="list-disc pl-4 sm:pl-5 mt-1 space-y-1 text-gray-700 text-xs sm:text-sm">
                              <li>Luxury Land Cruisers</li>
                              <li>Mercedes Tourist Trucks</li>
                              <li>Private Chauffeurs</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                      <h5 className="text-base sm:text-lg font-medium text-green-700 mb-3 flex items-center">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-3 text-sm sm:text-base">5</span>
                        General Terms
                      </h5>
                      <div className="pl-9 sm:pl-11 space-y-3 sm:space-y-4">
                        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                          <h6 className="font-medium text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">Itinerary Changes:</h6>
                          <p className="text-gray-700 text-xs sm:text-sm">
                            While we adhere to published itineraries, we reserve the right to make alterations due to weather, 
                            road conditions, or other unforeseen circumstances to ensure your safety and enjoyment.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                          <h6 className="font-medium text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">Liability:</h6>
                          <p className="text-gray-700 text-xs sm:text-sm">
                            Wilderness Royale Adventures is not liable for injuries, losses, or damages during tours. 
                            All claims are subject to Kenyan law and courts.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                          <h6 className="font-medium text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">Travel Insurance:</h6>
                          <p className="text-gray-700 text-xs sm:text-sm">
                            Comprehensive travel insurance is mandatory. We offer local insurance options or you may 
                            arrange your own international coverage.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                    <div className="text-xs sm:text-sm text-gray-500">
                      By accepting, you agree to all terms and conditions above.
                    </div>
                    <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setShowTermsModal(false)}
                        className="px-4 sm:px-6 py-1 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm sm:text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          setFormData({...formData, agreeToTerms: true});
                          setShowTermsModal(false);
                        }}
                        className="px-4 sm:px-6 py-1 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center text-sm sm:text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Accept Terms
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}