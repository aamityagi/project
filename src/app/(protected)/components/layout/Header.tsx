"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
  MoreVertical,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logoAlt = "Namakwala";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 h-16 px-4 py-2 bg-white shadow-md flex items-center justify-between z-[60] transition-all duration-300 w-full ${
        sidebarOpen ? "lg:left-64 lg:w-[calc(100%-16rem)]" : "lg:left-20 lg:w-[calc(100%-4rem)]"
      }`}
    >
      {/* Left side: Hamburger + Sidebar toggle + Mobile logo */}
      <div className="flex items-center gap-3 relative w-full lg:w-auto">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden z-50"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Desktop sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg hidden lg:block"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Mobile logo (centered but not overlapping buttons) */}
        <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 z-40">
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

      {/* Middle search */}
      <div className="hidden lg:flex flex-1 justify-center">
        <Input placeholder="Search..." className="max-w-md h-10 p-4" />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Desktop buttons (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Credits */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-1 border-green-900 text-green-900 font-medium"
              >
                Credits: 10000
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Credits Breakdown</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex justify-between"><span>SEO</span><span>2000</span></DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between"><span>Website Builder</span><span>3000</span></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p-2 hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>SEO Report Generated</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Announcements */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p-2 hover:bg-gray-100">
                <Megaphone className="w-5 h-5 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Announcements</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New AI Builder v2.0 Released</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Profile dropdown */}
        {session ? (
          <DropdownMenu
            open={openDropdown === "profile"}
            onOpenChange={() =>
              setOpenDropdown(openDropdown === "profile" ? null : "profile")
            }
          >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-900 text-white">
                    {initials}
                  </div>
                )}
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64 rounded-lg border shadow-md p-1"
            >
              <div className="p-3 border-b">
                <p className="text-sm font-semibold text-gray-900">{session.user?.name || "User Name"}</p>
                <p className="text-xs text-gray-500 truncate">{session.user?.email || "user@email.com"}</p>
              </div>

              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="w-4 h-4 mr-2" /> Edit Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/account-settings")}>
                <Settings className="w-4 h-4 mr-2" /> Account Settings
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/billing")}>
                <CreditCard className="w-4 h-4 mr-2" /> Billing
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/upgrade")} className="mt-1">
                <div className="flex items-center justify-between w-full bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-md">
                  <div className="flex items-center gap-2">
                    <Gem className="w-4 h-4 text-green-700" />
                    <span className="font-medium text-sm">Upgrade</span>
                  </div>
                </div>
              </DropdownMenuItem>

              {/* Theme toggle */}
              <DropdownMenuItem
                className="flex items-center justify-between cursor-pointer"
                onClick={() => document.documentElement.classList.toggle("dark")}
              >
                <span>Toggle Theme</span>
                <span className="text-gray-500">
                  {document.documentElement.classList.contains("dark") ? "🌙" : "☀️"}
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleLogout} className="text-red-600 border-t mt-1">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={() => router.push("/login")}
            className="border-green-900 text-green-900 hover:bg-green-900 hover:text-white"
          >
            Login
          </Button>
        )}

        <DropdownMenu
          open={openDropdown === "mobile"}
          onOpenChange={() =>
            setOpenDropdown(openDropdown === "mobile" ? null : "mobile")
          }
        >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="lg:hidden p-2 z-50">
              <MoreVertical className="w-5 h-5 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 z-50">
            {/* Mobile Credits */}
            <DropdownMenuItem
              className="flex justify-between items-center cursor-pointer"
              onClick={() =>
                setOpenDropdown(openDropdown === "mobile-credits" ? "mobile" : "mobile-credits")
              }
            >
              Credits
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuItem>
            {openDropdown === "mobile-credits" && (
              <div className="p-3 border-t">
                <DropdownMenuLabel>Credits Breakdown</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-between">
                  <span>SEO</span><span>2000</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between">
                  <span>Website Builder</span><span>3000</span>
                </DropdownMenuItem>
              </div>
            )}

            {/* Mobile Notifications */}
            <DropdownMenuItem
              className="flex justify-between items-center cursor-pointer mt-2"
              onClick={() =>
                setOpenDropdown(openDropdown === "mobile-notif" ? "mobile" : "mobile-notif")
              }
            >
              Notifications
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuItem>
            {openDropdown === "mobile-notif" && (
              <div className="p-3 border-t">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>SEO Report Generated</DropdownMenuItem>
              </div>
            )}

            {/* Mobile Announcements */}
            <DropdownMenuItem
              className="flex justify-between items-center cursor-pointer mt-2"
              onClick={() =>
                setOpenDropdown(openDropdown === "mobile-announce" ? "mobile" : "mobile-announce")
              }
            >
              Announcements
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuItem>
            {openDropdown === "mobile-announce" && (
              <div className="p-3 border-t">
                <DropdownMenuLabel>Announcements</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New AI Builder v2.0 Released</DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </header>
  );
}