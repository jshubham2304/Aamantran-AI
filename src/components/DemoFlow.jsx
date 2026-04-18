import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  calculateSolutionCost,
  deliveryModels,
  eventTypes,
  getAgenticBasePrice,
  getModelJobs,
  getSolutionBreakdown,
  getTemplateById,
  getTemplatesForEvent,
} from "./demoConfig";

const languages = ["Hindi + English", "Hindi", "Gujarati", "Marathi", "Tamil"];

const contactSegments = [
  { id: 1, name: "Close Family", count: 48, defaultSelected: true },
  { id: 2, name: "Relatives", count: 112, defaultSelected: true },
  { id: 3, name: "Friends", count: 84, defaultSelected: true },
  { id: 4, name: "Vendors", count: 16, defaultSelected: false },
];

const steps = [
  "Event details",
  "Template selection",
  "Delivery model",
  "Agentic AI jobs",
  "Tracking",
  "Traditional vs us",
];

const autoDemoNotes = [
  "The app starts with a clean event brief: occasion, hosts, city, language, and family count.",
  "Next it shows premium templates so users understand the visual output before committing.",
  "Then the user chooses how deep the product should go: cards only, automation, or full agentic AI.",
  "The agent takes over execution, from copy generation to sending and voice-based reminder workflows.",
  "Tracking shows what was sent, seen, responded to, and where AI follow-up is still active.",
  "The walkthrough closes with a direct cost and effort comparison against the traditional process.",
];

const simulatorScreens = [
  {
    id: "overview",
    label: "Overview",
    note: "A real app starts with event context, operational status, and the next action in one place.",
  },
  {
    id: "studio",
    label: "Design Studio",
    note: "The host briefs the app once, and the system generates tone, language, and layout directions.",
  },
  {
    id: "templates",
    label: "Templates",
    note: "Generated templates are reviewed like product assets, not static mockups.",
  },
  {
    id: "delivery",
    label: "Delivery",
    note: "Distribution settings determine how deep the automation goes across WhatsApp and invite operations.",
  },
  {
    id: "agent",
    label: "AI Agent",
    note: "The personalized AI agent executes writing, sending, nudging, and calling in the host’s tone.",
  },
  {
    id: "tracking",
    label: "Tracking",
    note: "The simulator closes the loop with live outcomes, pending guests, and business visibility.",
  },
];

