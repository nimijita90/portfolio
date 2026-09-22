"use client";

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  awards,
  beyondDesign,
  brandNames,
  career,
  expertise,
  faqItems,
  highlights,
  recommendations,
  selectedWork,
} from "./content";

const asset = (name: string) => `/portfolio/assets/${name}`;

function V7Arrow({ direction = "down" }: { direction?: "down" | "right" | "diagonal" }) {
  return <span className={`v7-arrow v7-arrow--${direction}`} aria-hidden="true"><i /></span>;
}

function HeroName({ layer }: { layer: "back" | "front" }) {
  return (
    <span className={`v7-hero-name v7-hero-name--${layer}`} aria-hidden="true">
      {["María", "Mora"].map((word) => (
        <span className="v7-hero-word" key={`${layer}-${word}`}>
          {Array.from(word).map((character, index) => (
            <span className="v7-hero-char-mask" key={`${character}-${index}`}>
              <span className="v7-hero-char">{character}</span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function HighlightsLine({ children }: { children: string }) {
  return (
    <span className="v7-highlights-line" aria-hidden="true">
      {children.split(" ").map((word, wordIndex) => (
        <span className="v7-highlights-word" key={`${word}-${wordIndex}`}>
          {Array.from(word).map((character, characterIndex) => (
            <span className="v7-highlights-char-mask" key={`${character}-${characterIndex}`}>
              <span className="v7-highlights-char">{character}</span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function CareerTitleLine({ children }: { children: ReactNode }) {
  return <span className="v7-career-title-line"><span>{children}</span></span>;
}

export default function Portfolio() {
  const rootRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const expertiseWordRef = useRef<HTMLHeadingElement>(null);
  const careerNumberRef = useRef<HTMLSpanElement>(null);
  const careerArticleRef = useRef<HTMLElement>(null);
  const careerHasEnteredRef = useRef(false);
  const activeWorkRef = useRef(0);
  const workAlignTimerRef = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeCareer, setActiveCareer] = useState(0);
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [activeWork, setActiveWork] = useState(0);
  const [expertisePaused, setExpertisePaused] = useState(false);
  const [expertiseEntered, setExpertiseEntered] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(1);

  useEffect(() => {
    activeWorkRef.current = activeWork;
  }, [activeWork]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => {
      window.cancelAnimationFrame(frame);
      if (workAlignTimerRef.current !== null) window.clearTimeout(workAlignTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!expertiseEntered || expertisePaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cycleDuration = window.matchMedia("(max-width: 699px)").matches ? 5200 : 4000;
    const timer = window.setInterval(() => {
      setActiveExpertise((current) => (current + 1) % expertise.length);
    }, cycleDuration);
    return () => window.clearInterval(timer);
  }, [expertiseEntered, expertisePaused]);

  useLayoutEffect(() => {
    if (!careerHasEnteredRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const number = careerNumberRef.current;
    const article = careerArticleRef.current;
    if (!number || !article) return;
    const isMobile = window.matchMedia("(max-width: 699px)").matches;
    const transition = gsap.timeline({ defaults: { ease: "power4.out" } });
    if (isMobile) {
      transition
        .fromTo(number, { opacity: 0.18, y: 18 }, { opacity: 1, y: 0, duration: 0.58 })
        .fromTo(
          article,
          { opacity: 0, y: 22, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.72 },
          0.04,
        );
    } else {
      transition
        .fromTo(number, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.68 })
        .fromTo(article, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.76 }, 0.08);
    }
    return () => { transition.kill(); };
  }, [activeCareer]);

  useLayoutEffect(() => {
    const heading = expertiseWordRef.current;
    const viewport = heading?.parentElement;
    if (!heading || !viewport) return;

    let cancelled = false;
    let fitFrame = 0;
    const applyExpertiseFit = () => {
      if (cancelled) return;
      heading.style.removeProperty("font-size");
      const available = viewport.clientWidth;

      if (window.innerWidth < 901) {
        const current = Number.parseFloat(window.getComputedStyle(heading).fontSize);
        const lines = Array.from(heading.querySelectorAll<HTMLElement>(".v7-expertise-part > *"));
        const widest = Math.max(...lines.map((line) => line.scrollWidth));
        if (widest > available) {
          const minimum = window.innerWidth < 700 ? 34 : 42;
          heading.style.fontSize = `${Math.max(minimum, current * (available / widest) * 0.99)}px`;
        }
        return;
      }

      const maximum = Number.parseFloat(window.getComputedStyle(heading).fontSize);
      const measured = heading.scrollWidth;
      if (measured > available) {
        heading.style.fontSize = `${Math.max(56, maximum * (available / measured) * 0.98)}px`;
      }
    };
    const fitExpertise = () => {
      if (cancelled) return;
      window.cancelAnimationFrame(fitFrame);
      fitFrame = window.requestAnimationFrame(applyExpertiseFit);
    };

    const observer = new ResizeObserver(fitExpertise);
    observer.observe(viewport);
    document.fonts.ready.then(fitExpertise);
    fitExpertise();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(fitFrame);
      observer.disconnect();
    };
  }, [activeExpertise]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const desktopMotion = gsap.matchMedia();
    const context = gsap.context(() => {
      desktopMotion.add("(min-width: 700px)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .set(".v7-hero-curtain span", { yPercent: 0 })
          .set(".v7-hero-name--front", { opacity: 0 })
          .set(".v7-hero-name--back .v7-hero-char", { yPercent: 118, rotate: 3 })
          .fromTo(".v7-hero-portrait", { clipPath: "inset(47% 31% 46% 31%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.34 })
          .fromTo(".v7-hero-portrait img", { scale: 1.16, filter: "brightness(0.34) contrast(1.16) saturate(0.68) blur(5px)" }, { scale: 1.025, filter: "brightness(1) contrast(1) saturate(1) blur(0px)", duration: 1.42 }, 0)
          .to(".v7-hero-curtain span:first-child", { yPercent: -100, duration: 1.12 }, 0.12)
          .to(".v7-hero-curtain span:last-child", { yPercent: 100, duration: 1.12 }, 0.12)
          .fromTo(".v7-hero-scan", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.72 }, 0.14)
          .to(".v7-hero-scan", { scaleX: 0.1, opacity: 0, duration: 0.62, ease: "power3.inOut" }, 0.86)
          .to(".v7-hero-name--back .v7-hero-char", { yPercent: 0, rotate: 0, duration: 0.88, stagger: { each: 0.035, from: "center" } }, 0.56)
          .to(".v7-hero-name--front", { opacity: 1, duration: 0.5 }, 1.12)
          .to(".v7-hero-name--back", { opacity: 0, duration: 0.5 }, 1.12)
          .fromTo(".v7-hero-role", { clipPath: "inset(0 100% 0 0)", opacity: 0 }, { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.7 }, 1.1)
          .fromTo(".v7-logo", { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1, duration: 0.58 }, 1.18)
          .fromTo(".v7-hero-nav nav a, .v7-menu-button", { opacity: 0, y: -9 }, { opacity: 1, y: 0, duration: 0.46, stagger: 0.05 }, 1.2)
          .fromTo(".v7-enter", { opacity: 0, clipPath: "inset(0 100% 0 0)" }, { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.64 }, 1.28);

        gsap.to(".v7-hero-portrait", {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: ".v7-hero", start: "top top", end: "bottom top", scrub: 0.8 },
        });
        gsap.to(".v7-hero-portrait--foreground", {
          scale: 0.985,
          ease: "none",
          scrollTrigger: { trigger: ".v7-hero", start: "top top", end: "bottom top", scrub: 0.8 },
        });
        gsap.to(".v7-hero-title-wrap, .v7-hero-depth-wrap", {
          yPercent: -22,
          opacity: 0.12,
          ease: "none",
          scrollTrigger: { trigger: ".v7-hero", start: "top top", end: "82% top", scrub: 0.8 },
        });
      });

      desktopMotion.add("(max-width: 699px)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .set(".v7-hero-scan", { opacity: 0 })
          .set(".v7-hero-curtain span", { yPercent: 0 })
          .set(".v7-hero-name--front", { opacity: 0 })
          .set(".v7-hero-name--back .v7-hero-char", { yPercent: 82, rotate: 1 })
          .fromTo(".v7-hero-portrait", { clipPath: "inset(28% 12% 22% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.92 })
          .fromTo(".v7-hero-portrait img", { scale: 1.08, filter: "brightness(0.52) contrast(1.1) saturate(0.78) blur(3px)" }, { scale: 1, filter: "brightness(1) contrast(1) saturate(1) blur(0px)", duration: 0.96 }, 0)
          .to(".v7-hero-curtain span:first-child", { yPercent: -100, duration: 0.72 }, 0.04)
          .to(".v7-hero-curtain span:last-child", { yPercent: 100, duration: 0.72 }, 0.04)
          .to(".v7-hero-name--back .v7-hero-char", { yPercent: 0, rotate: 0, duration: 0.64, stagger: { each: 0.025, from: "center" } }, 0.28)
          .to(".v7-hero-name--front", { opacity: 1, duration: 0.34 }, 0.7)
          .to(".v7-hero-name--back", { opacity: 0, duration: 0.34 }, 0.7)
          .fromTo(".v7-hero-role", { clipPath: "inset(0 100% 0 0)", opacity: 0 }, { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.48 }, 0.62)
          .fromTo(".v7-logo, .v7-menu-button", { opacity: 0, y: -7 }, { opacity: 1, y: 0, duration: 0.38, stagger: 0.06 }, 0.68)
          .fromTo(".v7-enter", { opacity: 0, clipPath: "inset(0 100% 0 0)" }, { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.46 }, 0.76);

        gsap.to(".v7-hero-portrait", {
          yPercent: 2,
          ease: "none",
          scrollTrigger: { trigger: ".v7-hero", start: "top top", end: "bottom top", scrub: 0.5 },
        });
        gsap.to(".v7-hero-title-wrap, .v7-hero-depth-wrap", {
          yPercent: -10,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: { trigger: ".v7-hero", start: "top top", end: "78% top", scrub: 0.5 },
        });
      });

      const prepareHighlightMetrics = () => {
        const metrics = gsap.utils.toArray<HTMLElement>(".v7-highlight strong");
        metrics.forEach((metric) => {
          const finalValue = metric.dataset.value ?? metric.textContent ?? "0";
          metric.textContent = finalValue.endsWith("+") ? "0+" : "0";
        });
        return metrics;
      };

      const addHighlightCounters = (timeline: gsap.core.Timeline, metrics: HTMLElement[], startAt: number) => {
        metrics.forEach((metric, index) => {
          const finalValue = metric.dataset.value ?? metric.textContent ?? "0";
          const target = Number.parseInt(finalValue, 10);
          const suffix = finalValue.endsWith("+") ? "+" : "";
          const counter = { value: 0 };
          timeline.to(
            counter,
            {
              value: target,
              duration: 1.05,
              ease: "power3.out",
              onUpdate: () => { metric.textContent = `${Math.round(counter.value)}${suffix}`; },
              onComplete: () => { metric.textContent = finalValue; },
            },
            startAt + index * 0.1,
          );
        });
      };

      desktopMotion.add("(min-width: 700px)", () => {
        const highlightMetrics = prepareHighlightMetrics();
        const highlightsTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: ".v7-highlights",
            start: "top 76%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
        highlightsTimeline
          .fromTo(
            ".v7-highlights-top p",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.72, stagger: 0.12 },
          )
          .fromTo(
            ".v7-highlights-char",
            { yPercent: 115, rotate: 2 },
            { yPercent: 0, rotate: 0, duration: 1.08, stagger: { each: 0.018, from: "start" } },
            0.08,
          )
          .fromTo(
            ".v7-highlight strong",
            { opacity: 0, y: 38 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.11 },
            0.52,
          )
          .fromTo(
            ".v7-highlight span",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.68, stagger: 0.1 },
            0.72,
          )
          .fromTo(".v7-brand-count", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.68 }, 0.88)
          .fromTo(".v7-brand-rail", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.08 }, 0.96);
        addHighlightCounters(highlightsTimeline, highlightMetrics, 0.48);
      });

      desktopMotion.add("(max-width: 699px)", () => {
        const highlightMetrics = prepareHighlightMetrics();
        const highlightsTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: ".v7-highlights",
            start: "top 82%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
        highlightsTimeline
          .fromTo(
            ".v7-highlights-top p",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.58, stagger: 0.09 },
          )
          .fromTo(
            ".v7-highlights-word",
            { opacity: 0.16, yPercent: 34, clipPath: "inset(0 0 100% 0)" },
            { opacity: 1, yPercent: 0, clipPath: "inset(0 0 0% 0)", duration: 0.74, stagger: 0.055 },
            0.08,
          )
          .fromTo(
            ".v7-highlight strong",
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.72, stagger: 0.09 },
            0.42,
          )
          .fromTo(
            ".v7-highlight span",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.54, stagger: 0.08 },
            0.58,
          )
          .fromTo(".v7-brand-count", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.54 }, 0.78)
          .fromTo(".v7-brand-rail", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.82 }, 0.86);
        addHighlightCounters(highlightsTimeline, highlightMetrics, 0.42);
      });

      desktopMotion.add("(min-width: 700px)", () => {
        const expertiseTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: ".v7-expertise",
            start: "top 72%",
            once: true,
            invalidateOnRefresh: true,
            onEnter: () => setExpertiseEntered(true),
          },
        });
        expertiseTimeline
          .fromTo(".v7-expertise-kicker > p", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.78 })
          .fromTo(".v7-expertise-kicker > div", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
          .fromTo(".v7-expertise-word", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.35 }, 0.14);
      });

      desktopMotion.add("(max-width: 699px)", () => {
        const expertiseTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: ".v7-expertise",
            start: "top 84%",
            once: true,
            invalidateOnRefresh: true,
            onEnter: () => setExpertiseEntered(true),
          },
        });
        expertiseTimeline
          .fromTo(".v7-expertise-kicker > p", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.58 })
          .fromTo(".v7-expertise-kicker > div", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.52 }, 0.08)
          .fromTo(
            ".v7-expertise-word",
            { opacity: 0.18, clipPath: "inset(0 0 100% 0)" },
            { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.92 },
            0.12,
          );
      });

      desktopMotion.add("(min-width: 700px)", () => {
        const careerIntroTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v7-career", start: "top 68%", once: true, invalidateOnRefresh: true },
        });
        careerIntroTimeline
          .fromTo(".v7-career-intro > div > p", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.68 })
          .fromTo(
            ".v7-career-title-line > span",
            { opacity: 0, yPercent: 45, rotate: 1.5 },
            { opacity: 1, yPercent: 0, rotate: 0, duration: 1.08, stagger: 0.12 },
            0.08,
          )
          .fromTo(".v7-career-intro > p", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.82 }, 0.28);

        const careerStageTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v7-career-stage", start: "top 82%", once: true, invalidateOnRefresh: true },
        });
        careerStageTimeline
          .fromTo(".v7-career-stage > strong > span", { opacity: 0, y: 52 }, { opacity: 1, y: 0, duration: 0.92 })
          .fromTo(".v7-career-divider", { scaleY: 0 }, { scaleY: 1, duration: 0.88 }, 0.08)
          .fromTo(".v7-career-stage > article", { opacity: 0, x: 34 }, { opacity: 1, x: 0, duration: 0.92 }, 0.18)
          .fromTo(".v7-career-stage > nav button", { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.64, stagger: 0.09 }, 0.34);
        careerStageTimeline.eventCallback("onComplete", () => { careerHasEnteredRef.current = true; });
      });

      desktopMotion.add("(max-width: 699px)", () => {
        const careerIntroTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v7-career", start: "top 82%", once: true, invalidateOnRefresh: true },
        });
        careerIntroTimeline
          .fromTo(".v7-career-intro > div > p", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.54 })
          .fromTo(
            ".v7-career-title-line > span",
            { opacity: 0.12, yPercent: 62 },
            { opacity: 1, yPercent: 0, duration: 0.82, stagger: 0.09 },
            0.06,
          )
          .fromTo(".v7-career-intro > p", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.66 }, 0.22);

        const careerStageTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v7-career-stage", start: "top 88%", once: true, invalidateOnRefresh: true },
        });
        careerStageTimeline
          .fromTo(".v7-career-stage > strong > span", { opacity: 0.16, y: 30 }, { opacity: 1, y: 0, duration: 0.72 })
          .fromTo(".v7-career-divider", { scaleY: 0 }, { scaleY: 1, duration: 0.72 }, 0.06)
          .fromTo(
            ".v7-career-stage > article",
            { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" },
            { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.76 },
            0.12,
          )
          .fromTo(".v7-career-stage > nav button", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.28);
        careerStageTimeline.eventCallback("onComplete", () => { careerHasEnteredRef.current = true; });
      });

      desktopMotion.add("(min-width: 700px)", () => {
        const selectedIntroTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v7-selected-work__intro", start: "top 72%", once: true, invalidateOnRefresh: true },
        });
        selectedIntroTimeline
          .fromTo(".v7-selected-work__intro > div:first-child > p", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.68 })
          .fromTo(".v7-selected-work__intro h2", { opacity: 0, y: 54 }, { opacity: 1, y: 0, duration: 1.02 }, 0.08)
          .fromTo(".v7-selected-work__intro > div:last-child", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.86 }, 0.28);

        gsap.fromTo(
          ".v7-work-card",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.82,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: { trigger: ".v7-selected-work__motion", start: "top 84%", once: true, invalidateOnRefresh: true },
          },
        );
      });

      desktopMotion.add("(max-width: 699px)", () => {
        const selectedIntroTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v7-selected-work__intro", start: "top 82%", once: true, invalidateOnRefresh: true },
        });
        selectedIntroTimeline
          .fromTo(".v7-selected-work__intro > div:first-child > p", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.52 })
          .fromTo(
            ".v7-selected-work__intro h2",
            { opacity: 0.12, y: 32, clipPath: "inset(0 0 28% 0)" },
            { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.8 },
            0.06,
          )
          .fromTo(".v7-selected-work__intro > div:last-child", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.66 }, 0.2);

        gsap.fromTo(
          ".v7-work-card",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.66,
            stagger: 0.07,
            ease: "power4.out",
            scrollTrigger: { trigger: ".v7-selected-work__motion", start: "top 88%", once: true, invalidateOnRefresh: true },
          },
        );
      });

      desktopMotion.add("(min-width: 901px)", () => {
        ScrollTrigger.create({
          trigger: ".v7-selected-work__motion",
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(selectedWork.length - 1, Math.floor(self.progress * selectedWork.length));
            if (next !== activeWorkRef.current) {
              activeWorkRef.current = next;
              setActiveWork(next);
            }
          },
        });
      });

      desktopMotion.add("(min-width: 700px)", () => {
        const recognitionTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v7-recognition", start: "top 70%", once: true, invalidateOnRefresh: true },
        });
        recognitionTimeline
          .fromTo(".v7-recognition-image", { clipPath: "inset(0 0 100% 0)", scale: 1.035 }, { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.12 })
          .fromTo(".v7-recognition-copy > header > *", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.78, stagger: 0.1 }, 0.16)
          .fromTo(".v7-recognition-copy article", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.72, stagger: 0.09 }, 0.34)
          .fromTo(".v7-recognition-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.78, stagger: 0.08 }, 0.38);
      });

      desktopMotion.add("(max-width: 699px)", () => {
        const recognitionTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v7-recognition", start: "top 84%", once: true, invalidateOnRefresh: true },
        });
        recognitionTimeline
          .fromTo(
            ".v7-recognition-image",
            { clipPath: "inset(12% 0 18% 0)", scale: 1.045 },
            { clipPath: "inset(0% 0 0% 0)", scale: 1, duration: 0.88 },
          )
          .fromTo(".v7-recognition-copy > header > *", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.64, stagger: 0.08 }, 0.16)
          .fromTo(".v7-recognition-copy article", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0.3)
          .fromTo(".v7-recognition-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.64, stagger: 0.06 }, 0.34);
      });

      desktopMotion.add("(min-width: 700px)", () => {
        const peopleTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v7-people", start: "top 70%", once: true, invalidateOnRefresh: true },
        });
        peopleTimeline
          .fromTo(".v7-people > header > div:first-child > *", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.84, stagger: 0.1 })
          .fromTo(".v7-people > header > div:last-child", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.78 }, 0.16)
          .fromTo(".v7-people-stage > img", { opacity: 0, clipPath: "inset(12% 10% 0 10%)", scale: 1.04 }, { opacity: 1, clipPath: "inset(0% 0% 0 0%)", scale: 1, duration: 1.12 }, 0.28)
          .fromTo(".v7-quote", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.72, stagger: 0.08 }, 0.48);
      });

      desktopMotion.add("(max-width: 699px)", () => {
        const peopleTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v7-people", start: "top 84%", once: true, invalidateOnRefresh: true },
        });
        peopleTimeline
          .fromTo(".v7-people > header > div:first-child > *", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.64, stagger: 0.08 })
          .fromTo(".v7-people > header > div:last-child", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.14)
          .fromTo(
            ".v7-people-stage > img",
            { opacity: 0.2, clipPath: "inset(10% 0 16% 0)", scale: 1.035 },
            { opacity: 1, clipPath: "inset(0% 0% 0% 0)", scale: 1, duration: 0.86 },
            0.24,
          )
          .fromTo(".v7-quote", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.58, stagger: 0.06 }, 0.4);
      });

      desktopMotion.add("(min-width: 700px)", () => {
        const faqTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v9-faq", start: "top 72%", once: true, invalidateOnRefresh: true },
        });
        faqTimeline
          .fromTo(".v9-faq__intro > div:first-child > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.78, stagger: 0.09 })
          .fromTo(".v9-faq__contact", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.72 }, 0.28)
          .fromTo(".v9-faq__list > article", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.68, stagger: 0.08 }, 0.16);
      });

      desktopMotion.add("(max-width: 699px)", () => {
        const faqTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v9-faq", start: "top 84%", once: true, invalidateOnRefresh: true },
        });
        faqTimeline
          .fromTo(".v9-faq__intro > div:first-child > *", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.62, stagger: 0.07 })
          .fromTo(".v9-faq__list > article", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.54, stagger: 0.055 }, 0.2);
      });

      desktopMotion.add("(min-width: 700px)", () => {
        const beyondTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v9-beyond", start: "top 72%", once: true, invalidateOnRefresh: true },
        });
        beyondTimeline
          .fromTo(".v9-beyond__head > *", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.86, stagger: 0.1 })
          .fromTo(".v9-beyond__grid > article", { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.82, stagger: 0.08 }, 0.32);
      });

      desktopMotion.add("(max-width: 699px)", () => {
        const beyondTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v9-beyond", start: "top 84%", once: true, invalidateOnRefresh: true },
        });
        beyondTimeline
          .fromTo(".v9-beyond__head > *", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.64, stagger: 0.08 })
          .fromTo(
            ".v9-beyond__image",
            { clipPath: "inset(14% 0 22% 0)", scale: 1.025 },
            { clipPath: "inset(0% 0 0% 0)", scale: 1, duration: 0.72, stagger: 0.06 },
            0.24,
          )
          .fromTo(".v9-beyond__grid h3", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.46, stagger: 0.05 }, 0.38);
      });

      desktopMotion.add("(min-width: 700px)", () => {
        gsap.fromTo(
          ".v7-contact > h2, .v7-contact > a, .v7-contact > div",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.94,
            stagger: 0.14,
            ease: "power4.out",
            scrollTrigger: { trigger: ".v7-contact", start: "top 72%", once: true },
          },
        );
      });

      desktopMotion.add("(max-width: 699px)", () => {
        const contactTimeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: ".v7-contact", start: "top 84%", once: true, invalidateOnRefresh: true },
        });
        contactTimeline
          .fromTo(
            ".v7-contact > h2",
            { clipPath: "inset(0 0 100% 0)", y: 18 },
            { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.72 },
          )
          .fromTo(
            ".v7-contact > a",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.56 },
            0.24,
          )
          .fromTo(
            ".v7-contact > div > span",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.44, stagger: 0.06 },
            0.38,
          );
      });

    }, root);

    return () => {
      desktopMotion.revert();
      context.revert();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", menuOpen);
    const root = rootRef.current;
    if (!menuOpen || !root) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const menuButton = menuButtonRef.current;
    root.inert = true;
    const focusable = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]') ?? []);
    const frame = window.requestAnimationFrame(() => focusable()[0]?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      root.inert = false;
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
      (previouslyFocused ?? menuButton)?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const updatePortrait = (event: PointerEvent<HTMLElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    root.style.setProperty("--v7-px", `${(x * 7).toFixed(2)}px`);
    root.style.setProperty("--v7-py", `${(y * 5).toFixed(2)}px`);
  };

  const resetPortrait = () => {
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--v7-px", "0px");
    root.style.setProperty("--v7-py", "0px");
  };

  return (
    <main className="v9 v7" id="main-content" ref={rootRef}>
      <section className="v7-hero" aria-labelledby="portfolio-title" onPointerMove={updatePortrait} onPointerLeave={resetPortrait}>
        <div className="v7-hero-curtain" aria-hidden="true"><span /><span /></div>
        <i className="v7-hero-scan" aria-hidden="true" />
        <header className="v7-hero-nav">
          <a className="v7-logo" href="#main-content" aria-label="María Mora home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("Logo-transparent.png")} alt="" width="1254" height="1254" />
          </a>
          <nav aria-label="Primary navigation">
            <a href="#portfolio-work">Selected work</a>
            <a href="#portfolio-about">About</a>
            <a href="#portfolio-playground">Playground</a>
            <a href="#portfolio-contact">Contact</a>
          </nav>
          <button ref={menuButtonRef} className={`v7-menu-button${menuOpen ? " is-open" : ""}`} type="button" aria-expanded={menuOpen} aria-controls="v7-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
            <span /><span /><span />
          </button>
        </header>

        <div className="v7-hero-portrait v7-hero-portrait--base">
          <picture>
            <source media="(min-width: 700px)" srcSet={asset("LA3A7408-horizontal-hero.png")} />
            <source
              media="(max-width: 699px)"
              type="image/avif"
              srcSet={`${asset("LA3A7408-portrait-768.avif")} 768w, ${asset("LA3A7408-portrait-1536.avif")} 1536w`}
              sizes="100vw"
            />
            <source
              media="(max-width: 699px)"
              type="image/webp"
              srcSet={`${asset("LA3A7408-portrait-768.webp")} 768w, ${asset("LA3A7408-portrait-1536.webp")} 1536w`}
              sizes="100vw"
            />
            <img src={asset("LA3A7408-portrait-mobile.jpg")} alt="Portrait of María Mora" width="1228" height="1536" fetchPriority="high" />
          </picture>
        </div>
        <div className="v7-hero-depth-wrap" aria-hidden="true"><HeroName layer="back" /></div>
        <div className="v7-hero-portrait v7-hero-portrait--foreground" aria-hidden="true">
          <picture>
            <source media="(min-width: 700px)" srcSet={asset("LA3A7408-horizontal-hero.png")} />
            <source
              media="(max-width: 699px)"
              type="image/avif"
              srcSet={`${asset("LA3A7408-portrait-768.avif")} 768w, ${asset("LA3A7408-portrait-1536.avif")} 1536w`}
              sizes="100vw"
            />
            <source
              media="(max-width: 699px)"
              type="image/webp"
              srcSet={`${asset("LA3A7408-portrait-768.webp")} 768w, ${asset("LA3A7408-portrait-1536.webp")} 1536w`}
              sizes="100vw"
            />
            <img src={asset("LA3A7408-portrait-mobile.jpg")} alt="" width="1228" height="1536" />
          </picture>
        </div>
        <div className="v7-hero-title-wrap">
          <h1 className="sr-only" id="portfolio-title">María Mora</h1>
          <HeroName layer="front" />
          <p className="v7-hero-role">Lead Product Designer</p>
        </div>
        <a className="v7-enter" href="#portfolio-work"><span>Enter portfolio</span><i /><V7Arrow /></a>
      </section>

      {mounted ? createPortal(
        <div ref={menuRef} className={`v7-menu${menuOpen ? " is-open" : ""}`} id="v7-menu" role="dialog" aria-modal="true" aria-label="Portfolio navigation" aria-hidden={!menuOpen}>
          <button className="v7-menu-close" type="button" aria-label="Close menu" onClick={closeMenu}><span /><span /></button>
          <nav aria-label="Expanded navigation">
            <a href="#portfolio-work" onClick={closeMenu}><span>01</span>Selected work</a>
            <a href="#portfolio-about" onClick={closeMenu}><span>02</span>About</a>
            <a href="#portfolio-playground" onClick={closeMenu}><span>03</span>Playground</a>
            <a href="#portfolio-contact" onClick={closeMenu}><span>04</span>Contact</a>
          </nav>
          <p>Lead Product Designer · iGaming</p>
        </div>,
        document.body,
      ) : null}

      <section className="v7-highlights" id="portfolio-highlights" aria-labelledby="impact-title">
        <div className="v7-highlights-top">
          <p className="v7-highlights-label">Highlights</p>
          <p>A snapshot of experience,<br />leadership and impact in iGaming.</p>
        </div>
        <h2 className="v7-highlights-copy" id="impact-title" aria-label="+10 years of experience in the iGaming industry.">
          <HighlightsLine>+10 years of experience</HighlightsLine>
          <HighlightsLine>in the iGaming industry.</HighlightsLine>
        </h2>
        <div className="v7-highlights-list">
          {highlights.map(([value, label]) => (
            <article className="v7-highlight" key={label}><strong data-value={value}>{value}</strong><span>{label}</span></article>
          ))}
        </div>
        <p className="v7-brand-count">+35 additional operator brands</p>
        <div className="v7-brand-rail" aria-label="Selected operator brands">
          <div>
            {[...brandNames, ...brandNames].map((brand, index) => <span className={`v7-brand v7-brand--${index % brandNames.length}`} key={`${brand}-${index}`}>{brand}</span>)}
          </div>
        </div>
      </section>

      <section className="v7-expertise" id="portfolio-expertise" aria-labelledby="expertise-title">
        <h2 className="sr-only" id="expertise-title">Expertise in product platforms</h2>
        <div className="v7-expertise-statement">
          <div className="v7-expertise-kicker">
            <p>Expertise in</p>
            <div>
              <span>{String(activeExpertise + 1).padStart(2, "0")} / {String(expertise.length).padStart(2, "0")}</span>
              <button type="button" aria-pressed={expertisePaused} onClick={() => setExpertisePaused((paused) => !paused)}>{expertisePaused ? "Play motion" : "Pause motion"}</button>
            </div>
          </div>
          <div className="v7-expertise-word" aria-live="polite">
            <h3 ref={expertiseWordRef} key={`${expertise[activeExpertise].lead}-${expertise[activeExpertise].emphasis}`}>
              <span className="v7-expertise-part"><span>{expertise[activeExpertise].lead}&nbsp;</span></span>
              <span className="v7-expertise-part"><em>{expertise[activeExpertise].emphasis}.</em></span>
            </h3>
          </div>
          <ul className="sr-only">{expertise.map((item) => <li key={`${item.lead}-${item.emphasis}`}>{item.lead} {item.emphasis}</li>)}</ul>
        </div>
      </section>

      <section className="v7-career" id="portfolio-about" aria-labelledby="career-title">
        <div className="v7-career-inner">
          <header className="v7-career-intro">
            <div>
              <p className="v7-career-label">Career Journey</p>
              <h2 id="career-title" aria-label="A journey of growth.">
                <CareerTitleLine>A journey</CareerTitleLine>
                <CareerTitleLine>of <em>growth.</em></CareerTitleLine>
              </h2>
            </div>
            <p>I’ve never been afraid to start again. I moved from graphic design to product design, and from designing products to leading the people and strategy behind them. Every career move started with one decision: stepping into the unknown. The next challenge is already underway.</p>
          </header>
          <div className="v7-career-stage">
            <strong aria-hidden="true"><span ref={careerNumberRef}>{career[activeCareer].number}</span><i className="v7-career-divider" /></strong>
            <article ref={careerArticleRef} key={career[activeCareer].number} aria-live="polite">
              <h3>{career[activeCareer].role}</h3>
              <p>{career[activeCareer].body}</p>
            </article>
            <nav aria-label="Career stages">
              {career.map((stage, index) => (
                <button
                  className={activeCareer === index ? "is-active" : ""}
                  type="button"
                  aria-label={`Show ${stage.role}`}
                  aria-current={activeCareer === index ? "step" : undefined}
                  onClick={() => setActiveCareer(index)}
                  onMouseEnter={() => setActiveCareer(index)}
                  onFocus={() => setActiveCareer(index)}
                  key={stage.number}
                >
                  <span>{stage.number}</span><i aria-hidden="true" />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="v7-selected-work" id="portfolio-work" aria-labelledby="work-title">
        <header className="v7-selected-work__intro">
          <div>
            <p>Selected Work</p>
            <h2 id="work-title">Three products.<br /><em>One connected system.</em></h2>
          </div>
          <div>
            <p>Three examples of how these disciplines<br />come together in real products.</p>
            <span>Design Systems · Product Strategy · Design Leadership</span>
          </div>
        </header>
        <div className="v7-selected-work__motion">
          <div className="v7-selected-work__stack" aria-label="Selected product work">
            {selectedWork.map((project, index) => {
              const active = activeWork === index;
              const panelId = `selected-work-${project.slug}`;
              const triggerContent = (
                <>
                  <span>{project.number}</span>
                  <strong>{project.name}</strong>
                  <small>{project.discipline}</small>
                  <i aria-hidden="true"><V7Arrow direction="diagonal" /></i>
                </>
              );
              return (
                <article className={`v7-work-card${active ? " is-active" : ""}`} key={project.slug}>
                  {project.href ? (
                    <Link className="v7-work-card__trigger" href={project.href}>{triggerContent}</Link>
                  ) : (
                    <button
                      className="v7-work-card__trigger"
                      type="button"
                      aria-expanded={active}
                      aria-controls={panelId}
                      onClick={(event) => {
                        const card = event.currentTarget.closest<HTMLElement>(".v7-work-card");
                        setActiveWork(index);
                        if (window.matchMedia("(max-width: 699px)").matches && card) {
                          if (workAlignTimerRef.current !== null) window.clearTimeout(workAlignTimerRef.current);
                          workAlignTimerRef.current = window.setTimeout(() => {
                            window.scrollTo({
                              top: window.scrollY + card.getBoundingClientRect().top - 16,
                              behavior: "smooth",
                            });
                            workAlignTimerRef.current = null;
                          }, 720);
                        }
                      }}
                      onFocus={() => {
                        if (!window.matchMedia("(max-width: 699px)").matches) setActiveWork(index);
                      }}
                    >
                      {triggerContent}
                    </button>
                  )}
                  <div className="v7-work-card__body" id={panelId} aria-hidden={!active}>
                    <div className="v7-work-card__body-inner">
                      <div>
                        <p>{project.title}</p>
                        <span>{project.description}</span>
                      </div>
                      <dl>
                        <div><dt>Role</dt><dd>{project.role}</dd></div>
                        <div><dt>Scope</dt><dd>{project.scope}</dd></div>
                      </dl>
                      {project.href ? (
                        <Link href={project.href} tabIndex={active ? 0 : -1}>View case study <V7Arrow direction="diagonal" /></Link>
                      ) : (
                        <span className="v7-work-card__status">Case study coming next</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">Selected project: {selectedWork[activeWork].name}</p>
      </section>

      <section className="v7-recognition" id="portfolio-recognition" aria-labelledby="recognition-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="v7-recognition-image" src={asset("Trophy.jpg")} alt="A hand holding an iGaming Idol award" width="540" height="835" loading="lazy" />
        <div className="v7-recognition-copy">
          <header><h2 id="recognition-title">Recognition</h2><p>International recognition<br />for design excellence and innovation.</p></header>
          <div>
            {awards.map((award, index) => (
              <article key={`${award.year}-${award.place}-${index}`}>
                <p><strong>{award.year}</strong><span>{award.place}</span></p>
                <p><strong>{award.result}</strong><span>{award.description}</span></p>
                <p>{award.mark.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
                <i className="v7-recognition-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v7-people" id="portfolio-people" aria-labelledby="people-title">
        <header>
          <div><p>People</p><h2 id="people-title">What<br />people say</h2></div>
          <div>
            <p>Selected highlights from designers,<br />product and engineering leaders<br />I’ve worked with.</p>
            <a href="mailto:hello@mariamora.design?subject=Full%20recommendations">View all recommendations <V7Arrow direction="diagonal" /></a>
          </div>
        </header>
        <div className="v7-people-stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("Photo2.png")} alt="Portrait of María Mora" loading="lazy" sizes="(max-width: 900px) 100vw, 46vw" />
          <div className="v7-quotes">
            {recommendations.map((item, index) => (
              <blockquote className={`v7-quote v7-quote--${index + 1}`} key={item.name}>
                <p>“ {item.quote} ”</p>
                <footer><strong>{item.name}</strong><span>{item.role}</span></footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="v9-faq" id="portfolio-faq" aria-labelledby="faq-title">
        <div className="v9-faq__shell">
          <aside className="v9-faq__intro v9-reveal">
            <div>
              <p className="v9-faq__kicker">FAQ</p>
              <h2 id="faq-title">Questions<br />I get asked.</h2>
              <div className="v9-faq__context">
                <i aria-hidden="true" />
                <p>Over the years I’ve been asked many questions about my work, my approach and my experience. Here are some of the ones that come up most often.</p>
              </div>
            </div>
            <div className="v9-faq__contact">
              <span aria-hidden="true">“</span>
              <div><p>More questions?<br />Let’s talk.</p><a href="mailto:hello@mariamora.design">Get in touch <V7Arrow direction="diagonal" /></a></div>
            </div>
          </aside>

          <div className="v9-faq__list v9-reveal">
            {faqItems.map((item, index) => {
              const open = activeFaq === index;
              const panelId = `faq-panel-${index + 1}`;
              const triggerId = `faq-trigger-${index + 1}`;
              return (
                <article className={open ? "is-open" : ""} key={item.question}>
                  <button
                    id={triggerId}
                    type="button"
                    onClick={() => setActiveFaq(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span className="v9-faq__number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="v9-faq__question">{item.question}</span>
                    <span className="v9-faq__duration">{item.duration}</span>
                    <span className="v9-faq__toggle" aria-hidden="true"><i /><i /></span>
                  </button>
                  <div className="v9-faq__answer" id={panelId} role="region" aria-labelledby={triggerId} aria-hidden={!open}>
                    <div className="v9-faq__answer-inner">
                      <div className="v9-faq__media">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={asset("Photo2.png")} alt="María Mora, preview for the video answer" loading="lazy" />
                        <div><span>Video answer {String(index + 1).padStart(2, "0")}</span><span>Recording pending · {item.duration}</span></div>
                      </div>
                      <p className="v9-faq__transcript sr-only">“{item.answer}”</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="v9-beyond" id="portfolio-playground" aria-labelledby="beyond-title">
        <header className="v9-beyond__head v9-reveal">
          <p>Beyond design</p>
          <h2 id="beyond-title"><span>There’s more</span><span>to <em>life</em> than pixels.</span></h2>
          <p>The things that inspire me, keep me grounded<br />and make life beautiful.</p>
        </header>
        <div className="v9-beyond__grid v9-reveal">
          {beyondDesign.map((item, index) => (
            <article key={item.title}>
              <div className={`v9-beyond__image v9-beyond__image--${index + 1}`} role="img" aria-label={item.alt} />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <footer className="v7-contact" id="portfolio-contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Let’s make something<br /><em>exceptional.</em></h2>
        <a href="mailto:hello@mariamora.design"><span>hello@mariamora.design</span><V7Arrow direction="diagonal" /></a>
        <div><span>María Mora · Lead Product Designer</span><span>Madrid · Worldwide</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
