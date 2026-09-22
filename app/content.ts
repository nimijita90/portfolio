export const selectedWork = [
  {
    number: "01",
    slug: "wand",
    name: "WAND",
    title: "Evolving a white-label casino into a scalable multi-brand platform.",
    description:
      "I inherited a product system that no longer matched the needs of the platform and evolved it as the business scaled.",
    role: "Product Design to Design Leadership",
    scope: "Product evolution, multi-brand customisation and delivery workflows",
    discipline: "Platform evolution",
    href: "/work/wand",
  },
  {
    number: "02",
    slug: "xsite",
    name: "Xsite",
    title: "A flexible foundation for launching distinctive operator brands.",
    description:
      "A scalable experience framework that balanced platform consistency with the freedom each brand needed to feel its own.",
    role: "Design Leader",
    scope: "Product strategy, experience design and design systems",
    discipline: "Product framework",
    href: null,
  },
  {
    number: "03",
    slug: "xbuilder",
    name: "Xbuilder",
    title: "Turning complex configuration into a clear product workflow.",
    description:
      "A connected toolset designed to help teams configure, preview and deliver product experiences with greater confidence.",
    role: "Design Leadership",
    scope: "Workflow design, platform operations and team direction",
    discipline: "Configuration workflow",
    href: null,
  },
] as const;

export const wandCaseStudy = {
  slug: "wand",
  name: "WAND",
  period: "2019-2025",
  role: "Product Design to Design Leadership",
  thesis:
    "I inherited a system that no longer matched the needs of the product and helped evolve it as the business scaled.",
  context:
    "WAND was GiG's white-label casino platform, a shared foundation customised for different operators, markets and brand identities.",
  strategy: [
    "Complete the product",
    "Make it configurable",
    "Connect the workflow",
  ],
  verifiedImpact: [
    ["43", "Brands designed or pitched"],
    ["22", "Casino brands launched"],
    ["1-2 weeks to about 3 days", "Standard skin turnaround"],
    ["15+", "Markets reached"],
  ],
  chapters: [
    "Context",
    "Role and journey",
    "Scale exposed the cracks",
    "Complete, configure, connect",
    "Rebuilding the source of truth",
    "Controlled flexibility",
    "Making dark mode work",
    "From manual skinning to configuration",
    "Workflow beyond Figma",
    "Design quality and trade-offs",
    "Impact",
    "When evolution was no longer enough",
  ],
  nextCase: "xsite",
  visibility: "review-required",
} as const;

export const highlights = [
  ["7", "Designers led"],
  ["43", "Operator brands designed"],
  ["22", "Casino launches delivered"],
  ["15", "Markets reached"],
] as const;

export const career = [
  { number: "01", role: "Graphic Designer", body: "A strong visual foundation." },
  { number: "02", role: "Product Designer", body: "A new discipline. A bigger challenge." },
  { number: "03", role: "Design Leader", body: "From creating the work to shaping the direction." },
] as const;

export const expertise = [
  { lead: "Casino", emphasis: "Platform" },
  { lead: "Casino", emphasis: "Mobile App" },
  { lead: "Sportsbook", emphasis: "Platform" },
  { lead: "Business Rules", emphasis: "Engine" },
  { lead: "CMS & Campaign", emphasis: "Management" },
] as const;

export const recommendations = [
  { quote: "What always stood out to me was how approachable and proactive she was. Whenever I had a design question or needed support, she never hesitated to jump in.", name: "Lavinia Popovici", role: "Project Management Lead" },
  { quote: "What has impressed me the most throughout the years is her absolute commitment and her ability to elevate everyone around her, while always remaining empathetic and approachable. She is the kind of leader who doesn’t just manage, but actively helps her team grow.", name: "Romain Sarda", role: "Product Designer" },
  { quote: "She is an outstanding design leader who combines strategic thinking with a hands-on approach, and I would highly recommend her to any organisation looking for someone who can make a real impact.", name: "Juan Jose Reina", role: "Head of Frontend and Mobile" },
  { quote: "It was inspiring to see how quickly she developed into such a confident and respected leader", name: "Roxanne Testa", role: "Senior Graphic Designer" },
  { quote: "Maria is the kind of leader you never forget. I have immense respect for her, the career she has built over the years, and the passion she brings to everything she does.", name: "Nathalia López", role: "Graphic Designer" },
  { quote: "Very quickly, it stopped feeling like two separate departments and instead felt like we were working as one team toward the same goal.", name: "Alejandro Cruzado", role: "Mobile Engineer / Tech Lead" },
  { quote: "She played a key role in shaping the product design strategy across our platform and sportsbook solutions, ensuring our products delivered high-quality user experiences while meeting business objectives.", name: "Yana Azzopardi", role: "Director of Brand & Design" },
  { quote: "Working with her, I truly felt that I could achieve anything and that my opinion mattered, which motivated me the most.", name: "Alina Medvid", role: "Product Designer" },
  { quote: "Working with her is very easy because she always asks questions to ensure the work is done in the easiest way for the developers.", name: "Esteban Saiz", role: "Engineer Manager" },
  { quote: "Her expertise in Design System is unparalleled, and her designs consistently exceed expectations.", name: "Matyas Farkas", role: "Principal Product Designer" },
  { quote: "María has a strong understanding of how AI is changing product design. She actively experiments with new tools and knows how to turn them into practical improvements for the team and the design process.", name: "Javier Ortiz Almagro", role: "Design Leader" },
] as const;

