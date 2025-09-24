import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Affiliation from "./components/Affiliation";

export default function MarketingPage() {
  return (
    <main className="bg-gray-50">
      <Header />
      <Hero />
      <About />
      <Pricing />
      <Affiliation />
    </main>
  );
}
