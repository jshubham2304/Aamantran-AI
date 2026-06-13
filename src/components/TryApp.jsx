import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  calculateSolutionCost,
  deliveryModels,
  eventTypes,
  getTemplateById,
  getTemplatesForEvent,
} from "./demoConfig";

const languages = ["Hindi + English", "Hindi", "Gujarati", "Marathi", "Tamil"];

const stepLabels = [
  "Your event",
  "Pick a template",
  "Choose a plan",
  "You're set",
];

export default function TryApp() {
  const [step, setStep] = useState(1);
  const [event, setEvent] = useState({
    eventType: "Wedding",
    hosts: "Meera & Arjun",
    city: "Jaipur",
    date: "14 February 2027",
    language: "Hindi + English",
    families: 200,
  });
  const [templateId, setTemplateId] = useState("wedding-regal");
  const [modelId, setModelId] = useState("agentic");

  const templates = useMemo(
    () => getTemplatesForEvent(event.eventType),
    [event.eventType],
  );
  const template = useMemo(
    () => getTemplateById(templateId) || templates[0],
    [templates, templateId],
  );
  const model = useMemo(
    () => deliveryModels.find((item) => item.id === modelId),
    [modelId],
  );

  const guests = event.families * 3;
  const solutionCost = calculateSolutionCost(modelId, event.families);
  const traditionalCost =
    event.families * 600 + event.families * 120 + event.families * 9;
  const savings = traditionalCost - solutionCost;

  const update = (key, value) =>
    setEvent((current) => ({ ...current, [key]: value }));

  const goNext = () => setStep((current) => Math.min(current + 1, 4));
  const goBack = () => setStep((current) => Math.max(current - 1, 1));

  return (
    <section className="section try-section">
      <div className="container try-container">
        <div className="try-progress" aria-label="Progress">
          {stepLabels.map((label, index) => {
            const num = index + 1;
            const state =
              num < step ? "done" : num === step ? "active" : "pending";
            return (
              <button
                key={label}
                type="button"
                className={`try-progress-step is-${state}`}
                onClick={() => setStep(num)}
              >
                <span className="try-progress-index">
                  {state === "done" ? "✓" : num}
                </span>
                <span className="try-progress-label">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="try-shell">
          <div className="try-main">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="try-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 ? (
                  <div className="try-step">
                    <header className="try-step-header">
                      <h2>Tell us about your event</h2>
                      <p>Just the basics. Takes 30 seconds.</p>
                    </header>

                    <div className="try-form">
                      <label>
                        <span>Event type</span>
                        <select
                          value={event.eventType}
                          onChange={(e) => update("eventType", e.target.value)}
                        >
                          {eventTypes.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Hosts</span>
                        <input
                          value={event.hosts}
                          onChange={(e) => update("hosts", e.target.value)}
                          placeholder="e.g. Meera & Arjun"
                        />
                      </label>
                      <label>
                        <span>City</span>
                        <input
                          value={event.city}
                          onChange={(e) => update("city", e.target.value)}
                          placeholder="e.g. Jaipur"
                        />
                      </label>
                      <label>
                        <span>Date</span>
                        <input
                          value={event.date}
                          onChange={(e) => update("date", e.target.value)}
                          placeholder="e.g. 14 February 2027"
                        />
                      </label>
                      <label>
                        <span>Language</span>
                        <select
                          value={event.language}
                          onChange={(e) => update("language", e.target.value)}
                        >
                          {languages.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="try-form-slider">
                        <span>
                          Families invited
                          <strong>{event.families}</strong>
                        </span>
                        <input
                          type="range"
                          min="50"
                          max="800"
                          step="10"
                          value={event.families}
                          onChange={(e) =>
                            update("families", Number(e.target.value))
                          }
                        />
                        <small>
                          About {guests.toLocaleString("en-IN")} people across {event.families} families
                        </small>
                      </label>
                    </div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="try-step">
                    <header className="try-step-header">
                      <h2>Pick a template</h2>
                      <p>
                        {templates.length} {event.eventType.toLowerCase()} designs ready to go. Tap one.
                      </p>
                    </header>

                    <div className="try-template-grid">
                      {templates.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`try-template ${templateId === item.id ? "is-selected" : ""}`}
                          onClick={() => setTemplateId(item.id)}
                        >
                          <div
                            className={`try-template-preview template-${item.id} ${item.image ? "has-image" : ""}`}
                            style={
                              item.image
                                ? { backgroundImage: `url(${item.image})` }
                                : undefined
                            }
                          >
                            <span className="template-chip">{item.format}</span>
                            <div className="template-host-overlay">
                              <span className="template-overlay-eyebrow">
                                {event.eventType} invite
                              </span>
                              <strong className="template-overlay-hosts">
                                {event.hosts}
                              </strong>
                              <small className="template-overlay-meta">
                                {event.city} • {event.date}
                              </small>
                            </div>
                          </div>
                          <div className="try-template-meta">
                            <strong>{item.name}</strong>
                            <small>{item.mood}</small>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="try-step">
                    <header className="try-step-header">
                      <h2>Choose a plan</h2>
                      <p>Pick what fits. You can change it later.</p>
                    </header>

                    <div className="try-plan-list">
                      {deliveryModels.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`try-plan ${modelId === item.id ? "is-selected" : ""}`}
                          onClick={() => setModelId(item.id)}
                        >
                          <div className="try-plan-head">
                            <strong>{item.title}</strong>
                            <span className="try-plan-price">{item.priceLabel}</span>
                          </div>
                          <p>{item.tagline}</p>
                          <small>{item.summary}</small>
                          <span className="try-plan-check" aria-hidden="true">
                            ✓
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {step === 4 ? (
                  <div className="try-step">
                    <header className="try-step-header">
                      <h2>You're set ✨</h2>
                      <p>Here's a quick summary. Drop your email to get the live link.</p>
                    </header>

                    <div className="try-summary">
                      <div className="try-summary-row">
                        <span>Event</span>
                        <strong>
                          {event.eventType} · {event.hosts}
                        </strong>
                      </div>
                      <div className="try-summary-row">
                        <span>Where & when</span>
                        <strong>
                          {event.city} · {event.date}
                        </strong>
                      </div>
                      <div className="try-summary-row">
                        <span>Reach</span>
                        <strong>
                          {event.families} families · {guests} people
                        </strong>
                      </div>
                      <div className="try-summary-row">
                        <span>Template</span>
                        <strong>{template.name}</strong>
                      </div>
                      <div className="try-summary-row">
                        <span>Plan</span>
                        <strong>{model?.title}</strong>
                      </div>
                    </div>

                    <div className="try-cost-banner">
                      <div>
                        <small>Your cost</small>
                        <strong>₹{solutionCost.toLocaleString("en-IN")}</strong>
                      </div>
                      <div className="try-cost-vs">vs.</div>
                      <div>
                        <small>Traditional way</small>
                        <strong className="try-cost-old">
                          ₹{traditionalCost.toLocaleString("en-IN")}
                        </strong>
                      </div>
                      <div className="try-cost-savings">
                        Save ₹{savings.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <form
                      className="try-email"
                      onSubmit={(e) => {
                        e.preventDefault();
                        window.location.hash = "#waitlist";
                      }}
                    >
                      <input
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                      <button type="submit" className="btn btn-primary">
                        Get my live invite
                      </button>
                    </form>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div className="try-controls">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={goBack}
                disabled={step === 1}
              >
                ← Back
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={goNext}
                >
                  Continue →
                </button>
              ) : (
                <a className="btn btn-ghost" href="#">
                  Done — back to landing
                </a>
              )}
            </div>
          </div>

          <aside className="try-preview" aria-label="Live preview">
            <span className="try-preview-label">Live preview</span>
            <div
              className={`try-preview-card template-${template.id} ${template.image ? "has-image" : ""}`}
              style={
                template.image
                  ? { backgroundImage: `url(${template.image})` }
                  : undefined
              }
            >
              <span className="template-chip">{template.format}</span>
              <div className="template-host-overlay">
                <span className="template-overlay-eyebrow">
                  {event.eventType} invite
                </span>
                <strong className="template-overlay-hosts">{event.hosts}</strong>
                <small className="template-overlay-meta">
                  {event.city} • {event.date}
                </small>
              </div>
            </div>

            <ul className="try-preview-meta">
              <li>
                <span>Language</span>
                <strong>{event.language}</strong>
              </li>
              <li>
                <span>Families</span>
                <strong>{event.families}</strong>
              </li>
              <li>
                <span>Plan</span>
                <strong>{model?.title}</strong>
              </li>
              <li>
                <span>Estimate</span>
                <strong>₹{solutionCost.toLocaleString("en-IN")}</strong>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
