"use client";

import { ReactNode, useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

export default function ProtectedLayoutClient({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Detect sidebar hover state
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar-container");
    if (!sidebar) return;

    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    sidebar.addEventListener("mouseenter", handleEnter);
    sidebar.addEventListener("mouseleave", handleLeave);

    return () => {
      sidebar.removeEventListener("mouseenter", handleEnter);
      sidebar.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gray-200 text-gray-800 overflow-x-hidden">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Right Content: Header + Main + Footer */}
        <div
          className={`flex flex-1 flex-col transition-all duration-300 ${
            sidebarOpen || hovered ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          {/* Header */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col mt-16 overflow-hidden transition-all duration-300">
            <main className="flex-1 flex flex-col overflow-hidden relative p-4 lg:p-6 md:p-6">
              {/* Page content */}
              <div className="flex-1 p-6 w-full max-w-full mx-auto overflow-hidden shadow-md bg-gray-50 transition-all duration-300">
                {children}
              </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 p-4 text-center text-gray-600 flex-shrink-0">
              © {new Date().getFullYear()} My Company. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
