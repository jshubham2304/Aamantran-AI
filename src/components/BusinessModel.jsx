import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

const familyPlans = [
  {
    title: "Starter",
    value: "₹499",
    suffix: "one-time",
    tag: "Just the invite",
    text: "Premium digital invite — image, PDF, and shareable link.",
    points: [
      "AI-designed template",
      "Image + PDF export",
      "Shareable WhatsApp link",
      "Edits for 7 days",
    ],
    saves: "Saves ₹4,500+ vs 100 printed cards",
  },
  {
    title: "Smart Send",
    value: "₹2,499",
    suffix: "per event",
    tag: "Most popular",
    highlight: true,
    text: "Invite + WhatsApp bulk send + delivery tracking. The right pick for most weddings.",
    points: [
      "Everything in Starter",
      "WhatsApp bulk send (up to 300 guests)",
      "Contact segmentation",
      "Sent/seen/RSVP tracking",
      "Email + WhatsApp support",
    ],
    saves: "Saves ~₹35,000 vs printing + calling",
  },
  {
    title: "Agentic Premium",
    value: "₹7,499",
    suffix: "per event",
    tag: "Hands-off",
    text: "AI agent handles reminder calls, RSVPs, and follow-ups in your tone.",
    points: [
      "Everything in Smart Send",
      "AI reminder calls (Hindi + regional)",
      "Voice in your tone",
      "Live RSVP dashboard",
      "Priority support",
      "Unlimited guests",
    ],
    saves: "Saves 20+ hours of chasing",
  },
];

const plannerPlans = [
  {
    title: "Studio",
    value: "₹9,999",
    suffix: "per month",
    tag: "Small studios",
    text: "Up to 5 active weddings per month. Built for boutique planners and event teams.",
    points: [
      "5 active weddings / month",
      "3 team seats",
      "WhatsApp bulk send",
      "Multi-event (mehendi, sangeet, reception)",
      "Branded invites",
      "Email support",
    ],
    saves: "Replaces ₹40K+ of tools and manual ops",
  },
  {
    title: "Agency",
    value: "₹29,999",
    suffix: "per month",
    tag: "Most popular",
    highlight: true,
    text: "For studios doing 10+ weddings a month. Unlimited events, full AI agent, white-label.",
    points: [
      "Unlimited weddings",
      "Unlimited team seats",
      "AI reminder calls included",
      "White-label invites + custom domain",
      "Vendor lead routing",
      "Priority phone support",
      "Onboarding + training",
    ],
    saves: "Pays for itself by wedding #3",
  },
  {
    title: "Enterprise",
    value: "Custom",
    suffix: "annual contract",
    tag: "Chains & destinations",
    text: "Multi-city operations, destination weddings, and venue partners.",
    points: [
      "Everything in Agency",
      "Multi-region accounts",
      "Vendor marketplace integration",
      "API + CRM hooks",
      "Dedicated success manager",
      "99.9% uptime SLA",
    ],
    saves: "Volume pricing from 50+ weddings/mo",
  },
];

export default function BusinessModel() {
  const [mode, setMode] = useState("family");
  const plans = mode === "family" ? familyPlans : plannerPlans;

  return (
    <section className="section" id="pricing">
      <div className="container">
        <SectionHeading
          eyebrow="Pricing"
          title="Pricing that makes sense for both sides"
          description="Families pay per event — no subscriptions. Planners pay monthly with margins that actually work for a wedding business."
        />

        <div className="pricing-toggle" role="tablist" aria-label="Pricing audience">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "family"}
            className={`pricing-toggle-pill ${mode === "family" ? "is-active" : ""}`}
            onClick={() => setMode("family")}
          >
            For families
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "planner"}
            className={`pricing-toggle-pill ${mode === "planner" ? "is-active" : ""}`}
            onClick={() => setMode("planner")}
          >
            For planners
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            className="business-grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {plans.map((plan) => (
              <article
                key={plan.title}
                className={`business-card ${plan.highlight ? "is-highlight" : ""}`}
              >
                <span className="business-value">
                  {plan.value}
                  <em>{plan.suffix}</em>
                </span>
                <small className="business-tag">{plan.tag}</small>
                <h3>{plan.title}</h3>
                <p>{plan.text}</p>
                <div className="business-points">
                  {plan.points.map((point) => (
                    <span key={point}>{point}</span>
                  ))}
                </div>
                <div className="business-saves">{plan.saves}</div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="pricing-note">
          GST extra where applicable. WhatsApp Business API fees billed at cost on volume sends. Cancel anytime — no annual lock-in on Studio/Agency.
        </p>
      </div>
    </section>
  );
}
