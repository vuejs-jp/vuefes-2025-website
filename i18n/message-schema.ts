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
  message: string;
  messageCoverImageAlt: string;
  sponsorWanted: string;
  sponsorWantedCoverImageAlt: string;
  sponsorApplyButton: string;
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
};
