export const eventTypes = [
  "Wedding",
  "Engagement",
  "Reception",
  "Haldi",
  "Housewarming",
  "Baby Shower",
  "Puja",
];

export const templateCatalog = {
  Wedding: [
    {
      id: "wedding-regal",
      name: "Regal Gold",
      mood: "Ornamental, premium, family-first",
      format: "Image + PDF",
      blurb:
        "Inspired by the common gold, floral, and ornate wedding invite styles used for Indian shaadi cards.",
    },
    {
      id: "wedding-lotus",
      name: "Lotus Ceremony",
      mood: "Traditional, floral, warm",
      format: "Card + Story",
      blurb:
        "Built around lotus motifs, ceremonial typography, and a softer festive palette for digital sharing.",
    },
    {
      id: "wedding-mandap-photo",
      name: "Mandap Photo",
      mood: "Cinematic, ceremonial, photo-led",
      format: "Image + PDF",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
      blurb:
        "Real mandap photography with your hosts' names placed on top, auto-generated for the event brief.",
    },
    {
      id: "wedding-floral-photo",
      name: "Floral Couple",
      mood: "Romantic, photographic, warm",
      format: "Card + Story",
      image:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
      blurb:
        "Photo-first design with floral frames and host names set dynamically from the event brief.",
    },
  ],
  Engagement: [
    {
      id: "engagement-bloom",
      name: "Bloom Couple",
      mood: "Romantic, floral, light",
      format: "Image + PDF",
      blurb:
        "A soft engagement style with floral framing and couple-focused composition, common in modern engagement invites.",
    },
    {
      id: "engagement-photo",
      name: "Editorial Photo",
      mood: "Modern, elegant, photo-led",
      format: "Card + Story",
      blurb:
        "A cleaner engagement format with space for a couple photo, event details, and premium typography.",
    },
    {
      id: "engagement-rings-photo",
      name: "Ring Moment",
      mood: "Intimate, photographic, warm",
      format: "Image + PDF",
      image:
        "https://images.unsplash.com/photo-1529636444744-adafcfaf5d72?auto=format&fit=crop&w=900&q=80",
      blurb:
        "Engagement-first template with a real ring-moment photo and host names overlaid dynamically.",
    },
  ],
  Reception: [
    {
      id: "reception-midnight",
      name: "Midnight Reception",
      mood: "Formal, dark, glamorous",
      format: "Image + PDF",
      blurb:
        "A more formal reception card with dark tones, gold accents, and ballroom-style presentation.",
    },
    {
      id: "reception-glam",
      name: "Spotlight Glam",
      mood: "Luxury, evening, stage-ready",
      format: "Card + Story",
      blurb:
        "Reception-first styling with spotlight gradients and elegant typography for grand evening events.",
    },
  ],
  Haldi: [
    {
      id: "haldi-marigold",
      name: "Marigold Haldi",
      mood: "Bright, playful, saffron",
      format: "Image + PDF",
      blurb:
        "Inspired by yellow-orange Haldi invites with marigold motifs and celebratory pre-wedding energy.",
    },
    {
      id: "haldi-folk",
      name: "Haldi Folk Art",
      mood: "Traditional, illustrated, lively",
      format: "Card + Story",
      blurb:
        "A more illustrated Haldi format with festive Indian patterns and a vibrant family event feel.",
    },
  ],
  Housewarming: [
    {
      id: "housewarming-kalash",
      name: "Gruhapravesh Kalash",
      mood: "Sacred, warm, welcoming",
      format: "Image + PDF",
      blurb:
        "A housewarming template with kalash, doorway, and griha-pravesh inspired ceremonial details.",
    },
    {
      id: "housewarming-home",
      name: "Modern Home Invite",
      mood: "Minimal, warm, family",
      format: "Card + Story",
      blurb:
        "A cleaner housewarming layout focused on the home reveal, address, and intimate hosting tone.",
    },
  ],
  "Baby Shower": [
    {
      id: "baby-safari",
      name: "Safari Celebration",
      mood: "Cute, pastel, illustrated",
      format: "Image + PDF",
      blurb:
        "Inspired by popular baby shower cards using soft colors, playful illustration, and joyful family framing.",
    },
    {
      id: "baby-boho",
      name: "Boho Blessings",
      mood: "Gentle, pastel, calm",
      format: "Card + Story",
      blurb:
        "A softer baby shower template built around pastel tones, whimsical details, and intimate messaging.",
    },
  ],
  Puja: [
    {
      id: "puja-devotional",
      name: "Devotional Invite",
      mood: "Spiritual, traditional, ornate",
      format: "Image + PDF",
      blurb:
        "A puja invitation style using sacred motifs, temple-inspired framing, and warm devotional colors.",
    },
    {
      id: "puja-floral",
      name: "Floral Aarti",
      mood: "Sacred, bright, festive",
      format: "Card + Story",
      blurb:
        "A lighter puja format with floral frames and a more festive digital-first sharing layout.",
    },
  ],
};

