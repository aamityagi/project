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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SessionProvider>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-100 text-gray-800`}
      >
        {/* Header */}
        <Header onMobileMenuClick={() => setMobileOpen(true)} />

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          <aside
            className={`hidden lg:flex flex-col bg-white text-gray-900 transition-all duration-300 shadow-md h-screen ${
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
            <aside className="relative w-64 text-gray-900 bg-white h-full shadow-lg flex flex-col">
              <div className="flex items-center p-4 border-b border-gray-800">
                <Image
                  width={180}
                  height={100}
                  src="/logo.png"
                  alt="Logo"
                  className="h-8 w-8 object-contain"
                />
                <button onClick={() => setMobileOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <Sidebar
                sidebarOpen={true}
                setSidebarOpen={() => {}}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
              />
            </aside>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-auto transition-all duration-300 shadow-inner bg-gray-200 flex flex-col">
            <div className="flex-1 bg-white m-6 shadow-xl">{children}</div>

          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
