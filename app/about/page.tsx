import Header from '@/components/Header';

export default function AboutPage() {
    return (
        <>
            <Header />

            <div className="pt-20">
                {/* Hero */}
                <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
                        <p className="text-xl">Our Story & Tradition</p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="prose prose-lg mx-auto">
                            <h2 className="text-4xl font-bold mb-6">Welcome to Ajora Ethiopian Kitchen</h2>

                            <p className="text-gray-700 leading-relaxed mb-6">
                                Ajora Ethiopian Kitchen brings authentic Ethiopian flavors to Nashville, Tennessee.
                                Our restaurant is a celebration of rich culinary traditions passed down through
                                generations, combined with warm hospitality that makes every guest feel like family.
                            </p>

                            <h3 className="text-3xl font-bold mb-4 mt-8">Our Story</h3>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Founded with a passion for sharing Ethiopian culture through food, Ajora Ethiopian
                                Kitchen has become a beloved destination for authentic Ethiopian cuisine. Every dish
                                is prepared with traditional recipes and the finest ingredients, ensuring an
                                unforgettable dining experience.
                            </p>

                            <h3 className="text-3xl font-bold mb-4 mt-8">What Makes Us Special</h3>
                            <ul className="space-y-4 text-gray-700">
                                <li>✨ Authentic Ethiopian recipes passed down through generations</li>
                                <li>🌶️ Fresh spices imported directly from Ethiopia</li>
                                <li>👨‍🍳 Experienced chefs trained in traditional cooking methods</li>
                                <li>🍽️ Warm, family-style dining experience</li>
                                <li>☕ Traditional Ethiopian coffee ceremony</li>
                            </ul>

                            <div className="mt-12 text-center">
                                <a
                                    href="/menu"
                                    className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition"
                                >
                                    View Our Menu
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Ajora Ethiopian Kitchen. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}