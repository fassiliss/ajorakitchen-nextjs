import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ajora Ethiopian Kitchen - Authentic Ethiopian Cuisine in Nashville",
    description: "Experience authentic Ethiopian flavors at Ajora Ethiopian Kitchen. Named after the twin waterfalls in Wolaita, we bring bold Ethiopian cuisine to Nashville, TN.",
    icons: {
        icon: '/images/ajora-1.webp',
        apple: '/images/ajora-1.webp',
        shortcut: '/images/ajora-1.webp',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}