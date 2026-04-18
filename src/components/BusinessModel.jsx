import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const pricingPlans = [
  {
    title: "Starter Invite",
    value: "From ₹49",
    tag: "Low-friction",
    text: "For users who just want a beautiful digital invite without spending thousands on printing.",
    points: ["Ready-made premium template", "Image or PDF export", "Fast sharing link"],
  },
  {
    title: "Smart Send",
    value: "₹149–₹399",
    tag: "Most useful",
    text: "The best value tier for families who want card creation plus WhatsApp sending and better coordination.",
    points: ["Invite + WhatsApp automation", "Contact segmentation", "Basic delivery tracking"],
  },
  {
    title: "Agentic Premium",
    value: "₹999+",
    tag: "Time saver",
    text: "For users who want the AI agent to handle reminders, voice calls, and tracking end to end.",
    points: ["AI follow-up agent", "Voice reminder workflows", "Live tracking and RSVP insights"],
  },
  {
    title: "Partner Revenue",
    value: "After trust",
    tag: "Platform upside",
    text: "Once user adoption is strong, vendors, subscriptions, and marketplace layers expand revenue without making the core product expensive.",
    points: ["Vendor leads", "Creator subscriptions", "Celebration marketplace"],
  },
];

export default function BusinessModel() {
  return (
    <section className="section" id="business">
      <div className="container">
        <SectionHeading
          eyebrow="Business Model"
          title="Cheap enough for users, strong enough for the business"
          description="The product starts with pricing that feels like an easy yes for Indian families. Revenue expands through upgrades and ecosystem layers, not by overcharging the core invite."
        />

        <div className="business-grid">
          {pricingPlans.map((plan, index) => (
            <motion.article
              key={plan.title}
              className="business-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="business-value">{plan.value}</span>
              <small className="business-tag">{plan.tag}</small>
              <h3>{plan.title}</h3>
              <p>{plan.text}</p>
              <div className="business-points">
                {plan.points.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
