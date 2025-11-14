export default function Footer() {
    return (
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
                        <p className="text-gray-400">Monday, Tuesday, Thursday: 9am - 8pm</p>
                        <p className="text-gray-400">Wednesday: Closed</p>
                        <p className="text-gray-400">Friday, Saturday: 9am - 9pm</p>
                        <p className="text-gray-400">Sunday: 2pm - 8pm</p>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 Ajora Ethiopian Kitchen. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}