export const LINK = {
  public: {
    login: "login",
    agreement: {
      index: "agreement",
      termsOfUse: "terms-of-use",
      privacyPolicy: "privacy-policy",
      sensitiveInfo: "sensitive-info",
      privacyThirdParty: "privacy-third-party",
      privacyTransfer: "privacy-transfer",
      age: "age",
      marketing: "marketing",
    },
    registerNickname: "register-nickname",
    signupComplete: "signup-complete",
  },

  main: {
    index: "main",
    diaryCalendar: {
      index: "diary-calendar",
      write: "diary-write",
      list: "my-diary-list",
      detail: "diary-detail",
    },
    diaryStatistics: {
      index: "diary-statistics",
    },
    soafExplore: {
      index: "soaf-explore",
    },
    chat: {
      index: "chat",
    },
    myHome: {
      index: "my-home",
    },
  },
} as const;
