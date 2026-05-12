---
---
name: AI Workflow Template Hub
colors:
  surface: '#0f1418'
  surface-dim: '#0f1418'
  surface-bright: '#343a3e'
  surface-container-lowest: '#0a0f12'
  surface-container-low: '#171c20'
  surface-container: '#1b2024'
  surface-container-high: '#252b2e'
  surface-container-highest: '#303539'
  on-surface: '#dee3e8'
  on-surface-variant: '#bdc8d1'
  inverse-surface: '#dee3e8'
  inverse-on-surface: '#2c3135'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  primary: '#8ed5ff'
  on-primary: '#00354a'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#00668a'
  secondary: '#bcc7de'
  on-secondary: '#263143'
  secondary-container: #3e495d'
  on-secondary-container: '#aeb9d0'
  tertiary: '#ffc176'
  on-tertiary: '#472a00'
  tertiary-container: '#f1a02b'
  on-tertiary-container: '#613b00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb960'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0f1418'
  on-background: '#dee3e8'
  surface-variant: '#303539'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.7'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for developers and automation engineers, prioritizing clarity, technical precision, and a "low-light" premium aesthetic. The vibe is reminiscent of high-end IDEs and technical documentation platforms: calm, focused, and high-utility.

The style leverages **Minimalism** with a **Technical/Modern** edge. It avoids unnecessary decoration, instead using subtle borders and intentional typography to create hierarchy. Visual depth is achieved through layered slate surfaces rather than heavy shadows, ensuring the interface feels grounded and integrated. The primary sky blue accent provides a sharp, energetic contrast against the deep navy base, signaling interactivity and modern AI capabilities.

## Colors

This design system utilizes a deep-sea palette optimized for long-term screen use. The background (#0F172A) provides a non-pure-black canvas that reduces eye strain while maintaining high contrast for text. 

The **9-Category Color System** has been adjusted for dark mode accessibility. Each category uses a high-vibrancy, low-saturation tint (300-400 range on the Tailwind scale) to ensure legibility against dark surfaces. When used as backgrounds for badges or chips, these colors should be applied at 10-15% opacity with a solid 1px border of the same color at 40% opacity.

The primary accent (#38BDF8) is reserved for critical actions, active states, and focus indicators, ensuring the user's eye is always drawn to the most relevant interactive elements.

## Typography

Typography is the backbone of the technical aesthetic. **Plus Jakarta Sans** provides a modern, slightly geometric feel for headings, maintaining a "premium" software look. **Inter** is used for body copy due to its exceptional legibility on digital screens.

**JetBrains Mono** is utilized for code snippets, metadata, and technical labels, reinforcing the developer-centric nature of the product. 

- Use **h1** for page titles only.
- Use **body-md** for general descriptions.
- Use **label-caps** for category tags and small UI identifiers.
- On mobile devices, **h1** scales down to 32px to ensure fit and readability.

## Layout & Spacing

The design system follows a **Fixed Grid** approach for desktop views to maintain the structure typical of technical documentation. The content is centered within a 1280px container.

- **Grid:** 12-column layout with 24px gutters.
- **Rhythm:** An 8px linear scale is used for all padding and margins to maintain consistent vertical rhythm.
- **Sidebars:** Navigation sidebars should be fixed at 280px width, utilizing the `Surface` color to distinguish them from the main content `Background`.
- **Mobile:** Transition to a single-column fluid layout with 16px horizontal margins.

## Elevation & Depth

This system utilizes **Tonal Layering** rather than traditional drop shadows to communicate depth.

- **Level 0 (Background):** #0F172A — The base canvas.
- **Level 1 (Surface):** #1E293B — Cards, sidebars, and navigation headers.
- **Level 2 (Surface Alt):** #334155 — Hover states, modal backdrops, and nested UI elements.

**Borders:** A consistent 1px solid border (#334155) is used on all Level 1 surfaces to provide definition. For active states, the border transitions to the Primary Slate (#38BDF8) with a subtle outer glow (0px 0px 8px rgba(56, 189, 248, 0.25)).

## Shapes

The shape language is **Soft** (roundedness: 1). This ensures that while the interface remains technical and "structured," it doesn't feel aggressive or dated. 

- **Default (4px):** Used for buttons, input fields, and small UI components.
- **Large (8px):** Used for cards, code blocks, and modals.
- **Full (Pill):** Used exclusively for status indicators and category chips to differentiate them from functional buttons.

## Components

### Buttons
- **Primary:** Background #38BDF8, Text #0F172A (Bold). Hover state #7DD3FC.
- **Secondary:** Background transparent, Border 1px #334155, Text #F8FAFC. Hover background #334155.
- **Ghost:** Background transparent, Text #94A3B8. Hover text #F8FAFC.

### Cards
Cards use the `Surface` color with a 1px `Border`. Card headers should use a subtle bottom border to separate titles from body content.

### Chips & Badges
Chips use the category-specific color at 10% opacity for the background and 100% opacity for the text. Use JetBrains Mono for the label to emphasize the "data" aspect.

### Inputs
Input fields use the `Background` color (#0F172A) to create an "inset" feel against the `Surface` containers. Borders are #334155, changing to #38BDF8 on focus.

### Code Blocks
Code blocks should use a slightly darker or distinct background (e.g., #0B1120) to contrast with the main surface, featuring syntax highlighting based on the category colors.locks

---