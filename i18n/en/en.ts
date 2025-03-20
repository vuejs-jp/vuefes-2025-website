import type { MessageSchema } from "../message-schema";

export default {
  nuxtSiteConfig: {
    name: "Vue Fes Japan 2025",
    description: "description [english]",
  },
  mainVisual: {
    imageAlt:
      "The main visual of Vue Fes Japan 2025. It features a silhouette of a V, representing Vue, and a circle, representing the Japanese flag, side by side. The colors are deep matcha-like shades derived from the two colors used in the Vue.js logo, and the circle features a traditional Japanese gold marbling pattern.",
    webglAlt: "TODO",
  },
  logo: {
    alt: "Vue Fes Japan 2025 logo. It features a silhouette of a V, representing Vue, and a circle, representing the Japanese flag, side by side. The colors are deep matcha-like shades derived from the two colors used in the Vue.js logo.",
  },
  message: "Message",
  messageCoverImageAlt:
    "Vue Fes Japan 2025. It features a silhouette of a V, representing Vue, and a circle, representing the Japanese flag, side by side. The colors are deep matcha-like shades derived from the two colors used in the Vue.js logo. To the right of the logo, 'Vue Fes Japan 2025' is written in the same matcha color.",
  sponsorWanted: "Sponsorship Opportunities",
  sponsorWantedCoverImageAlt: "Sponsor Wanted cover image",
  sponsorApplyButton: "Apply for Sponsorship Here",
  contactForm: {
    title: "Contact Us",
    description:
      "Thank you for your interest in Vue Fes Japan. For any questions or inquiries regarding Vue Fes Japan, please use the form below. Typically, you will receive a response from our representative within 3 business days. If you do not receive a reply within 3 business days, please do not hesitate to contact us again.",
    formFields: {
      name: { label: "Name", placeholder: "Example: Taro Yamada" },
      email: {
        label: "Email Address",
        placeholder: "Example: hello{'@'}vuefes.jp",
      },
      content: { label: "Contact Details", placeholder: "Example: Inquiry" },
      submit: { label: "Send" },
    },
  },
  snsIntroduction:
    "Please check our official social media for the latest updates.",
  snsIconImageAlt: {
    x: "X (formerly Twitter) icon",
    youtube: "YouTube icon",
    github: "GitHub icon",
    note: "note icon",
  },
  privacyPolicy: "Privacy Policy",
  coc: "Code of Conduct",
  transactions:
    "Notation based on the Act on Specified Commercial Transactions",
} satisfies MessageSchema;
