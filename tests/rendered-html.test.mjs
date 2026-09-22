import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

// Both routes are fully static, so `next build` prerenders them straight to
// HTML under .next/server/app. Reading that file is equivalent to fetching
// the route from any host that serves the Next.js build output (including
// Netlify's Next.js runtime), without needing a running server in tests.
const prerendered = { "/": "index.html", "/work/wand": "work/wand.html" };
async function render(pathname = "/") {
  const filePath = new URL(`../.next/server/app/${prerendered[pathname]}`, import.meta.url);
  const html = await readFile(filePath, "utf8");
  return { status: 200, text: async () => html };
}

test("renders the Canva section map with real content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = (await response.text()).replace(/<!--[\s\S]*?-->/g, "");
  for (const text of ["María Mora", "Highlights", "10+", "Expertise in product platforms", "Casino Platform", "Career journey", "Graphic Design", "Product Design", "Design Leadership", "WAND", "XSITE", "Demo Casino Customiser", "Yana Azzopardi", "Matyas Farkas", "Javier Ortiz Almagro", "Romain Sarda", "Alina Medvid", "Esteban Saiz", "View all recommendations", "moragarciamaria@gmail.com", "Marbella · Worldwide", "Let’s make something", "In their", "© 2026"]) {
    assert.ok(html.includes(text), `Missing content: ${text}`);
  }
  const order = ["highlights", "operators", "expertise", "work", "about", "people", "recognition", "faq", "playground", "contact"];
  let previous = -1;
  for (const section of order) {
    const position = html.indexOf(`id="portfolio-${section}"`);
    assert.ok(position > previous, `Incorrect position: ${section}`);
    previous = position;
  }
  assert.equal((html.match(/<main\b/g) ?? []).length, 1);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(html.includes('href="/work/wand"'));
  assert.ok(!html.includes('href="/work/xsite"'));
  assert.ok(html.includes("case study not yet published"));
  for (const fabricated of ["Astra One", "Pulse Live", "Core 43", "Concept case"]) assert.ok(!html.includes(fabricated));
});

test("keeps FAQ, navigation and motion fallbacks accessible", async () => {
  const html = await (await render()).text();
  for (const part of ['Skip to content', '<dialog', 'id="portfolio-menu"', 'aria-controls="portfolio-menu"', 'aria-live="polite"', '<noscript>']) assert.ok(html.includes(part), part);
  assert.ok(!html.includes("<video"));
  for (let i = 0; i < 6; i++) {
    assert.ok(html.includes(`aria-controls="faq-panel-${i}"`));
    assert.ok(html.includes(`aria-labelledby="faq-question-${i}"`));
  }
  for (const question of ["What does good design leadership look like to you?", "How do you bring clarity to complex projects?", "What do you think makes you different?", "How do you use AI in your design process?", "What role should Design have in product decisions?", "What have 10+ years in Design taught you?"]) assert.ok(html.includes(question));
  for (const answer of ["giving people clarity and trust", "Complexity doesn’t scare me", "That combination has been really valuable", "not the decision-maker", "connecting user needs, business goals", "start focusing on what the product actually needs"]) assert.ok(html.includes(answer), answer);
  assert.ok(!html.includes("Recording pending"));
  const source = await readFile(new URL("../app/CanvaPortfolio.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/canva-portfolio.css", import.meta.url), "utf8");
  for (const part of ["prefers-reduced-motion: no-preference", "min-width: 1024px", "observer.unobserve(entry.target)", "media.revert()", "context.revert()", "history.scrollRestoration = \"manual\"", "userScrolled", "const hold = 3.6", "document.hidden", ".c-faq-list > article", ".c-quotes"]) assert.ok(source.includes(part), part);
  for (const part of ["@media(max-width:767px)", "@media(prefers-reduced-motion:reduce)", "grid-template-rows:0fr", "grid-template-rows:1fr"]) assert.ok(css.includes(part), part);
});

