import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default function AboutPage() {
    return (
        <>
            <Header />

            <div className="pt-20">
                {/* Hero */}
                {/* Hero */}
                <section
                    className="relative py-32"
                    style={{
                        backgroundImage: "url(/images/ajora_banner.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black opacity-60"></div>

                    {/* Content */}
                    <div className="relative z-10 container mx-auto px-4 text-center text-white">
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

            <Footer />
        </>
    );
}