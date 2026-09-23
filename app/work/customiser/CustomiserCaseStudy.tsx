"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Figure, NextCase, Strip, animateKit, entrance, reveal, revealText, startAtTop } from "../CaseKit";

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

const features = [
  {
    id: "colour", label: "01 · Colour", title: <>From brand colour <br />to exact <em>hex.</em></>,
    body: "Clients chose a primary, secondary and tertiary colour, then opened each one’s tonal scale, with every step labelled with its hex value.",
    figure: { src: "customiser-colour.webp", width: 2400, height: 1248, alt: "Primary colour option opening a palette of hues, then a tonal scale with hex values", caption: "Primary colour → palette → tonal scale, one level at a time." },
  },
  {
    id: "templates", label: "02 · Templates", title: <>A finished look, <br />one click <em>away.</em></>,
    body: "Curated theme templates combined colours and mode into a ready-made starting point, previewed live on real product pages.",
    figure: { src: "customiser-templates.webp", width: 2400, height: 1311, alt: "List of theme templates next to a desktop preview of the casino lobby", caption: "Theme templates, applied live to the casino lobby." },
  },
  {
    id: "modes", label: "03 · Mode & devices", title: <>Light, dark or hybrid. <br />Desktop and <em>mobile.</em></>,
    body: "Every combination could be switched between light, dark and hybrid mode, and previewed on desktop and mobile side by side.",
    figure: { src: "customiser-modes.webp", width: 2400, height: 1353, alt: "Mode selector with desktop and mobile previews of the same configured casino in dark mode", caption: "One configuration, previewed across modes and devices." },
  },
];

const steps = [
  { number: "01", title: "Send", body: "The Customiser was sent to the client with simple instructions. No meeting was required to get started." },
  { number: "02", title: "Explore", body: "The client explored the options at their own pace, tried different combinations and sent back a screenshot of the configuration they preferred." },
  { number: "03", title: "Decide", body: "From that single screenshot, the Product Manager could read the key decisions (navigation, colours, theme, components and Sportsbook) without chasing them across several meetings." },
];

const impact = [
  { audience: "Sales", body: "Could present an always-current demo and adapt it live for different clients and events, including ICE." },
  { audience: "Clients", body: "Could explore the product’s possibilities and make decisions with more autonomy, at their own pace." },
  { audience: "Product, Design & Technology", body: "Received a clearer visual reference for the chosen configuration, reducing questions, meetings and clarifications at project kick-off." },
  { audience: "Over time", body: "The Customiser kept growing. New options and component variants were added to stay aligned with the product’s evolution." },
];

function ArrowLeft() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M28 16H5M13 8l-8 8 8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }
function Arrow() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 16h23M19 8l8 8-8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }

