"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const A = "/portfolio/assets/";

function Shot({ src, alt }: { src: string; alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`${A}${src}`} alt={alt} loading="lazy" />;
}

const foundationCards = [
  { number: "01", label: "Fragmented", title: "One model, every constraint.", body: "WAND’s architecture couldn’t cleanly support native switching between Casino and Sportsbook, or the flexibility newer clients needed." },
  { number: "02", label: "Disconnected", title: "Web and native, drifting apart.", body: "Mobile and web maintained separate patterns instead of sharing one system, so parity was a constant, manual effort." },
  { number: "03", label: "Still manual", title: "Configuration meant engineering.", body: "Even with WAND’s improvements, shaping a brand still required development time XSITE was designed to remove entirely." },
];

const builderPoints = [
  "Swap components without touching code",
  "Rearrange sections and publish instantly",
  "Built on the same design tokens as the core platform",
];

const status = [
  { title: "Foundation", body: "Shipped and already powering new brand launches on the core Casino and Sportsbook experience." },
  { title: "XSITE Builder", body: "In active development — the component-level editor that lets teams publish changes themselves." },
  { title: "Native mobile", body: "Underway, sharing the same design tokens and component library as the web platform." },
  { title: "Design system", body: "Continuously refined alongside Figma’s newest capabilities, from variables to reusable slots." },
];

function ArrowLeft() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M28 16H5M13 8l-8 8 8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }
function Arrow() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 16h23M19 8l8 8-8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }

