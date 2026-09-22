import type { Metadata } from "next";
import XsiteCaseStudy from "./XsiteCaseStudy";
import "../../casino-mockup.css";
import "./xsite.css";

export const metadata: Metadata = {
  title: "XSITE — María Mora",
  description: "María Mora's ongoing work leading the design of XSITE, an advanced, fully customisable white-label casino and sportsbook platform.",
};

export default function XsiteCaseStudyPage() {
  return <XsiteCaseStudy />;
}
