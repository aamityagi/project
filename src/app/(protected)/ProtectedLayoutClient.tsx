"use client";

import { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import { X } from "lucide-react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Image from "next/image";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ProtectedLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  // Unified sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop sidebar
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile sidebar

  return (
    <SessionProvider>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen  text-gray-800`}
      >
        {/* Header */}
        <Header onMobileMenuClick={() => setMobileOpen(true)} />

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          <aside
            className={`hidden lg:flex flex-col bg-gray-900 text-white transition-all duration-300 ${
              sidebarOpen ? "w-64" : "w-16"
            }`}
          >
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              mobileOpen={false}
              setMobileOpen={() => {}}
            />
          </aside>

          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            } flex`}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar */}
            <aside className="relative w-64 bg-gray-900 text-white h-full shadow-lg flex flex-col">
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                {/* Left: Logo */}
                <Image
                  src="/logo.png"
                  alt="Logo"
                  className="h-8 w-8 object-contain"
                  fill
                />

                {/* Right: Close button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white p-2 hover:bg-gray-800 rounded"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Sidebar content */}
              <Sidebar
                sidebarOpen={true}
                setSidebarOpen={() => {}}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
              />
            </aside>
          </div>

          {/* Main Content */}
          <main
            className={`flex-1 overflow-auto bg-gray-50 transition-all duration-300 ${
              sidebarOpen ? "lg:ml-0" : "lg:ml-0"
            }`}
          >
            {children}
            {/* Footer */}
            <footer className="bg-white p-4 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Your Company
            </footer>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
