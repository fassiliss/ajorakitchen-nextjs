import Header from '@/components/Header';

export default function Home() {
    return (
        <>
        <Header />

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
            {/* Background Image as separate div */}
            <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                    backgroundImage: "url(/images/ajora_banner.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>

            {/* Dark overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-6xl md:text-8xl font-bold mb-4">Ajorakitchen</h1>
                <p className="text-2xl md:text-3xl mb-8">Delicious Food, Memorable Moments</p>
                <div className="space-x-4">

                   <a href="#menu"
                    className="inline-block bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                    View Menu
                </a>

                <a
                    href="/reservation"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition"
               >


                Book a Table
                </a>

                </div>

        </div>

    {/* Scroll Down Arrow */}
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
    </div>
</section>

    {/* About Section */}
    <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-4">Welcome to Ajorakitchen</h2>
                <p className="text-gray-600 text-lg mb-8">
                    Experience the finest culinary delights prepared with love and passion
                </p>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            At Ajorakitchen, we believe that great food brings people together.
                            Our chefs use only the freshest ingredients to create dishes that
                            delight your taste buds and warm your heart.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            From traditional recipes passed down through generations to modern
                            culinary innovations, every dish tells a story of passion,
                            creativity, and excellence.
                        </p>
                    </div>
                    <div>
                        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Restaurant Image</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Menu Preview */}
    <section id="menu" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-bold mb-4">Our Menu</h2>
                <p className="text-gray-600 text-lg">Explore our delicious offerings</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Menu Item 1 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Food Image</span>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">Special Dish</h3>
                        <p className="text-gray-600 mb-4">Delicious and flavorful, made with love</p>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-red-600">$24.99</span>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Item 2 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Food Image</span>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">Chef's Choice</h3>
                        <p className="text-gray-600 mb-4">Our chef's recommended specialty</p>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-red-600">$29.99</span>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Item 3 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Food Image</span>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">House Special</h3>
                        <p className="text-gray-600 mb-4">A customer favorite for years</p>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-red-600">$19.99</span>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12">

                <a href="/menu"
                className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition"
                >
                View Full Menu
            </a>
        </div>
    </div>
</section>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-4">Ajora Ethiopian kitchen</h3>
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
                <p>&copy; 2024 Ajorakitchen. All rights reserved.</p>
            </div>
        </div>
    </footer>
</>
);
}