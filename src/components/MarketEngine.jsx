import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const engineSteps = [
  {
    phase: "Idea",
    title: "Create invite",
    copy: "Turn a celebration brief into a polished invite in seconds.",
  },
  {
    phase: "Validate",
    title: "Share with close circle",
    copy: "Test design, language, and tone with family before sending it wide.",
  },
  {
    phase: "Demand",
    title: "WhatsApp viral loop",
    copy: "Every forwarded invite becomes discovery for vendors and future events.",
  },
  {
    phase: "Automate",
    title: "AI calls and bulk send",
    copy: "The host stops chasing confirmations and reminders manually.",
  },
  {
    phase: "Track",
    title: "Views and RSVP",
    copy: "Know who opened, who responded, and who still needs a nudge.",
  },
  {
    phase: "Monetize",
    title: "Paid plans and vendors",
    copy: "Invite journeys become commerce rails for creators, planners, and partners.",
  },
];

export default function MarketEngine() {
  return (
    <section className="section" id="engine">
      <div className="container">
        <SectionHeading
          eyebrow="Idea to Market Engine"
          title="We don’t just create invites — we create demand loops."
          description="Aamantran AI converts a one-time family need into a repeatable distribution, automation, and monetization engine built for India."
          align="center"
        />

        <div className="timeline-shell">
          {engineSteps.map((step, index) => (
            <motion.article
              key={step.phase}
              className="timeline-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="timeline-node">{index + 1}</div>
              <span className="timeline-phase">{step.phase}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </motion.article>
          ))}
        </div>

        <div className="engine-metrics">
          <div className="metric-card">
            <strong>Consumer intent</strong>
            <span>Every celebration starts with invitation urgency.</span>
          </div>
          <div className="metric-card">
            <strong>Distribution</strong>
            <span>WhatsApp turns each invite into a native Indian referral loop.</span>
          </div>
          <div className="metric-card">
            <strong>Platform leverage</strong>
            <span>Tracking and vendor APIs convert utility into recurring revenue.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
