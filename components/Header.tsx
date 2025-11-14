import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            src="/images/ajora-1.webp"
                            alt="Ajora Ethiopian Kitchen"
                            className="h-12 w-12 object-contain"
                        />
                        <span className="text-2xl font-bold text-red-600">Ajorakitchen</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-red-600 transition">
                            Home
                        </Link>
                        <Link href="/menu" className="text-gray-700 hover:text-red-600 transition">
                            Menu
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-red-600 transition">
                            About
                        </Link>
                        <Link href="/reservation" className="text-gray-700 hover:text-red-600 transition">
                            Reservation
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-red-600 transition">
                            Contact
                        </Link>
                        <Link
                            href="/order"
                            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
                        >
                            Order Online
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}