import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

const previews = [
  {
    key: "design",
    step: "01",
    label: "Design",
    title: "Meera weds Arjun",
    meta: "Jaipur • 14 February • Hindi + English",
    badge: "AI invite ready",
    description:
      "Pick the event, hosts, and language. A premium invite is generated in seconds — image, PDF, and a shareable link.",
  },
  {
    key: "send",
    step: "02",
    label: "Send",
    title: "WhatsApp delivery",
    meta: "192 of 200 sent · 154 viewed",
    badge: "One-tap send",
    description:
      "Upload contacts or paste numbers. Personalized invites go out on WhatsApp — to families, friends, vendors, all at once.",
  },
  {
    key: "track",
    step: "03",
    label: "Track",
    title: "Live RSVP dashboard",
    meta: "28 RSVP'd · 19 AI follow-up calls",
    badge: "Real-time",
    description:
      "See who saw, who replied, and who needs a nudge. The AI agent makes polite reminder calls in your tone.",
  },
];

export default function DemoLite() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % previews.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const current = previews[active];

  return (
    <section className="section" id="demo">
      <div className="container">
        <SectionHeading
          eyebrow="See it in action"
          title="A 30-second peek at the product"
          description="Three steps — design, send, track. The full interactive demo is one click away."
        />

        <div className="lite-demo-shell">
          <div className="lite-demo-steps">
            {previews.map((preview, index) => (
              <button
                key={preview.key}
                type="button"
                className={`lite-demo-step ${active === index ? "is-active" : ""}`}
                onClick={() => setActive(index)}
                aria-label={`Show ${preview.label} step`}
              >
                <span className="lite-demo-step-index">{preview.step}</span>
                <span className="lite-demo-step-label">{preview.label}</span>
              </button>
            ))}
          </div>

          <div className="lite-demo-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                className="lite-demo-card"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="lite-demo-card-head">
                  <span className="lite-demo-badge">{current.badge}</span>
                  <span className="lite-demo-step-tag">Step {current.step}</span>
                </div>
                <h3>{current.title}</h3>
                <p className="lite-demo-meta">{current.meta}</p>
                <p className="lite-demo-desc">{current.description}</p>

                <div className="lite-demo-progress">
                  {previews.map((preview, index) => (
                    <span
                      key={preview.key}
                      className={`lite-demo-progress-bar ${
                        index === active ? "is-active" : ""
                      } ${index < active ? "is-done" : ""}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lite-demo-cta">
          <a className="btn btn-primary" href="#/try">
            Try the live demo →
          </a>
          <a className="btn btn-ghost" href="#calculator">
            See cost savings
          </a>
        </div>
      </div>
    </section>
  );
}
