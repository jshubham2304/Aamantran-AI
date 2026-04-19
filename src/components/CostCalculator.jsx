import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  calculateSolutionCost,
  deliveryModels,
  getAgenticBasePrice,
  getSolutionBreakdown,
} from "./demoConfig";

export default function CostCalculator() {
  const averageCallMinutes = 3;
  const [step, setStep] = useState(1);
  const [families, setFamilies] = useState(200);
  const [cardCost, setCardCost] = useState(50);
  const [printDeliveryCost, setPrintDeliveryCost] = useState(2);
  const [callMinuteValue, setCallMinuteValue] = useState(1);
  const [selectedModel, setSelectedModel] = useState("agentic");
  const [whatsappRate, setWhatsappRate] = useState(7);

  const calculations = useMemo(() => {
    const guests = families * 3;
    const traditionalCards = families * cardCost;
    const printDelivery = families * printDeliveryCost;
    const manualCalling = families * averageCallMinutes * callMinuteValue;
    const manualWhatsappFollowups = families * 3;
    const traditionalTotal =
      traditionalCards +
      printDelivery +
      manualCalling +
      manualWhatsappFollowups;

    const solutionBreakdown = getSolutionBreakdown(
      selectedModel,
      families,
      whatsappRate,
    );
    const solutionTotal = calculateSolutionCost(selectedModel, families, whatsappRate);
    const savings = traditionalTotal - solutionTotal;

    return {
      guests,
      traditionalCards,
      printDelivery,
      manualCalling,
      manualWhatsappFollowups,
      traditionalTotal,
      solutionBreakdown,
      solutionTotal,
      savings,
    };
  }, [
    cardCost,
    callMinuteValue,
    families,
    printDeliveryCost,
    selectedModel,
    whatsappRate,
  ]);

  const currentModel = deliveryModels.find((item) => item.id === selectedModel);
  const maxBar = Math.max(
    calculations.traditionalTotal,
    calculations.solutionTotal,
  );
  const traditionalWidth = (calculations.traditionalTotal / maxBar) * 100;
  const aiWidth = (calculations.solutionTotal / maxBar) * 100;

  return (
    <section className="section" id="calculator">
      <div className="container">
        <SectionHeading
          eyebrow="Cost Workbench"
          title="Complete calculation of traditional invites vs our solution"
          description="This is the decision screen for users and investors: every meaningful line item is exposed, from cards and delivery to agentic AI execution."
        />

        <div className="calculator-shell calculator-shell-wide">
          <div className="calculator-progress">
            {[1, 2, 3, 4].map((item) => (
              <button
                key={item}
                type="button"
                className={`progress-dot ${step === item ? "is-active" : ""}`}
                onClick={() => setStep(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <motion.div
            key={step}
            className="calculator-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 ? (
              <div>
                <div className="card-header">
                  <h3>1. Event size</h3>
                  <span>How many families are you inviting?</span>
                </div>

                <label className="slider-label">
                  <span>{families} families</span>
                  <input
                    type="range"
                    min="50"
                    max="800"
                    step="10"
                    value={families}
                    onChange={(event) => setFamilies(Number(event.target.value))}
                  />
                </label>

                <div className="app-highlight-grid">
                  <article className="app-highlight-card">
                    <strong>{calculations.guests}</strong>
                    <span>Estimated people reached</span>
                  </article>
                  <article className="app-highlight-card">
                    <strong>{Math.round(families * 0.4)}</strong>
                    <span>Likely follow-up calls</span>
                  </article>
                  <article className="app-highlight-card">
                    <strong>{Math.round(families * 0.7)}</strong>
                    <span>Expected WhatsApp forwards</span>
                  </article>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <div className="card-header">
                  <h3>2. Traditional cost assumptions</h3>
                  <span>Set your current market numbers</span>
                </div>

                <div className="form-grid">
                  <label>
                    Card cost per family
                    <input
                      type="number"
                      value={cardCost}
                      onChange={(event) => setCardCost(Number(event.target.value))}
                    />
                    <small className="field-hint">
                      Printed invite cost per family
                    </small>
                  </label>
                  <label>
                    Print + delivery per family
                    <input
                      type="number"
                      value={printDeliveryCost}
                      onChange={(event) =>
                        setPrintDeliveryCost(Number(event.target.value))
                      }
                    />
                    <small className="field-hint">
                      Go to their home and give — effort cost per family
                    </small>
                  </label>
                  <label>
                    Value of 1 min call in rupees
                    <input
                      type="number"
                      value={callMinuteValue}
                      onChange={(event) =>
                        setCallMinuteValue(Number(event.target.value))
                      }
                    />
                    <small className="field-hint">
                      Time is value — your rate per minute on the phone
                    </small>
                  </label>
                </div>
                <p className="support-copy">
                  Time is money: traditional calling cost is calculated as{" "}
                  {averageCallMinutes} minutes per family × your 1-minute value.
                </p>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <div className="card-header">
                  <h3>3. Choose our solution model</h3>
                  <span>Cards, automation, or full agentic AI</span>
                </div>

                <div className="model-grid">
                  {deliveryModels.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      className={`model-card ${
                        selectedModel === model.id ? "is-selected" : ""
                      }`}
                      onClick={() => setSelectedModel(model.id)}
                    >
                      <span className="model-price">{model.priceLabel}</span>
                      <h4>{model.title}</h4>
                      <p>{model.tagline}</p>
                      <small>{model.summary}</small>
                    </button>
                  ))}
                </div>

                {selectedModel === "bulk" ? (
                  <label className="slider-label">
                    <span>WhatsApp invite cost: ₹{whatsappRate} per invite</span>
                    <input
                      type="range"
                      min="4"
                      max="10"
                      step="1"
                      value={whatsappRate}
                      onChange={(event) => setWhatsappRate(Number(event.target.value))}
                    />
                  </label>
                ) : null}

                {selectedModel === "agentic" ? (
                  <div className="pricing-signal">
                    <strong>
                      Group base package: ₹{getAgenticBasePrice(families).toLocaleString("en-IN")}
                    </strong>
                    <p>
                      Pricing is based on family group size: 0-100 = ₹1,500, 101-200 = ₹2,000,
                      201-500 = ₹2,500, then increases in slabs beyond that.
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 4 ? (
              <div>
                <div className="card-header">
                  <h3>4. Final comparison</h3>
                  <span>Traditional vs {currentModel?.title}</span>
                </div>

                <div className="compare-summary">
                  <div className="compare-summary-row">
                    <div className="compare-summary-item compare-summary-old">
                      <span className="compare-summary-tag">Old way</span>
                      <strong>₹{calculations.traditionalTotal.toLocaleString("en-IN")}</strong>
                      <small>Printed cards, delivery, and manual calling</small>
                    </div>
                    <div className="compare-summary-arrow" aria-hidden="true">→</div>
                    <div className="compare-summary-item compare-summary-new">
                      <span className="compare-summary-tag">With Aamantran</span>
                      <strong>₹{calculations.solutionTotal.toLocaleString("en-IN")}</strong>
                      <small>{currentModel?.title}</small>
                    </div>
                  </div>
                  <div className="compare-summary-highlight">
                    <strong>
                      You save ₹{calculations.savings.toLocaleString("en-IN")}
                      {calculations.traditionalTotal > 0
                        ? ` — that's ${Math.round(
                            (calculations.savings / calculations.traditionalTotal) * 100,
                          )}% less than the traditional way`
                        : ""}
                    </strong>
                    <p>
                      For {families} families, the traditional process costs about{" "}
                      {calculations.solutionTotal > 0
                        ? `${(calculations.traditionalTotal / calculations.solutionTotal).toFixed(1)}×`
                        : "many times"}{" "}
                      more than using Aamantran.
                    </p>
                  </div>
                </div>

                <div className="calc-breakdown-grid">
                  <div className="calc-breakdown-card">
                    <span className="panel-label">Traditional breakdown</span>
                    <div className="summary-list">
                      <div>
                        <span>Cards</span>
                        <strong>
                          ₹{calculations.traditionalCards.toLocaleString("en-IN")}
                        </strong>
                      </div>
                      <div>
                        <span>Print + delivery</span>
                        <strong>
                          ₹{calculations.printDelivery.toLocaleString("en-IN")}
                        </strong>
                      </div>
                      <div>
                        <span>Calling time cost</span>
                        <strong>
                          ₹{calculations.manualCalling.toLocaleString("en-IN")}
                        </strong>
                      </div>
                      <div>
                        <span>WhatsApp follow-up</span>
                        <strong>
                          ₹
                          {calculations.manualWhatsappFollowups.toLocaleString(
                            "en-IN",
                          )}
                        </strong>
                      </div>
                      <div className="summary-list-total">
                        <span>Traditional total</span>
                        <strong>
                          ₹{calculations.traditionalTotal.toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="calc-breakdown-card calc-breakdown-card-ai">
                    <span className="panel-label">Our solution breakdown</span>
                    <div className="summary-list">
                      <div>
                        <span>Model selected</span>
                        <strong>{currentModel?.title}</strong>
                      </div>
                      <div>
                        <span>Families covered</span>
                        <strong>{families}</strong>
                      </div>
                      <div>
                        <span>Execution style</span>
                        <strong>
                          {selectedModel === "agentic"
                            ? "Personalized AI agent"
                            : "Template + automation"}
                        </strong>
                      </div>
                      {calculations.solutionBreakdown.lines.map((line) => (
                        <div key={line.label}>
                          <span>{line.label}</span>
                          <strong>₹{line.value.toLocaleString("en-IN")}</strong>
                        </div>
                      ))}
                      <div className="summary-list-total">
                        <span>Aamantran total</span>
                        <strong>
                          ₹{calculations.solutionTotal.toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bar-chart">
                  <div className="bar-row">
                    <span>Traditional</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill bar-fill-danger"
                        style={{ width: `${traditionalWidth}%` }}
                      />
                    </div>
                    <strong>
                      ₹{calculations.traditionalTotal.toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div className="bar-row">
                    <span>Our solution</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill bar-fill-success"
                        style={{ width: `${aiWidth}%` }}
                      />
                    </div>
                    <strong>
                      ₹{calculations.solutionTotal.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                <div className="app-highlight-grid">
                  <article className="app-highlight-card">
                    <strong>
                      ₹{calculations.savings.toLocaleString("en-IN")}
                    </strong>
                    <span>Estimated cost saved</span>
                  </article>
                  <article className="app-highlight-card">
                    <strong>{selectedModel === "agentic" ? "20h+" : "8h+"}</strong>
                    <span>Manual effort removed</span>
                  </article>
                  <article className="app-highlight-card">
                    <strong>{selectedModel === "agentic" ? "Live" : "Partial"}</strong>
                    <span>Tracking visibility</span>
                  </article>
                </div>
              </div>
            ) : null}

            <div className="demo-controls">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setStep((current) => Math.max(current - 1, 1))}
                disabled={step === 1}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStep((current) => Math.min(current + 1, 4))}
                disabled={step === 4}
              >
                Next
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