export function getTemplatesForEvent(eventType) {
  return templateCatalog[eventType] || templateCatalog.Wedding;
}

export function getTemplateById(templateId) {
  return Object.values(templateCatalog)
    .flat()
    .find((template) => template.id === templateId);
}

export const deliveryModels = [
  {
    id: "cards",
    title: "Only Cards",
    priceLabel: "₹500 fixed",
    tagline: "Image or PDF invite pack",
    summary: "Best for families who only want a premium card delivered instantly.",
  },
  {
    id: "bulk",
    title: "Card + WhatsApp Bulk Send",
    priceLabel: "₹4-₹10 per invite",
    tagline: "Invite + bulk WhatsApp automation",
    summary: "Includes card generation, personalization, and WhatsApp distribution.",
  },
  {
    id: "agentic",
    title: "All in One Agentic AI",
    priceLabel: "₹1,500+ by group",
    tagline: "Personalized AI agent in your own voice",
    summary: "Agentic AI handles reminders, pending guests, calls, and tracking end to end.",
  },
];

export function getAgenticBasePrice(families) {
  if (families <= 100) {
    return 1500;
  }

  if (families <= 200) {
    return 2000;
  }

  if (families <= 500) {
    return 2500;
  }

  return 2500 + Math.ceil((families - 500) / 200) * 500;
}

export function getSolutionBreakdown(modelId, families, whatsappRate = 7) {
  if (modelId === "cards") {
    return {
      total: 500,
      lines: [
        { label: "Card design + export", value: 500 },
      ],
    };
  }

  if (modelId === "bulk") {
    const designCost = 500;
    const messageCount = families;
    const messageCost = messageCount * whatsappRate;

    return {
      total: designCost + messageCost,
      lines: [
        { label: "Card design + export", value: designCost },
        {
          label: `Bulk WhatsApp send (${messageCount} x ₹${whatsappRate})`,
          value: messageCost,
        },
      ],
    };
  }

  const basePackage = getAgenticBasePrice(families);
  const messageTouchpoints = families * 3;
  const messageRate = 1;
  const messageCost = messageTouchpoints * messageRate;
  const callFamilies = Math.ceil(families * 0.35);
  const callMinutes = callFamilies * 3;
  const aiCallMinuteRate = 2;
  const callCost = callMinutes * aiCallMinuteRate;
  const trackingCost = families;

  return {
    total: basePackage + messageCost + callCost + trackingCost,
    lines: [
      {
        label: `Agent package (${families} families group)`,
        value: basePackage,
      },
      {
        label: `Messages (${messageTouchpoints} touchpoints x ₹${messageRate})`,
        value: messageCost,
      },
      {
        label: `AI calls (${callMinutes} mins x ₹${aiCallMinuteRate})`,
        value: callCost,
      },
      {
        label: `Tracking + dashboard (${families} x ₹1)`,
        value: trackingCost,
      },
    ],
    meta: {
      basePackage,
      messageTouchpoints,
      messageRate,
      callFamilies,
      callMinutes,
      aiCallMinuteRate,
      trackingCost,
    },
  };
}

export function calculateSolutionCost(modelId, families, whatsappRate = 7) {
  return getSolutionBreakdown(modelId, families, whatsappRate).total;
}

export function getModelJobs(modelId) {
  const commonJobs = [
    "Understand event brief",
    "Generate personalized card copy",
    "Render final card in image and PDF",
  ];

  if (modelId === "cards") {
    return commonJobs;
  }

  if (modelId === "bulk") {
    return [
      ...commonJobs,
      "Create WhatsApp message variants",
      "Bulk send to guest segments",
      "Track delivery and opens",
    ];
  }

  return [
    ...commonJobs,
    "Create WhatsApp message variants",
    "Bulk send to guest segments",
    "Spin up personalized AI voice agent",
    "Call pending guests in host voice",
    "Track RSVP, seen, and reminder loops",
  ];
}
