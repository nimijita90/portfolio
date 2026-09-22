"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const A = "/portfolio/assets/";

const capabilities = [
  "Colours & tonal variations",
  "Primary & secondary colours",
  "Light, dark & hybrid themes",
  "Top bar & sidebar navigation",
  "Sportsbook on or off",
  "Representative product pages",
  "Desktop & mobile",
  "Component variants",
];

const steps = [
  { number: "01", title: "Send", body: "The Customiser was sent to the client with simple instructions — no meeting required to get started." },
  { number: "02", title: "Explore", body: "The client explored the options at their own pace, tried different combinations and sent back a screenshot of the configuration they preferred." },
  { number: "03", title: "Decide", body: "From that single screenshot, the Product Manager could read the key decisions — navigation, colours, theme, components, Sportsbook — without chasing them across several meetings." },
];

const impact = [
  { audience: "Sales", body: "Could present an always-current demo and adapt it live for different clients and events, including ICE." },
  { audience: "Clients", body: "Could explore the product’s possibilities and make decisions with more autonomy, at their own pace." },
  { audience: "Product, Design & Technology", body: "Received a clearer visual reference for the chosen configuration, reducing questions, meetings and clarifications at project kick-off." },
  { audience: "Over time", body: "The Customiser kept growing — new options and component variants were added to stay aligned with the product’s evolution." },
];

function ArrowLeft() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M28 16H5M13 8l-8 8 8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }
function Arrow() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 16h23M19 8l8 8-8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }

