import Portfolio from "./CanvaPortfolio";
import { siteUrl } from "./site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "María Mora",
      inLanguage: "en",
      about: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "María Mora",
      url: siteUrl,
      image: `${siteUrl}/portfolio/canva/hero-photo.jpg`,
      jobTitle: "Lead Product Designer",
      description:
        "Lead Product Designer and Design Leader with 10+ years in iGaming, specialising in casino and sportsbook platforms, design systems and design team leadership.",
      email: "mailto:moragarciamaria@gmail.com",
      address: { "@type": "PostalAddress", addressLocality: "Marbella", addressCountry: "ES" },
      sameAs: ["https://www.linkedin.com/in/mar%C3%ADa-mora/"],
      knowsAbout: [
        "Product Design",
        "Design Leadership",
        "iGaming",
        "Online Casino Platforms",
        "Sportsbook Platforms",
        "Design Systems",
        "White-label Casino Platforms",
      ],
      award: [
        "iGaming Idol 2018 — Winner, Design and User Experience Award",
        "iGaming Idol 2022 — Finalist, Design and User Experience Award",
        "Challenge for Cities 2019 — First prize, Antwerp",
        "Challenge for Cities 2019 — First prize, Helsinki",
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Portfolio />
    </>
  );
}
