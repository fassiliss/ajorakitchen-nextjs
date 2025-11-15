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

interface Order {
    id: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    items: any[];
    total_amount: number;
    status: string;
    created_at: string;
}

interface CateringRequest {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    event_date: string;
    location: string;
    number_of_guests: string;
    food_selections: string;
    created_at: string;
}

export default function AdminPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [cateringRequests, setCateringRequests] = useState<CateringRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'messages' | 'catering'>('orders');

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

            // Fetch orders
            const { data: ordersData, error: ordersError } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (ordersError) throw ordersError;
            setOrders(ordersData || []);

            // Fetch catering requests
            const { data: cateringData, error: cateringError } = await supabase
                .from('catering_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (cateringError) throw cateringError;
            setCateringRequests(cateringData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete functions
    const deleteReservation = async (id: number) => {
        if (!confirm('Are you sure you want to delete this reservation?')) return;

        try {
            const { error } = await supabase.from('reservations').delete().eq('id', id);
            if (error) throw error;
            setReservations(reservations.filter(r => r.id !== id));
        } catch (error) {
            console.error('Error deleting reservation:', error);
            alert('Failed to delete reservation');
        }
    };

    const deleteMessage = async (id: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const { error } = await supabase.from('contact_messages').delete().eq('id', id);
            if (error) throw error;
            setMessages(messages.filter(m => m.id !== id));
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message');
        }
    };

    const deleteOrder = async (id: number) => {
        if (!confirm('Are you sure you want to delete this order?')) return;

        try {
            const { error } = await supabase.from('orders').delete().eq('id', id);
            if (error) throw error;
            setOrders(orders.filter(o => o.id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
            alert('Failed to delete order');
        }
    };

    const deleteCateringRequest = async (id: number) => {
        if (!confirm('Are you sure you want to delete this catering request?')) return;

        try {
            const { error } = await supabase.from('catering_requests').delete().eq('id', id);
            if (error) throw error;
            setCateringRequests(cateringRequests.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting catering request:', error);
            alert('Failed to delete catering request');
        }
    };

    // Update order status
    const updateOrderStatus = async (id: number, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            setOrders(orders.map(order =>
                order.id === id ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status');
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
                        <p className="text-xl">Manage reservations, orders, messages, and catering requests</p>
                    </div>
                </section>

                {/* Dashboard */}
                <section className="py-12">
                    <div className="container mx-auto px-4 max-w-7xl">

                        {/* Stats Cards */}
                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="text-4xl mr-4">📅</div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Reservations</p>
                                        <p className="text-3xl font-bold text-red-600">{reservations.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="text-4xl mr-4">🛒</div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Orders</p>
                                        <p className="text-3xl font-bold text-red-600">{orders.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="text-4xl mr-4">🎉</div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Catering</p>
                                        <p className="text-3xl font-bold text-red-600">{cateringRequests.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <div className="text-4xl mr-4">✉️</div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Messages</p>
                                        <p className="text-3xl font-bold text-red-600">{messages.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="flex flex-wrap border-b">
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`flex-1 py-4 px-6 font-semibold transition ${
                                        activeTab === 'orders'
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    🛒 Orders ({orders.length})
                                </button>
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
                                    onClick={() => setActiveTab('catering')}
                                    className={`flex-1 py-4 px-6 font-semibold transition ${
                                        activeTab === 'catering'
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    🎉 Catering ({cateringRequests.length})
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
                                        {/* Orders Tab */}
                                        {activeTab === 'orders' && (
                                            <div className="space-y-4">
                                                {orders.length === 0 ? (
                                                    <p className="text-center text-gray-600 py-12">No orders yet</p>
                                                ) : (
                                                    orders.map((order) => (
                                                        <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <h3 className="text-xl font-bold text-gray-900">Order #{order.id}</h3>
                                                                <button
                                                                    onClick={() => deleteOrder(order.id)}
                                                                    className="text-red-600 hover:text-red-700 font-semibold"
                                                                >
                                                                    🗑️ Delete
                                                                </button>
                                                            </div>

                                                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Customer</p>
                                                                    <p className="font-semibold text-lg">{order.customer_name}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Email</p>
                                                                    <p className="font-semibold">{order.customer_email}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Phone</p>
                                                                    <p className="font-semibold">{order.customer_phone}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Total</p>
                                                                    <p className="font-semibold text-xl text-red-600">${order.total_amount.toFixed(2)}</p>
                                                                </div>
                                                                <div className="md:col-span-2">
                                                                    <p className="text-sm text-gray-600">Delivery Address</p>
                                                                    <p className="font-semibold">{order.customer_address}</p>
                                                                </div>
                                                                <div className="md:col-span-2">
                                                                    <p className="text-sm text-gray-600 mb-2">Items</p>
                                                                    <div className="bg-gray-50 p-4 rounded">
                                                                        {order.items.map((item: any, index: number) => (
                                                                            <div key={index} className="flex justify-between mb-2">
                                                                                <span>{item.quantity}x {item.name}</span>
                                                                                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Ordered</p>
                                                                    <p className="font-semibold">{new Date(order.created_at).toLocaleString()}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600 mb-2">Status</p>
                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() => updateOrderStatus(order.id, 'pending')}
                                                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                                                order.status === 'pending'
                                                                                    ? 'bg-yellow-200 text-yellow-800'
                                                                                    : 'bg-gray-200 text-gray-600 hover:bg-yellow-100'
                                                                            }`}
                                                                        >
                                                                            Pending
                                                                        </button>
                                                                        <button
                                                                            onClick={() => updateOrderStatus(order.id, 'completed')}
                                                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                                                order.status === 'completed'
                                                                                    ? 'bg-green-200 text-green-800'
                                                                                    : 'bg-gray-200 text-gray-600 hover:bg-green-100'
                                                                            }`}
                                                                        >
                                                                            Completed
                                                                        </button>
                                                                        <button
                                                                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                                                order.status === 'cancelled'
                                                                                    ? 'bg-red-200 text-red-800'
                                                                                    : 'bg-gray-200 text-gray-600 hover:bg-red-100'
                                                                            }`}
                                                                        >
                                                                            Cancelled
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}

                                        {/* Reservations Tab */}
                                        {activeTab === 'reservations' && (
                                            <div className="space-y-4">
                                                {reservations.length === 0 ? (
                                                    <p className="text-center text-gray-600 py-12">No reservations yet</p>
                                                ) : (
                                                    reservations.map((reservation) => (
                                                        <div key={reservation.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <h3 className="text-xl font-bold text-gray-900">Reservation #{reservation.id}</h3>
                                                                <button
                                                                    onClick={() => deleteReservation(reservation.id)}
                                                                    className="text-red-600 hover:text-red-700 font-semibold"
                                                                >
                                                                    🗑️ Delete
                                                                </button>
                                                            </div>

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

                                        {/* Catering Tab */}
                                        {activeTab === 'catering' && (
                                            <div className="space-y-4">
                                                {cateringRequests.length === 0 ? (
                                                    <p className="text-center text-gray-600 py-12">No catering requests yet</p>
                                                ) : (
                                                    cateringRequests.map((request) => (
                                                        <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <h3 className="text-xl font-bold text-gray-900">Catering Request #{request.id}</h3>
                                                                <button
                                                                    onClick={() => deleteCateringRequest(request.id)}
                                                                    className="text-red-600 hover:text-red-700 font-semibold"
                                                                >
                                                                    🗑️ Delete
                                                                </button>
                                                            </div>

                                                            <div className="grid md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Name</p>
                                                                    <p className="font-semibold text-lg">{request.first_name} {request.last_name}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Email</p>
                                                                    <p className="font-semibold">{request.email}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Event Date</p>
                                                                    <p className="font-semibold">{request.event_date || 'Not specified'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Number of Guests</p>
                                                                    <p className="font-semibold">{request.number_of_guests || 'Not specified'}</p>
                                                                </div>
                                                                <div className="md:col-span-2">
                                                                    <p className="text-sm text-gray-600">Location</p>
                                                                    <p className="font-semibold">{request.location || 'Not specified'}</p>
                                                                </div>
                                                                <div className="md:col-span-2">
                                                                    <p className="text-sm text-gray-600">Food Selections / Request</p>
                                                                    <p className="mt-1 text-gray-700 bg-gray-50 p-4 rounded whitespace-pre-wrap">{request.food_selections}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-600">Submitted</p>
                                                                    <p className="font-semibold">{new Date(request.created_at).toLocaleString()}</p>
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
                                                            <div className="flex justify-between items-start mb-4">
                                                                <h3 className="text-xl font-bold text-gray-900">Message #{message.id}</h3>
                                                                <button
                                                                    onClick={() => deleteMessage(message.id)}
                                                                    className="text-red-600 hover:text-red-700 font-semibold"
                                                                >
                                                                    🗑️ Delete
                                                                </button>
                                                            </div>

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