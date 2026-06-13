import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Problem = lazy(() => import("./components/Problem"));
const Solution = lazy(() => import("./components/Solution"));
const DemoLite = lazy(() => import("./components/DemoLite"));
const TryApp = lazy(() => import("./components/TryApp"));
const CostCalculator = lazy(() => import("./components/CostCalculator"));
const Features = lazy(() => import("./components/Features"));
const BusinessModel = lazy(() => import("./components/BusinessModel"));
const FAQ = lazy(() => import("./components/FAQ"));
const CTA = lazy(() => import("./components/CTA"));
const Footer = lazy(() => import("./components/Footer"));

function readRoute() {
  const hash = window.location.hash || "";
  return hash.startsWith("#/try") ? "try" : "landing";
}

export default function App() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onHash = () => {
      const next = readRoute();
      setRoute((prev) => {
        if (prev !== next) {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
        return next;
      });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (route === "try") {
    return (
      <div className="page-shell">
        <div className="page-gradient page-gradient-top" />
        <div className="page-gradient page-gradient-bottom" />
        <div className="page-pattern" />

        <header className="try-page-header">
          <div className="container try-page-header-shell">
            <a className="brand" href="#" aria-label="Aamantran AI home">
              <span className="brand-mark">A</span>
              <span>
                Aamantran AI
                <small>Live demo</small>
              </span>
            </a>
            <a className="btn btn-ghost btn-small" href="#">
              ← Back to landing
            </a>
          </div>
        </header>

        <main>
          <Suspense fallback={null}>
            <TryApp />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    );
  }

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
          <DemoLite />
          <CostCalculator />
          <Features />
          <BusinessModel />
          <FAQ />
          <CTA />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
