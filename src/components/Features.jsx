import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const features = [
  {
    title: "AI invite designer",
    text: "Premium templates for weddings, mehendi, sangeet, housewarmings, and more. Generated from a short brief — not a 2-week designer cycle.",
  },
  {
    title: "Regional languages",
    text: "Hindi, Gujarati, Marathi, Tamil, Telugu, Bengali, and mixed-language copy. Made for how Indian families actually speak.",
  },
  {
    title: "AI reminder calls",
    text: "Polite, natural-sounding voice calls in your tone. Guests confirm in 30 seconds — you stop calling 200 people.",
  },
  {
    title: "Live RSVP dashboard",
    text: "Sent, viewed, replied, pending. One screen for the whole family or planning team — no spreadsheet, no guessing.",
  },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need. Nothing you don't."
          description="Four things the platform does well. Designed for Indian weddings, by people who have run them."
        />

        <div className="feature-grid">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="feature-card"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="feature-index">0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