export default function XsiteCaseStudy() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let disposed = false;
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(".xs-hero", { opacity: 0, duration: 1.3, ease: "power1.out" }, 0)
          .from(".xs-hero__band", { clipPath: "inset(0 0 100% 0)", scale: 1.05, duration: 1.5 }, .15)
          .fromTo(".xs-hero__glint", { xPercent: -120 }, { xPercent: 220, duration: 1.4, ease: "power2.inOut" }, .35)
          .from(".xs-hero h1 span", { yPercent: 105, duration: 1.2, stagger: .1 }, .7)
          .from(".xs-hero__meta > div", { y: 34, opacity: 0, duration: .9, stagger: .14 }, 1.25);

        const foundation = gsap.timeline({ scrollTrigger: { trigger: ".xs-foundation", start: "clamp(top 86%)", toggleActions: "play none none none", invalidateOnRefresh: true } });
        foundation
          .from(".xs-foundation .xs-label", { x: -56, opacity: 0, duration: .9, ease: "power2.out" })
          .from(".xs-foundation header h2", { y: 96, opacity: 0, clipPath: "inset(0 0 82% 0)", duration: 1.35, ease: "power2.out" }, .1)
          .from(".xs-foundation header > p:last-child", { y: 36, opacity: 0, duration: .9, ease: "power2.out" }, .55)
          .from(".xs-foundation article", { y: 100, opacity: 0, scale: .97, duration: 1.25, stagger: .17, ease: "power3.out" }, .68)
          .from(".xs-foundation article > :is(strong,small,h3,p)", { y: 32, opacity: 0, duration: .85, stagger: .06, ease: "power2.out" }, .95);

        gsap.timeline({ scrollTrigger: { trigger: ".xs-vision", start: "clamp(top 78%)", once: true } })
          .from(".xs-vision .xs-label", { x: -54, opacity: 0, duration: .85, ease: "power2.out" })
          .from(".xs-vision h2", { y: 90, opacity: 0, clipPath: "inset(0 0 70% 0)", duration: 1.3, ease: "power2.out" }, .12)
          .from(".xs-vision div > p:not(.xs-label)", { y: 40, opacity: 0, duration: .9, stagger: .12, ease: "power2.out" }, .58)
          .from(".xs-vision footer", { opacity: 0, y: 20, duration: 1, ease: "power2.out" }, .85);

        gsap.utils.toArray<HTMLElement>(".xs-feature").forEach((section) => {
          const visual = section.querySelector<HTMLElement>(".xs-visual");
          const label = section.querySelector<HTMLElement>(".xs-label");
          const heading = section.querySelector<HTMLElement>("h2");
          const paragraphs = section.querySelectorAll<HTMLElement>(".xs-feature__copy :is(h3,p,li)");
          const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "clamp(top 82%)", once: true, invalidateOnRefresh: true } });
          if (label) timeline.from(label, { x: -46, opacity: 0, duration: .85, ease: "power2.out" });
          if (heading) timeline.from(heading, { y: 84, opacity: 0, clipPath: "inset(0 0 80% 0)", duration: 1.3, ease: "power2.out" }, .1);
          if (paragraphs.length) timeline.from(paragraphs, { y: 32, opacity: 0, duration: .85, stagger: .08, ease: "power2.out" }, .45);
          if (visual) timeline.from(visual, { opacity: 0, y: 40, scale: .97, duration: 1.2, ease: "power2.out" }, .35);
        });

        gsap.timeline({ scrollTrigger: { trigger: ".xs-status", start: "clamp(top 80%)", once: true, invalidateOnRefresh: true } })
          .from(".xs-status .xs-label", { x: -54, opacity: 0, duration: .85, ease: "power2.out" })
          .from(".xs-status h2", { y: 90, opacity: 0, clipPath: "inset(0 0 82% 0)", duration: 1.3, ease: "power2.out" }, .1)
          .from(".xs-status-item", { y: 50, opacity: 0, duration: .95, stagger: .12, ease: "power2.out" }, .5);

        gsap.timeline({ scrollTrigger: { trigger: ".xs-behind", start: "clamp(top 82%)", once: true, invalidateOnRefresh: true } })
          .from(".xs-behind .xs-label", { y: 26, opacity: 0, duration: .8, ease: "power2.out" })
          .from(".xs-behind__portrait", { scale: .65, opacity: 0, clipPath: "circle(0% at 50% 50%)", duration: 1.3, ease: "power2.out" }, .1)
          .from(".xs-behind h2", { y: 90, opacity: 0, clipPath: "inset(0 0 80% 0)", duration: 1.35, ease: "power2.out" }, .3)
          .from(".xs-behind__copy p", { y: 32, opacity: 0, duration: .9, stagger: .13, ease: "power2.out" }, .7)
          .from(".xs-behind a", { y: 22, opacity: 0, duration: .9, ease: "power2.out" }, 1);
      });
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".xs-vision > span", { scale: .7, xPercent: -4, opacity: .3 }, { scale: 1.08, xPercent: 4, opacity: 1, ease: "none", scrollTrigger: { trigger: ".xs-vision", start: "top bottom", end: "bottom top", scrub: 1.1 } });
        gsap.fromTo(".xs-hero__band img", { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: ".xs-hero", start: "top top", end: "bottom top", scrub: 1 } });
        gsap.fromTo(".xs-behind__portrait img", { scale: 1.18, yPercent: 6 }, { scale: 1.03, yPercent: -4, ease: "none", scrollTrigger: { trigger: ".xs-behind", start: "top bottom", end: "bottom top", scrub: 1.15 } });
      });
      return () => mm.revert();
    }, root);
    void document.fonts.ready.then(async () => {
      await Promise.all(Array.from(root.current?.querySelectorAll("img") ?? []).map((image) => image.decode?.().catch(() => undefined)));
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => { disposed = true; context.revert(); };
  }, []);

  return <main className="xs" id="main-content" ref={root}>
    <header className="xs-nav"><Link href="/" aria-label="Back to María Mora portfolio"><img src={`${A}maria-logo-white.svg`} alt="" width="402" height="324" /></Link><Link className="xs-nav__back" href="/"><ArrowLeft /><span>Back to home</span></Link></header>

    <section className="xs-hero" aria-labelledby="xs-title">
      <p className="xs-wip"><i aria-hidden="true" />Work in progress — content and visuals are provisional</p>
      <div className="xs-hero__band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}xsite-hero-banner.jpg`} width={2171} height={400} alt="XSITE" fetchPriority="high" />
        <i className="xs-hero__glint" aria-hidden="true" />
      </div>
      <h1 id="xs-title"><span>Reimagining a casino platform</span>{" "}<span>from the <em>ground</em> up.</span></h1>
      <div className="xs-hero__meta"><div><small>Scope</small><p>Design System · Multi-brand Customisation ·<br />Native Sportsbook · Mobile</p></div><div><small>Role</small><p>Design Leadership</p></div><div><small>Started</small><p>2024 — Ongoing</p></div></div>
      <i className="xs-hero__divider" aria-hidden="true" />
    </section>

    <section className="xs-foundation xs-section" aria-labelledby="foundation-title">
      <header data-xs-reveal><p className="xs-label">From WAND to XSITE</p><h2 id="foundation-title">WAND had reached its limits.</h2><p>WAND had scaled far past what its original architecture was built for. In 2024, we began designing its successor from the ground up.</p></header>
      <div className="xs-foundation__grid">
        {foundationCards.map((card) => <article key={card.number} data-xs-reveal><strong>{card.number}</strong><small>{card.label}</small><h3>{card.title}</h3><p>{card.body}</p></article>)}
      </div>
    </section>

    <section className="xs-vision xs-section" aria-labelledby="vision-title"><span aria-hidden="true">XSITE</span><div data-xs-reveal><p className="xs-label">The vision</p><h2 id="vision-title">Configure. Switch. Publish.</h2><p>The goal was the most advanced white-label casino platform on the market: one design system flexible enough for any brand, one experience that moves between Casino and Sportsbook natively, and one system clients could eventually shape themselves.</p><footer>Customisation <i /> Native Sportsbook <i /> Shared Components <i /> Conversion Research <i /> Sweepstakes <i /> Gamification <i /> XSITE Builder</footer></div></section>

    <section className="xs-feature xs-section" aria-labelledby="switch-title">
      <header data-xs-reveal><p className="xs-label">01 · Casino ⇄ Sportsbook</p><h2 id="switch-title">Two products.<br />One native experience.</h2></header>
      <div className="xs-feature__copy"><p>Casino and Sportsbook were designed as a single system rather than two products bolted together — sharing navigation, components and identity, so switching between them feels instant and native.</p><p>Every brand could enable either, both, or switch emphasis by market — without a different codebase for each.</p></div>
      <div className="xs-visual xs-visual--wide"><Shot src="xsite-visual-devices.jpg" alt="The same navigation and Sports switcher, consistent across desktop, mobile and the expanded menu" /></div>
    </section>

    <section className="xs-feature xs-feature--reverse xs-section" aria-labelledby="mobile-title">
      <div className="xs-visual xs-visual--mobile"><Shot src="xsite-visual-mobile.jpg" alt="Mobile homepage: the same Casino and Sports switcher, native on device" /></div>
      <div><header data-xs-reveal><p className="xs-label">02 · Native mobile</p><h2 id="mobile-title">The same system,<br />natively on mobile.</h2></header>
      <div className="xs-feature__copy"><p>The native mobile app draws from the exact same component library and design tokens as the web platform, so parity stopped being a manual, screen-by-screen effort.</p><p>A change to a component updates everywhere it’s used — web, mobile, every brand.</p></div></div>
    </section>

    <section className="xs-feature xs-section" aria-labelledby="research-title">
      <header data-xs-reveal><p className="xs-label">03 · Designed on evidence</p><h2 id="research-title">Every screen,<br />benchmarked and refined.</h2></header>
      <div className="xs-feature__copy"><p>Rather than designing each flow once, we studied it in isolation: competitor benchmarking, conversion research and usability patterns from the strongest platforms in the industry, screen by screen.</p><p>Deposits, onboarding, game discovery and bet slips were each iterated against that research until the result felt genuinely best-in-class, not just internally consistent.</p></div>
    </section>

    <section className="xs-feature xs-feature--reverse xs-section" aria-labelledby="sweepstakes-title">
      <div className="xs-visual xs-visual--wide"><Shot src="xsite-visual-gamification.jpg" alt="VIP levels, leaderboards and reward tiers, native to the platform" /></div>
      <div><header data-xs-reveal><p className="xs-label">04 · Sweepstakes & gamification</p><h2 id="sweepstakes-title">Built for more than one business model.</h2></header>
      <div className="xs-feature__copy"><p>XSITE supports Sweepstakes as a first-class model rather than an add-on, and pushed gamification further than WAND ever could — levels, missions and rewards designed as core product surfaces, not decoration.</p></div></div>
    </section>

    <section className="xs-builder xs-section" aria-labelledby="builder-title"><span aria-hidden="true">BUILDER</span><div data-xs-reveal><p className="xs-label">05 · XSITE Builder</p><h2 id="builder-title">Publishing, without engineering.</h2><p>A component-level editor built on top of XSITE — swap sections, reorder pages and publish, the way a page builder like WordPress lets you shape a site without writing code.</p><ul className="xs-builder__list">{builderPoints.map((point) => <li key={point}>{point}</li>)}</ul></div></section>

    <section className="xs-feature xs-section" aria-labelledby="system-title">
      <header data-xs-reveal><p className="xs-label">06 · A system built to last</p><h2 id="system-title">The design system<br />XSITE Builder demanded.</h2></header>
      <div className="xs-feature__copy"><p>Supporting a page builder meant the Figma system itself had to be exceptionally disciplined — built around variables and reusable slots so every surface stays consistent as new brands, pages and components are added.</p><p>We adopted Figma’s newest capabilities as they shipped, and started using AI to help keep documentation current as the system grew.</p></div>
    </section>

    <section className="xs-status xs-section" aria-labelledby="status-title">
      <header data-xs-reveal><p className="xs-label">Where it stands</p><h2 id="status-title">Still evolving,<br />already <em>ahead.</em></h2></header>
      <div className="xs-status__grid">{status.map((row) => <article className="xs-status-item" key={row.title}><h3>{row.title}</h3><p>{row.body}</p></article>)}</div>
    </section>

    <section className="xs-behind xs-section" aria-labelledby="behind-title"><p className="xs-label">Behind the work</p><figure className="xs-behind__portrait"><img src={`${A}maria-portrait.jpg`} alt="María Mora" width="700" height="700" /></figure><h2 id="behind-title">Want to see where <em>XSITE</em> is headed?</h2><div className="xs-behind__copy"><p>XSITE is still an active, evolving platform, so I can only share its full designs privately.</p><p>I’d be happy to walk you through the system, the Builder and<br />the thinking behind it in an interview.</p></div><a href="mailto:moragarciamaria@gmail.com?subject=XSITE">Let’s talk <Arrow /></a></section>
  </main>;
}
