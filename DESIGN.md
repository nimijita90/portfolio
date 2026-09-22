# V9 design direction

V9 is a single cinematic editorial portfolio. It evolves the strongest qualities of the former Silk Authority direction: near-black surfaces, ivory typography, large professional photography, Silk Serif display type and restrained interaction.

## Narrative

The page follows ten chapters:

1. Hero
2. Highlights and operators
3. Product expertise
4. Career journey
5. Selected work
6. International recognition
7. What people say
8. FAQ and videos
9. Beyond design
10. Contact

## Principles

- Present María as a product leader, not as a gallery of UI screens.
- Keep one coherent dark world instead of switching themes between sections.
- Use type, photography and pacing as the primary design materials.
- Avoid repeated card grids, decorative dashboard patterns and generic portfolio effects.
- Treat mobile as its own composition with deliberate crops, rhythm and interaction.
- Reserve the most cinematic motion for the hero and transitions between major chapters.
- Let Selected Work enter as one authored editorial sequence, with restrained pointer feedback that clarifies the active project without turning the work into cards.
- Support keyboard navigation, visible focus, reduced motion and video alternatives.
- Keep content separate enough from presentation that metrics, recommendations and cases can evolve safely.

## Current status

The September Canva-led desktop composition and independent mobile experience are implemented in `app/CanvaPortfolio.tsx`. WAND is implemented and published as the first complete case-study route. `app/Portfolio.tsx`, this document and the V9 storyboard remain useful historical context, but the active components and `docs/handoff` describe the current delivered state.

## WAND direction

- Keep the portfolio's premium editorial identity, but make the case feel more Product than Fashion.
- Use real product UI, sparse diagrams, before and after comparisons, configuration changes and short motion clips.
- Build the story around decisions and change, not around a component museum.
- The central sequence is: Complete the product. Make it configurable. Connect the workflow.
- Make the verified impact scannable: 43 brands designed or pitched, 22 launched, 15+ markets and a standard skin turnaround reduced from 1-2 weeks to about 3 days.
- End by handing the narrative to XSITE.
- Treat all detailed visuals as portfolio-only and review-required for any new destination, even when they appear in the frozen public reference.
- Keep section labels and long serif headings separated by a consistent responsive rhythm; never animate both a copy wrapper and its nested text in the same reveal.
