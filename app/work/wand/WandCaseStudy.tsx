"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NextCase, Placeholder, Stats, Wip, animateKit, entrance, reveal, revealText, startAtTop } from "../CaseKit";

const A = "/portfolio/assets/";
const milestones = [
  { phase: "2019 · I join WAND", headline: "Building a more complete product system.", body: <>I joined WAND as a Product Designer, working closely with the Lead Product Designer to build and complete much of the product in Figma. <br /><br />Many foundational decisions were made together, including its Atomic Design structure. I was deeply involved in turning those decisions into a working system, building components, pages, flows and real scenarios across desktop, mobile and tablet.</>, tags: ["Product Design"], hold: 1.6 },
  { phase: "2021 · Taking ownership", headline: "From building the system to leading its evolution.", body: <>After the Lead Product Designer left, I took ownership of WAND’s design direction. <br /><br />My focus expanded from building within the system to identifying and solving the product, scalability and workflow problems becoming more visible as WAND grew.</>, tags: ["Product Design", "Design Leadership"], hold: 1.25 },
  { phase: "2022 · Scaling with the business", headline: "More clients. More brands. More complexity.", body: <>Commercial growth brought increasingly different requirements across brands and markets. <br /><br />WAND needed to support greater customisation, dark experiences and different navigation patterns while continuing to deliver new casinos efficiently.</>, tags: ["Multi-brand", "Customisation", "Scale"], hold: 1.2 },
  { phase: "2023–2024 · Extending the platform", headline: "One foundation needed to support much more.", body: <>WAND evolved beyond the experience it had originally been built around. <br /><br />Alternative navigation, Sweepstakes, new transactional flows and more flexible configuration had to coexist within the same system, without creating additional product sources the team couldn’t realistically maintain.</>, tags: ["Top nav", "Sweepstakes", "Configuration"], hold: 1.3 },
  { phase: "2024–2025 · Reaching the limit", headline: "Eventually, evolution wasn’t enough.", body: <>WAND continued supporting commercial opportunities and client launches, but its underlying architecture was reaching its limits. <br /><br />In 2024, we began designing a new platform from the ground up while WAND continued supporting the business.</>, tags: ["WAND", "XSITE"], hold: 1.65 },
];

function ArrowLeft() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M28 16H5M13 8l-8 8 8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }
function Arrow() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 16h23M19 8l8 8-8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }
function VisualCrop({ src, className = "", alt, width = 1672, height = 941 }: { src: string; className?: string; alt: string; width?: number; height?: number }) { return <figure className={`wand-visual ${className}`} data-wand-visual><img src={`${A}${src}`} alt={alt} width={width} height={height} /></figure>; }

