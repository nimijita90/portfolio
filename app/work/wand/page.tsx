import type { Metadata } from "next";
import WandCaseStudy from "./WandCaseStudy";
import "./wand.css";

export const metadata: Metadata = {
  title: "WAND — María Mora",
  description: "How María Mora evolved an incomplete white-label casino system into a scalable multi-brand product platform.",
};

export default function WandCaseStudyPage() {
  return <WandCaseStudy />;
}
