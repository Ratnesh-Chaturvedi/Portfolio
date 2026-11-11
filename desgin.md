
# Personal Developer Portfolio — Design System

**Owner:** Ratnesh Chaturvedi  
**Role:** AI Engineer & Full-Stack Developer  
**Stack:** React + JavaScript  
**Visual Direction:** Cinematic dark + warm editorial light + Pinterest-inspired creative layouts

---

## 1. Creative Vision

Build a distinctive, premium developer portfolio that feels like an award-winning digital editorial, not a generic developer template.

### Core Concept

> I build things that think — and experiences that feel human.

The portfolio combines two visual worlds:

- **Signal:** Cinematic dark surfaces, expressive typography, gradient masking, ambient light, and smooth motion.
- **Canvas:** Warm cream backgrounds, lavender accents, asymmetric project layouts, elegant typography, and generous whitespace.

Transitions between these worlds must feel deliberate and cohesive.

### Design Principles

1. Typography is the primary visual identity.
2. Gradients should be expressive but restrained.
3. Use Pinterest-inspired compositions, varied image ratios, asymmetric layouts, and intentional negative space.
4. Motion must guide attention rather than distract.
5. Light and dark themes must both be fully designed.
6. Avoid generic portfolio templates, repetitive cards, excessive glassmorphism, and unnecessary neon.
7. Projects must communicate real engineering ability.
8. Every section should have its own composition while sharing a consistent design language.
9. Mobile layouts must be intentionally designed, not merely scaled down.
10. Prioritize readability, accessibility, performance, and visual polish.

---

## 2. Brand Personality

The site should feel:

- Creative and intelligent.
- Modern and technically sophisticated.
- Minimal but expressive.
- Human and approachable.
- Experimental without becoming chaotic.
- Premium without unnecessary decoration.

Avoid generic phrases such as "passionate developer building innovative solutions."

Use clear, specific descriptions of projects, engineering decisions, technical challenges, and outcomes.

---

## 3. Color System

Use semantic CSS variables throughout the application. Never hardcode theme-specific colors inside reusable components when a design token exists.

### 3.1 Dark Theme — Signal

| Token | Color | Usage |
|---|---|---|
| `--bg` | `#09090D` | Main background |
| `--bg-elevated` | `#111117` | Elevated sections |
| `--surface` | `#17171F` | Panels and project surfaces |
| `--surface-hover` | `#20202B` | Hover states |
| `--text-primary` | `#F5F2FA` | Main text |
| `--text-secondary` | `#B8B3C7` | Supporting text |
| `--text-muted` | `#A19AAD` | Metadata |
| `--border` | `rgba(235,230,255,0.13)` | Borders and dividers |
| `--accent` | `#A78BFA` | Violet accent |
| `--accent-strong` | `#8B5CF6` | Strong accent |
| `--accent-blue` | `#60A5FA` | Blue accent |
| `--focus` | `#C4B5FD` | Keyboard focus |

### 3.2 Light Theme — Canvas

| Token | Color | Usage |
|---|---|---|
| `--bg` | `#F5F1EB` | Main warm background |
| `--bg-elevated` | `#FFFCF8` | Elevated content |
| `--surface` | `#EEE8E1` | Secondary surfaces |
| `--surface-hover` | `#E7DFEA` | Hover states |
| `--text-primary` | `#25232B` | Main text |
| `--text-secondary` | `#5D5865` | Supporting text |
| `--text-muted` | `#6F6876` | Metadata |
| `--border` | `rgba(37,35,43,0.14)` | Borders and dividers |
| `--accent` | `#6D4AD8` | Violet accent |
| `--accent-strong` | `#5A35C5` | Links and strong accents |
| `--accent-blue` | `#376FC8` | Blue accent |
| `--focus` | `#5A35C5` | Keyboard focus |

### 3.3 Signature Gradients

Primary gradient:

