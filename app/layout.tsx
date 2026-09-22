import type { Metadata } from "next";
import "@fontsource-variable/onest";
import "./globals.css";
import "./portfolio.css";
import "./canva-portfolio.css";

const title = "María Mora - Design Leader";
const description =
  "Design Leader specialising in iGaming products, design systems and team leadership.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://maria-lopez-design-portfolio.malapipa.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: "/portfolio/assets/maria-logo-white.svg" },
  openGraph: {
    title,
    description,
    type: "website",
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
