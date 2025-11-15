'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full bg-white shadow-md z-50">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            src="/images/ajora-1.webp"
                            alt="Ajora Ethiopian Kitchen"
                            className="h-12 w-12 object-contain"
                        />
                        <span className="text-xl md:text-2xl font-bold text-red-600">Ajora</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex space-x-8 text-lg">
                        <li>
                            <Link href="/" className="text-gray-700 hover:text-red-600 transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/menu" className="text-gray-700 hover:text-red-600 transition">
                                Menu
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-gray-700 hover:text-red-600 transition">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/reservation" className="text-gray-700 hover:text-red-600 transition">
                                Reservation
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-gray-700 hover:text-red-600 transition">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/order"
                                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
                            >
                                Order Online
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <ul className="flex flex-col space-y-4 text-lg">
                            <li>
                                <Link
                                    href="/"
                                    className="block text-gray-700 hover:text-red-600 transition py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/menu"
                                    className="block text-gray-700 hover:text-red-600 transition py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="block text-gray-700 hover:text-red-600 transition py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/reservation"
                                    className="block text-gray-700 hover:text-red-600 transition py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Reservation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="block text-gray-700 hover:text-red-600 transition py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/order"
                                    className="block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Order Online
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}