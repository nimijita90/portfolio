import type { Metadata } from "next";
import CustomiserCaseStudy from "./CustomiserCaseStudy";
import "./customiser.css";

export const metadata: Metadata = {
  title: "Demo Casino Customiser — María Mora",
  description: "How María Mora turned a complex sales and onboarding workflow into a self-service, interactive Figma prototype.",
};

export default function CustomiserCaseStudyPage() {
  return <CustomiserCaseStudy />;
}