```css
linear-gradient(
  115deg,
  #8B5CF6 0%,
  #7C83F6 48%,
  #60A5FA 100%
);
```

Dark ambient glow:

```css
radial-gradient(
  ellipse at 70% 35%,
  rgba(139, 92, 246, 0.22) 0%,
  rgba(96, 165, 250, 0.09) 36%,
  transparent 70%
);
```

Light accent wash:

```css
linear-gradient(
  135deg,
  rgba(139, 92, 246, 0.12),
  rgba(96, 165, 250, 0.08)
);
```

### Gradient Rules

- Use the strongest gradients for hero typography, signature graphics, and selected project artwork.
- Never apply gradients to every heading, button, or card.
- Body text should remain a solid color.
- Use deeper violet and blue shades for small text on light backgrounds.
- Keep decorative gradients behind content.
- Check text contrast in both themes.
- Avoid excessive glowing outlines and neon effects.

---

## 4. Typography System

Use three complementary typefaces at most.

### Recommended Fonts

- **Space Grotesk:** Display headings, hero typography, and project titles.
- **DM Sans:** Body copy, navigation, descriptions, and buttons.
- **JetBrains Mono:** Technical labels, project indices, dates, and technology metadata.

### Typography Scale

| Element | Desktop | Mobile |
|---|---|---|
| Hero headline | `clamp(4.5rem, 10vw, 9.5rem)` | `clamp(3rem, 13vw, 5rem)` |
| Section heading | `clamp(3rem, 7vw, 6rem)` | `clamp(2.5rem, 10vw, 4rem)` |
| Project title | `clamp(1.8rem, 3vw, 3rem)` | `1.7rem` |
| Subheading | `1.4rem–2rem` | `1.3rem` |
| Body copy | `1rem–1.125rem` | `1rem` |
| Metadata | `0.75rem–0.875rem` | `0.75rem` |

### Typography Rules

- Hero line-height: `0.88–1.0`.
- Body line-height: `1.6–1.75`.
- Use uppercase technical labels with restrained letter spacing.
- Apply gradient masking to selected display words only.
- Use italic typography sparingly for editorial contrast.
- Use `text-wrap: balance` for major headings.
- Prevent text clipping and horizontal overflow at every breakpoint.
- Maintain a clear hierarchy between display text, body copy, and metadata.

---

## 5. Layout and Spacing

### Grid System

- Maximum content width: `1280px`.
- Maximum artwork width: `1440px`.
- Desktop horizontal padding: `clamp(24px, 5vw, 80px)`.
- Tablet padding: `24px–40px`.
- Mobile padding: `20px–24px`.
- Desktop: 12-column grid.
- Tablet: 8-column grid.
- Mobile: 4-column grid.

Use asymmetrical layouts where they improve visual storytelling. Do not force every section into identical columns.

### Spacing Scale

Use a consistent 8px-based system:

`4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 112px, 144px`.

Suggested section spacing:

- Desktop: `112px–160px`.
- Tablet: `80px–112px`.
- Mobile: `64px–88px`.

### Shape Language

- Prefer editorial rectangles and restrained corner radii.
- Buttons can use pill shapes or softly rounded rectangles.
- Project imagery may use varied aspect ratios and carefully clipped shapes.
- Avoid placing every paragraph inside a card.
- Use whitespace as the primary separator.
- Borders should be subtle and intentional.

---

## 6. Website Structure

Build the portfolio in this order:

1. Hero — Signal.
2. Selected Work — Canvas.
3. Featured Project Case Studies.
4. Engineering Approach.
5. Experience.
6. About.
7. Contact — Signal.

Each section must have a distinctive layout while reusing the same color tokens, typography, spacing, and motion language.

---

## 7. Hero Section — Typography as Art

### Objective

Create a memorable first impression using oversized typography, gradient masking, and a custom typographic composition. Do not use a portrait.

### Desktop Composition

