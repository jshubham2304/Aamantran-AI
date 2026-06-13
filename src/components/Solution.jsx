import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    step: "01",
    title: "Design the invite",
    text: "Pick your event, language, and hosts. Aamantran generates a premium digital invite in seconds — image, PDF, and a shareable link.",
  },
  {
    step: "02",
    title: "Send on WhatsApp",
    text: "Upload your guest list or contacts. The platform sends personalized invites in one tap — to families, friends, vendors, all at once.",
  },
  {
    step: "03",
    title: "Let AI follow up",
    text: "For guests who haven't opened or replied, an AI agent makes a polite reminder call in your tone — Hindi, English, or your regional language.",
  },
  {
    step: "04",
    title: "Track everything live",
    text: "See who saw the invite, who RSVP'd, and who still needs a nudge. One dashboard, real-time, for the whole family or the whole planning team.",
  },
];

export default function Solution() {
  return (
    <section className="section" id="solution">
      <div className="container solution-shell">
        <div>
          <SectionHeading
            eyebrow="How it works"
            title="From idea to invite to RSVP — in one place"
            description="Four steps. No printing. No spreadsheets. No manual chasing. Same flow whether you're planning one wedding or fifty."
          />
        </div>

        <div className="solution-grid">
          {steps.map((card, index) => (
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
              <span className="solution-kicker">{card.step}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
