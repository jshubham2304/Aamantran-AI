import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const audiences = {
  family: {
    eyebrow: "For families planning a wedding",
    headline: (
      <>
        Send beautiful invites
        <br />
        and stop chasing replies.
      </>
    ),
    description:
      "Create your invite in 30 seconds, share it on WhatsApp in one tap, and let the AI follow up on RSVPs for you. No printing. No spreadsheets. No late-night reminder calls.",
    primaryCta: { label: "Create my invite", href: "#/try" },
    secondaryCta: { label: "See pricing", href: "#pricing" },
    stats: [
      { value: "30 sec", label: "to design your invite" },
      { value: "1 tap", label: "to send on WhatsApp" },
      { value: "₹0", label: "printing and delivery" },
    ],
  },
  planner: {
    eyebrow: "For wedding planners and event teams",
    headline: (
      <>
        Run every wedding
        <br />
        from one dashboard.
      </>
    ),
    description:
      "Manage guests, send WhatsApp invites at scale, automate reminder calls, and track RSVPs across every event your team runs. Built for planners juggling 5 weddings at once.",
    primaryCta: { label: "Book a planner demo", href: "#/try" },
    secondaryCta: { label: "See planner pricing", href: "#pricing" },
    stats: [
      { value: "Unlimited", label: "guests per event" },
      { value: "Live", label: "RSVP + delivery tracking" },
      { value: "Multi-event", label: "team dashboard" },
    ],
  },
};

export default function Hero() {
  const [mode, setMode] = useState("family");
  const view = audiences[mode];

  return (
    <section className="hero section" id="top">
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="audience-switch"
            role="tablist"
            aria-label="Choose your view"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "family"}
              className={`audience-switch-pill ${mode === "family" ? "is-active" : ""}`}
              onClick={() => setMode("family")}
            >
              I'm a family
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "planner"}
              className={`audience-switch-pill ${mode === "planner" ? "is-active" : ""}`}
              onClick={() => setMode("planner")}
            >
              I'm a planner
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="eyebrow">{view.eyebrow}</span>
              <h1>{view.headline}</h1>
              <p className="hero-tagline">Har Invite, Dil Se ❤️</p>
              <p className="hero-description">{view.description}</p>

              <div className="hero-actions">
                <a className="btn btn-primary" href={view.primaryCta.href}>
                  {view.primaryCta.label}
                </a>
                <a className="btn btn-secondary" href={view.secondaryCta.href}>
                  {view.secondaryCta.label}
                </a>
              </div>

              <div className="hero-metrics">
                {view.stats.map((stat) => (
                  <div key={stat.label} className="metric-chip">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="hero-stage"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mockup-orb mockup-orb-left" />
          <div className="mockup-orb mockup-orb-right" />

          <div className="hero-mockup">
            <div className="mockup-topbar">
              <span className="status-dot" />
              <span>Invite Studio</span>
              <small>Live preview</small>
            </div>

            <div className="mockup-body">
              <div className="invite-card">
                <span className="invite-badge">Wedding invite</span>
                <h3>Meera weds Arjun</h3>
                <p>Jaipur • 14 February • Hindi + English</p>
                <div className="invite-wave" />
              </div>

              <div className="mockup-stack">
                <article className="mini-panel whatsapp-panel">
                  <span className="panel-label">WhatsApp delivery</span>
                  <strong>192 of 200 sent</strong>
                  <p>Auto follow-up for unopened invites after 6 hours.</p>
                </article>

                <article className="mini-panel">
                  <span className="panel-label">RSVP tracking</span>
                  <strong>154 viewed · 28 RSVP'd</strong>
                  <p>19 guests scheduled for an AI reminder call.</p>
                </article>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