- Minimum height: approximately `92svh`, with enough flexibility for short screens.
- Background: `--bg`.
- Minimal top navigation.
- Left-aligned content.
- Main headline occupies approximately 7–9 columns of the desktop grid.
- Oversized cropped letterforms or typographic fragments sit behind the main text.
- A subtle violet-blue ambient gradient adds depth.
- The visual must remain typography-led rather than becoming an abstract 3D scene.

### Navigation

Left side:

- `RC.` wordmark.
- Small label: `AI × FULL-STACK ENGINEER`.

Right side:

- Work.
- Approach.
- About.
- Contact.
- Theme toggle.

Use compact typography, restrained spacing, and clear hover states.

### Hero Content

Eyebrow:

`BUILDING INTELLIGENT PRODUCTS`

Headline:

`I build things`

`that THINK.`

Supporting statement:

`And experiences that feel human.`

Description:

`AI-powered systems and thoughtful full-stack products, built from idea to implementation.`

Primary CTA:

`Explore my work ↗`

Secondary CTA:

`A little about me`

Bottom annotation:

`01 / 07` and `SCROLL TO EXPLORE`.

### Hero Composition Rules

- The word `THINK.` receives the signature violet-blue gradient mask.
- Keep the remaining headline in solid warm white or the active theme's primary text color.
- Use a large typographic fragment as a background texture on the right.
- Background letterforms must never compete with the headline.
- Use subtle grain only if it does not harm text clarity or performance.
- Avoid decorative orbs, random particles, and unnecessary floating UI panels.
- Do not use a portrait or stock-person image.
- The hero should look intentional even when animations are disabled.

### Gradient Text CSS

```css
.gradient-text {
  color: #A78BFA;
  background: linear-gradient(
    115deg,
    #A78BFA 0%,
    #818CF8 48%,
    #60A5FA 100%
  );

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

Provide a readable solid-color fallback for unsupported browsers.

---

## 8. Responsive Hero Design

### Desktop: 1024px and Above

- Large typography.
- Asymmetric layout.
- Oversized background letterforms.
- Full navigation.
- Generous whitespace.
- CTA buttons on one line when space permits.

### Tablet: 768px–1023px

- Reduce headline size.
- Reduce background typography.
- Simplify the decorative composition.
- Keep navigation compact.
- Preserve the left-aligned editorial layout.

### Mobile: Below 768px

- Use a compact wordmark and accessible menu button.
- Keep the headline left-aligned.
- Allow the headline to wrap into three or four intentional lines.
- Greatly simplify or remove oversized background letterforms.
- Stack CTAs if horizontal space is limited.
- Use smaller ambient gradients.
- Avoid fixed-height layouts that clip content.
- Keep touch targets approximately `44px` or larger.
- Prevent decorative elements from covering the text.

---

## 9. Light and Dark Theme System

Both themes must be first-class designs, not simple background inversions.

### Theme Behavior

- Implement a global light/dark toggle.
- Use semantic CSS variables for backgrounds, surfaces, borders, text, shadows, and focus indicators.
- The theme must not change unexpectedly while scrolling.
- Respect `prefers-color-scheme` on the first visit.
- Persist explicit user selection using `localStorage`.
- Avoid flashes of the incorrect theme during initialization.
- Add accessible labels: `Switch to light theme` and `Switch to dark theme`.
- Keep all interactions functional in both themes.

### CSS Variables

```css
:root {
  color-scheme: light;

  --bg: #F5F1EB;
  --bg-elevated: #FFFCF8;
  --surface: #EEE8E1;
  --surface-hover: #E7DFEA;

  --text-primary: #25232B;
  --text-secondary: #5D5865;
  --text-muted: #6F6876;

  --border: rgba(37, 35, 43, 0.14);

  --accent: #6D4AD8;
  --accent-strong: #5A35C5;
  --accent-blue: #376FC8;
  --focus: #5A35C5;
}

