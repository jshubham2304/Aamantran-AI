import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const solutionCards = [
  {
    title: "Agentic invite generation",
    text: "Generate beautiful invites with tone, language, event type, and family context already baked into the workflow.",
  },
  {
    title: "WhatsApp automation",
    text: "Send at scale with personalized messages, grouped contacts, and timed follow-ups that feel human.",
  },
  {
    title: "AI voice calls",
    text: "Automate polite reminder calls for pending guests without forcing the host into repetitive outreach.",
  },
  {
    title: "Tracking dashboard",
    text: "Monitor opens, responses, delivery, and follow-up status from one clean command center.",
  },
];

export default function Solution() {
  return (
    <section className="section" id="solution">
      <div className="container solution-shell">
        <div>
          <SectionHeading
            eyebrow="Solution"
            title="From invitation chaos to an intelligent event workflow"
            description="Aamantran AI compresses design, distribution, reminder calls, and analytics into one premium agentic experience."
          />
        </div>

        <div className="solution-grid">
          {solutionCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="solution-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="solution-kicker">0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
