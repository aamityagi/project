"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  Menu,
  Bell,
  Megaphone,
  ChevronDown,
  User,
  CreditCard,
  LogOut,
  Settings,
  Gem,
  Search,
  MoreVertical,
} from "lucide-react";
import { Button } from "../ui/button";
import logo from "../../../../../public/logo.png";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  mobileOpen,
  setMobileOpen,
}: HeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);

  // NEW: refs for dropdowns
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const [openDropdown, setOpenDropdown] = useState<
    "credits" | "notif" | "announce" | "profile" | "mobile" | null
  >(null);

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "U";

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const toggleDropdown = (dropdown: typeof openDropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  // NEW: Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        (profileRef.current && !profileRef.current.contains(e.target as Node)) &&
        (mobileRef.current && !mobileRef.current.contains(e.target as Node))
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Added for header shift with sidebar hover
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
    <>
      {/* HEADER BAR */}
      <header
        ref={headerRef}
        // ✅ Updated header positioning logic
        className={`fixed top-0 left-0 h-16 px-4 py-2 bg-white shadow-md flex items-center justify-between z-[100] transition-all duration-300 w-full ${
          sidebarOpen || hovered
            ? "lg:left-64 lg:w-[calc(100%-16rem)]"
            : "lg:left-20 lg:w-[calc(100%-5rem)]"
        }`}
      >
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3 relative w-auto">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 hover:bg-gray-100 border border-gray-300 rounded-lg lg:hidden cursor-pointer"
          >
            <Menu className="w-6 h-6 text-gray-500" />
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 border border-gray-300 rounded-lg hidden lg:block cursor-pointer"
          >
            <Menu className="w-6 h-6 text-gray-500" />
          </button>

          {/* Mobile Logo */}
          <div className="lg:hidden">
            <Link href="/">
              <Image
                src={logo}
                alt="Namakwala"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>
        </div>

        {/* CENTER - SEARCH BOX */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search..."
              className="pl-10 pr-4 h-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* Desktop items */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Credits */}
            <div className="relative">
              <Button
                variant="outline"
                className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 text-gray-700"
                onClick={() => toggleDropdown("credits")}
              >
                <Gem className="w-4 h-4 text-green-700" /> Credits: 10000
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </Button>
              {openDropdown === "credits" && (
                <div className="absolute right-0 mt-2 w-56 bg-white border shadow-lg z-[999] rounded-md p-2">
                  <h4 className="font-medium text-gray-900">Credits Breakdown</h4>
                  <ul className="mt-2 space-y-1">
                    <li className="flex justify-between">
                      SEO <span>4000</span>
                    </li>
                    <li className="flex justify-between">
                      Website Builder <span>6000</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                onClick={() => toggleDropdown("notif")}
              >
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                  12
                </span>
              </Button>
              {openDropdown === "notif" && (
                <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg z-[999] rounded-md p-2">
                  <h4 className="font-medium text-gray-900">Notifications</h4>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-md font-medium">
                        NEW
                      </span>
                      <h5 className="font-medium">SEO Report Generated</h5>
                      <p className="text-sm text-gray-500">
                        Your latest SEO report is ready.
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Announcements */}
            <div className="relative">
              <Button
                variant="ghost"
                className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                onClick={() => toggleDropdown("announce")}
              >
                <Megaphone className="w-5 h-5 text-gray-500" />
              </Button>
              {openDropdown === "announce" && (
                <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg z-[999] rounded-md p-2">
                  <h4 className="font-medium text-gray-900">Announcements</h4>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-md font-medium">
                        NEW
                      </span>
                      <h5 className="font-medium">AI Builder v2.0 Released</h5>
                      <p className="text-sm text-gray-500">
                        Explore our latest AI builder.
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <Button
              variant="outline"
              className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 text-gray-700"
              onClick={() => toggleDropdown("profile")}
            >
              <User className="w-5 h-5 text-gray-700" />
              <span className="font-medium">{initials}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>

            {openDropdown === "profile" && (
              <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg z-[999] rounded-md p-1">
                <div className="p-3 border-b">
                  <p className="text-sm font-semibold text-gray-900">
                    {session?.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session?.user?.email || "user@email.com"}
                  </p>
                </div>
                <ul>
                  <li
                    onClick={() => router.push("/profile")}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <User className="w-4 h-4" /> Edit Profile
                  </li>
                  <li
                    onClick={() => router.push("/account-settings")}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <Settings className="w-4 h-4" /> Account Settings
                  </li>
                  <li
                    onClick={() => router.push("/billing")}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" /> Billing
                  </li>
                  <li
                    onClick={() => router.push("/upgrade")}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <Gem className="w-4 h-4 text-green-700" /> Upgrade
                  </li>
                  <li
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 hover:bg-red-100 rounded-md cursor-pointer text-red-600 border-t mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile 3-dot menu */}
          <div ref={mobileRef} className="lg:hidden relative">
            <Button variant="ghost" onClick={() => toggleDropdown("mobile")}>
              <MoreVertical className="w-5 h-5 text-gray-700" />
            </Button>
            {openDropdown === "mobile" && (
              <div className="fixed top-16 left-0 w-full bg-white z-[99] shadow-md">
                {/* Credits */}
                <div className="p-4 border-b">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <Gem className="w-4 h-4 text-green-700" /> Credits
                  </h4>
                  <ul className="mt-2 space-y-1">
                    <li className="flex justify-between">
                      SEO <span>4000</span>
                    </li>
                    <li className="flex justify-between">
                      Website Builder <span>6000</span>
                    </li>
                  </ul>
                </div>

                {/* Notifications */}
                <div className="p-4 border-b">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-gray-700" /> Notifications
                  </h4>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-md font-medium">
                        NEW
                      </span>
                      <h5 className="font-medium">SEO Report Generated</h5>
                      <p className="text-sm text-gray-500">
                        Your latest SEO report is ready.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Announcements */}
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-gray-700" /> Announcements
                  </h4>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-md font-medium">
                        NEW
                      </span>
                      <h5 className="font-medium">AI Builder v2.0 Released</h5>
                      <p className="text-sm text-gray-500">
                        Explore our latest AI builder.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
