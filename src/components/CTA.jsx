import { motion } from "framer-motion";

const paths = [
  {
    tag: "For families",
    title: "Plan your wedding the calm way",
    text: "Design your invite, send it on WhatsApp, and let AI handle the follow-ups. Start free — no credit card needed.",
    primary: { label: "Create my invite", href: "#/try" },
    secondary: { label: "See family pricing", href: "#pricing" },
  },
  {
    tag: "For planners",
    title: "Run every wedding from one place",
    text: "Unlimited events, team seats, AI reminder calls, and a live dashboard. Built for studios doing 5+ weddings a month.",
    primary: { label: "Book a planner demo", href: "#/try" },
    secondary: { label: "See planner pricing", href: "#pricing" },
  },
];

export default function CTA() {
  return (
    <section className="section" id="waitlist">
      <div className="container">
        <motion.div
          className="cta-shell cta-shell-split"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cta-header">
            <span className="eyebrow">Get started</span>
            <h2>Two ways in. Pick yours.</h2>
            <p>
              Same platform, framed for the way you actually use it.
            </p>
          </div>

          <div className="cta-split-grid">
            {paths.map((path) => (
              <article key={path.tag} className="cta-path-card">
                <small className="cta-path-tag">{path.tag}</small>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
                <div className="cta-path-actions">
                  <a className="btn btn-primary" href={path.primary.href}>
                    {path.primary.label}
                  </a>
                  <a className="btn btn-ghost" href={path.secondary.href}>
                    {path.secondary.label}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
