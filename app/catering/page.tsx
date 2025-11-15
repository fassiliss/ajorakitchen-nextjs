'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

export default function CateringPage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        event_date: '',
        location: '',
        number_of_guests: '',
        food_selections: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            // Save to Supabase
            const { error } = await supabase
                .from('catering_requests')
                .insert([formData]);

            if (error) throw error;

            // Send email notification
            await fetch('/api/send-catering-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            setSuccess(true);
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                event_date: '',
                location: '',
                number_of_guests: '',
                food_selections: '',
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
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Catering Services</h1>
                        <p className="text-xl">Authentic Ethiopian cuisine for your special events</p>
                    </div>
                </section>

                {/* Catering Info & Form */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-6xl">

                        {/* Introduction */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-6">Let Us Cater Your Event!</h2>
                            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                For catering inquiries, we invite you to fill out the form below with details about your event,
                                including the date, location, number of guests, and preferred food selections. Our team will review
                                your request and provide you with pricing and availability as soon as possible. We take pride in
                                offering customized catering services to bring the rich flavors of Ethiopian cuisine to your special occasion.
                            </p>
                            <p className="text-lg text-gray-700 mt-4 font-semibold">
                                We look forward to serving you, whether you're dining in or celebrating with us at your next event!
                            </p>
                        </div>

                        {/* Success Message */}
                        {success && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8 rounded max-w-3xl mx-auto">
                                <p className="font-bold">✅ Catering request submitted successfully!</p>
                                <p>We'll review your request and contact you shortly with pricing and availability.</p>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded max-w-3xl mx-auto">
                                <p className="font-bold">❌ Error</p>
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Catering Form */}
                        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Name Fields */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="first_name" className="block text-gray-900 font-bold mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="first_name"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-black font-bold bg-white"
                                            placeholder="John"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="last_name" className="block text-gray-900 font-bold mb-2">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="last_name"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-black font-bold bg-white"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-gray-900 font-bold mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-black font-bold bg-white"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Event Date */}
                                <div>
                                    <label htmlFor="event_date" className="block text-gray-900 font-bold mb-2">
                                        Event Date
                                    </label>
                                    <input
                                        type="date"
                                        id="event_date"
                                        name="event_date"
                                        value={formData.event_date}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-black font-bold bg-white"
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label htmlFor="location" className="block text-gray-900 font-bold mb-2">
                                        Event Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-black font-bold bg-white"
                                        placeholder="Address or venue name"
                                    />
                                </div>

                                {/* Number of Guests */}
                                <div>
                                    <label htmlFor="number_of_guests" className="block text-gray-900 font-bold mb-2">
                                        Number of Guests
                                    </label>
                                    <input
                                        type="text"
                                        id="number_of_guests"
                                        name="number_of_guests"
                                        value={formData.number_of_guests}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-black font-bold bg-white"
                                        placeholder="Approximately how many guests?"
                                    />
                                </div>

                                {/* Food Selections / Request */}
                                <div>
                                    <label htmlFor="food_selections" className="block text-gray-900 font-bold mb-2">
                                        Selection / Request *
                                    </label>
                                    <textarea
                                        id="food_selections"
                                        name="food_selections"
                                        value={formData.food_selections}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-black font-bold bg-white resize-none"
                                        placeholder="Tell us about your event and preferred food selections..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-red-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Submitting...' : 'Send'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="text-center mt-12">
                            <p className="text-gray-600 text-lg">
                                Questions? Call us at <strong className="text-red-600">(615) 801-0203</strong>
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}