import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const journey = ["Create", "Send", "Automate", "Track", "Scale"];

export default function Vision() {
  return (
    <section className="section" id="vision">
      <div className="container vision-shell">
        <div>
          <SectionHeading
            eyebrow="Vision"
            title="India’s Celebration Infrastructure"
            description="We start with invitations because that is where intent is highest, urgency is real, and distribution is built into behaviour."
          />

          <p className="vision-copy">
            Weddings, housewarmings, baby showers, anniversaries, community
            events, and religious functions all begin with one moment: inviting
            people in a way that feels personal. Aamantran AI becomes the system
            behind that moment and everything that follows.
          </p>
        </div>

        <motion.div
          className="vision-flow"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {journey.map((item, index) => (
            <div key={item} className="vision-step">
              <span>{item}</span>
              {index < journey.length - 1 ? (
                <i aria-hidden="true" className="vision-line" />
              ) : null}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
