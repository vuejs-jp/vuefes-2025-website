export type MessageSchema = {
  nuxtSiteConfig: {
    name: string;
    description: string;
  };
  mainVisual: {
    imageAlt: string;
    webglAlt: string;
  };
  logo: {
    alt: string;
  };
  animation: {
    play: string;
    pause: string;
  };
  message: string;
  messageCoverImageAlt: string;
  sponsorWanted: string;
  sponsorWantedCoverImageAlt: string;
  sponsorApplyButton: string;
  contactForm: {
    title: string;
    description: string;
    formFields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      content: { label: string; placeholder: string };
      submit: { label: string };
    };
    successMessage: string;
    errorMessage: string;
  };
  snsIntroduction: string;
  snsIconImageAlt: {
    x: string;
    youtube: string;
    github: string;
    note: string;
  };
  privacyPolicy: string;
  coc: string;
  transactions: string;
  backTop: string;

  validation: {
    required: string;
    email: string;
  };
};
