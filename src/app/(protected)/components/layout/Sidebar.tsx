"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Search,
  Globe,
  Share2,
  ShoppingCart,
  TrafficCone,
  FileBarChart,
  Gem,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

import logoFull from "../../../../../public/logo.png"; 
import logoIcon from "../../../../../public/logo-icon.png"; 

interface SidebarProps {
  sidebarOpen: boolean;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "SEO", href: "/seo", icon: Search },
  { name: "Website Builder", href: "/website-builder", icon: Globe },
  { name: "Social Auto", href: "/social-auto", icon: Share2 },
  { name: "E Commerce Platform", href: "/e-comm-platform", icon: ShoppingCart },
  { name: "Traffic & Market", href: "/traffic-market-trends", icon: TrafficCone },
  { name: "Reports", href: "/reports", icon: FileBarChart },
];

export default function Sidebar({ sidebarOpen, mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const [openSub, setOpenSub] = useState<string | null>(null);
  const logoAlt = "Namakwala";

  // Disable body scroll when mobile sidebar open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex flex-col h-screen bg-white shadow-md transition-all duration-300 fixed left-0 top-0 z-40 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center p-4 transition-all duration-300">
          <Link href="/" className="flex items-center justify-center">
            {sidebarOpen ? (
              <Image
                src={logoFull}
                alt={logoAlt}
                width={180}
                height={180}
                priority
                className="h-10 w-auto object-contain transition-all duration-300"
              />
            ) : (
              <Image
                src={logoIcon}
                alt={logoAlt}
                width={40}
                height={40}
                priority
                className="h-10 w-10 object-cover transition-all duration-300"
              />
            )}
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-1">
          {menu.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <div key={item.name} className="relative group mb-1">
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-md transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  } ${sidebarOpen ? "justify-start px-3" : "justify-center"}`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="ml-3 text-sm truncate">{item.name}</span>}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-center gap-2">
          <Gem className="w-5 h-5 text-yellow-500" />
          {sidebarOpen && <span className="font-medium">Upgrade</span>}
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Image
            src={logoFull}
            alt={logoAlt}
            width={140}
            height={40}
            priority
            className="h-8 w-auto object-contain"
          />
          {setMobileOpen && (
            <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              ✕
            </button>
          )}
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {menu.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen?.(false)}
                className={`flex items-center gap-3 p-2 rounded-md transition ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex items-center gap-2">
          <Gem className="w-5 h-5 text-yellow-500" />
          <span className="font-medium">Upgrade</span>
        </div>
      </div>
    </>
  );
}