export const awards = [
  { year: "2018", place: "Europe", result: "Winner", description: "Design and User Experience Award in the iGaming industry.", mark: "iGaming\nIdol" },
  { year: "2019", place: "Belgium", result: "Winner", description: "Award-winning IoT product for urban rodent control.", mark: "challenge4cities\nonesait platform" },
  { year: "2019", place: "Finland", result: "Winner", description: "Award-winning IoT product for urban rodent control.", mark: "challenge4cities\nonesait platform" },
  { year: "2022", place: "Europe", result: "Finalist", description: "Design and User Experience Award in the iGaming industry.", mark: "iGaming\nIdol" },
] as const;

/** Operators María designed for (live or in development — proposals excluded), as white logos
 *  in /public/portfolio/operators. `ratio` is width / height, used to balance optical size. */
export const operators = [
  { name: "William Hill", file: "williamhill.png", ratio: 4.88 },
  { name: "Rizk", file: "rizk.svg", ratio: 3.24 },
  { name: "Dunder", file: "dunder.svg", ratio: 5.84 },
  { name: "NetBet", file: "netbet.svg", ratio: 5.7 },
  { name: "The Pools", file: "thepools.svg", ratio: 2.25 },
  { name: "Slotbox", file: "slotbox.svg", ratio: 2.38 },
  { name: "King Billy", file: "kingbilly.png", ratio: 4.77 },
  { name: "Kirgo", file: "kirgo.png", ratio: 7.58 },
  { name: "11.lv", file: "eleven.svg", ratio: 2.23 },
  { name: "Jugadón", file: "jugadon.png", ratio: 4.1 },
  { name: "Solaire", file: "solaire.svg", ratio: 1.8 },
] as const;

export const brandNames = ["William Hill", "Mr Green", "Rizk", "SkyCity", "Dunder", "Thrills"] as const;

export const faqItems = [
  {
    question: "What does good design leadership look like to you?",
    answer:
      "For me, good leadership is about giving people clarity and trust. I like my team to understand where we’re going and why, but still have the freedom to find their own way there. My job is to support them, challenge them when needed, and create the right environment for them to do their best work.",
    duration: "00:42",
  },
  {
    question: "How do you bring clarity to complex projects?",
    answer:
      "I usually start by asking a lot of questions. I want to understand what we’re really trying to solve before jumping into solutions. Then I try to simplify the problem, define what matters most and give the team a clear direction. Complexity doesn’t scare me. I actually enjoy making complicated things feel simple.",
    duration: "00:37",
  },
  {
    question: "What do you think makes you different?",
    answer:
      "I’ve always been quite multidisciplinary. I understand visual design, UX, Product Design, Design Systems and strategy, and after more than 10 years, you start connecting all those things naturally. But I think what really makes the difference is the people side. I’m a very empathetic leader, and at the same time I’m comfortable communicating, presenting and selling an idea. That combination has been really valuable throughout my career.",
    duration: "00:40",
  },
  {
    question: "How do you use AI in your design process?",
    answer:
      "I use AI throughout different parts of my process. It helps me explore ideas, research, challenge my thinking and move faster when I need to test different directions. But I see it as a tool, not the decision-maker. The real value still comes from knowing what to ask, what to keep and what to ignore.",
    duration: "00:33",
  },
  {
    question: "What role should Design have in product decisions?",
    answer:
      "I think Design should be involved early, not just when it’s time to create the screens. We can bring a different perspective to product decisions by connecting user needs, business goals and the experience we want to create. I really enjoy working closely with Product and Engineering from the beginning.",
    duration: "00:41",
  },
  {
    question: "What have 10+ years in Design taught you?",
    answer:
      "That good design is rarely about making things more complicated. Experience has taught me when to push an idea, when to simplify it and, sometimes, when to let it go. I think you become a better designer when you stop trying to prove how much you can design and start focusing on what the product actually needs.",
    duration: "00:36",
  },
] as const;

export const beyondDesign = [
  { title: "Coffee. Always.", alt: "A white coffee maker beside a cup of coffee" },
  { title: "Cat lover.", alt: "A black and white cat sitting on a sofa" },
  { title: "My little huerta.", alt: "Tomatoes ripening in a home vegetable garden" },
  { title: "Foodie at heart.", alt: "A carefully prepared sushi dinner" },
  { title: "My people always.", alt: "Two children walking together at sunset" },
  { title: "Interior design obsessed.", alt: "A warm, thoughtfully styled living room" },
] as const;
