import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const features = [
  {
    title: "AI design generator",
    text: "Create premium digital invites from a few event prompts instead of waiting on manual designers.",
  },
  {
    title: "Regional language support",
    text: "Hindi, Gujarati, Marathi, Tamil, Telugu, Bengali and mixed-language copy for real Indian families.",
  },
  {
    title: "Contact sync",
    text: "Upload spreadsheets, family lists, or vendor databases and segment guests instantly.",
  },
  {
    title: "AI voice calls",
    text: "Automated reminders and RSVP follow-ups in natural voices without exhausting the host.",
  },
  {
    title: "Invite tracking",
    text: "See sent, viewed, pending, and response signals in a clean operational dashboard.",
  },
  {
    title: "Vendor integrations",
    text: "Plug planners, photographers, caterers, decorators, and gifting partners into the celebration flow.",
  },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <SectionHeading
          eyebrow="Advanced AI"
          title="Built for the reality of Indian events"
          description="Aamantran AI combines design, distribution, reminders, and monetization into one operating layer."
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
