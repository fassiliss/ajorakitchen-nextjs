import Header from '@/components/Header';

export default function MenuPage() {
    const menuCategories = [
        {
            name: "Appetizers",
            items: [
                { name: "Sambusa", description: "Crispy pastry filled with lentils or meat", price: "$5.99" },
                { name: "Timatim Salad", description: "Fresh tomato and pepper salad", price: "$6.99" },
                { name: "Azifa", description: "Cold lentil salad with mustard dressing", price: "$7.99" },
            ]
        },
        {
            name: "Main Dishes",
            items: [
                { name: "Doro Wat", description: "Spicy chicken stew with hard-boiled egg", price: "$16.99" },
                { name: "Kitfo", description: "Ethiopian steak tartare with spiced butter", price: "$18.99" },
                { name: "Tibs", description: "Sautéed beef or lamb with vegetables", price: "$17.99" },
                { name: "Shiro", description: "Chickpea stew with Ethiopian spices", price: "$14.99" },
                { name: "Veggie Combo", description: "Assortment of vegetarian dishes", price: "$15.99" },
            ]
        },
        {
            name: "Sides",
            items: [
                { name: "Injera", description: "Traditional Ethiopian flatbread", price: "$3.99" },
                { name: "Rice", description: "Steamed basmati rice", price: "$3.99" },
            ]
        },
        {
            name: "Drinks",
            items: [
                { name: "Ethiopian Coffee", description: "Traditional coffee ceremony", price: "$4.99" },
                { name: "Tej", description: "Ethiopian honey wine", price: "$6.99" },
                { name: "Soft Drinks", description: "Coke, Sprite, Fanta", price: "$2.99" },
            ]
        }
    ];

    return (
        <>
            <Header />

            <div className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
                        <p className="text-xl">Authentic Ethiopian Cuisine</p>
                    </div>
                </section>

                {/* Menu Categories */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        {menuCategories.map((category, idx) => (
                            <div key={idx} className="mb-16">
                                <h2 className="text-4xl font-bold mb-8 text-center text-red-600">
                                    {category.name}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {category.items.map((item, itemIdx) => (
                                        <div key={itemIdx} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-2xl font-bold">{item.name}</h3>
                                                <span className="text-2xl font-bold text-red-600">{item.price}</span>
                                            </div>
                                            <p className="text-gray-600 mb-4">{item.description}</p>
                                            <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
                                                Add to Order
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Ajora Ethiopian Kitchen</h3>
                            <p className="text-gray-400">
                                Delicious food prepared with passion and served with love.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
                            <p className="text-gray-400">📍 2637 Lake Villa Dr, Nashville TN 37217</p>
                            <p className="text-gray-400">📞 (615) 801-0203</p>
                            <p className="text-gray-400">✉️ GMeshesha@ajoraEthiopiankitchen.com</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-4">Hours</h4>
                            <p className="text-gray-400">Monday - Friday: 11am - 10pm</p>
                            <p className="text-gray-400">Saturday: 10am - 11pm</p>
                            <p className="text-gray-400">Sunday: 10am - 9pm</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Ajora Ethiopian Kitchen. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}