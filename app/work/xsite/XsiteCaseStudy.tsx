"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Figure, NextCase, Phones, Placeholder, Wip, animateKit, entrance, reveal, revealText, startAtTop } from "../CaseKit";

const A = "/portfolio/assets/";

const challenges = [
  { number: "01", label: "Inconsistent", title: "Some design improvements couldn’t make it into the product.", body: ["Over time, we identified and redesigned inconsistencies across pages, components and interaction patterns. However, limited Development resources meant that not all of those improvements could be implemented in WAND.", "As the product continued to evolve, some inconsistencies therefore had to remain in the live platform."] },
  { number: "02", label: "Difficult to scale", title: "Every new requirement added more complexity.", body: ["New features and requirements had been added over several years to foundations that were not designed for the scale the product eventually reached.", "Extending the platform while maintaining consistent patterns and behaviour was becoming increasingly difficult."] },
  { number: "03", label: "Constrained", title: "Design and technology were both reaching their limits.", body: ["The platform had technical and maintenance constraints, while its original design foundations were no longer suited to the complexity of a growing multi-brand product.", "I had advocated for improving or rebuilding WAND for years. When GiG decided to create XSITE, we finally had the opportunity to address those problems at the foundation instead of continuing to work around them."] },
];
// María's seven steps, placed in the four phases of the Design Council's Double Diamond
// (problem space: Discover, Define; solution space: Develop, Deliver), with Build as the outcome.
const phases = [
  { name: "Discover", steps: ["Research"] },
  { name: "Define", steps: ["Define"] },
  { name: "Develop", steps: ["Explore", "Validate"] },
  { name: "Deliver", steps: ["Design", "Document"] },
];
const pipeline = ["Figma Variables", "Custom Plugin", "JSON", "Development", "Product"];
const delivered = ["Main product pages", "Product flows", "Edge cases and alternative states", "Design System", "Component documentation", "White-label and variable architecture", "Design to Development configuration workflow"];

