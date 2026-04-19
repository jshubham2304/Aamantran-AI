# Aamantran AI

India's AI Invitation Platform — create, share, automate, and track event invites.

**Live site:** https://aamantran-ai.netlify.app/
**Cost calculator:** https://aamantran-ai.netlify.app/#calculator

## About

Aamantran AI replaces the traditional paper-card + manual-calling invite workflow with an AI-driven pipeline: generate personalized invites, deliver them over WhatsApp, and track RSVPs and follow-ups automatically. This repository contains the marketing landing page that explains the product, walks through a demo flow, and lets visitors compare traditional invite costs against the Aamantran AI delivery models.

## Sections

- **Hero** — product pitch and primary CTA
- **Problem / Solution** — why traditional invites break at scale
- **Market Engine** — addressable market and economics
- **Demo Flow** — end-to-end walkthrough of the invite journey
- **Cost Calculator** (`#calculator`) — interactive tool comparing traditional invite spend vs. agentic / assisted delivery models, driven by family count, card cost, call-minute value, and WhatsApp rate
- **Features, Vision, Business Model, CTA, Footer**

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/) for animations
- Plain CSS ([src/styles.css](src/styles.css))

## Getting Started

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Project Structure

```
src/
  App.jsx                    # page shell + lazy-loaded sections
  main.jsx                   # React entry point
  styles.css                 # global styles
  components/
    Navbar.jsx
    Hero.jsx
    Problem.jsx
    Solution.jsx
    MarketEngine.jsx
    DemoFlow.jsx
    CostCalculator.jsx       # interactive pricing comparison (#calculator)
    Features.jsx
    Vision.jsx
    BusinessModel.jsx
    CTA.jsx
    Footer.jsx
    SectionHeading.jsx
    demoConfig.js            # pricing models + cost math
```

Below-the-fold sections are code-split via `React.lazy` to keep the initial bundle light.

## Deployment

The site is deployed on Netlify. Any production build output (`npm run build` → `dist/`) can be served as a static site.
