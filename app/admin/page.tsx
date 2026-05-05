"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AdminPage() {
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <>
      <Header />

      <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <section className="bg-red-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-xl">
                  Online requests are now delivered directly by email.
                </p>
              </div>
              <button
                onClick={logout}
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition self-start"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Email-only mode is active
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                Orders, reservations, contact messages, and catering requests
                are no longer saved in a database. Each submission is sent to
                the restaurant email inbox, so use email as the source of truth
                for customer follow-up.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a
                  href="mailto:fassiliss@gmail.com"
                  className="block rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:border-red-500 transition"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Check Website Requests
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Open the inbox where form submissions arrive.
                  </p>
                </a>
                <a
                  href="/order"
                  className="block rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:border-red-500 transition"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Test Online Order
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Place a sample order when you want to verify email delivery.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