export default function CustomiserCaseStudy() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let disposed = false;
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(".cust-hero", { opacity: 0, duration: 1.3, ease: "power1.out" }, 0)
          .from(".cust-hero__band", { clipPath: "inset(0 0 100% 0)", scale: 1.05, duration: 1.5 }, .15)
          .fromTo(".cust-hero__glint", { xPercent: -120 }, { xPercent: 220, duration: 1.4, ease: "power2.inOut" }, .35)
          .from(".cust-hero h1 span", { yPercent: 105, duration: 1.2, stagger: .1 }, .7)
          .from(".cust-hero__meta > div", { y: 34, opacity: 0, duration: .9, stagger: .14 }, 1.25);

        const challenge = gsap.timeline({ scrollTrigger: { trigger: ".cust-challenge", start: "clamp(top 86%)", toggleActions: "play none none none", invalidateOnRefresh: true } });
        challenge
          .from(".cust-challenge .cust-label", { x: -56, opacity: 0, duration: .9, ease: "power2.out" })
          .from(".cust-challenge header h2", { y: 96, opacity: 0, clipPath: "inset(0 0 82% 0)", duration: 1.35, ease: "power2.out" }, .1)
          .from(".cust-challenge header > p:last-child", { y: 36, opacity: 0, duration: .9, ease: "power2.out" }, .55)
          .from(".cust-challenge article", { y: 100, opacity: 0, scale: .97, duration: 1.25, stagger: .17, ease: "power3.out" }, .68)
          .from(".cust-challenge article > :is(strong,small,h3,p)", { y: 32, opacity: 0, duration: .85, stagger: .06, ease: "power2.out" }, .95);

        gsap.timeline({ scrollTrigger: { trigger: ".cust-approach", start: "clamp(top 78%)", once: true } })
          .from(".cust-approach .cust-label", { x: -54, opacity: 0, duration: .85, ease: "power2.out" })
          .from(".cust-approach h2", { y: 90, opacity: 0, clipPath: "inset(0 0 70% 0)", duration: 1.3, ease: "power2.out" }, .12)
          .from(".cust-approach div > p:not(.cust-label)", { y: 40, opacity: 0, duration: .9, stagger: .12, ease: "power2.out" }, .58)
          .from(".cust-approach footer", { opacity: 0, y: 20, duration: 1, ease: "power2.out" }, .85);

        gsap.timeline({ scrollTrigger: { trigger: ".cust-explore", start: "clamp(top 82%)", once: true, invalidateOnRefresh: true } })
          .from(".cust-explore .cust-label", { x: -46, opacity: 0, duration: .85, ease: "power2.out" })
          .from(".cust-explore h2", { y: 84, opacity: 0, clipPath: "inset(0 0 80% 0)", duration: 1.3, ease: "power2.out" }, .1)
          .from(".cust-explore > div > p", { y: 36, opacity: 0, duration: .9, ease: "power2.out" }, .5)
          .from(".cust-tags li", { y: 24, opacity: 0, duration: .7, stagger: .06, ease: "power2.out" }, .68)
          .from(".cust-explore__stage", { opacity: 0, clipPath: "inset(0 0 100% 0)", duration: 1.3, ease: "power2.out" }, .5);

        gsap.timeline({ scrollTrigger: { trigger: ".cust-process", start: "clamp(top 80%)", once: true, invalidateOnRefresh: true } })
          .from(".cust-process .cust-label", { x: -54, opacity: 0, duration: .85, ease: "power2.out" })
          .from(".cust-process h2", { y: 96, opacity: 0, clipPath: "inset(0 0 82% 0)", duration: 1.4, ease: "power2.out" }, .12)
          .from(".cust-step", { y: 60, opacity: 0, duration: 1, stagger: .14, ease: "power2.out" }, .5)
          .from(".cust-process__visual", { y: 40, opacity: 0, duration: .95, ease: "power2.out" }, .85);

        gsap.timeline({ scrollTrigger: { trigger: ".cust-impact", start: "clamp(top 80%)", once: true, invalidateOnRefresh: true } })
          .from(".cust-impact .cust-label", { x: -54, opacity: 0, duration: .85, ease: "power2.out" })
          .from(".cust-impact h2", { y: 90, opacity: 0, clipPath: "inset(0 0 82% 0)", duration: 1.3, ease: "power2.out" }, .1)
          .from(".cust-impact-item", { y: 50, opacity: 0, duration: .95, stagger: .12, ease: "power2.out" }, .5);

        gsap.timeline({ scrollTrigger: { trigger: ".cust-behind", start: "clamp(top 82%)", once: true, invalidateOnRefresh: true } })
          .from(".cust-behind .cust-label", { y: 26, opacity: 0, duration: .8, ease: "power2.out" })
          .from(".cust-behind__portrait", { scale: .65, opacity: 0, clipPath: "circle(0% at 50% 50%)", duration: 1.3, ease: "power2.out" }, .1)
          .from(".cust-behind h2", { y: 90, opacity: 0, clipPath: "inset(0 0 80% 0)", duration: 1.35, ease: "power2.out" }, .3)
          .from(".cust-behind__copy p", { y: 32, opacity: 0, duration: .9, stagger: .13, ease: "power2.out" }, .7)
          .from(".cust-behind a", { y: 22, opacity: 0, duration: .9, ease: "power2.out" }, 1);
      });
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".cust-behind__portrait img", { scale: 1.18, yPercent: 6 }, { scale: 1.03, yPercent: -4, ease: "none", scrollTrigger: { trigger: ".cust-behind", start: "top bottom", end: "bottom top", scrub: 1.15 } });
        gsap.fromTo(".cust-approach > span", { scale: .7, xPercent: -4, opacity: .3 }, { scale: 1.08, xPercent: 4, opacity: 1, ease: "none", scrollTrigger: { trigger: ".cust-approach", start: "top bottom", end: "bottom top", scrub: 1.1 } });
        gsap.fromTo(".cust-hero__band img", { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: ".cust-hero", start: "top top", end: "bottom top", scrub: 1 } });
      });
      return () => mm.revert();
    }, root);
    void document.fonts.ready.then(async () => {
      await Promise.all(Array.from(root.current?.querySelectorAll("img") ?? []).map((image) => image.decode?.().catch(() => undefined)));
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => { disposed = true; context.revert(); };
  }, []);

  return <main className="cust" id="main-content" ref={root}>
    <header className="cust-nav"><Link href="/" aria-label="Back to María Mora portfolio"><img src={`${A}maria-logo-white.svg`} alt="" width="402" height="324" /></Link><Link className="cust-nav__back" href="/"><ArrowLeft /><span>Back to home</span></Link></header>

    <section className="cust-hero" aria-labelledby="cust-title">
      <p className="cust-wip"><i aria-hidden="true" />Work in progress — content and visuals are provisional</p>
      <div className="cust-hero__band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/portfolio/assets/customiser-hero-banner.jpg" width={2171} height={406} alt="Demo Casino Customiser" fetchPriority="high" />
        <i className="cust-hero__glint" aria-hidden="true" />
      </div>
      <h1 id="cust-title"><span>Turning a complex sales workflow</span>{" "}<span>into a <em>live</em> experience.</span></h1>
      <div className="cust-hero__meta"><div><small>Scope</small><p>Interactive Prototype · Sales Enablement ·<br />Client Onboarding</p></div><div><small>Role</small><p>Product Design</p></div><div><small>Tool</small><p>Figma, built for WAND</p></div></div>
      <i className="cust-hero__divider" aria-hidden="true" />
    </section>

    <section className="cust-challenge cust-section" aria-labelledby="challenge-title">
      <header data-cust-reveal><p className="cust-label">The problem</p><h2 id="challenge-title">Two problems, one product.</h2><p>Sales and onboarding were both losing time to the same underlying gap.</p></header>
      <div className="cust-challenge__grid">
        <article data-cust-reveal><strong>01</strong><small>Outdated</small><h3>The sales demo couldn’t keep up.</h3><p>Sales used an incomplete demo at events, still carrying the old visual identity. Updating it needed development resources that weren’t always available.</p></article>
        <article data-cust-reveal><strong>02</strong><small>Slow to configure</small><h3>Kick-off meant meeting after meeting.</h3><p>The first configuration phase for a new casino stretched on, with several meetings needed just to explain the options and gather decisions on navigation, colours, theme, components or Sportsbook.</p></article>
      </div>
    </section>

    <section className="cust-approach cust-section" aria-labelledby="approach-title"><span aria-hidden="true">CONFIGURE</span><div data-cust-reveal><p className="cust-label">The solution</p><h2 id="approach-title">Configure the casino. No development required.</h2><p>I proposed a Casino Customiser: an interactive Figma prototype to explore and configure the product’s main options visually, without a single line of code.</p><p>A flexible demo that Sales could adapt live during events, and the same prototype could speed up configuration with new clients.</p><footer>Colours <i /> Themes <i /> Navigation <i /> Sportsbook <i /> Pages <i /> Devices <i /> Components</footer></div></section>

    <section className="cust-explore cust-section" aria-labelledby="explore-title">
      <div data-cust-reveal><p className="cust-label">Inside the Customiser</p><h2 id="explore-title">Everything the client<br />could try <em>on their own.</em></h2><p>Every option lived in one prototype — explored freely, without waiting on a meeting to find out what was possible.</p><ul className="cust-tags" aria-label="What the Customiser let you configure">{capabilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div className="cust-explore__stage cust-gallery" data-cust-visual>
        <figure><img src={`${A}customiser-gallery-colours.jpg`} alt="Primary colour picker with brand swatch options" loading="lazy" /><figcaption>Colours</figcaption></figure>
        <figure><img src={`${A}customiser-gallery-tonal.jpg`} alt="Tonal scale for the selected colour, with hex values" loading="lazy" /><figcaption>Tonal variations</figcaption></figure>
        <figure><img src={`${A}customiser-gallery-templates.jpg`} alt="Preset theme templates applied live to the layout" loading="lazy" /><figcaption>Templates</figcaption></figure>
        <figure><img src={`${A}customiser-gallery-mode.jpg`} alt="Hybrid, light and dark mode toggle with Sportsbook enabled" loading="lazy" /><figcaption>Light, dark &amp; hybrid</figcaption></figure>
        <figure><img src={`${A}customiser-gallery-variants.jpg`} alt="Component style variants for the homepage carousel" loading="lazy" /><figcaption>Component variants</figcaption></figure>
        <figure><img src={`${A}customiser-gallery-mobile.jpg`} alt="Live mobile preview of the configured homepage" loading="lazy" /><figcaption>Desktop &amp; mobile</figcaption></figure>
      </div>
    </section>

    <section className="cust-process cust-section" aria-labelledby="process-title">
      <header data-cust-reveal><p className="cust-label">From meetings to self-service</p><h2 id="process-title">Send. Explore. Decide.</h2></header>
      <div className="cust-process__grid">{steps.map((step) => <article className="cust-step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
      <figure className="cust-process__visual" data-cust-visual><img src={`${A}customiser-summary.jpg`} alt="Summary screen listing the client’s chosen colours, layout, platform features and component styles" loading="lazy" /></figure>
      <p className="cust-process__note" data-cust-reveal>Meetings were still there whenever the client needed advice — they just weren’t needed anymore to explain every possibility the product had.</p>
    </section>

    <section className="cust-impact cust-section" aria-labelledby="impact-title">
      <header data-cust-reveal><p className="cust-label">The impact</p><h2 id="impact-title">A sales fix that grew<br />into something <em>bigger.</em></h2></header>
      <div className="cust-impact__grid">{impact.map((row) => <article className="cust-impact-item" key={row.audience}><h3>{row.audience}</h3><p>{row.body}</p></article>)}</div>
    </section>

    <section className="cust-behind cust-section" aria-labelledby="behind-title"><p className="cust-label">Behind the work</p><figure className="cust-behind__portrait"><img src={`${A}maria-portrait.jpg`} alt="María Mora" width="700" height="700" /></figure><h2 id="behind-title">Want to see the <em>Customiser</em> in action?</h2><div className="cust-behind__copy"><p>The live prototype lives inside WAND’s Figma workspace, so I can’t share the working file publicly.</p><p>I’d be happy to walk you through how it’s built, the variables behind it,<br />and how it changed the way we onboarded clients.</p></div><a href="mailto:moragarciamaria@gmail.com?subject=Demo%20Casino%20Customiser">Let’s talk <Arrow /></a></section>
  </main>;
}
