import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import MarketEngine from "./components/MarketEngine";
import DemoFlow from "./components/DemoFlow";
import CostCalculator from "./components/CostCalculator";
import Features from "./components/Features";
import Vision from "./components/Vision";
import BusinessModel from "./components/BusinessModel";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="page-shell">
      <div className="page-gradient page-gradient-top" />
      <div className="page-gradient page-gradient-bottom" />
      <div className="page-pattern" />

      <Navbar />

      <main>
        <Hero />
        <Problem />
        <Solution />
        <MarketEngine />
        <DemoFlow />
        <CostCalculator />
        <Features />
        <Vision />
        <BusinessModel />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
