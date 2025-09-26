"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, User, CreditCard, LogOut, Mail, Menu } from "lucide-react";

type MenuItem =
  | { label: string; icon: React.ElementType; route: string }
  | { label: string; icon: React.ElementType; action: "logout" };

const menuItems: MenuItem[] = [
  { label: "Profile Settings", icon: User, route: "/profile" },
  { label: "Billing", icon: CreditCard, route: "/billing" },
  { label: "Logout", icon: LogOut, action: "logout" },
];

interface HeaderProps {
  onMobileMenuClick: () => void;
}

export default function Header({ onMobileMenuClick }: HeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-md z-10 bg-white">
      <div className="flex items-center gap-3 cursor-pointer">
        <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 hover:bg-gray-100 cursor-pointer"
          onClick={onMobileMenuClick}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <span className="font-bold text-lg">My Dashboard</span>
      </div>

      {/* Profile dropdown */}
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center text-gray-500 gap-2 hover:bg-gray-100 cursor-pointer"
            >
              <User className="w-4 h-4 text-gray-500" />
              {session.user?.name ?? session.user?.email}
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 border bg-white shadow-md p-0 z-50" align="end">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border-b">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{session.user?.email}</span>
            </div>

            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const isLast = idx === menuItems.length - 1;
              return (
                <DropdownMenuItem
                  key={item.label}
                  onClick={
                    "action" in item ? handleLogout : () => router.push(item.route)
                  }
                  className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    !isLast ? "border-b" : ""
                  }`}
                >
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