export default function WandCaseStudy() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  // Below desktop the milestones are a native horizontal swipe track; keep the pager in sync.
  function syncMilestone() {
    const el = track.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const nearest = cards.reduce((best, card, index) => Math.abs(card.offsetLeft - el.scrollLeft) < Math.abs(cards[best].offsetLeft - el.scrollLeft) ? index : best, 0);
    setActiveMilestone(nearest);
  }
  function goToMilestone(index: number) {
    const card = track.current?.children[index] as HTMLElement | undefined;
    if (card && track.current) track.current.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(track.current).paddingLeft), behavior: "smooth" });
  }
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", (media) => {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(".wand-hero", { opacity: 0, duration: 1.3, ease: "power1.out" }, 0)
          .from(".wand-hero__banner", { clipPath: "inset(0 0 100% 0)", scale: 1.05, duration: 1.5 }, .15)
          .fromTo(".wand-hero__banner-glint", { xPercent: -120 }, { xPercent: 220, duration: 1.4, ease: "power2.inOut" }, .3)
          .from(".wand-hero h1 span", { yPercent: 105, duration: 1.2, stagger: .1 }, .6)
          .from(".wand-hero__meta > div", { y: 34, opacity: 0, duration: .9, stagger: .14 }, 1.15);

        revealText(media, root.current!, {
          label: ".wand-section .wand-label",
          heading: ".wand-section h2",
          body: ".wand-challenge header > p:not(.wand-label), .wand-approach div > p:not(.wand-label), .wand-approach footer, .wand-feature__copy :is(h3,p), .wand-interlude footer, .wand-brands header > p:not(.wand-label), .wand-results__intro > p:not(.wand-label), .wand-behind__copy p, .wand-behind > a",
          card: ".wand-challenge article, .wand-result",
        }, ".wand-evolution, .wand-result");
        // The evolution intro enters like every other block (the milestones themselves are driven by the pinned timeline on desktop).
        revealText(media, root.current!, { label: ".wand-evolution__intro .wand-label", heading: ".wand-evolution__intro h2", body: ".wand-evolution__intro > p, .wand-evolution__intro .wand-scroll-hint" });

        // Each chart plays when it arrives: both bars rise to the "before" height, then the
        // "after" bar drops to its real value while the number counts down and the bar flares.
        gsap.utils.toArray<HTMLElement>(".wand-result").forEach((result) => {
          const before = result.querySelector<HTMLElement>(".wand-result-chart__before")!;
          const after = result.querySelector<HTMLElement>(".wand-result-chart__after")!;
          const numbers = result.querySelectorAll<HTMLElement>(".wand-result-chart strong");
          const labels = result.querySelectorAll<HTMLElement>(".wand-result-chart small");
          const from = Number(numbers[0].textContent);
          const to = Number(numbers[1].textContent);
          const ratio = before.offsetHeight / Math.max(after.offsetHeight, 1);
          const counter = { value: 0 };
          const write = (el: HTMLElement, value: number) => { el.textContent = String(Math.round(value)); };
          write(numbers[0], 0); write(numbers[1], 0);
          gsap.set([before, after], { scaleY: 0 });
          gsap.set(labels, { y: 10, opacity: 0 });
          const chart = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          ScrollTrigger.create({ trigger: result, start: "top 80%", once: true, onEnter: () => { chart.play(); } });
          chart
            .to(before, { scaleY: 1, duration: 1.3 }, .15)
            .to(counter, { value: from, duration: 1.3, ease: "power2.out", onUpdate: () => write(numbers[0], counter.value) }, .15)
            .to(after, { scaleY: ratio, duration: 1.3 }, .38)
            .to(counter, { value: from, duration: 1.3, ease: "power2.out", onUpdate: () => write(numbers[1], counter.value) }, .38)
            .to(labels, { y: 0, opacity: 1, duration: .75, stagger: .13, ease: "power2.out" }, .62)
            .to(after, { scaleY: 1, duration: 1.4, ease: "power3.inOut" }, 1.8)
            .to(counter, { value: to, duration: 1.4, ease: "power3.inOut", onUpdate: () => write(numbers[1], counter.value) }, 1.8)
            .fromTo(after, { filter: "brightness(1.7) drop-shadow(0 0 0 rgba(20,90,255,0))" }, { immediateRender: false, filter: "brightness(1.3) drop-shadow(0 0 24px rgba(20,90,255,.8))", duration: .6, ease: "power2.out" }, 1.85)
            .to(after, { filter: "brightness(1) drop-shadow(0 0 0 rgba(20,90,255,0))", duration: 1.3, ease: "power2.inOut" }, 2.45)
            .fromTo(numbers[1], { scale: 1 }, { immediateRender: false, scale: 1.25, color: "#8fb2ff", duration: .35, yoyo: true, repeat: 1, ease: "power2.inOut" }, 2.9);
          chart.eventCallback("onComplete", () => { gsap.set([before, after], { clearProps: "transform,filter" }); gsap.set(numbers, { clearProps: "transform,color" }); });
        });

        entrance(".wand-behind__portrait", "top 92%", (timeline) => reveal(timeline, ".wand-behind__portrait", { scale: .65, opacity: 0, clipPath: "circle(0% at 50% 50%)" }, { scale: 1, opacity: 1, clipPath: "circle(71% at 50% 50%)", duration: 1.3, ease: "power2.out", clearProps: "transform,opacity,clipPath" }));

        gsap.utils.toArray<HTMLElement>(".wand-feature").forEach((section, index) => {
          const visual = section.querySelector<HTMLElement>(".wand-visual");
          const masks = ["inset(100% 0 0 0)", "inset(0 100% 0 0)", "inset(0 0 0 100%)", "inset(0 0 100% 0)"];
          const isNavigation = section.classList.contains("wand-feature--navigation");
          const isDarkMode = section.classList.contains("wand-feature--dark-mode");
          const isSweepstakes = section.classList.contains("wand-feature--sweepstakes");
          const visualX = isNavigation ? -90 : isSweepstakes ? 90 : index === 1 ? -90 : index === 2 ? 90 : 0;
          const visualY = isDarkMode ? 100 : index === 0 ? 110 : 0;
          const visualMask = isNavigation ? "inset(0 100% 0 0)" : isDarkMode ? "inset(100% 0 0 0)" : isSweepstakes ? "inset(0 0 0 100%)" : masks[index % masks.length];
          if (visual) entrance(visual, "top 94%", (timeline) => reveal(timeline, visual, { clipPath: visualMask, x: visualX, y: visualY, scale: 1.05 }, { clipPath: "inset(0% 0% 0% 0%)", x: 0, y: 0, scale: 1, duration: 1.5, ease: "power2.out", clearProps: "clipPath,transform" }));
        });

        animateKit(media);
      });
      // Below desktop the milestones are a native swipe track, not a pinned timeline: it rises in as one card.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", (media) => {
        revealText(media, root.current!, { card: ".wand-timeline" });
      });
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".wand-approach > span", { scale: .7, xPercent: -4, opacity: .3 }, { scale: 1.08, xPercent: 4, opacity: 1, ease: "none", scrollTrigger: { trigger: ".wand-approach", start: "top bottom", end: "bottom top", scrub: 1.1 } });
        gsap.fromTo(".wand-interlude > span", { scale: .72, xPercent: -5, opacity: .28 }, { scale: 1.08, xPercent: 5, opacity: 1, ease: "none", scrollTrigger: { trigger: ".wand-interlude", start: "top bottom", end: "bottom top", scrub: 1.1 } });
        gsap.utils.toArray<HTMLElement>(".wand-visual img").forEach((image) => gsap.fromTo(image, { scale: 1.08 }, { scale: 1, ease: "none", scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } }));
        gsap.fromTo(".wand-visual--navigation img", { xPercent: -3.5 }, { xPercent: 2.5, ease: "none", scrollTrigger: { trigger: ".wand-feature--navigation", start: "top bottom", end: "bottom top", scrub: 1.15 } });
        gsap.fromTo(".wand-visual--dark-mode img", { yPercent: 4.5 }, { yPercent: -3.5, ease: "none", scrollTrigger: { trigger: ".wand-feature--dark-mode", start: "top bottom", end: "bottom top", scrub: 1.15 } });
        gsap.fromTo(".wand-visual--sweepstakes img", { yPercent: 5, rotate: -.35 }, { yPercent: -4, rotate: .35, ease: "none", scrollTrigger: { trigger: ".wand-feature--sweepstakes", start: "top bottom", end: "bottom top", scrub: 1.15 } });
        gsap.fromTo(".wand-behind__portrait img", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".wand-behind", start: "top bottom", end: "bottom top", scrub: 1.15 } });
        const cards = gsap.utils.toArray<HTMLElement>(".wand-milestone");
        gsap.set(cards, { yPercent: 120, opacity: 0 });
        gsap.set(cards[0], { yPercent: 0, opacity: 1 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: ".wand-evolution", start: "top top", end: "+=430%", pin: ".wand-evolution__stage", scrub: .9, invalidateOnRefresh: true } });
        milestones.forEach((milestone, index) => {
          timeline.to({}, { duration: milestone.hold });
          if (index === milestones.length - 1) return;
          const at = timeline.duration();
          timeline.to(cards[index], { yPercent: -108, opacity: 0, duration: 1.05, ease: "power2.out" }, at)
            .to(cards[index + 1], { yPercent: 0, opacity: 1, duration: 1.1, ease: "power2.out" }, at)
            .to(".wand-timeline__progress", { scaleY: (index + 1) / (milestones.length - 1), duration: 1, ease: "none" }, at);
        });
      });
      return () => mm.revert();
    }, root);
    const releaseScroll = startAtTop();
    return () => { releaseScroll(); context.revert(); };
  }, []);

  return <main className="wand" id="main-content" ref={root}>
    <header className="wand-nav"><Link href="/" aria-label="Back to María Mora portfolio"><img src={`${A}maria-logo-white.svg`} alt="" width="402" height="324" /></Link><Link className="wand-nav__back" href="/"><ArrowLeft /><span>Back to home</span></Link></header>

    <section className="wand-hero" aria-labelledby="wand-title">
      <div className="wand-hero__banner"><img src={`${A}wand-hero-banner-v2.webp`} alt="WAND white-label casino platform" width="1550" height="285" /><i className="wand-hero__banner-glint" aria-hidden="true" /><Wip /></div>
      <h1 id="wand-title"><span>Evolving a white-label casino</span>{" "}<span>into a scalable <em>multi-brand</em> platform.</span></h1>
      <div className="wand-hero__meta"><div><small>Scope</small><p>Design System · Multi-brand Customisation ·<br />Product Evolution · Client & Delivery Workflows</p></div><div><small>Role</small><p>Product Design → Design Leadership</p></div><div><small>Timeline</small><p>2019–2025</p></div></div>
      <i className="wand-hero__divider" aria-hidden="true" />
    </section>

    <section className="wand-challenge wand-section" aria-labelledby="challenge-title">
      <header data-wand-reveal><p className="wand-label">The challenge</p><h2 id="challenge-title">Scale exposed the cracks.</h2><p>Three problems became increasingly difficult to ignore.</p></header>
      <div className="wand-challenge__grid">
        <article data-wand-reveal><strong>01</strong><small>Incomplete</small><h3>Design didn’t fully reflect the live product.</h3><p>Missing pages, flows, states and outdated components made Design an unreliable reference.</p></article>
        <article data-wand-reveal><strong>02</strong><small>Rigid</small><h3>One model could no longer fit every client.</h3><p>New brands required different navigation, themes and casino models the original foundation wasn’t built to support.</p></article>
        <article data-wand-reveal><strong>03</strong><small>Manual</small><h3>Every new brand required too much work.</h3><p>A standard branded casino could still take approximately 1–2 weeks to prepare.</p></article>
      </div>
    </section>

    <section className="wand-evolution" aria-labelledby="evolution-title"><div className="wand-evolution__stage wand-section">
      <header className="wand-evolution__intro"><p className="wand-label">The evolution</p><h2 id="evolution-title">From building <br />the system to leading <br />its <em>evolution.</em></h2><p>My relationship with WAND evolved alongside the product. What started as hands-on product design gradually expanded into ownership of its design direction.</p><span className="wand-scroll-hint"><i className="wand-mouse" aria-hidden="true"><i className="wand-mouse__wheel" /></i>Scroll to travel through time</span></header>
      <div className="wand-timeline"><div className="wand-timeline__line"><i className="wand-timeline__progress" /></div><div className="wand-timeline__viewport" ref={track} onScroll={syncMilestone} tabIndex={0} aria-label="Career milestones, swipe to explore">{milestones.map((milestone, index) => <article className="wand-milestone" key={milestone.phase}><i className="wand-milestone__node" aria-hidden="true" /><p className="wand-milestone__phase">{milestone.phase}</p><h3>{milestone.headline}</h3><div className="wand-milestone__body">{milestone.body}</div><ul className="wand-milestone__tags" aria-label="Disciplines">{milestone.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><span className="sr-only">Milestone {index + 1} of {milestones.length}</span></article>)}</div><div className="wand-timeline__pager"><span aria-live="polite">{String(activeMilestone + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}</span><div>{milestones.map((milestone, index) => <button key={milestone.phase} type="button" aria-label={`Show ${milestone.phase}`} aria-current={activeMilestone === index ? "true" : undefined} onClick={() => goToMilestone(index)} />)}</div><em>Swipe</em></div></div>
    </div></section>

    <section className="wand-approach wand-section" aria-labelledby="approach-title"><span aria-hidden="true">BUILD</span><div data-wand-reveal><p className="wand-label">The approach</p><h2 id="approach-title">Complete. Configure. Connect.</h2><p>WAND couldn’t stop while we redesigned it. Clients were being pitched, casinos were launching and new requirements kept arriving.</p><p>The goal wasn’t to rebuild WAND from scratch. <br />It was to strengthen the product while the business kept moving.</p><footer>UX problems <i /> Client needs <i /> System limitations <i /> New business models</footer></div></section>

    <section className="wand-feature wand-section" aria-labelledby="complete-title"><header data-wand-reveal><p className="wand-label">01 &nbsp; Complete</p><h2 id="complete-title">From incomplete <br />to reliable.</h2></header><div className="wand-feature__copy"><p>WAND’s design source was incomplete and still based in Sketch. Pages, flows, states and parts of the live product existed only in code.</p><p>I rebuilt and completed the product in Figma, bringing missing components, pages, flows, states and edge cases into one reliable design reference.</p></div><VisualCrop src="wand-visual-complete-v2.webp" className="wand-visual--complete" alt="WAND design system UI kit and component library" /></section>

    <section className="wand-feature wand-feature--split wand-section" aria-labelledby="configure-title"><VisualCrop src="wand-visual-configure-v2.webp" className="wand-visual--configure" alt="WAND Figma variables controlling colour and typography" /><div data-wand-reveal><p className="wand-label">02 &nbsp; Configure</p><h2 id="configure-title">Configuring <br />brands at scale.</h2><div className="wand-feature__copy"><p>I built a flexible design system using Figma variables to support multiple brands, themes and markets across products.</p><p>This reduced duplication, improved consistency and made it easier to design and ship new brands.</p></div></div></section>

    <section className="wand-feature wand-feature--connect wand-section" aria-labelledby="connect-title"><div data-wand-reveal><p className="wand-label">03 &nbsp; Connect</p><h2 id="connect-title">Bringing clients <br />into the product earlier.</h2><div className="wand-feature__copy"><p>I created branded previews and presentation materials that helped Sales discuss the product with clients before implementation.</p><p>Clients could understand what could be customised, while Design and Engineering received clearer inputs earlier in the process.</p></div></div><Placeholder className="wand-connect-placeholder" description="Branded client previews and presentation materials" /></section>

    <section className="wand-interlude wand-section" aria-labelledby="problems-title"><span aria-hidden="true">EVOLVE</span><div><p className="wand-label">The expansion</p><h2 id="problems-title">As WAND grew, new problems emerged.</h2><footer>UX problems <i /> Client needs <i /> System limitations <i /> New business models</footer></div></section>

    <section className="wand-feature wand-feature--cashier wand-section" aria-labelledby="cashier-title"><div data-wand-reveal><p className="wand-label">01 · Cashier</p><h2 id="cashier-title">Improving usability without rebuilding the experience.</h2><div className="wand-feature__copy"><p>The Cashier evolved across several parts of the experience, from bonus discovery to payment methods and key flows.</p><p>I improved hierarchy and interactions while working within the existing architecture.</p></div></div><VisualCrop src="wand-visual-cashier-v2.webp" className="wand-visual--cashier" alt="WAND mobile Cashier journey from deposit to confirmation" /></section>

    <section className="wand-feature wand-feature--navigation wand-section" aria-labelledby="navigation-title"><VisualCrop src="wand-navigation-models.webp" className="wand-visual--navigation" alt="Top, sidebar and bottom navigation models built from the same WAND foundation" width={960} height={760} /><div data-wand-reveal><p className="wand-label">02 · Navigation Models</p><h2 id="navigation-title">Different navigation. <br />Same foundation.</h2><div className="wand-feature__copy"><p>The original sidebar remained unchanged, while we introduced top navigation as an alternative. This gave us the opportunity to improve the top bar and design a more modern secondary sidebar, accessible through the burger menu.</p><p>Using Figma Variables, we built both navigation models into the same system, allowing us to switch between them quickly without updating every page manually.</p></div></div></section>

    <section className="wand-feature wand-feature--dark-mode wand-section" aria-labelledby="dark-mode-title"><header data-wand-reveal><p className="wand-label">03 · Product Evolution</p><h2 id="dark-mode-title">Dark Mode</h2></header><div className="wand-feature__copy wand-feature__copy--paired"><div><h3>Removing a limitation in the colour system.</h3><p>The existing colour system hadn’t been designed to support Dark Mode. Colours were too tightly connected to individual UI values, making it difficult to introduce another theme consistently across the product.</p></div><div><h3>Building theme behaviour into the system.</h3><p>I reworked the colour structure together with Engineering so the interface could respond to different themes systematically rather than requiring screen-by-screen adjustments.</p></div></div><VisualCrop src="wand-dark-mode.webp" className="wand-visual--dark-mode" alt="WAND casino interface shown in light and dark themes" width={940} height={710} /></section>

    <section className="wand-feature wand-feature--sweepstakes wand-section" aria-labelledby="sweepstakes-title"><div data-wand-reveal><p className="wand-label">04 · Sweepstakes</p><h2 id="sweepstakes-title">Extending the system to support a new business model.</h2><div className="wand-feature__copy"><p>When Sweepstakes became a new business requirement, creating a separate design foundation wasn’t an option. I integrated it into the existing Real Money Casino system, adapting flows and components.</p><p>I worked on key areas such as the Cashier and coin switcher, while creating the new pages needed to support the model, primarily for US clients.</p></div></div><VisualCrop src="wand-sweepstakes.webp" className="wand-visual--sweepstakes" alt="WAND Sweepstakes purchase experience with gold and sweep coins" width={760} height={690} /></section>

    <section className="wand-brands wand-section" aria-labelledby="brands-title">
      <header data-wand-reveal><p className="wand-label">Brand customisation</p><h2 id="brands-title">One system. <br />Many <em>brands.</em></h2><p>Every one of them customised from the same foundation, without a separate design source per client.</p></header>
      {/* The approved laptop mock-up of the customised brands is still pending; until it arrives the
          section leads with the numbers themselves rather than a placeholder frame. */}
      <Stats items={[{ value: "43", label: "Brands designed or pitched" }, { value: "22", label: "Brands launched" }]} />
    </section>

    <section className="wand-results wand-section" aria-labelledby="results-title">
      <div className="wand-results__intro"><p className="wand-label">Results</p><h2 id="results-title">From weeks to <em>days.</em></h2><p>By making WAND more configurable and completing its pages and flows, we removed much of the manual work involved in preparing each new brand.</p><p>Figma Variables, clearer client documentation and the Demo Casino Customiser reduced unnecessary iterations and helped us deliver complete branded casinos much earlier.</p></div>
      <div className="wand-results__metrics">
        <article className="wand-result"><div><p className="wand-label">Proposals</p><h3>5 days <span>→</span> 0 days</h3><p>Separate initial proposal stage no longer required.</p></div><div className="wand-result-chart" role="img" aria-label="Proposals reduced from five days to zero days"><span><strong>5</strong><i className="wand-result-chart__before" /><small>Before</small></span><span><strong>0</strong><i className="wand-result-chart__after is-zero" /><small>After</small></span></div></article>
        <article className="wand-result"><div><p className="wand-label">Full skinning</p><h3>5 days <span>→</span> 3 days</h3><p>Time to complete the full casino design and build.</p></div><div className="wand-result-chart" role="img" aria-label="Full skinning reduced from five days to three days"><span><strong>5</strong><i className="wand-result-chart__before" /><small>Before</small></span><span><strong>3</strong><i className="wand-result-chart__after is-three" /><small>After</small></span></div></article>
        <article className="wand-result"><div><p className="wand-label">Client feedback</p><h3>5 days <span>→</span> 2 days</h3><p>Time to implement client feedback. <br />Timing varied by client.</p></div><div className="wand-result-chart" role="img" aria-label="Client feedback implementation reduced from five days to two days"><span><strong>5</strong><i className="wand-result-chart__before" /><small>Before</small></span><span><strong>2</strong><i className="wand-result-chart__after is-two" /><small>After</small></span></div></article>
      </div>
    </section>

    <section className="wand-behind wand-section" aria-labelledby="behind-title"><p className="wand-label">Behind the work</p><figure className="wand-behind__portrait"><img src={`${A}maria-portrait.jpg`} alt="María Mora" width="600" height="600" /></figure><h2 id="behind-title">Want to see how it <em>really</em> works?</h2><div className="wand-behind__copy"><p>Due to confidentiality and intellectual property restrictions, <br />I can’t share WAND’s full Design System publicly.</p><p>I’d be happy to walk you through its Figma architecture, <br />components and key design decisions in an interview, <br />and answer any questions you may have.</p></div><a href="mailto:moragarciamaria@gmail.com?subject=WAND%20Design%20System">Let’s talk <Arrow /></a></section>

    <NextCase href="/work/customiser" title={<>Demo Casino <br />Customiser.</>} lede="Would you like to know how we solve one of the product’s biggest commercial problems?" banner="customiser-hero-banner-v2.jpg" bannerWidth={2171} bannerHeight={401} />
  </main>;
}
