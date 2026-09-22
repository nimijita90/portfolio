# Reference assets and reconstruction

Source: the Canva website supplied by María. Desktop sheets were inspected and exported using the browser page-assets capability. The JPGs in `public/portfolio/canva` are local optimized copies. `ReferenceImage` exposes only photographic/product-image crops; headings, copy, navigation and interactions are real HTML.

- `work.jpg`: three cover crops (WAND, XSITE, Demo Casino Customiser).
- `people.jpg`: right-side portrait crop, no testimonial text included.
- `awards.jpg`: trophy and award-logo crops.
- `beyond.jpg`: four personal photographs.
- `highlights.jpg`: operator logo strip only.
- `faq.jpg`: preserved source reference; not used as a playable-video substitute.
- `hero-photo.jpg`: photo-only reconstruction of the supplied hero, generated with the built-in image editing tool. Original portrait identity, framing and narrow table retained; all typography/UI removed. Mobile still uses the pre-existing portrait AVIF, not the Canva crop.
- `faq-photo.jpg`: photo-only reconstruction of the FAQ poster, generated with the built-in image editing tool. No play symbol, timeline or controls.

## Edit prompts

Hero: "Produce the exact same landscape 1536x1024 studio photograph, preserving the woman's identity, face, expression, pose, hair, clothing, lighting, gray-black background, narrow wooden table at bottom center and precise framing. Remove ALL overlaid typography, white monogram, navigation, hamburger, name, job title, ENTER PORTFOLIO text, line and arrow. Seamlessly reconstruct the photographic pixels behind the removed text. Do not widen the table. No text, logos or UI."

FAQ: "Extract ONLY the horizontal studio photo in the expanded second FAQ answer (photo bounds x594 y251 to1470 y603 on1536x1024 original). Output that photo only, landscape ratio2.5:1. Remove the overlaid circular play button and all bottom video controls/timeline/timestamps, reconstruct shirt/skin/background faithfully. Preserve exact woman's identity, expression, pose, composition and gray studio lighting. No text, UI or play symbols."

## Content not fabricated

Actual video recordings have not been supplied; the page labels this explicitly. XSITE and Customiser have no published case-study routes, so their links request the project by email. A LinkedIn profile URL was not present in the current implementation or reference; no guessed profile is linked. WAND's existing route and verified content remain intact.