[data-theme="dark"] {
  color-scheme: dark;

  --bg: #09090D;
  --bg-elevated: #111117;
  --surface: #17171F;
  --surface-hover: #20202B;

  --text-primary: #F5F2FA;
  --text-secondary: #B8B3C7;
  --text-muted: #A19AAD;

  --border: rgba(235, 230, 255, 0.13);

  --accent: #A78BFA;
  --accent-strong: #8B5CF6;
  --accent-blue: #60A5FA;
  --focus: #C4B5FD;
}

body {
  background: var(--bg);
  color: var(--text-primary);
  transition:
    background-color 300ms ease,
    color 300ms ease;
}
```

### Theme Implementation Requirements

- Navigation, menus, buttons, links, project artwork, borders, and focus states must use theme-aware tokens.
- Shadows must be adjusted for the active theme.
- Check gradient text on both backgrounds.
- Do not use pale lavender as small text on a light background.
- Use the same visual identity across both themes.
- The dark hero and closing section may remain dark if that is an intentional art direction, but the theme toggle must behave predictably. If the toggle is global, provide a deliberately designed light version of the hero.

---

## 10. Pinterest-Inspired Project Gallery

### Creative Direction

The project gallery should feel like a curated design collection rather than a uniform grid of identical cards.

Use:

- Asymmetric compositions.
- Mixed portrait, landscape, and square project previews.
- Oversized project numbers.
- Editorial captions.
- Generous gutters.
- Intentional negative space.
- Subtle overlapping elements.
- Distinctive artwork for each project.
- Warm backgrounds with carefully controlled lavender accents.

### Project Layout

Alternate between:

1. Large landscape project showcase.
2. Narrower editorial project composition.
3. Full-width feature with supporting technical details.
4. Contrasting layout for the next project.

Do not use random masonry placement if it damages reading order or responsive consistency.

### Project Information Hierarchy

Every project should contain:

1. Project number and category.
2. Project title.
3. A concise description of the problem solved.
4. A strong visual preview.
5. Selected technologies.
6. Links to the case study, live demo, or source code when available.

### Recommended Projects

**01 — Voice AI Platform**

- Text-to-speech generation.
- Voice cloning and voice management.
- Organization of multiple voices.
- Highlight architecture, model integration, and deployment challenges.

**02 — Document-Grounded RAG Assistant**

- Document ingestion and chunking.
- Embeddings and vector search.
- Retrieval-augmented responses.
- Grounded answering and fallback behavior.

**03 — Full-Stack Product**

Choose the strongest complete application demonstrating frontend quality, API design, data modeling, authentication, and real workflows.

Only publish metrics, features, and results that are accurate and verifiable.

### Project Hover Behavior

- Slight image scale: `1.015–1.03`.
- Small arrow movement.
- Optional gradient reveal.
- Subtle border or background transition.
- No excessive tilt or bouncing.
- Essential information must remain visible without hover.

---

## 11. Engineering Approach Section

Create a distinctive section that shows how the developer thinks, not just which technologies they use.

Potential topics:

- Designing RAG pipelines.
- Connecting models with tools and external systems.
- Building reliable APIs.
- Structuring scalable React applications.
- Managing asynchronous operations.
- Balancing user experience and backend complexity.

Use diagrams, small architecture illustrations, and concise technical explanations.

Avoid fake code terminals, meaningless code animations, and unverified performance metrics.

---

## 12. Motion Design System

Motion must feel smooth, expressive, and deliberate.

### Motion Tokens

```css
:root {
  --duration-fast: 180ms;
  --duration-normal: 300ms;
  --duration-reveal: 600ms;
  --duration-dramatic: 900ms;

  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### Hero Entrance Sequence

1. Background fades in.
2. Ambient gradient becomes visible.
3. Eyebrow appears.
4. Headline lines rise into position.
5. Gradient text settles into view.
6. Supporting text appears.
7. CTA controls become visible.
8. Navigation and scroll indicator settle into their final positions.

Keep the full sequence short enough that the user can interact with the page immediately.

### Scroll Animations

- Reveal sections as they enter the viewport.
- Use modest vertical movement of `12px–24px`.
- Prefer opacity and transforms.
- Animate a reveal only once unless repetition serves a clear purpose.
- Avoid scroll hijacking.
- Avoid animating every word in long paragraphs.
- Keep content visible when JavaScript or animation fails.

### Hover Animations

Buttons:
- Slight upward movement.
- Smooth background or border transition.
- Small arrow movement.

Links:
- Animated underline.
- Subtle color change.
- Visible focus state.

Project previews:
- Slight image scaling.
- Optional restrained gradient overlay.

Theme toggle:
- Short, clear icon transition.
- No excessive spinning or bouncing.

### Ambient Motion

- Slow, low-amplitude movement.
- Keep gradients behind the content.
- Prefer CSS or SVG over a heavy 3D engine.
- Avoid continuously animating multiple large blur filters.
- Disable continuous animation for reduced-motion users.

### Reduced Motion

Respect `prefers-reduced-motion: reduce`.

When enabled:

- Remove parallax and large spatial movement.
- Stop continuous ambient animation.
- Reduce entrance transitions to simple fades or immediate visibility.
- Preserve all content and functionality.
- Never make content dependent on animation completion.

---

## 13. Component Architecture

Suggested React structure:

```text
src/
├── app/
│   └── App.jsx
├── components/
│   ├── layout/
│   │   ├── SiteHeader.jsx
│   │   ├── SiteFooter.jsx
│   │   ├── PageContainer.jsx
│   │   └── SectionHeading.jsx
│   ├── navigation/
│   │   ├── ThemeToggle.jsx
│   │   └── MobileMenu.jsx
│   ├── motion/
│   │   ├── Reveal.jsx
│   │   └── GradientText.jsx
│   ├── hero/
│   │   ├── HeroSection.jsx
│   │   └── HeroBackdrop.jsx
│   ├── projects/
│   │   ├── ProjectGrid.jsx
│   │   ├── ProjectFeature.jsx
│   │   └── ProjectMeta.jsx
│   └── sections/
│       ├── WorkSection.jsx
│       ├── ApproachSection.jsx
│       ├── ExperienceSection.jsx
│       ├── AboutSection.jsx
│       └── ContactSection.jsx
├── data/
│   ├── projects.js
│   └── experience.js
├── hooks/
│   └── useTheme.js
└── styles/
    ├── tokens.css
    ├── global.css
    └── motion.css
```

Adapt this structure to the existing project instead of duplicating files unnecessarily.

### Recommended Dependencies

- React + JavaScript.
- Vite if a build tool is not already configured.
- Motion for React for animation and interactions.
- CSS custom properties for theme tokens.
- CSS Modules or organized component styles.
- SVG and CSS for decorative typography and gradients.

Only introduce a 3D library if the design genuinely requires it.

---

## 14. Responsive Breakpoints

Use content-driven layouts and test real device widths.

| Breakpoint | Design behavior |
|---|---|
| `1440px+` | Full editorial layout, large display typography |
| `1024–1439px` | Preserve asymmetry with reduced spacing |
| `768–1023px` | Simplify overlaps and reduce headline size |
| `480–767px` | Single-column storytelling and compact navigation |
| `<480px` | Simplified artwork, stacked CTAs, tighter spacing |

Use `clamp()`, `min()`, `max()`, and flexible grids where appropriate.

Avoid fixed heights that cause content clipping.

---

## 15. Accessibility and Performance

### Accessibility

- Use semantic landmarks: `header`, `nav`, `main`, `section`, and `footer`.
- Maintain one clear `h1`.
- Preserve logical heading hierarchy.
- Support keyboard navigation.
- Show visible focus indicators.
- Provide accessible names for icon-only controls.
- Maintain sufficient text contrast in both themes.
- Do not communicate important information through color or motion alone.
- Honor reduced-motion preferences.
- Use meaningful image alt text; decorative graphics should have empty alt text.
- Ensure mobile touch targets are comfortably usable.

### Performance

- Prefer transforms and opacity for animations.
- Limit large blurred filters and fixed backgrounds.
- Optimize images and use responsive sizes.
- Lazy-load below-the-fold images.
- Avoid unnecessarily large video backgrounds.
- Keep the hero visually rich but lightweight.
- Prevent layout shifts.
- Test on mobile and lower-powered devices.
- Ensure decorative effects can fail gracefully.

---

## 16. Content Guidelines

The portfolio should communicate:

- Who I am.
- What I build.
- How I approach engineering problems.
- What I personally contributed to each project.
- Why the projects are technically interesting.
- How someone can explore my work or contact me.

Keep homepage copy concise.

Put deeper technical explanations in project case studies.

Use honest project descriptions. Never invent users, customers, metrics, or outcomes.

---

## 17. Implementation Order

### Phase 1 — Foundation

- Set up semantic color tokens.
- Configure typography.
- Establish global spacing and layout.
- Build reusable buttons, containers, and labels.
- Implement theme management.

### Phase 2 — Hero

- Build the dark cinematic hero.
- Create expressive oversized typography.
- Implement the gradient text mask.
- Add restrained background letterforms.
- Build responsive navigation and CTAs.

### Phase 3 — Project Gallery

- Design the warm editorial section.
- Create varied project compositions.
- Add project metadata and visual previews.
- Connect real project links and case studies.

### Phase 4 — Remaining Sections

- Engineering approach.
- Experience.
- About.
- Contact.
- Closing dark section.

### Phase 5 — Motion and Polish

- Add entrance reveals.
- Add hover interactions.
- Tune gradient transitions.
- Check reduced-motion behavior.
- Refine responsive layouts.
- Optimize image loading and rendering.

Do not add every animation before the underlying layout is complete.

---

## 18. Acceptance Checklist

### Visual Design

- [ ] Both light and dark themes are intentionally designed.
- [ ] Hero typography is the primary visual identity.
- [ ] No portrait is used.
- [ ] Gradient masking is restrained and readable.
- [ ] Warm editorial sections contrast with the cinematic hero.
- [ ] Project layouts use varied proportions and curated spacing.
- [ ] No repetitive wall of identical cards.
- [ ] Typography and spacing remain consistent.

### Interactions

- [ ] Theme toggle works across all components.
- [ ] Theme preference initializes correctly.
- [ ] Navigation and mobile menu work.
- [ ] Keyboard focus is visible.
- [ ] Hover states are smooth and restrained.
- [ ] Reduced-motion settings are respected.
- [ ] Essential content is never hidden behind hover effects.

### Responsive Design

- [ ] No horizontal overflow.
- [ ] Headlines wrap cleanly.
- [ ] CTAs remain accessible.
- [ ] Background typography does not obscure content.
- [ ] Mobile navigation is usable.
- [ ] Layout works on short and narrow screens.

### Engineering Quality

- [ ] Components are reusable and maintainable.
- [ ] Content is separated from presentation.
- [ ] Colors use semantic tokens.
- [ ] Images are optimized.
- [ ] Below-the-fold images are lazy-loaded.
- [ ] Contrast is checked in both themes.
- [ ] Project details and links are accurate.
- [ ] Decorative effects fail gracefully.

---

## Final Creative Direction

Create a portfolio that feels like a carefully art-directed collection of intelligent products.

The opening should be cinematic and typography-led. The work should unfold through warm, Pinterest-inspired editorial layouts. The technical sections should demonstrate genuine engineering depth. The closing should return to the dark visual identity and leave a memorable final impression.

The goal is not to show how many effects the website can render. The goal is to make the design distinctive, the projects compelling, and the engineering credible.
