'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

export default function ReservationPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const { data, error } = await supabase
                .from('reservations')
                .insert([formData]);

            if (error) throw error;

            await fetch('/api/send-reservation-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                guests: '',
            });

            setTimeout(() => setSuccess(false), 5000);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header />

            <div className="pt-20">
                {/* Hero */}
                <section
                    className="relative py-32"
                    style={{
                        backgroundImage: "url(/images/ajora_banner.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-60"></div>

                    <div className="relative z-10 container mx-auto px-4 text-center text-white">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Reservations</h1>
                        <p className="text-xl">Book a table online. Your request will be confirmed shortly.</p>
                    </div>
                </section>

                {/* Reservation Form */}
                <section className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 max-w-5xl">
                        {success && (
                            <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-4 mb-8 rounded">
                                <p className="font-bold">✅ Reservation request received!</p>
                                <p>We'll contact you shortly to confirm your reservation.</p>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-8 rounded">
                                <p className="font-bold">❌ Error</p>
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Date */}
                                <div className="relative">
                                    <label htmlFor="date" className="block text-gray-900 dark:text-white font-semibold mb-2">
                                        Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                                            placeholder="Pick a date"
                                        />
                                        <span className="absolute left-3 top-3.5 text-gray-400">📅</span>
                                    </div>
                                </div>

                                {/* Name */}
                                <div className="relative">
                                    <label htmlFor="name" className="block text-gray-900 dark:text-white font-bold mb-2">
                                        Your Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                                            placeholder="Full Name"
                                        />
                                        <span className="absolute left-3 top-3.5 text-gray-400">✏️</span>
                                    </div>
                                </div>

                                {/* Time */}
                                <div className="relative">
                                    <label htmlFor="time" className="block text-gray-900 dark:text-white font-bold mb-2">
                                        Time
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                                        >
                                            <option value="">Pick a time</option>
                                            <option value="9:00 AM">9:00 AM</option>
                                            <option value="9:30 AM">9:30 AM</option>
                                            <option value="10:00 AM">10:00 AM</option>
                                            <option value="10:30 AM">10:30 AM</option>
                                            <option value="11:00 AM">11:00 AM</option>
                                            <option value="11:30 AM">11:30 AM</option>
                                            <option value="12:00 PM">12:00 PM</option>
                                            <option value="12:30 PM">12:30 PM</option>
                                            <option value="1:00 PM">1:00 PM</option>
                                            <option value="1:30 PM">1:30 PM</option>
                                            <option value="2:00 PM">2:00 PM</option>
                                            <option value="2:30 PM">2:30 PM</option>
                                            <option value="5:00 PM">5:00 PM</option>
                                            <option value="5:30 PM">5:30 PM</option>
                                            <option value="6:00 PM">6:00 PM</option>
                                            <option value="6:30 PM">6:30 PM</option>
                                            <option value="7:00 PM">7:00 PM</option>
                                            <option value="7:30 PM">7:30 PM</option>
                                            <option value="8:00 PM">8:00 PM</option>
                                        </select>
                                        <span className="absolute left-3 top-3.5 text-gray-400">🕐</span>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="relative">
                                    <label htmlFor="email" className="block text-gray-900 dark:text-white font-bold mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                                            placeholder="Your Email ID"
                                        />
                                        <span className="absolute left-3 top-3.5 text-gray-400">✉️</span>
                                    </div>
                                </div>

                                {/* Guests */}
                                <div className="relative">
                                    <label htmlFor="guests" className="block text-gray-900 dark:text-white font-bold mb-2">
                                        Guests
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="guests"
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleChange}
                                            min="1"
                                            max="20"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                                            placeholder="How many of you?"
                                        />
                                        <span className="absolute left-3 top-3.5 text-gray-400">👥</span>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="relative">
                                    <label htmlFor="phone" className="block text-gray-900 dark:text-white font-bold mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                                            placeholder="Enter your Phone Number"
                                        />
                                        <span className="absolute left-3 top-3.5 text-gray-400">📞</span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 text-center">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-red-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Submitting...' : 'Make Reservation'}
                                </button>
                            </div>
                        </form>

                        {/* Footer Note */}
                        <div className="text-center mt-8">
                            <p className="text-gray-600 dark:text-gray-400">
                                You can also call: <strong className="text-red-600">(615) 801-0203</strong> to make a reservation.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}