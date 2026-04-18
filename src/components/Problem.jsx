import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const problems = [
  {
    title: "Expensive wedding cards",
    text: "Design, printing, logistics, and last-minute reprints inflate costs before the event even begins.",
  },
  {
    title: "Manual WhatsApp sharing",
    text: "Families still forward one by one, rebuild lists, and resend the same message across groups.",
  },
  {
    title: "Calling guests is a headache",
    text: "Hosts spend nights making reminder calls instead of focusing on the celebration itself.",
  },
  {
    title: "No tracking means social pressure",
    text: "You don’t know who saw the invite, who ignored it, or who now expects a personal follow-up call.",
  },
];

export default function Problem() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <SectionHeading
          eyebrow="Problem"
          title="Indian celebrations still run on stress, spreadsheets, and social pressure"
          description="The invitation process is emotional, repetitive, and surprisingly expensive. Families carry the burden manually."
        />

        <div className="problem-grid">
          {problems.map((problem, index) => (
            <motion.article
              key={problem.title}
              className="problem-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="problem-icon">{index + 1}</span>
              <h3>{problem.title}</h3>
              <p>{problem.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
