# Habba Creative System Brief — 2026-09-03

Status: **ACTIVE / WIP**
Branch: `redesign/creative-system-20260903`
Baseline: `d133c8e93447973cbb0cb6bad2dcf75f4fd0e5f1`

## 1. Product truth

Habba is not fine jewelry and must not be designed or described like a luxury jewelry house.

It is an Arabic-first handmade bead-accessories storefront with:
- bracelets, necklaces, and sets;
- colorful / soft / cute / calm / natural collection moods;
- small gifts and everyday wear as core use cases;
- handmade variation and material availability as real product constraints;
- price and availability confirmed through WhatsApp;
- guided discovery through Match, Bundle, and Drop flows;
- a persistent Habba bag with recommendations and WhatsApp handoff.

Brand guardrail from the product itself:
- soft, colorful, honest, giftable;
- playful but polished;
- no fake luxury;
- no gold / diamond / crystal / gemstone claims when the product does not support them.

## 2. Research synthesis

### Primary creative references

**Susan Alexandra**
Use for: bead-as-world thinking, playful customization, turning product construction into an experience.
Do not copy: visual identity or literal composition.

**Beepy Bella**
Use for: authored brand universe, expressive product-world storytelling, preserving personality inside commerce.
Do not copy: fantasy language or decorative density.

**Kaleido Jewellery**
Use for: playful commerce, intuitive navigation, product discovery and upsell without losing delight.

**Beyond The Vines**
Use for: strong color, straightforward shopping behavior, product clarity, useful restraint.

**Indigo Laboratory / Relive by Coco**
Use for: art-directed pacing, visual storytelling, authored transitions, award-level craft.
Do not copy: cinematic heaviness or effects that make a small handmade store feel falsely luxurious.

**Cartier Find Your Love**
Use only for: progressive guided-choice mechanics and reducing decision overload.
Do not use as a visual reference for Habba.

### Egyptian / handmade market reality

Direct-market research reinforces:
- handmade proof matters;
- product variation should be explained, not hidden;
- gifting and customization are natural conversion paths;
- small handmade brands often convert through direct contact / social channels;
- merchandising needs to make color, mood and compatibility obvious quickly.

## 3. Current reality audit

### What is already strong

The current product architecture is substantially better than a simple catalog:
- Home
- Shop + filters + smart search
- Product Detail
- Match
- Bundle
- Drop Builder
- Bag + recommendations
- WhatsApp conversion
- About / trust copy

The current product data also has a useful visibility model:
- visible
- hidden pending review
- rejected off-brand / experiment

This product logic should be preserved.

### Main visual problem

The UI collapses different content types into almost the same visual grammar:

`rounded card + beige border + light background + grid + pill buttons`

This affects:
- hero;
- featured products;
- Match / Bundle / Drop entry points;
- brand promise;
- gifting;
- collections;
- ordering steps;
- trust notes;
- final CTA;
- product cards and PDP.

The result is consistent, but not authored. The journey has variety; the presentation removes that variety.

### Additional gaps

1. **No strong brand primitive.**
   Beads exist only inside product images. The interface itself does not behave like Habba.

2. **Weak pacing.**
   Sections have similar width, padding, radius and contrast, so there is little editorial rhythm.

3. **Home reveals the catalog before establishing the world.**
   The hero is correct but generic; the first screen could belong to many handmade stores.

4. **Smart commerce feels like forms.**
   Match and Drop are conceptually distinctive but currently expressed mainly as chips in bordered panels.

5. **Product cards are over-instrumented.**
   Name, English name, metadata, price state, detail link, bag action and WhatsApp action compete on every card.

6. **Handmade proof is copy-heavy.**
   The idea is stated repeatedly but not translated into a visual / interaction language.

7. **RTL is functional, not authored.**
   Arabic alignment works, but spacing, reading rhythm and navigation do not yet feel designed around Arabic as the source language.

8. **Performance risk.**
   Product PNGs are large and plain `img` usage appears across surfaces. Image delivery / sizing is a final award-readiness blocker.

## 4. Creative thesis

> **Habba is a handmade bead playground you can shop.**

The interface should feel like a carefully arranged bead table:
- pieces gather and separate;
- colors form moods;
- lines connect choices;
- products feel arranged, not merely listed;
- guided commerce feels like composing a set.

This must remain:
- cute, not childish;
- feminine, not generic pink;
- handmade, not Etsy-template;
- expressive, not chaotic;
- commercial, not an art experiment.

## 5. Core visual primitives

### 5.1 The bead
The bead is the main UI motif.

Use it for:
- section markers;
- progress states;
- micro-decoration;
- collection color signatures;
- hover / focus feedback;
- guided-choice states.

Never use dozens of meaningless dots. Every bead cluster should establish hierarchy, state, rhythm or brand recognition.

### 5.2 The thread
The thread is a secondary connective primitive.

