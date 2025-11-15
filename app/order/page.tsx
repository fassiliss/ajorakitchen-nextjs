'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
}

interface CartItem extends MenuItem {
    quantity: number;
}

const menuItems: MenuItem[] = [
    // Appetizers
    { id: 1, name: 'Sambusa', description: 'Crispy pastry filled with lentils or meat', price: 8.99, category: 'Appetizers' },
    { id: 2, name: 'Timatim Salad', description: 'Fresh tomato and onion salad', price: 6.99, category: 'Appetizers' },

    // Main Dishes
    { id: 3, name: 'Doro Wot', description: 'Spicy chicken stew with hard-boiled egg', price: 16.99, category: 'Main Dishes' },
    { id: 4, name: 'Kitfo', description: 'Ethiopian steak tartare with spiced butter', price: 18.99, category: 'Main Dishes' },
    { id: 5, name: 'Tibs', description: 'Sautéed beef with vegetables', price: 17.99, category: 'Main Dishes' },
    { id: 6, name: 'Shiro', description: 'Ground chickpea stew', price: 12.99, category: 'Main Dishes' },
    { id: 7, name: 'Gomen', description: 'Collard greens with spices', price: 11.99, category: 'Main Dishes' },
    { id: 8, name: 'Misir Wot', description: 'Red lentil stew', price: 11.99, category: 'Main Dishes' },

    // Drinks
    { id: 9, name: 'Ethiopian Coffee', description: 'Traditional coffee ceremony', price: 4.99, category: 'Drinks' },
    { id: 10, name: 'Tej', description: 'Ethiopian honey wine', price: 7.99, category: 'Drinks' },
];

export default function OrderPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const addToCart = (item: MenuItem) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId: number) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId: number, change: number) => {
        setCart(cart.map(item => {
            if (item.id === itemId) {
                const newQuantity = item.quantity + change;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const getTotal = () => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const orderData = {
                customer_name: customerInfo.name,
                customer_email: customerInfo.email,
                customer_phone: customerInfo.phone,
                customer_address: customerInfo.address,
                items: cart,
                total_amount: parseFloat(getTotal()),
                status: 'pending',
            };

            const { error } = await supabase
                .from('orders')
                .insert([orderData]);

            if (error) throw error;

            // Send email notification
            await fetch('/api/send-order-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            setOrderSuccess(true);
            setCart([]);
            setCustomerInfo({ name: '', email: '', phone: '', address: '' });
            setShowCheckout(false);

            setTimeout(() => setOrderSuccess(false), 5000);
        } catch (error) {
            console.error('Order error:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const categories = ['Appetizers', 'Main Dishes', 'Drinks'];

    return (
        <>
            <Header />

            <div className="pt-20 min-h-screen bg-gray-50">
                {/* Hero */}
                <section className="relative py-20 bg-red-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Online</h1>
                        <p className="text-xl">Delicious Ethiopian food delivered to your door</p>
                    </div>
                </section>

                {/* Success Message */}
                {orderSuccess && (
                    <div className="container mx-auto px-4 mt-8">
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded max-w-4xl mx-auto">
                            <p className="font-bold">✅ Order placed successfully!</p>
                            <p>We'll contact you shortly to confirm your order.</p>
                        </div>
                    </div>
                )}

                {/* Cart Button (Fixed) */}
                <button
                    onClick={() => setShowCart(!showCart)}
                    className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition z-50 flex items-center gap-2"
                >
                    🛒 Cart ({cart.length}) - ${getTotal()}
                </button>

                {/* Menu Items */}
                <section className="py-12">
                    <div className="container mx-auto px-4 max-w-6xl">
                        {categories.map(category => {
                            const categoryItems = menuItems.filter(item => item.category === category);

                            return (
                                <div key={category} className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6 text-gray-800">{category}</h2>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categoryItems.map(item => (
                                            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                                    <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-2xl font-bold text-red-600">${item.price}</span>
                                                        <button
                                                            onClick={() => addToCart(item)}
                                                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>


                {/* Cart Sidebar */}
                {showCart && (
                    <>
                        {/* Dark Overlay */}
                        <div
                            className="fixed inset-0 bg-black bg-opacity-70 z-40"
                            onClick={() => setShowCart(false)}
                        ></div>

                        {/* Sidebar */}
                        <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl overflow-y-auto z-50">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                                    <button
                                        onClick={() => setShowCart(false)}
                                        className="text-3xl text-gray-700 hover:text-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {cart.length === 0 ? (
                                    <p className="text-gray-600 text-center py-12">Your cart is empty</p>
                                ) : (
                                    <>
                                        <div className="space-y-4 mb-6">
                                            {cart.map(item => (
                                                <div key={item.id} className="border-b border-gray-300 pb-4">
                                                    <div className="flex justify-between mb-2">
                                                        <span className="font-semibold text-gray-900">{item.name}</span>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-red-600 hover:text-red-700 text-xl"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 font-bold text-gray-900"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="font-semibold text-gray-900 min-w-[30px] text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 font-bold text-gray-900"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t border-gray-300 pt-4 mb-6">
                                            <div className="flex justify-between text-xl font-bold">
                                                <span className="text-gray-900">Total:</span>
                                                <span className="text-red-600">${getTotal()}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setShowCart(false);
                                                setShowCheckout(true);
                                            }}
                                            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Checkout Modal */}
                {showCheckout && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-end" onClick={() => setShowCart(false)}>
                        <div
                            className="w-full md:w-96 bg-white shadow-2xl overflow-y-auto h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Checkout</h2>
                                    <button onClick={() => setShowCheckout(false)} className="text-2xl">✕</button>
                                </div>

                                <form onSubmit={handleCheckout} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            value={customerInfo.name}
                                            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-black font-bold bg-white placeholder-gray-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                                        <input
                                            type="email"
                                            value={customerInfo.email}
                                            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-black font-bold bg-white placeholder-gray-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                                        <input
                                            type="tel"
                                            value={customerInfo.phone}
                                            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-black font-bold bg-white placeholder-gray-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Delivery Address *</label>
                                        <textarea
                                            value={customerInfo.address}
                                            onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                                            required
                                            rows={3}
                                            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-black font-bold bg-white resize-none placeholder-gray-400"
                                        />
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex justify-between text-2xl font-bold mb-4 bg-gray-100 p-4 rounded-lg">
                                            <span className="text-black">Total:</span>
                                            <span className="text-red-700 text-3xl">${getTotal()}</span>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400"
                                        >
                                            {submitting ? 'Placing Order...' : 'Place Order'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}