export default function DemoFlow() {
  const averageCallMinutes = 3;
  const demoCallMinuteValue = 15;
  const [step, setStep] = useState(1);
  const [eventDetails, setEventDetails] = useState({
    eventType: "Wedding",
    hosts: "Meera & Arjun",
    city: "Jaipur",
    date: "14 February 2027",
    language: "Hindi + English",
    families: 200,
  });
  const [selectedTemplate, setSelectedTemplate] = useState("wedding-regal");
  const [selectedModel, setSelectedModel] = useState("agentic");
  const [whatsappRate, setWhatsappRate] = useState(7);
  const [segments, setSegments] = useState(contactSegments);
  const [jobStatuses, setJobStatuses] = useState({});
  const [simulationDone, setSimulationDone] = useState(false);
  const [isAutoDemoRunning, setIsAutoDemoRunning] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simulatorScreen, setSimulatorScreen] = useState("overview");
  const timerRefs = useRef([]);

  const currentTemplates = useMemo(
    () => getTemplatesForEvent(eventDetails.eventType),
    [eventDetails.eventType],
  );

  const selectedTemplateData = useMemo(
    () => getTemplateById(selectedTemplate) || currentTemplates[0],
    [currentTemplates, selectedTemplate],
  );

  const selectedModelData = useMemo(
    () => deliveryModels.find((item) => item.id === selectedModel),
    [selectedModel],
  );

  const selectedSegmentCount = useMemo(
    () =>
      segments
        .filter((segment) => segment.defaultSelected)
        .reduce((total, segment) => total + segment.count, 0),
    [segments],
  );
  const activeSegments = useMemo(
    () => segments.filter((segment) => segment.defaultSelected),
    [segments],
  );

  const guests = eventDetails.families * 3;
  const solutionBreakdown = getSolutionBreakdown(
    selectedModel,
    eventDetails.families,
    whatsappRate,
  );
  const solutionCost = calculateSolutionCost(
    selectedModel,
    eventDetails.families,
    whatsappRate,
  );
  const traditionalCost =
    eventDetails.families * 600 +
    eventDetails.families * 120 +
    eventDetails.families * averageCallMinutes * demoCallMinuteValue;
  const savings = traditionalCost - solutionCost;
  const selectedJobs = getModelJobs(selectedModel);
  const currentNote = autoDemoNotes[step - 1];
  const currentSimulatorIndex = simulatorScreens.findIndex(
    (screen) => screen.id === simulatorScreen,
  );
  const currentSimulatorNote =
    simulatorScreens[currentSimulatorIndex]?.note || simulatorScreens[0].note;

  const trackerRows = useMemo(() => {
    if (!simulationDone) {
      return [
        { label: "Close Family", status: "Queued" },
        { label: "Relatives", status: "Queued" },
        { label: "Friends", status: "Queued" },
      ];
    }

    if (selectedModel === "cards") {
      return [
        { label: "Card ready", status: "Image + PDF delivered" },
        { label: "Family handoff", status: "Shared to host" },
        { label: "Status", status: "No tracking package" },
      ];
    }

    if (selectedModel === "bulk") {
      return [
        { label: "Close Family", status: "Seen" },
        { label: "Relatives", status: "Sent" },
        { label: "Friends", status: "Seen" },
      ];
    }

    return [
      { label: "Close Family", status: "Seen + RSVP" },
      { label: "Relatives", status: "AI reminder scheduled" },
      { label: "Friends", status: "Voice call completed" },
    ];
  }, [selectedModel, simulationDone]);

  const updateEvent = (key, value) => {
    setEventDetails((current) => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    if (!currentTemplates.some((template) => template.id === selectedTemplate)) {
      setSelectedTemplate(currentTemplates[0].id);
    }
  }, [currentTemplates, selectedTemplate]);

  const queueTimeout = (callback, delay) => {
    const id = window.setTimeout(callback, delay);
    timerRefs.current.push(id);
  };

  const clearQueuedTimers = () => {
    timerRefs.current.forEach((id) => window.clearTimeout(id));
    timerRefs.current = [];
  };

  const resetDemoState = () => {
    setStep(1);
    setSelectedTemplate("wedding-regal");
    setSelectedModel("agentic");
    setWhatsappRate(7);
    setSegments(contactSegments);
    setJobStatuses({});
    setSimulationDone(false);
  };

  const stopAutoDemo = () => {
    clearQueuedTimers();
    setIsAutoDemoRunning(false);
  };

  const startAutoDemo = () => {
    clearQueuedTimers();
    resetDemoState();
    setIsSimulatorOpen(true);
    setSimulatorScreen("overview");
    setIsAutoDemoRunning(true);
  };

  const openSimulator = () => {
    stopAutoDemo();
    resetDemoState();
    setIsSimulatorOpen(true);
    setSimulatorScreen("overview");
  };

  const closeSimulator = () => {
    stopAutoDemo();
    setIsSimulatorOpen(false);
  };

  const toggleSegment = (id) => {
    setSegments((current) =>
      current.map((segment) =>
        segment.id === id
          ? { ...segment, defaultSelected: !segment.defaultSelected }
          : segment,
      ),
    );
  };

  const runSimulation = ({ autoAdvance = true } = {}) => {
    const initialStatuses = {};
    selectedJobs.forEach((job, index) => {
      initialStatuses[job] = index === 0 ? "Running" : "Queued";
    });
    setJobStatuses(initialStatuses);
    setSimulationDone(false);

    selectedJobs.forEach((job, index) => {
      queueTimeout(() => {
        const nextJob = selectedJobs[index + 1];
        setJobStatuses((current) => ({
          ...current,
          [job]: "Completed",
          ...(nextJob ? { [nextJob]: "Running" } : {}),
        }));
      }, 360 + index * 300);
    });

    queueTimeout(() => {
      setSimulationDone(true);
      if (autoAdvance) {
        setStep(5);
      }
    }, 600 + selectedJobs.length * 300);
  };

  const previousStep = () => setStep((current) => Math.max(current - 1, 1));
  const nextStep = () => setStep((current) => Math.min(current + 1, 6));

  useEffect(() => () => clearQueuedTimers(), []);

  useEffect(() => {
    if (!isAutoDemoRunning || !isSimulatorOpen) {
      return;
    }

    clearQueuedTimers();

    if (simulatorScreen === "overview") {
      queueTimeout(() => setSimulatorScreen("studio"), 1600);
      return;
    }

    if (simulatorScreen === "studio") {
      queueTimeout(() => {
        setSelectedTemplate("wedding-lotus");
        setSimulatorScreen("templates");
      }, 1700);
      return;
    }

    if (simulatorScreen === "templates") {
      queueTimeout(() => {
        setSelectedModel("bulk");
        setWhatsappRate(8);
        setSimulatorScreen("delivery");
      }, 1700);
      return;
    }

    if (simulatorScreen === "delivery") {
      queueTimeout(() => {
        setSelectedModel("agentic");
        setSimulatorScreen("agent");
      }, 1700);
      return;
    }

    if (simulatorScreen === "agent") {
      runSimulation({ autoAdvance: false });
      queueTimeout(() => setSimulatorScreen("tracking"), 2800);
      return;
    }

    if (simulatorScreen === "tracking") {
      queueTimeout(() => setIsAutoDemoRunning(false), 2600);
    }
  }, [isAutoDemoRunning, isSimulatorOpen, simulatorScreen]);

  return (
    <section className="section" id="demo">
      <div className="container">
        <SectionHeading
          eyebrow="Product Experience"
          title="See how the product actually works"
          description="This section is structured like the actual app: choose your event, pick a template, select a model, let the agent work, and watch tracking plus savings update live."
        />

        <div className="demo-shell demo-shell-app">
          <div className="demo-panel">
            {!isSimulatorOpen ? (
              <div className="product-stepper" aria-label="Product flow steps">
                {steps.map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    className={`product-step ${step === index + 1 ? "is-active" : ""}`}
                    onClick={() => {
                      stopAutoDemo();
                      setStep(index + 1);
                    }}
                  >
                    <span className="product-step-index">{index + 1}</span>
                    <span className="product-step-label">{label}</span>
                  </button>
                ))}
              </div>
            ) : null}

            <div className="demo-toolbar">
              <div>
                <strong>Aamantran Agent Studio</strong>
                <small>Personalized AI agent for Indian invites</small>
              </div>
              <div className="demo-toolbar-stats">
                <span>{eventDetails.families} families</span>
                <span>{guests} people</span>
                <span>{selectedModelData?.title}</span>
              </div>
              <div className="demo-toolbar-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-small"
                  onClick={startAutoDemo}
                >
                  Watch Product Flow
                </button>
                {isAutoDemoRunning ? (
                  <button
                    type="button"
                    className="btn btn-ghost btn-small"
                    onClick={stopAutoDemo}
                  >
                    Stop
                  </button>
                ) : null}
                {isSimulatorOpen ? (
                  <button
                    type="button"
                    className="btn btn-ghost btn-small"
                    onClick={closeSimulator}
                  >
                    Close
                  </button>
                ) : null}
              </div>
            </div>

            {isSimulatorOpen ? (
              <div className="simulator-shell">
                <aside className="simulator-sidebar">
                  <div className="simulator-brand">
                    <span className="brand-mark">A</span>
                    <div>
                      <strong>Agent Console</strong>
                      <small>App simulator</small>
                    </div>
                  </div>

                  <div className="simulator-nav">
                    {simulatorScreens.map((screen) => (
                      <button
                        key={screen.id}
                        type="button"
                        className={`simulator-nav-item ${
                          simulatorScreen === screen.id ? "is-active" : ""
                        }`}
                        onClick={() => {
                          stopAutoDemo();
                          setSimulatorScreen(screen.id);
                        }}
                      >
                        <span>{screen.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="simulator-sidebar-card">
                    <span className="panel-label">Narration</span>
                    <strong>
                      {isAutoDemoRunning ? "Auto simulator running" : "Manual explore mode"}
                    </strong>
                    <p className="demo-sidebar-note">{currentSimulatorNote}</p>
                    <div className="auto-progress">
                      {simulatorScreens.map((screen, index) => (
                        <span
                          key={screen.id}
                          className={`auto-progress-dot ${
                            index <= currentSimulatorIndex ? "is-filled" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="simulator-frame">
                  <div className="simulator-topbar">
                    <div>
                      <strong>{eventDetails.hosts}</strong>
                      <small>
                        {eventDetails.eventType} • {eventDetails.city} • {eventDetails.language}
                      </small>
                    </div>
                    <div className="simulator-status">
                      <span>{selectedTemplateData?.name}</span>
                      <span>{selectedModelData?.title}</span>
                      <span>{selectedSegmentCount} contacts</span>
                    </div>
                  </div>

                  <div className="simulator-content">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={simulatorScreen}
                        className="simulator-screen"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {simulatorScreen === "overview" ? (
                          <div className="simulator-grid">
                            <article className="sim-card sim-card-hero">
                              <span className="panel-label">Overview</span>
                              <h3>{eventDetails.hosts}</h3>
                              <p>
                                {eventDetails.eventType} celebration in {eventDetails.city} with{" "}
                                {eventDetails.families} families in {eventDetails.language}.
                              </p>
                              <div className="sim-mini-stats">
                                <div>
                                  <strong>{guests}</strong>
                                  <span>Estimated people</span>
                                </div>
                                <div>
                                  <strong>{selectedSegmentCount}</strong>
                                  <span>Invite targets</span>
                                </div>
                                <div>
                                  <strong>₹{solutionCost.toLocaleString("en-IN")}</strong>
                                  <span>Projected spend</span>
                                </div>
                              </div>
                            </article>
                            <article className="sim-card">
                              <span className="panel-label">Tasks</span>
                              <div className="sim-task-list">
                                {[
                                  "Create design brief",
                                  "Generate regional template",
                                  "Prepare bulk send flow",
                                  "Activate AI follow-up",
                                ].map((task) => (
                                  <div key={task} className="sim-task-row">
                                    <strong>{task}</strong>
                                    <em>Ready</em>
                                  </div>
                                ))}
                              </div>
                            </article>
                          </div>
                        ) : null}

                        {simulatorScreen === "studio" ? (
                          <div className="simulator-grid">
                            <article className="sim-card sim-card-large">
                              <span className="panel-label">Design Studio</span>
                              <h3>Prompt to premium invite</h3>
                              <div className="sim-prompt-box">
                                Create an elegant {eventDetails.eventType.toLowerCase()} invite for{" "}
                                {eventDetails.hosts} in {eventDetails.city}, use{" "}
                                {eventDetails.language}, and keep it warm, festive, and family-first.
                              </div>
                              <div className="sim-control-grid">
                                <div>
                                  <span>Tone</span>
                                  <strong>Warm + ceremonial</strong>
                                </div>
                                <div>
                                  <span>Layout</span>
                                  <strong>Story + card</strong>
                                </div>
                                <div>
                                  <span>Output</span>
                                  <strong>Image, PDF, WhatsApp story</strong>
                                </div>
                              </div>
                            </article>
                            <article className="sim-card">
                              <span className="panel-label">Generator</span>
                              <div className="sim-generator">
                                <strong>AI generation status</strong>
                                <p>Palette, typography, copy tone, and template variants are being prepared.</p>
                                <div className="sim-progress-bar">
                                  <span style={{ width: "78%" }} />
                                </div>
                              </div>
                            </article>
                          </div>
                        ) : null}

                        {simulatorScreen === "templates" ? (
                          <div className="sim-template-gallery">
                            {currentTemplates.map((template) => (
                              <article
                                key={template.id}
                                className={`sim-template-card ${
                                  selectedTemplate === template.id ? "is-selected" : ""
                                }`}
                              >
                                <div
                                  className={`sim-template-preview template-${template.id} ${
                                    template.image ? "has-image" : ""
                                  }`}
                                  style={
                                    template.image
                                      ? { backgroundImage: `url(${template.image})` }
                                      : undefined
                                  }
                                >
                                  <span className="template-chip">{template.format}</span>
                                  <div className="template-host-overlay">
                                    <span className="template-overlay-eyebrow">
                                      {eventDetails.eventType} invite
                                    </span>
                                    <strong className="template-overlay-hosts">
                                      {eventDetails.hosts}
                                    </strong>
                                    <small className="template-overlay-meta">
                                      {eventDetails.city} • {eventDetails.date}
                                    </small>
                                  </div>
                                </div>
                                <div className="sim-template-copy">
                                  <h4>{template.name}</h4>
                                  <p>{template.blurb}</p>
                                </div>
                              </article>
                            ))}
                          </div>
                        ) : null}

                        {simulatorScreen === "delivery" ? (
                          <div className="simulator-grid">
                            <article className="sim-card sim-card-large">
                              <span className="panel-label">Delivery Control</span>
                              <h3>Select how the app operates</h3>
                              <div className="sim-model-stack">
                                {deliveryModels.map((model) => (
                                  <div
                                    key={model.id}
                                    className={`sim-model-row ${
                                      selectedModel === model.id ? "is-selected" : ""
                                    }`}
                                  >
                                    <div>
                                      <strong>{model.title}</strong>
                                      <span>{model.tagline}</span>
                                    </div>
                                    <em>{model.priceLabel}</em>
                                  </div>
                                ))}
                              </div>
                            </article>
                            <article className="sim-card">
                              <span className="panel-label">Channels</span>
                              <div className="sim-channel-list">
                                <div>
                                  <strong>Card output</strong>
                                  <span>Image + PDF ready</span>
                                </div>
                                <div>
                                  <strong>WhatsApp bulk send</strong>
                                  <span>Rate ₹{whatsappRate} per invite</span>
                                </div>
                                <div>
                                  <strong>AI agent voice</strong>
                                  <span>
                                    {selectedModel === "agentic"
                                      ? "Enabled"
                                      : "Available in full package"}
                                  </span>
                                </div>
                              </div>
                            </article>
                          </div>
                        ) : null}

                        {simulatorScreen === "agent" ? (
                          <div className="simulator-grid">
                            <article className="sim-card sim-card-large">
                              <span className="panel-label">AI Agent</span>
                              <h3>Asha is operating on behalf of the host</h3>
                              <div className="sim-task-list">
                                {selectedJobs.map((job) => (
                                  <div key={job} className="sim-task-row">
                                    <strong>{job}</strong>
                                    <em>{jobStatuses[job] || "Ready"}</em>
                                  </div>
                                ))}
                              </div>
                            </article>
                            <article className="sim-card sim-card-agent">
                              <span className="panel-label">Voice persona</span>
                              <strong>Host-aligned AI voice</strong>
                              <p>
                                Personalized reminder calls, RSVP nudges, and polite follow-ups in a familiar family tone.
                              </p>
                              <div className="sim-progress-bar">
                                <span style={{ width: simulationDone ? "100%" : "66%" }} />
                              </div>
                            </article>
                          </div>
                        ) : null}

                        {simulatorScreen === "tracking" ? (
                          <div className="simulator-grid">
                            <article className="sim-card sim-card-large">
                              <span className="panel-label">Tracking</span>
                              <div className="tracking-grid tracking-grid-strong">
                                <div className="tracking-stat">
                                  <strong>{selectedSegmentCount}</strong>
                                  <span>Targeted contacts</span>
                                </div>
                                <div className="tracking-stat">
                                  <strong>{simulationDone ? "71%" : "0%"}</strong>
                                  <span>Seen rate</span>
                                </div>
                                <div className="tracking-stat">
                                  <strong>{selectedModel === "agentic" ? "38" : "24"}</strong>
                                  <span>RSVP</span>
                                </div>
                              </div>
                              <div className="tracking-table">
                                {trackerRows.map((row) => (
                                  <div key={row.label} className="tracking-row">
                                    <span>{row.label}</span>
                                    <strong>{row.status}</strong>
                                  </div>
                                ))}
                              </div>
                            </article>
                            <article className="sim-card">
                              <span className="panel-label">Outcome</span>
                              <strong>₹{savings.toLocaleString("en-IN")} saved</strong>
                              <p>
                                Compared with traditional invites, printing, delivery, and calling time.
                              </p>
                              <div className="bar-chart">
                                <div className="bar-row">
                                  <span>Traditional</span>
                                  <div className="bar-track">
                                    <div className="bar-fill bar-fill-danger" style={{ width: "100%" }} />
                                  </div>
                                  <strong>₹{traditionalCost.toLocaleString("en-IN")}</strong>
                                </div>
                                <div className="bar-row">
                                  <span>Agentic</span>
                                  <div className="bar-track">
                                    <div
                                      className="bar-fill bar-fill-success"
                                      style={{
                                        width: `${Math.max(10, (solutionCost / traditionalCost) * 100)}%`,
                                      }}
                                    />
                                  </div>
                                  <strong>₹{solutionCost.toLocaleString("en-IN")}</strong>
                                </div>
                              </div>
                            </article>
                          </div>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ) : (
            <div className="demo-workspace">
              <div className="demo-main">
                <div className="demo-stage-header">
                  <div>
                    <span className="panel-label">Step {step} of 6</span>
                    <h3>{steps[step - 1]}</h3>
                  </div>
                  <p>{currentNote}</p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step === 1 ? (
                      <div className="demo-card">
                        <div className="card-header">
                          <h3>1. Event details</h3>
                          <span>Dropdown-led setup</span>
                        </div>
                        <div className="form-grid">
                          <label>
                            Event type
                            <select
                              value={eventDetails.eventType}
                              onChange={(event) =>
                                updateEvent("eventType", event.target.value)
                              }
                            >
                              {eventTypes.map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label>
                            Language
                            <select
                              value={eventDetails.language}
                              onChange={(event) =>
                                updateEvent("language", event.target.value)
                              }
                            >
                              {languages.map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label>
                            Hosts
                            <input
                              value={eventDetails.hosts}
                              onChange={(event) =>
                                updateEvent("hosts", event.target.value)
                              }
                            />
                          </label>
                          <label>
                            City
                            <input
                              value={eventDetails.city}
                              onChange={(event) =>
                                updateEvent("city", event.target.value)
                              }
                            />
                          </label>
                          <label>
                            Date
                            <input
                              value={eventDetails.date}
                              onChange={(event) =>
                                updateEvent("date", event.target.value)
                              }
                            />
                          </label>
                          <label>
                            Families invited
                            <input
                              type="number"
                              min="50"
                              max="1000"
                              value={eventDetails.families}
                              onChange={(event) =>
                                updateEvent("families", Number(event.target.value))
                              }
                            />
                          </label>
                        </div>

                        <div className="app-highlight-grid">
                          <article className="app-highlight-card">
                            <strong>{guests}</strong>
                            <span>Estimated total people</span>
                          </article>
                          <article className="app-highlight-card">
                            <strong>{selectedSegmentCount}</strong>
                            <span>Primary WhatsApp reach</span>
                          </article>
                          <article className="app-highlight-card">
                            <strong>Agent-ready</strong>
                            <span>Brief created for personalized workflows</span>
                          </article>
                        </div>
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <div className="demo-card">
                        <div className="card-header">
                          <h3>2. Template selection</h3>
                          <span>
                            Templates for {eventDetails.eventType} — personalized for{" "}
                            {eventDetails.hosts}
                          </span>
                        </div>
                        <div className="template-grid">
                          {currentTemplates.map((template) => (
                            <button
                              key={template.id}
                              type="button"
                              className={`template-card ${
                                selectedTemplate === template.id ? "is-selected" : ""
                              }`}
                              onClick={() => setSelectedTemplate(template.id)}
                            >
                              <div
                                className={`template-preview template-${template.id} ${
                                  template.image ? "has-image" : ""
                                }`}
                                style={
                                  template.image
                                    ? { backgroundImage: `url(${template.image})` }
                                    : undefined
                                }
                              >
                                <span className="template-chip">{template.format}</span>
                                <div className="template-host-overlay">
                                  <span className="template-overlay-eyebrow">
                                    {eventDetails.eventType} invite
                                  </span>
                                  <strong className="template-overlay-hosts">
                                    {eventDetails.hosts}
                                  </strong>
                                  <small className="template-overlay-meta">
                                    {eventDetails.city} • {eventDetails.date}
                                  </small>
                                </div>
                              </div>
                              <div className="template-copy">
                                <h4>{template.name}</h4>
                                <p>{template.blurb}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {step === 3 ? (
                      <div className="demo-card">
                        <div className="card-header">
                          <h3>3. Model selection</h3>
                          <span>Choose the operating mode</span>
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
                            <span>WhatsApp per invite cost: ₹{whatsappRate}</span>
                            <input
                              type="range"
                              min="4"
                              max="10"
                              step="1"
                              value={whatsappRate}
                              onChange={(event) =>
                                setWhatsappRate(Number(event.target.value))
                              }
                            />
                          </label>
                        ) : null}

                        {selectedModel === "agentic" ? (
                          <div className="pricing-signal">
                            <strong>
                              Group base package: ₹
                              {getAgenticBasePrice(eventDetails.families).toLocaleString("en-IN")}
                            </strong>
                            <p>
                              0-100 families = ₹1,500, 101-200 = ₹2,000, 201-500 = ₹2,500,
                              then the slab increases for larger groups.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {step === 4 ? (
                      <div className="demo-card">
                        <div className="card-header">
                          <h3>4. Do the jobs according to package</h3>
                          <span>Agent execution layer</span>
                        </div>

                        <div className="agent-banner">
                          <strong>Agentic AI mode</strong>
                          <p>
                            A personalized AI agent works like your family’s invite
                            operator: writing, sending, reminding, calling, and
                            tracking without constant manual follow-up.
                          </p>
                        </div>

                        <div className="segment-row">
                          {segments.map((segment) => (
                            <button
                              key={segment.id}
                              type="button"
                              className={`segment-chip ${
                                segment.defaultSelected ? "is-selected" : ""
                              }`}
                              onClick={() => toggleSegment(segment.id)}
                            >
                              <strong>{segment.name}</strong>
                              <span>{segment.count} contacts</span>
                            </button>
                          ))}
                        </div>

                        <div className="job-list">
                          {selectedJobs.map((job) => (
                            <div key={job} className="job-row">
                              <div>
                                <strong>{job}</strong>
                              </div>
                              <em>{jobStatuses[job] || "Ready"}</em>
                            </div>
                          ))}
                        </div>

                        <button type="button" className="btn btn-primary" onClick={runSimulation}>
                          Run Agentic Demo
                        </button>
                      </div>
                    ) : null}

                    {step === 5 ? (
                      <div className="demo-card">
                        <div className="card-header">
                          <h3>5. Track invites everywhere</h3>
                          <span>Delivery + seen + RSVP</span>
                        </div>

                        <div className="tracking-grid tracking-grid-strong">
                          <div className="tracking-stat">
                            <strong>{selectedSegmentCount}</strong>
                            <span>Total targeted contacts</span>
                          </div>
                          <div className="tracking-stat">
                            <strong>{simulationDone ? "71%" : "0%"}</strong>
                            <span>Seen rate</span>
                          </div>
                          <div className="tracking-stat">
                            <strong>{selectedModel === "agentic" ? "38" : "24"}</strong>
                            <span>RSVP / confirmations</span>
                          </div>
                          <div className="tracking-stat">
                            <strong>{selectedModel === "agentic" ? "19" : "0"}</strong>
                            <span>AI reminder calls</span>
                          </div>
                        </div>

                        <div className="tracking-table">
                          {trackerRows.map((row) => (
                            <div key={row.label} className="tracking-row">
                              <span>{row.label}</span>
                              <strong>{row.status}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {step === 6 ? (
                      <div className="demo-card">
                        <div className="card-header">
                          <h3>6. Traditional vs our solution</h3>
                          <span>Complete showcase</span>
                        </div>

                        <div className="comparison-grid comparison-grid-demo">
                          <article className="compare-card compare-card-traditional">
                            <strong>Traditional workflow</strong>
                            <span>₹{traditionalCost.toLocaleString("en-IN")}</span>
                            <p>
                              Cards, printing, delivery, calling, follow-ups, and zero
                              live visibility.
                            </p>
                            <small>
                              Human effort: 18-26 hours across family coordination and
                              reminder loops, including calling time cost.
                            </small>
                          </article>

                          <article className="compare-card compare-card-ai">
                            <strong>Aamantran Agentic AI</strong>
                            <span>₹{solutionCost.toLocaleString("en-IN")}</span>
                            <p>
                              {selectedModelData?.title}, live execution, and tracking
                              built around the selected package.
                            </p>
                            <small>
                              Human effort: 30-90 minutes to approve and supervise.
                            </small>
                          </article>
                        </div>

                        <div className="bar-chart">
                          <div className="bar-row">
                            <span>Traditional</span>
                            <div className="bar-track">
                              <div className="bar-fill bar-fill-danger" style={{ width: "100%" }} />
                            </div>
                            <strong>₹{traditionalCost.toLocaleString("en-IN")}</strong>
                          </div>
                          <div className="bar-row">
                            <span>Our solution</span>
                            <div className="bar-track">
                              <div
                                className="bar-fill bar-fill-success"
                                style={{
                                  width: `${Math.max(
                                    10,
                                    (solutionCost / traditionalCost) * 100,
                                  )}%`,
                                }}
                              />
                            </div>
                            <strong>₹{solutionCost.toLocaleString("en-IN")}</strong>
                          </div>
                        </div>

                        <p className="savings-line">
                          Estimated savings with {selectedModelData?.title}: ₹
                          {savings.toLocaleString("en-IN")}
                        </p>

                        <div className="summary-list">
                          {solutionBreakdown.lines.map((line) => (
                            <div key={line.label}>
                              <span>{line.label}</span>
                              <strong>₹{line.value.toLocaleString("en-IN")}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                <div className="demo-controls">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      stopAutoDemo();
                      previousStep();
                    }}
                    disabled={step === 1}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      stopAutoDemo();
                      nextStep();
                    }}
                    disabled={step === 6}
                  >
                    Next
                  </button>
                </div>
              </div>

              <aside className="demo-sidebar">
                <div className="demo-sidebar-card demo-sidebar-preview">
                  <span className="panel-label">Live summary</span>
                  <div className={`demo-preview-card template-${selectedTemplate}`}>
                    <span className="template-chip">
                      {selectedTemplateData?.format || "Invite"}
                    </span>
                    <strong>{eventDetails.hosts}</strong>
                    <small>
                      {eventDetails.eventType} • {eventDetails.city}
                    </small>
                  </div>

                    <div className="summary-list">
                      <div>
                        <span>Template</span>
                        <strong>{selectedTemplateData?.name}</strong>
                    </div>
                    <div>
                      <span>Model</span>
                      <strong>{selectedModelData?.title}</strong>
                    </div>
                      <div>
                        <span>Estimate</span>
                        <strong>₹{solutionCost.toLocaleString("en-IN")}</strong>
                      </div>
                      {selectedModel === "agentic" ? (
                        <div>
                          <span>Messages / Calls</span>
                          <strong>
                            {solutionBreakdown.meta?.messageTouchpoints} / {solutionBreakdown.meta?.callFamilies}
                          </strong>
                        </div>
                      ) : null}
                    </div>
                  </div>

                <div className="demo-sidebar-card demo-sidebar-agent">
                  <span className="panel-label">Personalized AI agent</span>
                  <strong>Asha, trained in your family tone</strong>
                  <p>
                    Uses your voice style for reminders, polite nudges, and
                    confirmation calls so the workflow feels personal, not robotic.
                  </p>
                </div>

                <div className="demo-sidebar-card">
                  <span className="panel-label">Automatic walkthrough</span>
                  <strong>
                    {isAutoDemoRunning ? "Auto walkthrough running" : "Manual mode"}
                  </strong>
                  <p className="demo-sidebar-note">{currentNote}</p>
                  <div className="auto-progress">
                    {steps.map((label, index) => (
                      <span
                        key={label}
                        className={`auto-progress-dot ${
                          index + 1 <= step ? "is-filled" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="demo-sidebar-card">
                  <span className="panel-label">Current scope</span>
                  <div className="demo-scope-grid">
                    <article>
                      <strong>{selectedJobs.length}</strong>
                      <span>Jobs in workflow</span>
                    </article>
                    <article>
                      <strong>{activeSegments.length}</strong>
                      <span>Active segments</span>
                    </article>
                  </div>
                  <div className="summary-list">
                    <div>
                      <span>Segments</span>
                      <strong>{activeSegments.map((item) => item.name).join(", ")}</strong>
                    </div>
                    {selectedJobs.slice(0, 4).map((job) => (
                      <div key={job}>
                        <span>Job</span>
                        <strong>{job}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