export default function CustomiserCaseStudy() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px)" }, (media) => {
        const { motion, desktop } = media.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(".cust-hero", { opacity: 0, duration: 1.3, ease: "power1.out" }, 0)
          .from(".cust-hero__band", { clipPath: "inset(0 0 100% 0)", scale: 1.05, duration: 1.5 }, .15)
          .fromTo(".cust-hero__glint", { xPercent: -120 }, { xPercent: 220, duration: 1.4, ease: "power2.inOut" }, .35)
          .from(".cust-hero h1 span", { yPercent: 105, duration: 1.2, stagger: .1 }, .7)
          .from(".cust-hero__meta > div", { y: 34, opacity: 0, duration: .9, stagger: .14 }, 1.25);

        revealText(media, root.current!, {
          label: ".cust-section .cust-label",
          heading: ".cust-section h2",
          body: ".cust-challenge header > p:not(.cust-label), .cust-approach div > p:not(.cust-label), .cust-approach footer, .cust-block > p, .cust-block > div > p:not(.cust-label), .cust-process__note, .cust-behind__copy p, .cust-behind > a",
          card: ".cust-challenge article",
          item: ".cust-capabilities li, .cust-step > div, .cust-impact-item",
          number: ".cust-step > span",
        });
        entrance(".cust-behind__portrait", "top 92%", (timeline) => reveal(timeline, ".cust-behind__portrait", { scale: .65, opacity: 0, clipPath: "circle(0% at 50% 50%)" }, { scale: 1, opacity: 1, clipPath: "circle(71% at 50% 50%)", duration: 1.3, ease: "power2.out", clearProps: "transform,opacity,clipPath" }));

        animateKit(media);

        if (desktop) {
          // The prototype plate grows to full width as it rises into view, like the home hero opening up.
          gsap.fromTo(".cust-stage .ck-figure", { scale: .86 }, { scale: 1, transformOrigin: "50% 0%", ease: "none", scrollTrigger: { trigger: ".cust-stage", start: "top bottom", end: "top 20%", scrub: 1 } });
          gsap.fromTo(".cust-approach > span", { scale: .7, xPercent: -4, opacity: .3 }, { scale: 1.08, xPercent: 4, opacity: 1, ease: "none", scrollTrigger: { trigger: ".cust-approach", start: "top bottom", end: "bottom top", scrub: 1.1 } });
          gsap.fromTo(".cust-hero__band img", { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: ".cust-hero", start: "top top", end: "bottom top", scrub: 1 } });
          gsap.fromTo(".cust-behind__portrait img", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".cust-behind", start: "top bottom", end: "bottom top", scrub: 1.15 } });
        }
      });
      return () => mm.revert();
    }, root);
    const releaseScroll = startAtTop();
    return () => { releaseScroll(); context.revert(); };
  }, []);

  return <main className="cust" id="main-content" ref={root}>
    <header className="cust-nav"><Link href="/" aria-label="Back to María Mora portfolio"><img src={`${A}maria-logo-white.svg`} alt="" width="402" height="324" /></Link><Link className="cust-nav__back" href="/"><ArrowLeft /><span>Back to home</span></Link></header>

    <section className="cust-hero" aria-labelledby="cust-title">
      <div className="cust-hero__band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}customiser-hero-banner-v2.jpg`} width={2171} height={401} alt="Demo Casino Customiser" fetchPriority="high" />
        <i className="cust-hero__glint" aria-hidden="true" />
      </div>
      <h1 id="cust-title"><span>Turning a complex sales workflow</span>{" "}<span>into a <em>live</em> experience.</span></h1>
      <div className="cust-hero__meta"><div><small>Scope</small><p>Interactive Prototype · Sales Enablement ·<br />Client Onboarding</p></div><div><small>Role</small><p>Lead Product Designer</p></div><div><small>Tool</small><p>Figma, built for WAND</p></div></div>
      <i className="cust-hero__divider" aria-hidden="true" />
    </section>

    <section className="cust-challenge cust-section" aria-labelledby="challenge-title">
      <header data-cust-reveal><p className="cust-label">The problem</p><h2 id="challenge-title">Two problems, one product.</h2><p>Sales and onboarding were both losing time to the same underlying gap.</p></header>
      <div className="cust-challenge__grid">
        <article data-cust-reveal><strong>01</strong><small>Outdated</small><h3>The sales demo couldn’t keep up.</h3><p>Sales used an incomplete demo at events, still carrying the old visual identity. Updating it needed development resources that weren’t always available.</p></article>
        <article data-cust-reveal><strong>02</strong><small>Slow to configure</small><h3>Kick-off meant meeting after meeting.</h3><p>The first configuration phase for a new casino stretched on, with several meetings needed just to explain the options and gather decisions on navigation, colours, theme, components or Sportsbook.</p></article>
      </div>
    </section>

    <section className="cust-approach cust-section" aria-labelledby="approach-title"><span aria-hidden="true">CONFIGURE</span><div data-cust-reveal><p className="cust-label">The solution</p><h2 id="approach-title">Configure the casino. <br />No development required.</h2><p>I proposed a Casino Customiser: an interactive Figma prototype to explore and configure the product’s main options visually, without a single line of code.</p><p>A flexible demo that Sales could adapt live during events, and the same prototype could speed up configuration with new clients.</p><footer>Colours <i /> Themes <i /> Navigation <i /> Sportsbook <i /> Pages <i /> Devices <i /> Components</footer></div></section>

    <section className="cust-stage cust-section" aria-label="The Customiser prototype">
      <Figure src="customiser-desk.webp" width={2400} height={1355} index="01" alt="The Customiser prototype open on a laptop: control panel on the left, live casino preview on the right" caption="The Customiser: a clickable Figma prototype, with the control panel beside a live preview of the casino." />
    </section>

    <section className="cust-inside cust-section" aria-labelledby="inside-title">
      <header className="cust-block"><div><p className="cust-label">Inside the Customiser</p><h2 id="inside-title">Everything a client <br />could try <em>on their own.</em></h2></div><p>Every option lived in one prototype, free to explore without waiting on a meeting to find out what was possible.</p></header>
      <Figure src="customiser-modules.webp" width={2400} height={1355} index="02" alt="Diagram of the control panel modules: devices, pages, colours, mode and navigation" caption="The control panel, broken down: devices, pages, colours, mode and navigation." />
      <ul className="cust-capabilities" aria-label="What the Customiser let you configure">{capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>

    {features.map((feature, index) => <section key={feature.id} className="cust-feature cust-section" aria-labelledby={`${feature.id}-title`}>
      <header className="cust-block"><div><p className="cust-label">{feature.label}</p><h2 id={`${feature.id}-title`}>{feature.title}</h2></div><p>{feature.body}</p></header>
      <Figure src={feature.figure.src} width={feature.figure.width} height={feature.figure.height} index={String(index + 3).padStart(2, "0")} alt={feature.figure.alt} caption={feature.figure.caption} tone={feature.id === "templates" ? "light" : "dark"} />
    </section>)}

    <section className="cust-variants cust-section" aria-labelledby="variants-title">
      <header className="cust-block"><div><p className="cust-label">Configurations</p><h2 id="variants-title">Same demo. <br />A different casino <br /><em>every time.</em></h2></div><p>The same prototype, dressed as three different operators: the range a client could explore entirely on their own.</p></header>
      <Strip index="06" caption="Three configurations of the same demo casino, on desktop and mobile." items={[
        { src: "customiser-imac-red.webp", width: 1400, height: 1257, alt: "Desktop preview with a red and black theme" },
        { src: "customiser-imac-shop.webp", width: 1400, height: 1358, alt: "Virtual shop page with a dark, lime-accented theme" },
        { src: "customiser-phone.webp", width: 1000, height: 1635, alt: "Mobile preview with the default mint theme" },
      ]} />
    </section>

    <section className="cust-process cust-section" aria-labelledby="process-title">
      <div className="cust-process__text">
        <header className="cust-block"><p className="cust-label">From meetings to self-service</p><h2 id="process-title">Send. Explore. Decide.</h2></header>
        <ol className="cust-steps">{steps.map((step) => <li className="cust-step" key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
        <p className="cust-process__note">Meetings were still there whenever the client needed advice. They just weren’t needed anymore to explain every possibility the product had.</p>
      </div>
      <Figure className="cust-process__figure" src="customiser-summary.webp" width={1100} height={1398} index="07" tone="light" alt="Summary screen listing the chosen colours, layout, platform features and component styles" caption="The summary screen: the one screenshot a client sent back." />
    </section>

    <section className="cust-impact cust-section" aria-labelledby="impact-title">
      <header data-cust-reveal><p className="cust-label">The impact</p><h2 id="impact-title">A sales fix that grew <br />into something <em>bigger.</em></h2></header>
      <div className="cust-impact__grid">{impact.map((row) => <article className="cust-impact-item" key={row.audience}><h3>{row.audience}</h3><p>{row.body}</p></article>)}</div>
      <Figure className="cust-impact__figure" src="customiser-event.webp" width={1674} height={940} index="08" alt="GiG's stand at an industry event, with the Customiser running on a presentation screen" caption="The Customiser on GiG’s stand at an industry event." />
    </section>

    <section className="cust-behind cust-section" aria-labelledby="behind-title"><p className="cust-label">Behind the work</p><figure className="cust-behind__portrait"><img src={`${A}maria-portrait.jpg`} alt="María Mora" width="600" height="600" /></figure><h2 id="behind-title">Want to see the <em>Customiser</em> in action?</h2><div className="cust-behind__copy"><p>The live prototype lives inside WAND’s Figma workspace, so I can’t share the working file publicly.</p><p>I’d be happy to walk you through how it’s built, the variables behind it, <br />and how it changed the way we onboarded clients.</p></div><a href="mailto:moragarciamaria@gmail.com?subject=Demo%20Casino%20Customiser">Let’s talk <Arrow /></a></section>

    <NextCase href="/work/xsite" title={<>XSITE.</>} lede="WAND’s successor, designed from the ground up for Casino, Sportsbook and every brand." banner="xsite-hero-banner-v2.jpg" bannerWidth={2171} bannerHeight={395} />
  </main>;
}
