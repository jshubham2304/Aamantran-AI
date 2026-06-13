import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const problems = [
  {
    title: "Printed cards cost a fortune",
    text: "₹50–₹500 per card, plus designers, printing, and home delivery. Reprints when names get misspelled. The bill adds up before the event starts.",
  },
  {
    title: "Sharing on WhatsApp is manual",
    text: "Someone in the family forwards the invite one chat at a time. Lists get rebuilt for every event. The same message goes out three times.",
  },
  {
    title: "Reminder calls eat your evenings",
    text: "You spend nights calling the same 200 numbers. \"Did you get the invite?\" \"Are you coming?\" Most go to voicemail.",
  },
  {
    title: "You never know who saw it",
    text: "Did Chacha open it? Did the cousins forward it? Without tracking, you guess — and then someone shows up offended that they weren't \"called personally\".",
  },
];

export default function Problem() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <SectionHeading
          eyebrow="The problem"
          title="Indian weddings still run on stress and spreadsheets"
          description="Whether you're a family doing it once or a planner doing it weekly — the invite process eats time, money, and patience."
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
