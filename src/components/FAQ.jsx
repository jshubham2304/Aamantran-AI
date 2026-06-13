import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    audience: "Family",
    q: "Do I need to install an app?",
    a: "No. Aamantran runs in your browser. Your guests don't install anything either — they get the invite right inside WhatsApp.",
  },
  {
    audience: "Family",
    q: "Will guests think the invite is impersonal?",
    a: "Each invite is personalized with the guest's name, language, and family context. The AI reminder calls use your tone, not a robotic voice. Most families say it feels more thoughtful than a printed card.",
  },
  {
    audience: "Family",
    q: "What if my grandparents can't use WhatsApp?",
    a: "The AI agent calls them on a regular phone, in Hindi or your regional language. They hear a polite, natural voice — and confirm with a simple yes or no.",
  },
  {
    audience: "Family",
    q: "How much does it actually cost vs printed cards?",
    a: "For 200 families, printed cards + delivery + calling time typically runs ₹1,30,000+. The Smart Send plan covers the same job for under ₹4,000. Try the cost calculator above.",
  },
  {
    audience: "Planner",
    q: "Can my team work on multiple weddings at once?",
    a: "Yes. The Agency plan gives unlimited weddings, team seats, and one dashboard showing every event in flight — sends, RSVPs, pending follow-ups, all in real time.",
  },
  {
    audience: "Planner",
    q: "Can I white-label the invites for my brand?",
    a: "On the Agency plan and above, yes. Invites can carry your studio's branding, your watermark, and your domain on the shareable link.",
  },
  {
    audience: "Planner",
    q: "How do you handle multi-event weddings (mehendi, sangeet, etc)?",
    a: "Each wedding can have multiple events. Guests get separate invites per event, RSVPs are tracked per event, and reminder calls are scheduled per event.",
  },
  {
    audience: "Both",
    q: "Is my guest list data safe?",
    a: "Yes. Guest data is encrypted, never sold, and deleted on request. We use the official WhatsApp Business API — no scraping, no grey-area sending.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="container">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions, clear answers"
          description="The things families and planners ask before signing up."
        />

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.q}
                className={`faq-item ${isOpen ? "is-open" : ""}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="faq-tag">{item.audience}</span>
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                {isOpen ? (
                  <motion.p
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                  >
                    {item.a}
                  </motion.p>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
