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
import React, { useEffect } from "react";
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
  const logoAlt = "Namakwala";

  // Disable body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [mobileOpen]);

  // Render menu items
  const renderMenuItems = () =>
    menu.map((item) => {
      const isActive = pathname.startsWith(item.href);
      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setMobileOpen?.(false)}
          className={`flex items-center gap-3 p-2 rounded-md transition-all duration-200
            ${isActive ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"}
            ${sidebarOpen ? "justify-start px-4" : "justify-center"}
          `}
        >
          <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-700"}`} />
          {sidebarOpen && <span className="text-sm truncate">{item.name}</span>}
        </Link>
      );
    });

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex flex-col h-screen bg-white shadow-lg transition-all duration-300 fixed left-0 top-0 z-40
          ${sidebarOpen ? "w-64" : "w-20"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center p-4 transition-all duration-300">
          <Link href="/">
            {sidebarOpen ? (
              <Image
                src={logoFull}
                alt={logoAlt}
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <Image
                src={logoIcon}
                alt={logoAlt}
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
              />
            )}
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-1">{renderMenuItems()}</div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-2">
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
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
          {/* Lighter Overlay */}
          <div
            className="absolute inset-0 bg-black/10 transition-opacity duration-300"
            onClick={() => setMobileOpen?.(false)}
          />

          {/* Sidebar Content below header with smooth slide */}
          <aside
            className={`relative w-64 h-full bg-white shadow-md flex flex-col mt-16 z-50 transform transition-transform duration-300
              ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Menu */}
            <div className="flex-1 overflow-y-auto px-2 py-3">
              {renderMenuItems().map((item) =>
                React.cloneElement(item, {
                  onClick: () => setMobileOpen?.(false), // close on link click
                })
              )}
            </div>

            {/* Footer / Upgrade */}
            <div className="p-4 border-t border-gray-200 flex items-center gap-2">
              <Gem className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">Upgrade</span>
            </div>
          </aside>
        </div>
      )}


    </>
  );
}
