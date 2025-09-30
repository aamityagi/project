"use client"; // needed for browser scripts

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Affiliation from "./components/Affiliation";
import Analytics from "../components/Analytics";

export default function MarketingContent() {
  return (
    <>
      <Analytics />
      <main className="bg-gray-50 text-gray-800">
        <Header />
        <Hero />
        <About />
        <Pricing />
        <Affiliation />
      </main>
    </>
  );
}
