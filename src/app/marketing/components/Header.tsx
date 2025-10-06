"use client";
import Link from "next/link";
import { Button } from "../../(protected)/components/ui/button";
import Image from "next/image";
import logo from "../../../../public/logo.png"
export default function Header() {
  const logoAlt = "Namakwala"
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex justify-center">
        <Image
          src={logo}
          alt={logoAlt}
          width={90}
          height={90}
          sizes="90px"
          quality={90}
          priority
          className="h-15 w-15 object-cover"
        />
      </div>

      {/* Middle: Menu */}
      <nav className="hidden md:flex space-x-6 font-medium">
        <a href="#product" className="hover:text-blue-600">Prduct</a>
        <a href="#pricing" className="hover:text-blue-600">Pricing</a>
        <a href="#affiliation" className="hover:text-blue-600">Affiliation</a>
        <a href="#about" className="hover:text-blue-600">About</a>
        <a href="/blog" className="hover:text-blue-600">Blog</a>
      </nav>

      {/* Right: Buttons */}
      <div className="space-x-3">
        <Link href="/login" passHref>
          <Button variant="outline" className="cursor-pointer px-4 font-medium text-green-900 border-2 border-green-900 hover:bg-green-700 hover:text-white transition-colors duration-200">Login</Button>
        </Link>
        <Link href="/signup" passHref>
          <Button className="cursor-pointer text-white px-4 bg-green-900 hover:bg-green-700">Get Started</Button>
        </Link>
      </div>
    </header>
  );
}
