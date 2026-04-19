import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Problem = lazy(() => import("./components/Problem"));
const Solution = lazy(() => import("./components/Solution"));
const MarketEngine = lazy(() => import("./components/MarketEngine"));
const DemoFlow = lazy(() => import("./components/DemoFlow"));
const CostCalculator = lazy(() => import("./components/CostCalculator"));
const Features = lazy(() => import("./components/Features"));
const Vision = lazy(() => import("./components/Vision"));
const BusinessModel = lazy(() => import("./components/BusinessModel"));
const CTA = lazy(() => import("./components/CTA"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  return (
    <div className="page-shell">
      <div className="page-gradient page-gradient-top" />
      <div className="page-gradient page-gradient-bottom" />
      <div className="page-pattern" />

      <Navbar />

      <main>
        <Hero />
        <Suspense fallback={null}>
          <Problem />
          <Solution />
          <MarketEngine />
          <DemoFlow />
          <CostCalculator />
          <Features />
          <Vision />
          <BusinessModel />
          <CTA />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
