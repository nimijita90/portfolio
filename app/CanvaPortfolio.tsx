"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { awards, expertise, faqItems, highlights, operators, recommendations } from "./content";

const nav = [["Work", "work"], ["About", "about"], ["Contact", "contact"]] as const;

function Arrow({ direction = "right" }: { direction?: "right" | "down" | "up" | "left" }) {
  return <svg className={`c-arrow c-arrow--${direction}`} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h17M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.25" /></svg>;
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="c-caption" data-reveal>{children}</p>;
}

function Heading({ children, id, className = "" }: { children: ReactNode; id: string; className?: string }) {
  return <h2 id={id} className={`c-heading ${className}`} data-reveal>{children}</h2>;
}

// Display only the photographic area of the supplied Canva sheet. Text, links and
// controls are real HTML, not a flattened screenshot of the interface.
function ReferenceImage({ sheet, x, y, width, height, alt, sourceWidth = 1536, sourceHeight = 1024, className = "" }: {
  sheet: string; x: number; y: number; width: number; height: number; alt: string;
  sourceWidth?: number; sourceHeight?: number; className?: string;
}) {
  const style = {
    aspectRatio: `${width} / ${height}`,
    "--crop-width": `${sourceWidth / width * 100}%`,
    "--crop-left": `${-x / width * 100}%`,
    "--crop-top": `${-y / height * 100}%`,
  } as CSSProperties;
  return <div className={`c-crop ${className}`} style={style}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`/portfolio/canva/${sheet}.jpg`} width={sourceWidth} height={sourceHeight} alt={alt} loading="lazy" decoding="async" />
  </div>;
}

const stages = [
  { role: "Graphic Design", date: "2009 — 2014", company: "Gaming Innovation Group", title: "Building a strong visual foundation.", body: "I started in brand and visual design, creating identities, campaigns and digital experiences across multiple channels." },
  { role: "Product Design", date: "2020 — 2024", company: "Gaming Innovation Group", title: "A new discipline. A bigger challenge.", body: "I moved from graphic design to product design, connecting user needs, business goals and the experience we wanted to create." },
  { role: "Design Leadership", date: "2024 — 2026", company: "Gaming Innovation Group", title: "From creating the work to shaping the direction.", body: "I moved from designing products to leading the people and strategy behind them, giving teams clarity, trust and room to do their best work." },
];
const projects = [
  { name: "WAND", x: 30, width: 482, copy: <>Scaling a legacy platform <br />across brands and markets.</>, href: "/work/wand" },
  { name: "XSITE", x: 527, width: 482, copy: <>Reimagining a casino platform <br />from the ground up.</>, href: "/work/xsite", image: "/portfolio/canva/xsite-card.webp" },
  { name: "Demo Casino Customiser", x: 1023, width: 482, copy: <>Turning a complex sales workflow <br />into a live experience.</>, href: "/work/customiser" },
];

