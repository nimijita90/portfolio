"use client";

/* Shared building blocks for the three case studies (WAND, Customiser, XSITE).
   Each case study keeps its own section styles; these pieces are the parts that
   must look and behave identically across all of them. Styles: case-kit.css. */

import Link from "next/link";
import type { gsap as GSAP } from "gsap";

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
      <img src={`${A}${src}`} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
    </div>
    {caption && <figcaption>{index && <span>{index}</span>}{caption}</figcaption>}
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
        <img src={`${A}${item.src}`} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
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
          <img src={`${A}${shot.src}`} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async" />
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

/** Scroll reveals for the kit pieces. Call inside the case study's reduced-motion-safe gsap.matchMedia branch. */
export function animateKit(gsap: typeof GSAP, desktop: boolean) {
  gsap.utils.toArray<HTMLElement>("[data-ck-figure]").forEach((figure) => {
    const media = figure.querySelectorAll<HTMLElement>(".ck-figure__media, .ck-strip__item, .ck-phone");
    const caption = figure.querySelector("figcaption");
    const timeline = gsap.timeline({ scrollTrigger: { trigger: figure, start: "clamp(top 85%)", once: true, invalidateOnRefresh: true } });
    timeline.from(media, { y: 70, opacity: 0, clipPath: "inset(12% 0 0 0 round 10px)", duration: 1.35, stagger: .12, ease: "power3.out" });
    if (caption) timeline.from(caption, { y: 14, opacity: 0, duration: .8, ease: "power2.out" }, .55);
    if (desktop) figure.querySelectorAll<HTMLElement>(".ck-figure__media img").forEach((image) => {
      gsap.fromTo(image, { scale: 1.06 }, { scale: 1, ease: "none", scrollTrigger: { trigger: figure, start: "top bottom", end: "bottom top", scrub: 1 } });
    });
  });
  gsap.timeline({ scrollTrigger: { trigger: ".ck-next", start: "clamp(top 85%)", once: true, invalidateOnRefresh: true } })
    .from(".ck-next__label", { y: 24, opacity: 0, duration: .8, ease: "power2.out" })
    .from(".ck-next__title", { y: 80, opacity: 0, clipPath: "inset(0 0 80% 0)", duration: 1.3, ease: "power3.out" }, .1)
    .from(".ck-next__media", { clipPath: "inset(0 0 100% 0 round 6px)", duration: 1.4, ease: "power3.inOut" }, .3)
    .from([".ck-next__foot", ".ck-next__home"], { y: 20, opacity: 0, duration: .8, stagger: .1, ease: "power2.out" }, .8);
  gsap.utils.toArray<HTMLElement>(".ck-stats > div").forEach((stat, index) => {
    gsap.from(stat, { y: 60, opacity: 0, duration: 1.2, delay: index * .12, ease: "power3.out", scrollTrigger: { trigger: stat, start: "clamp(top 88%)", once: true } });
  });
}
