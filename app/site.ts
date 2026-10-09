export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://maria-lopez-design-portfolio.malapipa.chatgpt.site"
).replace(/\/$/, "");

export const caseStudyRoutes = ["/work/wand", "/work/xsite", "/work/customiser"] as const;