Use it for:
- subtle lines between steps;
- Match / Bundle / Drop path logic;
- transition dividers;
- ordering journey.

Avoid literal necklace illustrations everywhere.

### 5.3 The tray
Large quiet surfaces can reference a maker's tray:
- warm paper / oat / cream base;
- restrained border;
- asymmetric product placement;
- shadows that feel physical but soft.

The tray replaces generic nested cards when a section needs containment.

### 5.4 Mood color, not global pink
Coral remains a signature action color, but sections should inherit color from product moods:
- coral / berry;
- lavender;
- aqua / blue;
- sage / green;
- oat / natural.

The site should feel collected, not recolored.

## 6. Home direction

### Hero — "the bead table"
Goal: establish Habba before showing a product grid.

Composition:
- oversized Arabic headline;
- clear handmade descriptor;
- one hero product;
- 2–3 supporting products as floating / layered visual accents;
- bead clusters / thread line;
- primary CTA to Shop;
- secondary CTA to Match, not another generic contact action;
- WhatsApp remains available in header and later conversion points.

The hero should answer:
1. What is Habba?
2. What does it feel like?
3. Where should I start?

### Featured — editorial shelf
Do not show eight identical cards immediately.

Use:
- one leading product / set;
- a compact supporting rail;
- stronger image-to-copy ratio;
- one clear path to the full shop.

### Guided discovery — three ways, one system
Match / Bundle / Drop should feel like three degrees of curation:
- **Match:** find one direction;
- **Bundle:** make pieces work together;
- **Drop:** build a full mood.

Represent them as connected paths rather than three copies of the same card.

### Handmade story
Show handmade truth with:
- material availability note;
- small variations are normal;
- product close-up / isolated object;
- concise copy.

This should feel like evidence, not a disclaimer block.

### Collections
Collections are moods, not categories.
Each collection should have:
- its own background tone;
- one dominant product;
- a short human label;
- visible motion / hover relationship;
- direct shop filter link.

### Gift moment
Gifting should be contextual:
- "هدية صغيرة" is a shopping intent;
- route users toward Match / gift filter;
- avoid another generic bordered text card.

### Final conversion
Finish with:
- bag if the user has selected pieces;
- WhatsApp as real handoff;
- simple statement about availability / price confirmation.

## 7. Product-card direction

Default catalog card should prioritize:
1. product image;
2. Arabic name;
3. one lightweight mood / collection cue;
4. bag action.

Move or de-emphasize:
- repeated English name on dense grids;
- multiple competing text links;
- WhatsApp on every card when it already exists in PDP / bag / header.

The card should encourage opening the object, not read like a control panel.

## 8. Motion language

Allowed:
- gentle bead float;
- short staggered entrances;
- scale / translate on product hover;
- thread-line reveal;
- bead-cluster state changes;
- subtle tray parallax only if inexpensive.

Avoid:
- perpetual movement on every object;
- large scroll-jacking;
- heavy WebGL;
- animation that obscures product photos;
- delayed interactions.

Respect `prefers-reduced-motion`.

## 9. Accessibility / usability gates

- Arabic source language and explicit `dir="rtl"` at document level.
- Visible keyboard focus on all actions.
- Minimum comfortable mobile text size.
- Buttons remain obvious even when the visual language becomes expressive.
- Motion has reduced-motion fallback.
- Contrast should remain readable on mood backgrounds.
- Product availability / handmade variation must remain understandable without motion.

## 10. Performance gates

Before award submission:
- replace uncontrolled catalog `img` usage with an optimized image strategy where practical;
- define responsive `sizes`;
- avoid loading the entire high-resolution catalog above the fold;
- validate mobile image payload;
- run production Lighthouse / Web Vitals;
- check no animation causes layout shift;
- verify build and route regressions.

## 11. Implementation phases

### Phase H1 — Home creative foundation
- global tokens / primitives;
- authored RTL;
- header refinement;
- hero rebuild;
- featured editorial treatment;
- guided-discovery section;
- collections / handmade pacing.

### Phase H2 — Shop / cards
- card hierarchy;
- filter / smart-search hierarchy;
- image optimization;
- mobile density.

### Phase H3 — Match / Bundle / Drop
- convert chip-form feel into visual guided composition;
- preserve current API contracts and fallback logic.

### Phase H4 — PDP / Bag / WhatsApp conversion
- handmade proof;
- complementary-piece language;
- bag as curated tray;
- friction audit.

### Phase H5 — QA / awards gate
- desktop + mobile visual review;
- interaction review;
- reduced motion;
- performance;
- content / claim audit;
- final reference recheck only where a gap remains.

## 12. Definition of success

Habba should be recognizable with the logo temporarily hidden.

A user should be able to say:
- this feels handmade;
- this feels like beads and color;
- I understand how to shop;
- the smart flows feel native to the brand;
- it does not pretend to be expensive fine jewelry;
- the site feels authored rather than templated.
