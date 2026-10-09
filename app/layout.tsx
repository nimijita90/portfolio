import type { Metadata } from "next";
import "@fontsource-variable/onest";
import "./globals.css";
import "./portfolio.css";
import "./canva-portfolio.css";

import { siteUrl } from "./site";

const title = "María Mora · Lead Product Designer & Design Leader in iGaming";
const description =
  "María Mora is a Lead Product Designer and Design Leader with 10+ years in iGaming: casino and sportsbook platforms, design systems and design teams. iGaming Idol 2018 Design & UX Award winner.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  icons: { icon: "/portfolio/assets/maria-logo-white.svg" },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "María Mora",
    locale: "en_GB",
    images: [{ url: "/og.png", width: 1680, height: 944, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
