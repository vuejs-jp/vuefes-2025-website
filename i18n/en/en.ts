import type { MessageSchema } from "../message-schema";

export default {
  nuxtSiteConfig: {
    name: "Vue Fes Japan 2025",
    description:
      "This is one of the largest Vue.js conferences in Japan, taking place on Saturday, October 25, 2025. In addition to sessions by renowned speakers from Japan and abroad, we are planning various events such as lightning talks, hands-on workshops, and merchandise sales. Join us to enjoy and celebrate Vue.js together!",
  },
  mainVisual: {
    imageAlt:
      "The main visual of Vue Fes Japan 2025. It features a silhouette of a V, representing Vue, and a circle, representing the Japanese flag, side by side. The colors are deep matcha-like shades derived from the two colors, and the circle features a Japanese gold marbling pattern.",
    webglAlt:
      "The main visual animation of Vue Fes Japan 2025. It features a side-by-side silhouette of a V, which represents Vue, and a circle silhouette, which represents the Japanese flag Hinomaru, with a golden suminagashi pattern on the circle silhouette. The color of the silhouette changes at regular intervals along with the flowing sumi ink animation.",
  },
  logo: {
    alt: "Vue Fes Japan 2025 logo. It features a silhouette of a V, representing Vue, and a circle, representing the Japanese flag, side by side. The colors are deep matcha-like shades derived from the two colors used in the Vue.js logo.",
  },
  animation: {
    play: "Play Animation",
    pause: "Pause Animation",
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
    successMessage: "Sent successfully",
    errorMessage: "Failed to send. Please try again.",
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
  backTop: "Back to Top",

  validation: {
    required: "The input of {target} is required.",
    email: "The Email Address is not in the correct format.",
  },
} satisfies MessageSchema;
