'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MenuPage() {
    const [activeFilter, setActiveFilter] = useState('all');

    const menuItems = [
        { name: "Sambusa", description: "Crispy pastry filled with lentils or meat", price: "$5.99", category: ["appetizers"] },
        { name: "Timatim Salad", description: "Fresh tomato and pepper salad", price: "$6.99", category: ["appetizers"] },
        { name: "Azifa", description: "Cold lentil salad with mustard dressing", price: "$7.99", category: ["appetizers"] },

        { name: "Doro Wat", description: "Spicy chicken stew with hard-boiled egg", price: "$16.99", category: ["lunch", "dinner"] },
        { name: "Kitfo", description: "Ethiopian steak tartare with spiced butter", price: "$18.99", category: ["lunch", "dinner"] },
        { name: "Tibs", description: "Sautéed beef or lamb with vegetables", price: "$17.99", category: ["lunch", "dinner"] },
        { name: "Shiro", description: "Chickpea stew with Ethiopian spices", price: "$14.99", category: ["breakfast", "lunch", "dinner"] },
        { name: "Veggie Combo", description: "Assortment of vegetarian dishes", price: "$15.99", category: ["lunch", "dinner"] },
        { name: "Firfir", description: "Injera mixed with spicy sauce", price: "$13.99", category: ["breakfast"] },
        { name: "Chechebsa", description: "Shredded flatbread with butter and spices", price: "$11.99", category: ["breakfast"] },

        { name: "Baklava", description: "Sweet pastry with honey and nuts", price: "$6.99", category: ["desserts"] },
        { name: "Rice Pudding", description: "Creamy rice pudding with cinnamon", price: "$5.99", category: ["desserts"] },

        { name: "Injera", description: "Traditional Ethiopian flatbread", price: "$3.99", category: ["sides"] },
        { name: "Rice", description: "Steamed basmati rice", price: "$3.99", category: ["sides"] },

        { name: "Ethiopian Coffee", description: "Traditional coffee ceremony", price: "$4.99", category: ["drinks"] },
        { name: "Tej", description: "Ethiopian honey wine", price: "$6.99", category: ["drinks"] },
        { name: "Soft Drinks", description: "Coke, Sprite, Fanta", price: "$2.99", category: ["drinks"] },
    ];

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'appetizers', label: 'Appetizers' },
        { id: 'breakfast', label: 'Breakfast' },
        { id: 'lunch', label: 'Lunch' },
        { id: 'dinner', label: 'Dinner' },
        { id: 'desserts', label: 'Desserts' },
        { id: 'sides', label: 'Sides' },
        { id: 'drinks', label: 'Drinks' },
    ];

    const filteredItems = activeFilter === 'all'
        ? menuItems
        : menuItems.filter(item => item.category.includes(activeFilter));

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
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
                        <p className="text-xl">Authentic Ethiopian Cuisine</p>
                    </div>
                </section>

                {/* Menu Section */}
                <section className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 max-w-6xl">

                        {/* Filter Tags */}
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveFilter(cat.id)}
                                    className={`px-6 py-2 rounded-full font-semibold transition ${
                                        activeFilter === cat.id
                                            ? 'bg-red-600 text-white'
                                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Menu Items */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredItems.map((item, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex-1">{item.name}</h3>
                                        <span className="text-xl font-bold text-red-600 ml-4">{item.price}</span>
                                    </div>

                                    {/* Dotted Line */}
                                    <div className="border-b border-dotted border-gray-300 dark:border-gray-600 my-2"></div>

                                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredItems.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 dark:text-gray-400 text-xl">No items found in this category.</p>
                            </div>
                        )}

                    </div>
                </section>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
}