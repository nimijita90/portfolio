import type { Metadata } from "next";
import XsiteCaseStudy from "./XsiteCaseStudy";
import "../case-kit.css";
import "./xsite.css";

export const metadata: Metadata = {
  title: "XSITE · María Mora",
  description: "How María Mora led the Design approach for XSITE, GiG’s new white-label casino platform, rebuilt on a more consistent, scalable and configurable foundation.",
};

export default function XsiteCaseStudyPage() {
  return <XsiteCaseStudy />;
}