test("keeps desktop navigation minimal and removes the hero scroll prompt", async () => {
  const html = await (await render()).text();
  const primary = html.match(/<nav aria-label="Primary">([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(primary);
  assert.equal((primary.match(/<a /g) ?? []).length, 3);
  for (const label of ["Work", "About", "Contact"]) assert.ok(primary.includes(`>${label}</a>`));
  assert.ok(!primary.includes("playground"));
  assert.ok(!html.includes("Enter portfolio"));
  assert.ok(!html.includes('class="c-enter"'));
  assert.ok(html.includes('class="c-hero-subtitle">Design Leader</p>'));
  assert.ok(!html.includes('+35 additional operator brands'));
  assert.ok(html.includes('aria-label="15 Markets reached"'));
  assert.ok(!html.includes('aria-label="15+ Markets reached"'));
  assert.ok(html.includes('href="#portfolio-playground"'));
  const css = await readFile(new URL("../app/canva-portfolio.css", import.meta.url), "utf8");
  assert.ok(css.includes('.c-menu-button{width:44px;height:44px;display:none;'));
  assert.ok(css.includes('.c-menu-button{display:grid;margin-left:auto}'));
});

test("renders all eleven selected testimonials with complete copy and closing quotes", async () => {
  const html = (await (await render()).text()).replace(/<!--[\s\S]*?-->/g, "");
  const quotes = html.match(/<div class="c-quotes"[\s\S]*?<div class="c-quote-controls">/)?.[0];
  assert.ok(quotes);
  assert.equal((quotes.match(/<blockquote>/g) ?? []).length, 11);
  for (const name of ["Lavinia Popovici", "Romain Sarda", "Juan Jose Reina", "Roxanne Testa", "Nathalia López", "Alejandro Cruzado", "Yana Azzopardi", "Alina Medvid", "Esteban Saiz", "Matyas Farkas", "Javier Ortiz Almagro"]) assert.ok(quotes.includes(name), name);
  assert.ok(quotes.includes("actively helps her team grow."));
  assert.ok(quotes.includes("the design process."));
  assert.ok(html.includes('/ 11'));
  const source = await readFile(new URL("../app/CanvaPortfolio.tsx", import.meta.url), "utf8");
  assert.ok(!source.includes('% 6'));
  const css = await readFile(new URL("../app/canva-portfolio.css", import.meta.url), "utf8");
  assert.ok(css.includes('blockquote:after{content:"”"}'));
  assert.ok(css.includes('height:100svh;min-height:0'));
  assert.ok(!css.includes('.c-work .c-caption{'));
  assert.ok(css.includes('.c-career-company{font:400 clamp(22px,1.85vw,30px)/1.5 var(--c-sans)'));
});

test("renders the complete Canva-led WAND case study and local production assets", async () => {
  const response = await render("/work/wand");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes("WAND"));
  for (const text of ["Evolving a white-label casino", "Scale exposed the cracks", "From building", "Complete. Configure. Connect.", "From incomplete", "Configuring", "Bringing clients", "As WAND grew, new problems emerged.", "Improving usability", "Different navigation.", "Dark Mode", "Extending the system to support a new business model.", "2024–2025 — Reaching the limit", "From weeks to", "Want to see how it", "The expansion", "Brand customisation", "Demo Casino", "Back to home", "wand-milestone__tags"]) assert.ok(html.includes(text), text);
  assert.equal((html.match(/class="wand-milestone"/g) ?? []).length, 5);
  assert.ok(html.includes("Eventually, evolution wasn’t enough."));
  assert.ok(!html.includes("hello@mariamora.design"));
  assert.ok(!html.includes("Return to selected work"));
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.ok(layout.includes("/og.png"));
  const hosting = await readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8");
  const hostingConfig = JSON.parse(hosting);
  assert.ok(hostingConfig.project_id === null || typeof hostingConfig.project_id === "string");
  assert.equal(hostingConfig.d1, null);
  assert.equal(hostingConfig.r2, null);
  for (const path of ["og.png", "portfolio/assets/maria-logo-white.svg", "portfolio/assets/wand-hero-banner-v2.png", "portfolio/assets/wand-canva-complete.png", "portfolio/assets/wand-canva-configure.png", "portfolio/assets/wand-canva-cashier.png", "portfolio/assets/wand-canva-connect.png", "portfolio/assets/wand-navigation-models.png", "portfolio/assets/wand-dark-mode.png", "portfolio/assets/wand-sweepstakes.png", "portfolio/assets/LA3A7408-portrait-768.avif", "portfolio/canva/hero-photo.jpg", "portfolio/canva/faq-photo.jpg", "portfolio/canva/work.jpg", "portfolio/canva/people.jpg", "portfolio/canva/awards.jpg", "portfolio/canva/beyond.jpg", "portfolio/canva/highlights.jpg", "portfolio/fonts/Silk Serif Regular.woff2", "portfolio/fonts/Silk Serif Regular Italic.woff2"]) await access(new URL(`../public/${path}`, import.meta.url));
});
