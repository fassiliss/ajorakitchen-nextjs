'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setSuccess(true);
            setSubmitting(false);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            setTimeout(() => setSuccess(false), 5000);
        }, 1000);
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
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl">Get in touch with us</p>
                    </div>
                </section>

                {/* Contact Info & Form */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                            {/* Contact Information */}
                            <div>
                                <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
                                <p className="text-gray-600 mb-8 text-lg">
                                    Have questions or want to learn more about Ajora Ethiopian Kitchen?
                                    We'd love to hear from you!
                                </p>

                                {/* Contact Details */}
                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="flex items-start">
                                        <div className="text-3xl mr-4">📍</div>
                                        <div>
                                            <h3 className="font-bold text-xl mb-1">Address</h3>
                                            <p className="text-gray-600">
                                                2637 Lake Villa Dr<br />
                                                Nashville, TN 37217
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start">
                                        <div className="text-3xl mr-4">📞</div>
                                        <div>
                                            <h3 className="font-bold text-xl mb-1">Phone</h3>
                                            <a href="tel:+16158010203" className="text-red-600 hover:text-red-700">
                                                (615) 801-0203
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start">
                                        <div className="text-3xl mr-4">✉️</div>
                                        <div>
                                            <h3 className="font-bold text-xl mb-1">Email</h3>
                                            <a href="mailto:GMeshesha@ajoraEthiopiankitchen.com" className="text-red-600 hover:text-red-700">
                                                GMeshesha@ajoraEthiopiankitchen.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex items-start">
                                        <div className="text-3xl mr-4">🕐</div>
                                        <div>
                                            <h3 className="font-bold text-xl mb-1">Hours</h3>
                                            <div className="text-gray-600">
                                                <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
                                                <p>Saturday: 10:00 AM - 11:00 PM</p>
                                                <p>Sunday: 10:00 AM - 9:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Google Maps */}
                                <div className="mt-8">
                                    <h3 className="font-bold text-xl mb-4">Find Us</h3>
                                    <div className="rounded-lg overflow-hidden shadow-lg">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.5956584789!2d-86.68516!3d36.0458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8864665d3e8e8e8f%3A0x1234567890!2s2637%20Lake%20Villa%20Dr%2C%20Nashville%2C%20TN%2037217!5e0!3m2!1sen!2sus!4v1234567890"
                                            width="100%"
                                            height="300"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div>
                                <h2 className="text-4xl font-bold mb-8">Send Us a Message</h2>

                                {success && (
                                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                                        <p className="font-bold">✅ Message sent successfully!</p>
                                        <p>We'll get back to you soon.</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                                            Your Name *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                                placeholder="John Doe"
                                            />
                                            <span className="absolute left-3 top-3.5 text-gray-400">👤</span>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                                placeholder="john@example.com"
                                            />
                                            <span className="absolute left-3 top-3.5 text-gray-400">✉️</span>
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                                            Subject *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                                placeholder="How can we help?"
                                            />
                                            <span className="absolute left-3 top-3.5 text-gray-400">📝</span>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                                            placeholder="Write your message here..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-red-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
}