// A dedicated, already-cropped photo shown full-bleed via object-fit, as opposed
// to ReferenceImage's extraction of one region from a larger shared Canva sheet.
function Photo({ src, alt, width, height, position = "center", className = "" }: {
  src: string; alt: string; width: number; height: number; position?: string; className?: string;
}) {
  return <div className={`c-crop ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} width={width} height={height} alt={alt} loading="lazy" decoding="async"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: position }} />
  </div>;
}

export default function CanvaPortfolio() {
  const root = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const careerTrigger = useRef<ScrollTrigger | null>(null);
  const careerMove = useRef<((next: number) => void) | null>(null);
  const expertiseTimeline = useRef<gsap.core.Timeline | null>(null);
  const syncExpertise = useRef<(() => void) | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCareer, setActiveCareer] = useState(0);
  const [activeQuote, setActiveQuote] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(1);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let disposed = false;
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    // Always begin at the hero — first visit, reload or returning from a project.
    if (window.location.hash) history.replaceState(history.state, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: "instant" });
    let userScrolled = false;
    const markScrolled = () => { userScrolled = true; };
    window.addEventListener("wheel", markScrolled, { passive: true, once: true });
    window.addEventListener("touchstart", markScrolled, { passive: true, once: true });
    window.addEventListener("keydown", markScrolled, { once: true });
    const observers: IntersectionObserver[] = [];
    const pendingObservations: (() => void)[] = [];
    let layoutReady = false;
    const whenReady = (observe: () => void) => { if (layoutReady) observe(); else pendingObservations.push(observe); };
    let readyFrame = 0;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
        hero.set(".c-hero-picture", { clipPath: "inset(46% 4% 46% 4%)" })
          .set(".c-hero-picture img", { scale: 1.18, filter: "brightness(.48) saturate(.72)" })
          .from(".c-hero", { opacity: 0, duration: 1.4, ease: "power1.out" }, 0)
          .from(".c-nav", { opacity: 0, y: -28, duration: 1.1 }, .3)
          .fromTo(".c-hero-registration", { scaleX: 0, opacity: .82 }, { scaleX: 1, duration: 1.3, transformOrigin: "center", ease: "power2.inOut" }, .2)
          .to(".c-hero-picture", { clipPath: "inset(0% 0% 0% 0%)", duration: 2.3, ease: "power3.inOut" }, .38)
          .to(".c-hero-picture img", { scale: 1, filter: "brightness(1) saturate(1)", duration: 2.6, ease: "power2.out" }, .38)
          .to(".c-hero-registration", { opacity: 0, duration: .85 }, 1.55)
          .from(".c-hero-title span", { yPercent: 118, skewY: 1.2, duration: 1.6, ease: "power3.out" }, 1.4)
          .from(".c-hero-subtitle", { opacity: 0, y: 40, letterSpacing: ".46em", duration: 1.15, ease: "power2.out" }, 2.05);

        // Observe actual layout AFTER the career pin has inserted its spacing.
        // Cached scroll coordinates can otherwise consume lower-page entrances on load.
        const entrances = new Map<Element, gsap.core.Animation>();
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entrances.get(entry.target)?.play();
            observer.unobserve(entry.target);
          });
        }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });
        observers.push(observer);
        const enter = (element: Element, animation: gsap.core.Animation) => {
          entrances.set(element, animation);
          whenReady(() => observer.observe(element));
        };
        // .c-career-controls is excluded: it holds the "scroll to explore" hint, which must
        // be visible as soon as the pinned section is entered, not gated behind a reveal.
        const revealSelectors = ".c-caption, .c-heading, .c-expertise-frame, .c-career-content, .c-quote-controls, .c-recommendations-link, .c-faq header > p, .c-beyond header > p, .c-footer-meta";
        gsap.utils.toArray<HTMLElement>(revealSelectors).forEach((element) => {
          if (element.closest(".c-work")) return;
          const headline = element.classList.contains("c-heading");
          const caption = element.classList.contains("c-caption");
          enter(element, gsap.from(element, { opacity: 0, x: caption ? -36 : 0, y: caption ? 0 : headline ? 78 : 46,
            duration: headline ? 1.3 : 1.05, ...(headline ? { clipPath: "inset(0 0 100% 0)" } : {}),
            paused: true, ease: "power2.out" }));
        });
        const workTimeline = gsap.timeline({
          scrollTrigger: { trigger: ".c-work", start: "clamp(top 76%)", once: true, invalidateOnRefresh: true },
        });
        workTimeline
          .from(".c-work header .c-caption", { opacity: 0, x: -48, duration: .9, ease: "power2.out" })
          .from(".c-work header .c-heading", { opacity: 0, y: 90, clipPath: "inset(0 0 100% 0)", duration: 1.4, ease: "power2.out" }, .12)
          .from(".c-project", { opacity: 0, y: 96, scale: .96, duration: 1.3, stagger: .16, ease: "power3.out" }, .5)
          .from(".c-project-image", { clipPath: "inset(100% 0 0 0)", duration: 1.4, stagger: .16, ease: "power3.inOut" }, .54);
        const metrics = gsap.timeline({ paused: true });
        metrics.from(".c-metrics > div", { opacity: 0, y: 80, scale: .88, duration: 1.25, stagger: .12, ease: "power2.out" });
        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((element, index) => {
          const target = Number(element.dataset.counter);
          const value = { number: 0 };
          metrics.to(value, { number: target, duration: 1.3, ease: "power2.out",
            onStart: () => { element.textContent = "0"; },
            onUpdate: () => { element.textContent = String(Math.round(value.number)); },
            onComplete: () => { element.textContent = String(target); },
          }, .22 + index * .09);
        });
        enter(root.current!.querySelector(".c-metrics")!, metrics);
        // Not an IntersectionObserver entrance: the observer ignores an element whose own
        // clip-path hides it completely, so the strip stayed clipped (invisible) forever.
        // It sits above the Career pin, so a ScrollTrigger position is stable here.
        gsap.from(".c-operators", { clipPath: "inset(0 100% 0 0)", x: -50, duration: 1.4, ease: "power3.inOut", scrollTrigger: { trigger: ".c-operators", start: "top 92%", once: true } });
        // "10+": grows into place and counts up on every viewport (it was a desktop-only scrub
        // that barely read at normal scroll speed, and had no motion at all on mobile).
        const years = root.current!.querySelector<HTMLElement>(".c-years-number")!;
        const yearsValue = { number: 0 };
        const yearsTimeline = gsap.timeline({ paused: true });
        yearsTimeline.from(years, { scale: .3, y: 120, opacity: .35, transformOrigin: "left top", duration: 1.7, ease: "power3.out" })
          .to(yearsValue, { number: 10, duration: 1.6, ease: "power2.out",
            onStart: () => { years.textContent = "0+"; },
            onUpdate: () => { years.textContent = `${Math.round(yearsValue.number)}+`; },
            onComplete: () => { years.textContent = "10+"; },
          }, .1);
        enter(years, yearsTimeline);
        // No entrance reveal here: it's a full-bleed section background now, not a
        // framed photo, and the old clip/scale entrance relied on the same
        // IntersectionObserver reveal that could get stuck unplayed (see the
        // .c-career-controls fix above) — leaving the photo visibly mis-scaled
        // and overflowing the section's edges when it never fired.
        enter(root.current!.querySelector(".c-quotes")!, gsap.from(".c-quotes", { opacity: 0, x: 70, clipPath: "inset(0 0 0 45%)", duration: 1.25, paused: true, ease: "power3.out" }));
        enter(root.current!.querySelector(".c-trophy")!, gsap.from(".c-trophy", { opacity: 0, y: 100, clipPath: "inset(100% 0 0 0)", scale: .96, duration: 1.4, paused: true, ease: "power3.out" }));
        gsap.utils.toArray<HTMLElement>(".c-award-list article").forEach((element, index) => enter(element, gsap.from(element, { opacity: 0, x: 70, duration: 1.1, delay: index * .09, paused: true, ease: "power2.out" })));
        gsap.utils.toArray<HTMLElement>(".c-faq-list > article").forEach((element, index) => enter(element, gsap.from(element, { opacity: 0, x: 54, duration: .95, delay: Math.min(index * .06, .24), paused: true, ease: "power2.out" })));
        const beyondMasks = ["inset(100% 0 0 0)", "inset(0 100% 0 0)", "inset(0 0 100% 0)", "inset(0 0 0 100%)"];
        gsap.utils.toArray<HTMLElement>(".c-beyond-grid > div").forEach((element, index) => enter(element, gsap.from(element, { opacity: 0, clipPath: beyondMasks[index], scale: .95, duration: 1.15, delay: index * .08, paused: true, ease: "power3.out" })));
        const email = root.current!.querySelector(".c-email")!;
        const emailTimeline = gsap.timeline({ paused: true });
        emailTimeline.from(email, { opacity: 0, y: 40, duration: 1, ease: "power2.out" })
          .from(email.querySelectorAll("span, svg"), { opacity: 0, x: -40, duration: .85, stagger: .1, ease: "power2.out" }, .2);
        enter(email, emailTimeline);
        const words = gsap.utils.toArray<HTMLElement>(".c-expertise-word");
        // Normalize the CSS percentage transform before GSAP owns the movement.
        // Otherwise its pixel translation and yPercent can compound.
        gsap.set(words, { y: 0, yPercent: 110, opacity: 0 });
        gsap.set(words[0], { y: 0, yPercent: 0, opacity: 1 });
        const rotation = gsap.timeline({ repeat: -1, paused: true });
        const hold = 2.5;
        const transition = .7;
        words.forEach((word, index) => {
          const next = words[(index + 1) % words.length];
          const at = index * (hold + transition) + hold;
          rotation.fromTo(word, { y: 0, yPercent: 0, opacity: 1 }, { y: 0, yPercent: -100, opacity: 0, duration: .68, ease: "power1.inOut", immediateRender: false }, at)
            .fromTo(next, { y: 0, yPercent: 110, opacity: 0 }, { y: 0, yPercent: 0, opacity: 1, duration: .82, ease: "power2.out", immediateRender: false }, at + .14);
        });
        expertiseTimeline.current = rotation;
        let expertiseVisible = false;
        const sync = () => rotation.paused(!expertiseVisible || pausedRef.current || document.hidden);
        syncExpertise.current = sync;
        const visibility = new IntersectionObserver(([entry]) => { expertiseVisible = entry.isIntersecting; sync(); }, { threshold: .15 });
        observers.push(visibility);
        whenReady(() => visibility.observe(root.current!.querySelector(".c-expertise")!));
        document.addEventListener("visibilitychange", sync);
        return () => { observer.disconnect(); visibility.disconnect(); document.removeEventListener("visibilitychange", sync); rotation.kill(); expertiseTimeline.current = null; syncExpertise.current = null; };
      });
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(".c-hero-picture img", { yPercent: 8, scale: 1.06, ease: "none", scrollTrigger: { trigger: ".c-hero", start: "top top", end: "bottom top", scrub: 1 } });
        gsap.utils.toArray<HTMLElement>(".c-project-image .c-crop").forEach((image) => gsap.fromTo(image, { yPercent: 7 }, { yPercent: -7, ease: "none", scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: 1 } }));
        gsap.to(".c-people-photo img", { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".c-people", start: "top bottom", end: "bottom top", scrub: 1.2 } });
        gsap.to(".c-trophy img", { yPercent: -9, ease: "none", scrollTrigger: { trigger: ".c-awards", start: "top bottom", end: "bottom top", scrub: 1.2 } });
        // Career Journey is step-locked, not continuously scrubbed: one wheel/trackpad
        // gesture advances exactly one stage, the section ignores every further scroll
        // command until that transition finishes, and only then does it accept the next
        // one. This is what makes it immune to fast or "bursty" trackpad input — a whole
        // inertial swipe collapses into a single step instead of racing through several.
        let visibleCareer = 0;
        let locked = false;
        const careerCards = gsap.utils.toArray<HTMLElement>(".c-career-stage");
        let careerTween: gsap.core.Timeline | null = null;
        const moveCareer = (next: number, onSettled?: () => void) => {
          if (next === visibleCareer) { onSettled?.(); return; }
          const previous = visibleCareer;
          visibleCareer = next;
          setActiveCareer(next);
          careerTween?.kill();
          careerCards.forEach((card, index) => { if (index !== previous && index !== next) gsap.set(card, { autoAlpha: 0, clipPath: "inset(0)" }); });
          // GSAP owns x here: without it, the card that loses .is-active snaps to the CSS
          // resting offset (translateX(80px)) mid-fade, which read as a jolt on every step.
          const direction = next > previous ? 1 : -1;
          careerTween = gsap.timeline({ onComplete: onSettled });
          careerTween.set([careerCards[previous], careerCards[next]], { clipPath: "inset(0)" })
            // Sequenced, not cross-faded: two stages of text overlapping mid-fade read as a smudge.
            // The outgoing stage fades in place (moving it left clipped it against the column edge).
            .fromTo(careerCards[previous], { x: 0 }, { autoAlpha: 0, duration: .3, ease: "power1.in" }, 0)
            .fromTo(careerCards[next], { autoAlpha: 0, x: 36 * direction }, { autoAlpha: 1, x: 0, duration: .9, ease: "power3.out" }, .3);
        };
        // Assigned once below, after the handlers that close over it are declared
        // (they reference it circularly), so it can't be a const at this point.
        // eslint-disable-next-line prefer-const
        let trigger: ScrollTrigger;
        // Inset the first/last checkpoint slightly from the trigger's exact start/end:
        // landing scroll precisely on either boundary reads to ScrollTrigger as having
        // already left the pin, firing onLeave/onLeaveBack and tearing down the wheel
        // listener a step early — stranding stage 3 unable to scroll back up, for one.
        const checkpoint = (index: number) => {
          const span = trigger.end - trigger.start;
          return [trigger.start + span * .02, trigger.start + span * .5, trigger.end - span * .02][index];
        };
        const lockAndMove = (next: number) => {
          if (locked || next === visibleCareer) return;
          locked = true;
          moveCareer(next, () => { trigger.scroll(checkpoint(next)); locked = false; });
        };
        careerMove.current = lockAndMove;
        // One gesture, one step. A trackpad keeps emitting inertial wheel events for a second
        // or more after the finger lifts; those used to arrive after the transition had
        // settled and fire the next step straight away (1 → 2 → 3 in one swipe). A gesture
        // ends after a short silence, or when a fresh swipe clearly out-accelerates the
        // decaying inertia; until then every event is swallowed — including at the first and
        // last stage, so the tail of the swipe that arrived there can't fling the page onward.
        let lastWheelAt = 0;
        let lastWheelSize = 0;
        let lastStepAt = 0;
        let gestureSpent = false;
        // The swipe that scrolled the section into place is spent on arriving: its inertia
        // must not also advance the first step.
        const armFromScroll = () => { lastWheelAt = performance.now(); gestureSpent = true; };
        const handleWheel = (event: WheelEvent) => {
          const now = performance.now();
          const size = Math.abs(event.deltaY);
          const freshSwipe = now - lastWheelAt > 180 || (now - lastStepAt > 900 && size > 14 && size > lastWheelSize * 1.8);
          lastWheelAt = now;
          lastWheelSize = size;
          if (freshSwipe) gestureSpent = false;
          if (!trigger.isActive) return;
          if (locked || gestureSpent) { event.preventDefault(); return; }
          const next = event.deltaY > 0 ? visibleCareer + 1 : event.deltaY < 0 ? visibleCareer - 1 : visibleCareer;
          if (next < 0 || next > 2) return; // past the first/last stage on a new gesture: let the page scroll on
          event.preventDefault();
          if (next === visibleCareer) return;
          gestureSpent = true;
          lastStepAt = now;
          lockAndMove(next);
        };
        trigger = ScrollTrigger.create({ trigger: ".c-career", pin: ".c-career-inner", start: "top top", end: "+=120%", invalidateOnRefresh: true,
          onEnter: () => { moveCareer(0); armFromScroll(); window.addEventListener("wheel", handleWheel, { passive: false }); },
          onEnterBack: () => { moveCareer(2); armFromScroll(); window.addEventListener("wheel", handleWheel, { passive: false }); },
          onLeave: () => { window.removeEventListener("wheel", handleWheel); locked = false; },
          onLeaveBack: () => { window.removeEventListener("wheel", handleWheel); locked = false; },
        });
        careerTrigger.current = trigger;
        return () => { window.removeEventListener("wheel", handleWheel); trigger.kill(); careerTrigger.current = null; careerMove.current = null; };
      });
    }, root);
    // Font metrics and desktop pin spacing can move an initially requested anchor.
    // Restore it once after layout settles, not on every scroll or interaction.
    void document.fonts.ready.then(() => {
      if (disposed) return;
      ScrollTrigger.refresh();
      if (!userScrolled) window.scrollTo({ top: 0, behavior: "instant" });
      readyFrame = requestAnimationFrame(() => { if (!disposed) { layoutReady = true; pendingObservations.splice(0).forEach((observe) => observe()); } });
    });
    return () => { disposed = true; window.removeEventListener("wheel", markScrolled); window.removeEventListener("touchstart", markScrolled); window.removeEventListener("keydown", markScrolled); cancelAnimationFrame(readyFrame); observers.forEach((observer) => observer.disconnect()); history.scrollRestoration = previousRestoration; media.revert(); context.revert(); };
  }, []);

  function closeMenu() { menu.current?.close(); setMenuOpen(false); }
  function goToCareer(index: number) {
    const next = Math.max(0, Math.min(2, index));
    // Same locked, one-step-at-a-time move the wheel handler uses, so a button click
    // mid-transition is safely ignored rather than fighting the running animation.
    if (careerMove.current) careerMove.current(next);
    else setActiveCareer(next);
  }

  return <main className="canva-portfolio" id="main-content" ref={root} data-motion-paused={paused || undefined}>
    <noscript><style>{`.c-career-stages{display:flex;flex-direction:column;gap:48px}.c-career-stage{visibility:visible;opacity:1;transform:none}.c-career-tabs,.c-career-controls,.c-menu-button,.c-motion-toggle{display:none}.c-nav nav{display:flex;flex-wrap:wrap}.c-faq-panel{grid-template-rows:1fr;visibility:visible;opacity:1}.c-expertise-frame{display:none}.c-expertise-accessible{position:static;clip-path:none;width:auto;height:auto;overflow:visible}`}</style></noscript>
    <section className="c-hero" aria-labelledby="hero-title">
      <picture className="c-hero-picture">
        <img src="/portfolio/canva/hero-photo.jpg" alt="María Mora, Design Leader" width="2560" height="1440" fetchPriority="high" />
      </picture>
      <i className="c-hero-registration" aria-hidden="true" />
      <header className="c-nav">
        <a className="c-logo" href="#main-content" aria-label="María Mora — Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/portfolio/assets/maria-logo-white.svg" alt="" width="402" height="324" />
        </a>
        <nav aria-label="Primary">{nav.map(([label, target]) => <a key={target} href={`#portfolio-${target}`}>{label}</a>)}</nav>
        <button className="c-menu-button" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="portfolio-menu" onClick={() => { menu.current?.showModal(); setMenuOpen(true); }}><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M3 7h22M3 14h22M3 21h22" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg></button>
      </header>
      <dialog ref={menu} id="portfolio-menu" className="c-menu" aria-label="Navigation" onCancel={() => setMenuOpen(false)} onClick={(event) => { if (event.target === menu.current) closeMenu(); }}>
        <div><button className="c-menu-close" onClick={closeMenu} autoFocus>Close <span aria-hidden="true">×</span></button><nav aria-label="All sections">{[["Highlights", "highlights"], ["Expertise", "expertise"], ...nav.slice(0, 2), ["People", "people"], ["Awards", "recognition"], ["FAQ", "faq"], ["Beyond design", "playground"], ...nav.slice(2)].map(([label, target]) => <a key={target} href={`#portfolio-${target}`} onClick={closeMenu}>{label}</a>)}</nav></div>
      </dialog>
      <div className="c-hero-identity"><h1 id="hero-title" className="c-hero-title"><span>María Mora</span></h1><p className="c-hero-subtitle">Design Leader</p></div>

    </section>

    <section className="c-highlights c-section" id="portfolio-highlights" aria-labelledby="highlights-title">
      <Caption>Highlights</Caption>
      <h2 id="highlights-title" className="c-years"><span className="c-years-number">10+</span><span data-reveal>years of experience</span><span data-reveal>in the <em>iGaming industry.</em></span></h2>
      <div className="c-metrics">{highlights.map(([value, label]) => <div key={label} aria-label={`${value} ${label}`}><strong aria-hidden="true"><span data-counter={parseInt(value)}>{parseInt(value)}</span>{value.includes("+") && <span>+</span>}</strong><p>{label}</p></div>)}</div>

      <div id="portfolio-operators" className="c-operators" role="region" aria-label="Operators I have designed for">
        <ul className="c-logo-track">{[...operators, ...operators].map((operator, index) => <li key={`${operator.file}-${index}`} aria-hidden={index >= operators.length || undefined} style={{ "--logo-h": (1 / Math.sqrt(operator.ratio)).toFixed(3) } as CSSProperties}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/portfolio/operators/${operator.file}`} alt={index < operators.length ? operator.name : ""} loading="lazy" decoding="async" />
        </li>)}</ul>
      </div>
    </section>

    <section className="c-expertise c-section" id="portfolio-expertise" aria-labelledby="expertise-title">
      <div className="c-expertise-top"><Caption>Expertise in</Caption><button className="c-motion-toggle" aria-pressed={paused} onClick={() => { const next = !paused; setPaused(next); pausedRef.current = next; syncExpertise.current?.(); }}>{paused ? "Play motion" : "Pause motion"}</button></div>
      <h2 className="sr-only" id="expertise-title">Expertise in product platforms</h2>
      <div className="c-expertise-frame" aria-hidden="true">{expertise.map((item, index) => <p key={item.emphasis + item.lead} className={`c-expertise-word ${index === 0 ? "is-first" : ""}`}><em>{item.lead} {item.emphasis}.</em></p>)}</div>
      <ul className="c-expertise-accessible">{expertise.map((item) => <li key={item.lead + item.emphasis}>{item.lead} {item.emphasis}</li>)}</ul>
    </section>

    <section className="c-work c-section" id="portfolio-work" aria-labelledby="work-title">
      <header><Caption>Selected work</Caption><Heading id="work-title">Work that shaped <br /><em>products.</em></Heading></header>
      <div className="c-projects">{projects.map((project) => {
        // A card with its own supplied cover uses it (centre-cropped to the card); the others crop the shared Canva sheet.
        const media = "image" in project && project.image
          ? <Photo src={project.image} width={project.width} height={510} alt={`${project.name} product preview`} />
          : <ReferenceImage sheet="work" x={project.x} y={296} width={project.width} height={510} alt={`${project.name} product preview`} />;
        return <article key={project.name} className="c-project" data-reveal>
        {project.href ? <Link className="c-project-image" href={project.href} aria-label={`View ${project.name} case study`}>{media}</Link> : <div className="c-project-image">{media}</div>}
        <h3 className="sr-only">{project.name}</h3><p>{project.copy}</p>
        {project.href ? <Link className="c-project-link" href={project.href}>View project <Arrow /></Link> : <a className="c-project-link" href={`mailto:moragarciamaria@gmail.com?subject=${encodeURIComponent(`Tell me about ${project.name}`)}`}>Request project <Arrow /><span className="sr-only"> — case study not yet published</span></a>}
      </article>;
      })}</div>
    </section>

    <section className="c-career" id="portfolio-about" aria-labelledby="career-title"><div className="c-career-inner c-section">
      <Caption>Career journey</Caption><Heading id="career-title">A journey of <em>growth.</em></Heading>
      <div className="c-career-content"><nav className="c-career-tabs" aria-label="Career stages">{stages.map((stage, index) => <button key={stage.role} aria-label={`Show ${stage.role}`} aria-current={activeCareer === index ? "step" : undefined} onClick={() => goToCareer(index)}>{String(index + 1).padStart(2, "0")}</button>)}</nav>
        <div className="c-career-stages">{stages.map((stage, index) => <article key={stage.role} className={`c-career-stage ${index === activeCareer ? "is-active" : ""}`}><div><p className="c-career-date">{stage.date}</p><h3>{stage.role}</h3><p className="c-career-company">{stage.company}</p></div><div><h4>{stage.title}</h4><p className="c-career-body">{stage.body}</p></div></article>)}</div>
      </div>
      <div className="c-career-controls"><span className="c-scroll-hint"><i className="c-mouse" aria-hidden="true"><i className="c-mouse__wheel" /></i>Scroll to explore</span><div><button aria-label="Previous career stage" disabled={activeCareer === 0} onClick={() => goToCareer(activeCareer - 1)}><Arrow direction="left" /></button><button aria-label="Next career stage" disabled={activeCareer === 2} onClick={() => goToCareer(activeCareer + 1)}><Arrow /></button></div></div>
    </div></section>

    <section className="c-people c-section" id="portfolio-people" aria-labelledby="people-title">
      <div className="c-people-photo" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet="/portfolio/canva/people-mobile.jpg" />
          <img src="/portfolio/canva/people-bg.jpg" width={2560} height={1440} alt="" loading="lazy" decoding="async" />
        </picture>
      </div>
      <header><div><Caption>People</Caption><Heading id="people-title">In their <em>words.</em></Heading></div><a className="c-recommendations-link" href="https://www.linkedin.com/in/mar%C3%ADa-mora/" target="_blank" rel="noopener noreferrer">View all recommendations <Arrow direction="up" /></a></header>
      <div className="c-quotes" aria-live="polite">{recommendations.map((quote, index) => <figure key={quote.name} className={index === activeQuote ? "is-active" : ""} aria-hidden={index !== activeQuote}><blockquote>“{quote.quote}”</blockquote><figcaption><strong>{quote.name}</strong><span>{quote.role}</span></figcaption></figure>)}</div>
      <div className="c-quote-controls"><span>{String(activeQuote + 1).padStart(2, "0")} <span>/ {String(recommendations.length).padStart(2, "0")}</span></span><i /><button aria-label="Previous recommendation" onClick={() => setActiveQuote((current) => (current + recommendations.length - 1) % recommendations.length)}><Arrow direction="left" /></button><button aria-label="Next recommendation" onClick={() => setActiveQuote((current) => (current + 1) % recommendations.length)}><Arrow /></button></div>
    </section>

    <section className="c-awards c-section" id="portfolio-recognition" aria-labelledby="awards-title">
      <Photo className="c-trophy" src="/portfolio/assets/award-trophy.jpg" width={1024} height={1536} alt="María holding the golden iGaming Idol award trophy" />
      <div className="c-awards-content"><Caption>Awards</Caption><Heading id="awards-title">International <em>recognition.</em></Heading><div className="c-award-list">{awards.map((award, index) => <article key={award.year + award.place} data-reveal><div><p className="c-award-year">{award.year}</p><p>{award.place}</p></div><div><h3>{award.result}</h3><p>{award.description}</p></div><ReferenceImage sheet="awards" x={1275} y={index === 0 ? 307 : index === 3 ? 796 : 470} width={175} height={index === 1 || index === 2 ? 105 : 90} alt={award.mark.replace("\n", " ")} /></article>)}</div></div>
    </section>

    <section className="c-faq c-section" id="portfolio-faq" aria-labelledby="faq-title">
      <header><Caption>FAQ</Caption><Heading id="faq-title">Questions <br />I get <em>asked.</em></Heading><p data-reveal>A few answers to the questions that come up most often about my work, process and experience.</p></header>
      <div className="c-faq-list">{faqItems.map((item, index) => <article key={item.question} className={index === activeFaq ? "is-open" : ""}><h3><button id={`faq-question-${index}`} aria-expanded={index === activeFaq} aria-controls={`faq-panel-${index}`} onClick={() => setActiveFaq(index === activeFaq ? null : index)}><span className="c-faq-number">{String(index + 1).padStart(2, "0")}</span><span>{item.question}</span><span className="c-plus" aria-hidden="true" /></button></h3><div className="c-faq-panel" id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-question-${index}`} inert={index !== activeFaq}><div><p className="c-faq-answer">{item.answer}</p></div></div></article>)}</div>
    </section>

    <section className="c-beyond c-section" id="portfolio-playground" aria-labelledby="beyond-title"><div className="c-beyond-grid">{[{ src: "beyond-children", alt: "Two young children sitting by a colourful bead curtain" }, { src: "beyond-coffee", alt: "A cup of coffee with a biscuit on the saucer" }, { src: "beyond-garden", alt: "Rows of young plants in the vegetable garden" }, { src: "beyond-cat", alt: "A snowshoe cat looking at the camera" }].map((photo) => <div key={photo.src} data-reveal><Photo src={`/portfolio/canva/${photo.src}.webp`} width={900} height={900} alt={photo.alt} /></div>)}</div><header><Caption>Beyond design</Caption><Heading id="beyond-title">There’s more <br />to <em>life</em> than <br />pixels.</Heading><p data-reveal>The things that inspire me, <br />keep me grounded and <br />make life beautiful.</p></header></section>

    <footer className="c-contact c-section" id="portfolio-contact" aria-labelledby="contact-title"><Caption>Contact</Caption><Heading id="contact-title">Let’s make something <br /><em>exceptional.</em></Heading><a className="c-email" href="mailto:moragarciamaria@gmail.com" data-reveal><span>moragarciamaria@gmail.com</span><Arrow direction="up" /></a><div className="c-footer-meta" data-reveal><p>María Mora · Design Leader <br />Marbella · Worldwide</p><span>© 2026</span></div></footer>
  </main>;
}
