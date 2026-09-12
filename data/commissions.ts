export interface CommissionType {
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const commissionTypes: CommissionType[] = [
  {
    title: "Portraits",
    description:
      "Commission a mixed media portrait — sculpted textures, layered materials, and personal narrative woven into a one-of-a-kind piece.",
  },
  {
    title: "Custom Artwork",
    description:
      "Collaborate on a bespoke artwork for your space. From concept to completion, every piece is crafted with intention and care.",
  },
  {
    title: "Collaborations",
    description:
      "Partner with Timatimone for exhibitions, events, brand collaborations, or creative projects that share a vision for art and healing.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Inquiry",
    description:
      "Share your vision, space, and story. Every commission begins with a conversation.",
  },
  {
    number: "02",
    title: "Discussion",
    description:
      "We refine the concept together — materials, size, palette, and timeline aligned to your vision.",
  },
  {
    number: "03",
    title: "Creation",
    description:
      "The artwork comes to life in the studio. You'll receive updates as your piece takes shape.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "Your finished artwork is carefully packaged and delivered, ready to transform your space.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "How long does a commission take?",
    answer:
      "Most commissions are completed within 4–8 weeks, depending on complexity and size. We'll agree on a timeline during the discussion phase.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. Artwork is carefully packaged and insured for shipping. International delivery may require additional time.",
  },
  {
    question: "What materials do you use?",
    answer:
      "Acrylic, sculpting paste, resin, gold leaf, pearls, and mixed media. Each piece may incorporate different materials depending on the concept.",
  },
  {
    question: "Can I visit the gallery?",
    answer:
      "The gallery is located at 4338 Albany Post Rd, Hyde Park, NY. Visits are by appointment — reach out via the contact page to schedule.",
  },
  {
    question: "What if I'm not satisfied with my commission?",
    answer:
      "Your satisfaction matters. We work closely through each phase to ensure the final piece resonates with you. Any concerns are addressed before delivery.",
  },
];
