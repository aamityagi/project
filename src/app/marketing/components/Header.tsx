"use client";
import Link from "next/link";
import { Button } from "../../(protected)/components/ui/button";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-blue-600">MyLogo</div>

      {/* Middle: Menu */}
      <nav className="hidden md:flex space-x-6 font-medium">
        <a href="#home" className="hover:text-blue-600">Home</a>
        <a href="#about" className="hover:text-blue-600">About</a>
        <a href="#pricing" className="hover:text-blue-600">Pricing</a>
        <a href="#affiliation" className="hover:text-blue-600">Affiliation</a>
      </nav>

      {/* Right: Buttons */}
      <div className="space-x-3">
        <Link href="/login" passHref>
          <Button variant="ghost" className="cursor-pointer">Login</Button>
        </Link>
        <Link href="/signup" passHref>
          <Button className="cursor-pointer">Get Started</Button>
        </Link>
      </div>
    </header>
  );
}
