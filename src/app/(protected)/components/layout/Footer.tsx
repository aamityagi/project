"use client";

export default function Footer() {
  return (
    <footer className="bg-white p-4 text-center text-sm text-gray-500 shadow-inner mt-4">
      © {new Date().getFullYear()} Your Company
    </footer>
  );
}
