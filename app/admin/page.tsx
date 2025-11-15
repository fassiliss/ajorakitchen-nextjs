'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

interface Reservation {
    id: number;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: string;
    created_at: string;
}

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

export default function AdminPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'reservations' | 'messages'>('reservations');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch reservations
            const { data: reservationsData, error: reservationsError } = await supabase
                .from('reservations')
                .select('*')
                .order('created_at', { ascending: false });

            if (reservationsError) throw reservationsError;
            setReservations(reservationsData || []);

            // Fetch contact messages
            const { data: messagesData, error: messagesError } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (messagesError) throw messagesError;
            setMessages(messagesData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

            <div className="pt-20 min-h-screen bg-gray-50">
                {/* Hero */}
                <section className="bg-red-600 text-white py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-xl">Manage reservations and messages</p>
                    </div>
                </section>

                {/* Dashboard */}
                <section className="py-12">
                    <div className="container mx-auto px-4 max-w-7xl">

                        {/* Stats Cards */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="text-4xl mr-4">📅</div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Total Reservations</p>
                                        <p className="text-3xl font-bold text-red-600">{reservations.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="text-4xl mr-4">✉️</div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Total Messages</p>
                                        <p className="text-3xl font-bold text-red-600">{messages.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="flex border-b">
                                <button
                                    onClick={() => setActiveTab('reservations')}
                                    className={`flex-1 py-4 px-6 font-semibold transition ${
                                        activeTab === 'reservations'
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    📅 Reservations ({reservations.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('messages')}
                                    className={`flex-1 py-4 px-6 font-semibold transition ${
                                        activeTab === 'messages'
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    ✉️ Messages ({messages.length})
                                </button>
                            </div>

                            <div className="p-6">
                                {loading ? (
                                    <p className="text-center text-gray-600 py-12">Loading...</p>
                                ) : (
                                    <>
                                        {/* Reservations Tab */}
                                        {activeTab === 'reservations' && (
                                            <div className="space-y-4">
                                                {reservations.length === 0 ? (
                                                    <p className="text-center text-gray-600 py-12">No reservations yet</p>
                                                ) : (
                                                    reservations.map((reservation) => (
                                                        <div key={reservation.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                                                            <div className="grid md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Name</p>
                                                                    <p className="font-semibold text-lg">{reservation.name}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Email</p>
                                                                    <p className="font-semibold">{reservation.email}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Phone</p>
                                                                    <p className="font-semibold">{reservation.phone}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Date & Time</p>
                                                                    <p className="font-semibold">{reservation.date} at {reservation.time}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Guests</p>
                                                                    <p className="font-semibold">{reservation.guests} people</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Submitted</p>
                                                                    <p className="font-semibold">{new Date(reservation.created_at).toLocaleString()}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}

                                        {/* Messages Tab */}
                                        {activeTab === 'messages' && (
                                            <div className="space-y-4">
                                                {messages.length === 0 ? (
                                                    <p className="text-center text-gray-600 py-12">No messages yet</p>
                                                ) : (
                                                    messages.map((message) => (
                                                        <div key={message.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                                                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Name</p>
                                                                    <p className="font-semibold text-lg">{message.name}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Email</p>
                                                                    <p className="font-semibold">{message.email}</p>
                                                                </div>
                                                                <div className="md:col-span-2">
                                                                    <p className="text-sm text-gray-600">Subject</p>
                                                                    <p className="font-semibold">{message.subject}</p>
                                                                </div>
                                                                <div className="md:col-span-2">
                                                                    <p className="text-sm text-gray-600">Message</p>
                                                                    <p className="mt-1 text-gray-700 bg-gray-50 p-4 rounded">{message.message}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Received</p>
                                                                    <p className="font-semibold">{new Date(message.created_at).toLocaleString()}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}