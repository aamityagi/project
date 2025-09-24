"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Search,
  Globe,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "SEO",
    href: "/seo",
    icon: Search,
    sub: [
      { name: "Keyword Finder", href: "/seo/keyword-finder" },
      { name: "Domain Overview", href: "/seo/domain-overview" },
    ],
  },
  {
    name: "Website Builder",
    href: "/dashboard/website-builder",
    icon: Globe,
    sub: [
      { name: "Blog", href: "/website-builder/blog" },
      { name: "Ecommerce", href: "/website-builder/ecommerce" },
      { name: "Affiliations", href: "/website-builder/affiliations" },
    ],
  },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const [openSub, setOpenSub] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close mobile sidebar on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen, setMobileOpen]);

  const renderMenuItem = (item: (typeof menu)[number], isMobile = false) => {
    const hasSub = !!item.sub;
    const isActive = openSub === item.name;
    const isCurrent = pathname.startsWith(item.href);

    return (
      <div key={item.name} className="relative group mb-2">
        <div
          className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-700 ${
            isCurrent ? "bg-gray-800" : ""
          }`}
          onClick={() =>
            hasSub
              ? setOpenSub(isActive ? null : item.name)
              : isMobile
              ? setMobileOpen(false)
              : undefined
          }
        >
          <div className="flex items-center">
            <item.icon className="w-5 h-5" />
            {sidebarOpen || isMobile ? (
              <span className="ml-2">{item.name}</span>
            ) : null}
          </div>
          {hasSub &&
            (sidebarOpen || isMobile) &&
            (isActive ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            ))}
        </div>

        {/* Submenu for expanded sidebar */}
        {hasSub && (sidebarOpen || isMobile) && isActive && (
          <div className="ml-8 mt-1 space-y-1 cursor-pointer">
            {item.sub.map((sub) => (
              <Link
                key={sub.name}
                href={sub.href}
                className="block text-sm p-2 hover:text-yellow-400"
                onClick={() => isMobile && setMobileOpen(false)}
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}

        {/* Floating submenu for collapsed sidebar */}
        {hasSub && !sidebarOpen && !isMobile && (
          <div className="absolute left-full top-0 ml-2 bg-gray-800 text-white shadow-lg rounded p-2 w-44 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
            {item.sub.map((sub) => (
              <Link
                key={sub.name}
                href={sub.href}
                className="block text-sm p-2 hover:text-yellow-400"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={sidebarRef} className="flex flex-col h-full">
      {/* Desktop toggle button */}
      <div className="flex justify-end p-2 lg:block hidden">
        <button
          className="p-1 text-gray-300 hover:text-white cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="p-2 flex-1 overflow-y-auto">
        {menu.map((item) => renderMenuItem(item, mobileOpen))}
      </div>
    </div>
  );
}
