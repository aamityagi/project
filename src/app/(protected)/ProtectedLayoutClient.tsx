"use client";

import { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

export default function ProtectedLayoutClient({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gray-100 text-gray-800">
        {/* Sidebar (Desktop + Mobile handled inside Sidebar.tsx) */}
        <Sidebar sidebarOpen={sidebarOpen} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main Right Content */}
        <div className="flex flex-1 flex-col relative">
          {/* Header */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          {/* Main Content */}
          <div className="flex flex-1 mt-16 overflow-hidden">
            <main className="flex-1 flex flex-col overflow-auto pt-4">
              <div className="bg-white shadow-lg rounded-lg mx-4 p-2">{children}</div>
              <footer className="mt-4 bg-white border-t p-4 text-center text-gray-600">
                © {new Date().getFullYear()} My Company. All rights reserved.
              </footer>
            </main>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
