import { motion } from "framer-motion";

const heroStats = [
  { label: "Invite creation", value: "30 sec" },
  { label: "WhatsApp distribution", value: "1 tap" },
  { label: "Tracking visibility", value: "Live" },
];

export default function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">India’s AI Invitation Platform</span>
          <h1>
            India’s invitation journey,
            <br />
            redesigned for speed, emotion, and scale.
          </h1>
          <p className="hero-tagline">Har Invite, Dil Se ❤️</p>
          <p className="hero-description">
            Create, personalize, share, automate, and track invites in
            seconds. Aamantran AI turns invitation chaos into an agentic,
            measurable operating system for Indian celebrations.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#demo">
              Try Demo
            </a>
            <a className="btn btn-secondary" href="#waitlist">
              Join Waitlist
            </a>
          </div>

          <div className="hero-metrics">
            {heroStats.map((stat) => (
              <div key={stat.label} className="metric-chip">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
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
              <small>Live product preview</small>
            </div>

            <div className="mockup-body">
              <div className="invite-card">
                <span className="invite-badge">Shaadi Launch</span>
                <h3>Meera weds Arjun</h3>
                <p>Jaipur • 14 February • Hindi + English</p>
                <div className="invite-wave" />
              </div>

              <div className="mockup-stack">
                <article className="mini-panel whatsapp-panel">
                  <span className="panel-label">WhatsApp delivery</span>
                  <strong>192/200 sent</strong>
                  <p>Auto follow-up for unopened invites after 6 hours.</p>
                </article>

                <article className="mini-panel">
                  <span className="panel-label">Tracking</span>
                  <strong>154 viewed</strong>
                  <p>28 RSVP received, 19 need voice-call reminder.</p>
                </article>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
