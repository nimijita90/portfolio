"use client";

/* Shared building blocks for the three case studies (WAND, Customiser, XSITE).
   Each case study keeps its own section styles; these pieces are the parts that
   must look and behave identically across all of them. Styles: case-kit.css. */

import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const A = "/portfolio/assets/";

function Arrow() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 16h23M19 8l8 8-8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }
function ArrowLeft() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M28 16H5M13 8l-8 8 8 8" stroke="currentColor" strokeWidth="1.25" /></svg>; }

/** Provisional-content note, pinned inside the hero banner so every hero keeps the same rhythm. */
export function Wip() {
  return <p className="ck-wip"><i aria-hidden="true" />In progress<span aria-hidden="true">·</span><em>Content and visuals are provisional</em></p>;
}

/** A plate: rounded image with an optional editorial caption ("01  Caption text"). */
export function Figure({ src, alt, width, height, caption, index, className = "", tone = "dark" }: {
  src: string; alt: string; width: number; height: number; caption?: string; index?: string; className?: string; tone?: "dark" | "light";
}) {
  return <figure className={`ck-figure ck-figure--${tone} ${className}`} data-ck-figure>
    <div className="ck-figure__media" style={{ aspectRatio: `${width} / ${height}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${A}${src}`} alt={alt} width={width} height={height} loading="eager" fetchPriority="low" decoding="async" />
    </div>
    {caption && <figcaption>{index && <span>{index}</span>}{caption}</figcaption>}
  </figure>;
}

/** Where a definitive image will go. Styled as an explicit placeholder, never as a fake
    screenshot, so nothing on the page pretends to be product imagery it isn't. */
export function Placeholder({ description, index, ratio = "16 / 9", className = "" }: {
  description: string; index?: string; ratio?: string; className?: string;
}) {
  return <figure className={`ck-figure ck-placeholder ${className}`} data-ck-figure>
    <div className="ck-figure__media ck-placeholder__frame" style={{ aspectRatio: ratio }} role="img" aria-label={`Image to come: ${description}`}>
      {index && <span className="ck-placeholder__index" aria-hidden="true">{index}</span>}
      <span className="ck-placeholder__tag" aria-hidden="true"><i />Image to come</span>
      <span className="ck-placeholder__text" aria-hidden="true">{description}</span>
    </div>
  </figure>;
}

/** Equal-height row of plates with different aspect ratios (flex-grow follows each ratio). */
export function Strip({ items, caption, index }: {
  items: { src: string; alt: string; width: number; height: number }[]; caption?: string; index?: string;
}) {
  return <figure className="ck-strip" data-ck-figure>
    <div className="ck-strip__row">
      {items.map((item) => <div key={item.src} className="ck-strip__item" style={{ flexGrow: item.width / item.height, aspectRatio: `${item.width} / ${item.height}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}${item.src}`} alt={item.alt} width={item.width} height={item.height} loading="eager" fetchPriority="low" decoding="async" />
      </div>)}
    </div>
    {caption && <figcaption>{index && <span>{index}</span>}{caption}</figcaption>}
  </figure>;
}

/** Real mobile screenshots presented inside device frames. */
export function Phones({ shots, caption, index }: {
  shots: { src: string; alt: string; width: number; height: number }[]; caption?: string; index?: string;
}) {
  return <figure className="ck-phones" data-ck-figure>
    <div className="ck-phones__row">
      {shots.map((shot) => <div key={shot.src} className="ck-phone">
        <div className="ck-phone__screen">
          <span className="ck-phone__bar" aria-hidden="true"><b>9:41</b><i /><span /></span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${A}${shot.src}`} alt={shot.alt} width={shot.width} height={shot.height} loading="eager" fetchPriority="low" decoding="async" />
        </div>
      </div>)}
    </div>
    {caption && <figcaption>{index && <span>{index}</span>}{caption}</figcaption>}
  </figure>;
}

/** Oversized figures with a short label — for facts, never for invented metrics. */
export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return <dl className="ck-stats">
    {items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
  </dl>;
}

/** Closing block linking to the next case study, identical on every case study. */
export function NextCase({ title, lede, href, banner, bannerWidth, bannerHeight }: {
  title: React.ReactNode; lede: string; href: string; banner: string; bannerWidth: number; bannerHeight: number;
}) {
  return <footer className="ck-next">
    <Link className="ck-next__link" href={href}>
      <span className="ck-next__label">Next case study</span>
      <span className="ck-next__title">{title}</span>
      <span className="ck-next__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}${banner}`} alt="" width={bannerWidth} height={bannerHeight} loading="lazy" decoding="async" />
      </span>
      <span className="ck-next__foot"><span className="ck-next__lede">{lede}</span><span className="ck-next__cta">View the case study <Arrow /></span></span>
    </Link>
    <Link className="ck-next__home" href="/"><ArrowLeft /> Back to home</Link>
  </footer>;
}

/* ---------------------------------------------------------------------------
   Motion. One vocabulary for all three case studies, taken from the home page:
   every element reveals when it reaches the viewport itself — never on a delay
   chained to its section — so fast readers never meet an invisible paragraph.
   Everything here runs inside the caller's reduced-motion-safe gsap.matchMedia
   branch; `ctx` is that branch's context, so late tweens are reverted with it.
--------------------------------------------------------------------------- */

const REVEAL = {
  label: { from: { opacity: 0, x: -36 }, to: { x: 0, duration: 1.05, ease: "power2.out" }, delay: 0 },
  heading: { from: { opacity: 0, y: 78, clipPath: "inset(0 0 100% 0)" }, to: { y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power2.out" }, delay: .05 },
  body: { from: { opacity: 0, y: 46 }, to: { y: 0, duration: 1.05, ease: "power2.out" }, delay: .12 },
  card: { from: { opacity: 0, y: 96, scale: .96 }, to: { y: 0, scale: 1, duration: 1.3, ease: "power3.out" }, delay: .08 },
  // Lists slide in from the side, one after another: the home page's awards and FAQ rows.
  item: { from: { opacity: 0, x: 56 }, to: { x: 0, duration: 1.1, ease: "power2.out" }, delay: .1 },
  // Big numerals grow up out of their baseline: the home page's metrics.
  number: { from: { opacity: 0, y: 60, scale: .82, transformOrigin: "0% 100%" }, to: { y: 0, scale: 1, duration: 1.25, ease: "power2.out" }, delay: 0 },
} as const;
type RevealKind = keyof typeof REVEAL;

/** Text entrances. Selectors are resolved inside `scope`; anything inside an `exclude` container is left alone. */
export function revealText(ctx: gsap.Context, scope: HTMLElement, selectors: Partial<Record<RevealKind, string>>, exclude?: string) {
  (Object.keys(selectors) as RevealKind[]).forEach((kind) => {
    const elements = gsap.utils.toArray<HTMLElement>(selectors[kind]!, scope).filter((element) => !exclude || !element.parentElement?.closest(exclude));
    if (!elements.length) return;
    const { from, to, delay } = REVEAL[kind];
    gsap.set(elements, from);
    // Starts as the element crosses the bottom edge (its hidden offset already sits it a
    // little lower). The fade completes in about half the travel, so copy is legible
    // while it is still settling — the reader never waits on a half-transparent line.
    ScrollTrigger.batch(elements, {
      start: "top bottom",
      once: true,
      onEnter: (batch) => ctx.add(() => {
        const stagger = (index: number) => Math.min(index * .08, .32);
        gsap.to(batch, { opacity: 1, duration: to.duration * .5, ease: "power1.out", delay, stagger, overwrite: "auto" });
        gsap.to(batch, { ...to, delay, stagger, overwrite: "auto", clearProps: "transform,opacity,clipPath" });
      }),
    });
  });
}

/** Adds a tween to `timeline` whose start state is applied right now (gsap.set) rather than
    lazily by a from() tween; see animateKit for why that matters. */
export function reveal(timeline: gsap.core.Timeline, targets: gsap.TweenTarget, from: gsap.TweenVars, to: gsap.TweenVars, position?: gsap.Position) {
  gsap.set(targets, from);
  return timeline.to(targets, to, position);
}

/** One-shot scroll entrance: build a paused timeline with reveal(), play it once `trigger` reaches `start`. */
export function entrance(trigger: Element | string, start: string, build: (timeline: gsap.core.Timeline) => void) {
  const timeline = gsap.timeline({ paused: true });
  build(timeline);
  ScrollTrigger.create({ trigger, start, once: true, onEnter: () => { timeline.play(); } });
  return timeline;
}

/** Resolves once every image inside `element` is decoded, or after `cap` ms — whichever comes first. */
function imagesReady(element: Element, cap = 900) {
  const images = Array.from(element.querySelectorAll("img"));
  return Promise.race([
    Promise.all(images.map((image) => image.decode?.().catch(() => undefined))),
    new Promise((resolve) => setTimeout(resolve, cap)),
  ]);
}

/** Scroll reveals for the kit pieces, in the home page's vocabulary: plates open like the
    Selected Work cards (a curtain wiping up while the picture settles inside), a row of
    plates opens from alternating edges like the Beyond grid, and on desktop every plate
    keeps drifting gently inside its frame as the page scrolls. */
export function animateKit(ctx: gsap.Context) {
  // Starting states are set explicitly (gsap.set) and every tween animates *to* the resting
  // state. from()/fromTo() tweens waiting inside scroll-triggered timelines render their
  // start state lazily, and on some load sequences (WAND on mobile) the first ticker frame
  // reverted them, so plates, the next-case footer and the stats simply appeared static.
  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  const masks = ["inset(100% 0 0 0)", "inset(0 100% 0 0)", "inset(0 0 100% 0)", "inset(0 0 0 100%)"];
  gsap.utils.toArray<HTMLElement>("[data-ck-figure]").forEach((figure) => {
    const caption = figure.querySelector("figcaption");
    const timeline = gsap.timeline({ paused: true });
    const plate = figure.querySelector<HTMLElement>(".ck-figure__media");
    const tiles = figure.querySelectorAll<HTMLElement>(".ck-strip__item");
    const phones = figure.querySelectorAll<HTMLElement>(".ck-phone");
    if (plate) {
      gsap.set(plate, { clipPath: "inset(100% 0 0 0 round 10px)", y: 48 });
      timeline.to(plate, { clipPath: "inset(0% 0 0 0 round 10px)", y: 0, duration: 1.4, ease: "power3.inOut", clearProps: "clipPath,transform" });
      const image = plate.querySelector("img");
      if (image) {
        gsap.set(image, { scale: 1.24 });
        // Overscan (1.08) leaves room for the desktop drift below without exposing an edge.
        timeline.to(image, { scale: desktop ? 1.08 : 1, duration: 1.9, ease: "power3.out" }, .05);
        if (desktop) gsap.fromTo(image, { yPercent: -3.5 }, { yPercent: 3.5, ease: "none", scrollTrigger: { trigger: figure, start: "top bottom", end: "bottom top", scrub: 1 } });
      } else {
        // Placeholders: the wording rises into the frame once the curtain is up.
        gsap.set(plate.children, { y: 26, opacity: 0 });
        timeline.to(plate.children, { y: 0, opacity: 1, duration: .9, stagger: .08, ease: "power2.out", clearProps: "transform,opacity" }, .7);
      }
    }
    tiles.forEach((tile, index) => {
      const image = tile.querySelector("img");
      gsap.set(tile, { clipPath: masks[index % masks.length], scale: .95, opacity: 0 });
      if (image) gsap.set(image, { scale: 1.18 });
      timeline.to(tile, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", clearProps: "clipPath,transform,opacity" }, index * .12);
      if (image) timeline.to(image, { scale: 1, duration: 1.6, ease: "power3.out", clearProps: "transform" }, index * .12);
    });
    if (phones.length) {
      // y is an offset on top of the middle phone's CSS lift (-7%); clearing it hands that lift back intact.
      gsap.set(phones, { y: "+=90", opacity: 0 });
      timeline.to(phones, { y: "-=90", opacity: 1, duration: 1.3, stagger: .14, ease: "power3.out", onComplete: () => { gsap.set(phones, { clearProps: "transform,opacity" }); } }, 0);
    }
    // The caption keeps its own trigger: under a tall plate it would otherwise finish animating
    // while still below the fold, and the reader would only ever see it static.
    if (caption) entrance(caption, "top 97%", (captionIn) => reveal(captionIn, caption, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .8, delay: .15, ease: "power2.out", clearProps: "transform,opacity" }));
    ScrollTrigger.create({ trigger: figure, start: "top 92%", once: true, onEnter: () => { void imagesReady(figure).then(() => ctx.add(() => timeline.play())); } });
  });

  const next = document.querySelector<HTMLElement>(".ck-next");
  if (next) {
    const q = (selector: string) => next.querySelectorAll<HTMLElement>(selector);
    gsap.set(q(".ck-next__label"), { x: -36, opacity: 0 });
    gsap.set(q(".ck-next__title"), { y: 78, opacity: 0, clipPath: "inset(0 0 100% 0)" });
    gsap.set(q(".ck-next__media"), { clipPath: "inset(0 0 100% 0 round 6px)" });
    gsap.set(q(".ck-next__foot, .ck-next__home"), { y: 20, opacity: 0 });
    const footer = gsap.timeline({ paused: true, defaults: { clearProps: "transform,opacity,clipPath" } })
      .to(q(".ck-next__label"), { x: 0, opacity: 1, duration: 1.05, ease: "power2.out" })
      .to(q(".ck-next__title"), { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power2.out" }, .08)
      .to(q(".ck-next__media"), { clipPath: "inset(0 0 0% 0 round 6px)", duration: 1.4, ease: "power3.inOut" }, .3)
      .to(q(".ck-next__foot, .ck-next__home"), { y: 0, opacity: 1, duration: .8, stagger: .1, ease: "power2.out" }, .8);
    ScrollTrigger.create({ trigger: next, start: "top 90%", once: true, onEnter: () => { footer.play(); } });
  }

  // Facts at display size count up as they rise, exactly like the home page's metrics.
  gsap.utils.toArray<HTMLElement>(".ck-stats").forEach((list) => {
    const stats = gsap.utils.toArray<HTMLElement>(":scope > div", list);
    gsap.set(stats, { opacity: 0, y: 80, scale: .88, transformOrigin: "0% 100%" });
    const timeline = gsap.timeline({ paused: true });
    timeline.to(stats, { opacity: 1, y: 0, scale: 1, duration: 1.25, stagger: .12, ease: "power2.out", clearProps: "transform,opacity" });
    stats.forEach((stat, index) => {
      const value = stat.querySelector("dd");
      const match = value?.textContent?.match(/^(\d+)(.*)$/);
      if (!value || !match) return;
      const target = Number(match[1]), suffix = match[2];
      const counter = { number: 0 };
      timeline.to(counter, { number: target, duration: 1.4, ease: "power2.out",
        onStart: () => { value.textContent = `0${suffix}`; },
        onUpdate: () => { value.textContent = `${Math.round(counter.number)}${suffix}`; },
        onComplete: () => { value.textContent = `${target}${suffix}`; },
      }, .22 + index * .12);
    });
    ScrollTrigger.create({ trigger: list, start: "top 88%", once: true, onEnter: () => { timeline.play(); } });
  });
}

/** Opens a case study at the top, every time, and recalculates trigger positions once the
    webfonts have settled the layout. Returns the cleanup for the caller's effect.

    Why it is needed: globals.css sets `scroll-behavior: smooth`, so a client-side
    navigation from halfway down the home page glided back up instead of jumping; the new
    page's reveals fired on the way and an interrupted glide could leave the reader
    mid-page. Browser scroll restoration (reload, back/forward) could do the same. Images
    reserve their space through width/height, so only fonts need waiting for. */
export function startAtTop() {
  let disposed = false;
  let userScrolled = false;
  const previousRestoration = history.scrollRestoration;
  const deepLink = window.location.hash.length > 1;
  history.scrollRestoration = "manual";
  const toTop = () => { if (!deepLink && !userScrolled && !disposed) window.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
  const markScrolled = () => { userScrolled = true; };
  const inputs = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
  inputs.forEach((type) => window.addEventListener(type, markScrolled, { passive: true, once: true }));
  toTop();
  // Next.js may apply its own post-navigation scroll after this effect; re-assert once it has.
  const frame = requestAnimationFrame(toTop);
  void document.fonts.ready.then(() => {
    if (disposed) return;
    ScrollTrigger.refresh();
    toTop();
  });
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    inputs.forEach((type) => window.removeEventListener(type, markScrolled));
    history.scrollRestoration = previousRestoration;
  };
}