function ArrowLeft() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M28 16H5M13 8l-8 8 8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }
function Arrow() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 16h23M19 8l8 8-8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }
function Check() { return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10.5l3.6 3.6L16 5.7" stroke="currentColor" strokeWidth="1.5" /></svg>; }

export default function XsiteCaseStudy() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px)" }, (media) => {
        const { motion, desktop } = media.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(".xs-hero", { opacity: 0, duration: 1.3, ease: "power1.out" }, 0)
          .from(".xs-hero__band", { clipPath: "inset(0 0 100% 0)", scale: 1.05, duration: 1.5 }, .15)
          .fromTo(".xs-hero__glint", { xPercent: -120 }, { xPercent: 220, duration: 1.4, ease: "power2.inOut" }, .35)
          .from(".xs-hero h1 span", { yPercent: 105, duration: 1.2, stagger: .1 }, .7)
          .from(".xs-hero__lede", { y: 30, opacity: 0, duration: 1 }, 1.1)
          .from(".xs-hero__meta > div", { y: 34, opacity: 0, duration: .9, stagger: .12 }, 1.3);

        revealText(media, root.current!, {
          label: ".xs-section .xs-label",
          heading: ".xs-section h2, .xs-section h3",
          body: ".xs-section p:not(.xs-label):not(.xs-count), .xs-process figcaption, .xs-behind > a",
          card: ".xs-challenge__grid article, .xs-sources > div",
          item: ".xs-pipeline li, .xs-checklist li",
          number: ".xs-count strong",
        }, ".xs-challenge__grid article, .xs-sources > div");
        entrance(".xs-behind__portrait", "top 92%", (timeline) => reveal(timeline, ".xs-behind__portrait", { scale: .65, opacity: 0, clipPath: "circle(0% at 50% 50%)" }, { scale: 1, opacity: 1, clipPath: "circle(71% at 50% 50%)", duration: 1.3, ease: "power2.out", clearProps: "transform,opacity,clipPath" }));
        // The link between the two Figma sources draws itself once both cards are in.
        entrance(".xs-sources", "top 85%", (timeline) => reveal(timeline, ".xs-sources > i", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1, delay: .5, ease: "power3.inOut", clearProps: "transform,opacity" }));

        // "32+" counts up as it grows, like the home page's metrics.
        let restoreCount: (() => void) | undefined;
        const count = root.current!.querySelector<HTMLElement>(".xs-count strong");
        const countMatch = count?.textContent?.match(/^(\d+)(.*)$/);
        if (count && countMatch) {
          const target = Number(countMatch[1]), suffix = countMatch[2], value = { number: 0 };
          count.textContent = `0${suffix}`;
          gsap.to(value, { number: target, duration: 1.6, delay: .15, ease: "power2.out", scrollTrigger: { trigger: count, start: "top bottom", once: true },
            onUpdate: () => { count.textContent = `${Math.round(value.number)}${suffix}`; },
            onComplete: () => { count.textContent = `${target}${suffix}`; } });
          restoreCount = () => { count.textContent = `${target}${suffix}`; };
        }

        // The three aims rise out of a mask one after another, each dot arriving between them.
        const triad = root.current!.querySelector<HTMLElement>(".xs-triad");
        if (triad) {
          const words = triad.querySelectorAll("li > span > span");
          const dots = triad.querySelectorAll("li > i");
          entrance(triad, "top 85%", (aims) => words.forEach((word, index) => {
            reveal(aims, word, { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, index * .5);
            if (dots[index]) reveal(aims, dots[index], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, ease: "back.out(2)" }, index * .5 + .38);
          }));
        }

        // Process: the rule draws itself, then each phase (dot, name, steps) arrives in order.
        const track = root.current!.querySelector<HTMLElement>(".xs-process__track");
        if (track) {
          const vertical = window.matchMedia("(max-width: 680px)").matches;
          const phasesIn = track.querySelectorAll<HTMLElement>(".xs-process__list li");
          entrance(track, "top 85%", (timeline) => {
            reveal(timeline, track.querySelector(".xs-process__rule"), vertical ? { scaleY: 0, transformOrigin: "50% 0%" } : { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, scaleY: 1, duration: 1.4, ease: "power2.inOut", clearProps: "transform" });
            phasesIn.forEach((phase, index) => {
              const at = .25 + index * .2;
              reveal(timeline, phase.querySelector("i"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, ease: "back.out(2)", clearProps: "transform,opacity" }, at);
              reveal(timeline, phase.querySelectorAll("b, span"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .08, ease: "power3.out", clearProps: "transform,opacity" }, at + .08);
            });
          });
        }

        animateKit(media);

        if (desktop) {
          gsap.fromTo(".xs-approach > span", { scale: .7, xPercent: -4, opacity: .3 }, { scale: 1.08, xPercent: 4, opacity: 1, ease: "none", scrollTrigger: { trigger: ".xs-approach", start: "top bottom", end: "bottom top", scrub: 1.1 } });
          gsap.fromTo(".xs-hero__band img", { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: ".xs-hero", start: "top top", end: "bottom top", scrub: 1 } });
          gsap.fromTo(".xs-behind__portrait img", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".xs-behind", start: "top bottom", end: "bottom top", scrub: 1.15 } });
        }
        return () => restoreCount?.();
      });
      return () => mm.revert();
    }, root);
    const releaseScroll = startAtTop();
    return () => { releaseScroll(); context.revert(); };
  }, []);

  return <main className="xs" id="main-content" ref={root}>
    <header className="xs-nav"><Link href="/" aria-label="Back to María Mora portfolio"><img src={`${A}maria-logo-white.svg`} alt="" width="402" height="324" /></Link><Link className="xs-nav__back" href="/"><ArrowLeft /><span>Back to home</span></Link></header>

    <section className="xs-hero" aria-labelledby="xs-title">
      <div className="xs-hero__band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}xsite-hero-banner-v2.jpg`} width={2171} height={395} alt="XSITE" fetchPriority="high" />
        <i className="xs-hero__glint" aria-hidden="true" />
        <Wip />
      </div>
      <h1 id="xs-title"><span>Rebuilding a white-label casino</span>{" "}<span>from the <em>foundations.</em></span></h1>
      <p className="xs-hero__lede">I led the Design approach for XSITE, GiG’s new casino platform, replacing a legacy product with a more consistent, scalable and configurable foundation.</p>
      <div className="xs-hero__meta">
        <div><small>Scope</small><p>Product Design · Design Leadership · <br />White-label Platform · Design Systems</p></div>
        <div><small>Role</small><p>Lead Product Designer</p></div>
        <div><small>Team</small><p>2 Product Designers · 1 Part-time Product Designer · 1 Graphic Designer</p></div>
        <div><small>Collaboration</small><p>Product · Frontend · Engineering</p></div>
      </div>
      <i className="xs-hero__divider" aria-hidden="true" />
    </section>


    <section className="xs-challenge xs-section" aria-labelledby="challenge-title">
      <header><p className="xs-label">The challenge</p><h2 id="challenge-title">Evolution had reached <em>its limit.</em></h2><p>WAND had supported GiG’s casino business for years, but as the product grew, several connected problems became increasingly difficult to solve within its existing foundations.</p></header>
      <div className="xs-challenge__grid">
        {challenges.map((item) => <article key={item.number}><strong>{item.number}</strong><small>{item.label}</small><h3>{item.title}</h3>{item.body.map((text) => <p key={text.slice(0, 24)}>{text}</p>)}</article>)}
      </div>
    </section>

    <section className="xs-role xs-section" aria-labelledby="role-title">
      <header className="xs-block xs-block--top"><div><p className="xs-label">My role</p><h2 id="role-title">Leading the design approach, <em>not just the output.</em></h2></div><div>
        <p>I participated in the initial XSITE discussions with a Product brief already in place. My responsibility was to define how Design would approach the rebuild and lead the work through to an implementation-ready solution.</p>
        <p>I set the Design direction, coordinated and reviewed the team’s work, challenged Product solutions when needed, and worked with Product and Engineering to address technical constraints before designs entered the system.</p>
        <p>I also structured the Design work in Jira so it was visible within the wider product roadmap. I created Design Epics and linked them to the corresponding Development Epics, giving us a shared view of Design and Engineering progress and a clearer picture of how the overall project was moving.</p>
        <p>I presented progress to directors weekly, keeping key decisions, dependencies and project status visible as XSITE evolved.</p>
      </div></header>
    </section>

    <section className="xs-approach xs-section" aria-labelledby="approach-title"><span aria-hidden="true">XSITE</span><div>
      <p className="xs-label">The approach</p>
      <h2 id="approach-title">Designing the product and <em>the system together.</em></h2>
      <p>XSITE wasn’t approached as a collection of new screens. We needed to define how the product should work while creating foundations that could support different brands, new requirements and future product verticals.</p>
      <p>Our overall process followed a simple product design cycle:</p>
      <figure className="xs-process">
        <div className="xs-process__track">
          <i className="xs-process__rule" aria-hidden="true" />
          <ol className="xs-process__list" aria-label="Design process, in the four phases of the Double Diamond">
            {phases.map((phase) => <li key={phase.name}><i aria-hidden="true" /><b>{phase.name}</b><span>{phase.steps.join(" · ")}</span></li>)}
            <li className="xs-process__outcome"><i aria-hidden="true" /><b>Build</b><span>Outcome</span></li>
          </ol>
        </div>
        <figcaption>Research → Define → Explore → Validate → Design → Document → Build, in the four phases of the Double Diamond.</figcaption>
      </figure>
      <p>Product and Engineering were involved throughout the process. Proposals were reviewed against product requirements and technical feasibility before they became part of the platform or Design System.</p>
    </div></section>

    <section className="xs-market xs-section" aria-labelledby="market-title">
      <header className="xs-block xs-block--top"><div><h3 id="market-title">Understanding the market</h3><p className="xs-count"><strong>32+</strong><span>Casino products in our reference set</span></p></div><div>
        <p>We maintained a reference set of more than <strong>32 casino products</strong> and expanded our research depending on the problem we were solving.</p>
        <p>This covered areas such as navigation, search, game recommendation engines, promotions, bonuses, Cashier, filters, gamification and many other product patterns across the casino experience.</p>
        <p>One designer was particularly focused on competitive and market research, allowing us to explore individual areas in depth rather than relying on a single general competitor analysis.</p>
        <p>The goal wasn’t to copy existing products. We used the research to understand conventions, compare alternative approaches and inform the options we explored for XSITE.</p>
      </div></header>
      <Placeholder index="01" description="Gamification competitive research" />
    </section>

    <section className="xs-mobile xs-section" aria-labelledby="mobile-title">
      <header className="xs-block xs-block--top"><div><h3 id="mobile-title">Mobile first. <br /><em>Complete flows.</em></h3></div><div>
        <p>Mobile represented the large majority of usage across operators, so we solved flows primarily from mobile while defining their desktop behaviour in parallel.</p>
        <p>We designed complete flows rather than isolated screens, including alternative states and edge cases needed to define how the product should behave.</p>
      </div></header>
      <div className="xs-app">
        <p className="xs-label">The mobile app</p>
        <div className="xs-columns">
          <p>In parallel, we were applying the same Design System foundations to GiG’s mobile app. The app followed the same configuration approach while also requiring native Android and iOS components.</p>
          <p>This allowed web and app to share the same system foundations while accounting for the specific needs of each platform.</p>
        </div>
        <Phones index="02" caption="GiG’s mobile app: loyalty, promotions and shop." shots={[
          { src: "xsite-m-loyalty.webp", width: 360, height: 740, alt: "Mobile app loyalty programme showing the current Gold level and progress to Platinum" },
          { src: "xsite-m-promotions.webp", width: 360, height: 740, alt: "Mobile app promotions list with casino and live casino offers" },
          { src: "xsite-m-shop.webp", width: 360, height: 740, alt: "Mobile app shop with special offers paid in diamond coins" },
        ]} />
      </div>
    </section>

    <section className="xs-architecture xs-section" aria-labelledby="architecture-title">
      <header className="xs-block xs-block--top"><div><h2 id="architecture-title">Building for a product that needed to <em>keep growing.</em></h2></div><div>
        <p>The architecture of the Design work itself also needed to change.</p>
        <p>Instead of keeping the entire product in one Figma file, we separated XSITE into two connected sources.</p>
      </div></header>
      <div className="xs-sources" aria-label="The two connected Figma sources">
        <div><span>Source 01</span><strong>Design System + Documentation</strong></div>
        <i aria-hidden="true" />
        <div><span>Source 02</span><strong>Product Pages + Flows</strong></div>
      </div>
      <div className="xs-columns">
        <p>This solved the memory limitations we had experienced with larger Figma files and allowed both sides of the product to keep growing independently.</p>
        <p>The component catalogue could continue expanding without competing with increasingly complex product flows. At the same time, the product architecture could accommodate additional verticals, such as Bingo or Lottery, without returning to the same scalability problems.</p>
        <p>It also gave the team a clearer separation between system definition and product implementation.</p>
      </div>
      <Placeholder index="03" description="The two Figma files and what each one contains" />
    </section>

    <section className="xs-decisions xs-section" aria-labelledby="decisions-title">
      <header className="xs-block"><div><p className="xs-label">Product decisions</p><h2 id="decisions-title">Design wasn’t there just to <em>execute requirements.</em></h2></div><p>Rebuilding the platform gave us the opportunity to question existing patterns and proposed solutions before they became part of the new foundation.</p></header>

      <div className="xs-decision">
        <div><p className="xs-label">01 · Navigation</p><h3>One navigation model instead of two.</h3></div>
        <div>
          <p>Navigation was one of the areas we researched most extensively.</p>
          <p>We compared how different products structured primary navigation, mobile navigation and movement between product verticals before exploring alternatives for XSITE.</p>
          <p>WAND supported two independent navigation models. For XSITE, we moved towards a unified structure combining a <strong>Top Bar + Sidebar</strong>, creating one navigation foundation for the platform.</p>
        </div>
      </div>

      <div className="xs-decision">
        <div><p className="xs-label">02 · Casino + Sportsbook</p><h3>Designing beyond the immediate requirement.</h3></div>
        <div>
          <p>One of the key navigation questions was how users would move between Casino and Sportsbook.</p>
          <p>We researched how other products handled this and explored different approaches, including a sub-navigation solution. We challenged that direction because of space and clarity constraints, particularly on mobile.</p>
          <p>After discussions across teams, we aligned with the Sportsbook team on including Casino within their bottom navigation.</p>
          <p>For the sidebar, we designed a <strong>Product Switcher</strong> that could support Casino, Sportsbook and future verticals rather than limiting the model to the products available at that moment.</p>
        </div>
      </div>
      <Figure className="xs-switcher" src="xsite-visual-devices.jpg" width={1400} height={787} index="04" alt="The Product Switcher in the sidebar across desktop, mobile and the expanded menu" caption="The final Product Switcher, shared by desktop, mobile and the expanded menu." />

      <div className="xs-decision">
        <div><p className="xs-label">03 · Challenging Product requirements</p><h3>Not every initial proposal became part of XSITE.</h3></div>
        <div>
          <p>Product initially proposed opening the <strong>Cashier in a modal</strong>. Design challenged the solution and we aligned on integrating it into the right-side panel instead.</p>
          <p>Similarly, an initial proposal to display <strong>all bonuses simultaneously</strong> evolved into a dropdown solution after Design review.</p>
          <p>My role was to make sure important interaction decisions were questioned and discussed before becoming part of the platform.</p>
        </div>
      </div>
    </section>

    <section className="xs-whitelabel xs-section" aria-labelledby="whitelabel-title">
      <header className="xs-block"><div><p className="xs-label">White-label scalability</p><h2 id="whitelabel-title">One platform. <em>Many brand expressions.</em></h2></div><div>
        <p>XSITE needed to support different casino operators without turning every new brand into a separate product.</p>
        <p>That meant designing for three things at the same time.</p>
      </div></header>
      <ul className="xs-triad" aria-label="Designed for">{["Consistency", "Customisation", "Scalability"].map((word, index) => <li key={word}>{index > 0 && <i aria-hidden="true" />}<span><span>{word}</span></span></li>)}</ul>
      <div className="xs-columns">
        <p>We built the Design System around reusable components, documented behaviour and variables that could adapt the product to different brand configurations.</p>
        <p>The same underlying system could therefore produce casinos with different visual identities without changing the product foundation underneath them.</p>
      </div>
      <Placeholder index="05" description="The same XSITE screen in different brand configurations" />
    </section>

    <section className="xs-customisation xs-section" aria-labelledby="customisation-title">
      <header className="xs-block xs-block--top"><div><h2 id="customisation-title">Building customisation <em>into the system.</em></h2></div><div>
        <p>The colour architecture was reconsidered from the beginning to support multiple brands, semantic uses and light and dark modes.</p>
        <p>Variables allowed values to change depending on brand and context while keeping the underlying structure consistent.</p>
        <p>Components included reusable variants and states, so customisation was part of the system rather than something applied screen by screen.</p>
        <p>The goal wasn’t to make every casino look the same. It was to make different casinos possible without breaking the system underneath them.</p>
      </div></header>
      <Placeholder index="06" description="Variables, components and colour configuration" />
    </section>

    <section className="xs-handoff xs-section" aria-labelledby="handoff-title">
      <header className="xs-block"><div><p className="xs-label">Design ↔ Development</p><h2 id="handoff-title">Making configuration part of <em>the workflow.</em></h2></div><div>
        <p>A scalable white-label system also needed a better way to move configuration from Design into Development.</p>
        <p>We created our own Figma plugin to export the variables and configuration needed by Development.</p>
      </div></header>
      <ol className="xs-pipeline" aria-label="From Figma to product">{pipeline.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
      <div className="xs-columns">
        <p>Instead of manually translating values from Figma, the configuration could be exported as JSON and used by Development, reducing the manual work needed to reproduce brand settings.</p>
        <p>Specific client requirements could still require additional changes, but the standard configuration had a much more direct path from Design to implementation.</p>
        <p>The important part wasn’t the plugin itself. It was identifying a recurring handoff problem and turning it into a more scalable workflow between Design and Engineering.</p>
      </div>
    </section>

    <section className="xs-docs xs-section" aria-labelledby="docs-title">
      <header className="xs-block"><div><p className="xs-label">Documentation</p><h2 id="docs-title">Designing beyond <em>the screen.</em></h2></div><div>
        <p>Documentation was built into the system rather than added at the end.</p>
        <p>Components included their behaviour, variants, states and intended use, giving Development a reference they could consult directly in Figma.</p>
        <p>This made documentation part of the implementation workflow and helped keep the decisions made during Design visible when components moved into Development.</p>
      </div></header>
      <Placeholder index="07" description="A strong example of component documentation" />
    </section>

    <section className="xs-alignment xs-section" aria-labelledby="alignment-title">
      <header className="xs-block xs-block--top"><div><p className="xs-label">Keeping teams aligned</p><h2 id="alignment-title">Connecting Design, Product <em>and Engineering.</em></h2></div><div>
        <p>My role throughout XSITE was to keep the product moving across Design, Product and Engineering without losing sight of the bigger picture.</p>
        <p>The Design roadmap was integrated into the wider project planning through Jira. I created Design Epics and linked them directly to their Development counterparts, making dependencies and progress visible across both disciplines instead of managing Design as a separate track.</p>
        <p>I used that shared view to plan and prioritise Design work, coordinate the team and identify what needed to be ready for Development.</p>
        <p>Alongside this, I reviewed the team’s work, brought Product decisions back for discussion when needed, and reviewed technical feasibility with Engineering before approval.</p>
        <p>Once a solution was agreed, I made sure it was reflected consistently across product flows, the Design System and documentation.</p>
        <p>I worked closely with the Product Owner, Software Engineering Manager and Head of Frontend & Mobile, while weekly director reviews kept progress and key decisions visible beyond the immediate product team.</p>
      </div></header>
    </section>

    <section className="xs-status xs-section" aria-labelledby="status-title">
      <header><p className="xs-label">Where I left the project</p><h2 id="status-title">From product definition <em>to implementation.</em></h2><p>By the time I left GiG, the core XSITE experience and the foundations needed to build it had been defined.</p></header>
      <div className="xs-status__grid">
        <ul className="xs-checklist" aria-label="Defined before I left">{delivered.map((item) => <li key={item}><Check />{item}</li>)}</ul>
        <Figure className="xs-status__figure" src="xsite-visual-gamification.jpg" width={1600} height={900} index="08" alt="XSITE on mobile: VIP levels, race leaderboards and reward tiers" caption="XSITE on mobile: levels, races and rewards." />
      </div>
      <p className="xs-status__note">Development had started building XSITE when I left the company, so I did not observe the final live product or measure post-launch user or business results.</p>
    </section>

    <section className="xs-behind xs-section" aria-labelledby="behind-title"><p className="xs-label">Behind the work</p><figure className="xs-behind__portrait"><img src={`${A}maria-portrait.jpg`} alt="María Mora" width="600" height="600" /></figure><h2 id="behind-title">Want to see how it <em>really</em> works?</h2><div className="xs-behind__copy"><p>Due to confidentiality and intellectual property restrictions, I can’t share XSITE’s full Design System and product documentation publicly.</p><p>I’d be happy to walk you through its Figma architecture, components, variables, documentation and key product decisions in an interview, and answer any questions you may have.</p></div><a href="mailto:moragarciamaria@gmail.com?subject=XSITE">Let’s talk <Arrow /></a></section>

    <NextCase href="/work/wand" title={<>WAND.</>} lede="How an incomplete white-label casino became a scalable, multi-brand product platform." banner="wand-hero-banner-v2.webp" bannerWidth={1550} bannerHeight={285} />
  </main>;
}
