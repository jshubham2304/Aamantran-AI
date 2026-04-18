import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="section" id="waitlist">
      <div className="container">
        <motion.div
          className="cta-shell"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">Final CTA</span>
          <h2>Ready to transform invitations?</h2>
          <p>
            Whether you’re funding the platform, planning a wedding, or
            building as a vendor partner, Aamantran AI is where invite workflows
            become celebration infrastructure.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#demo">
              Try Demo
            </a>
            <a
              className="btn btn-secondary"
              href="mailto:hello@aamantran.ai?subject=Join%20Aamantran%20AI%20Waitlist"
            >
              Join Waitlist
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
