# TV Dance Center — Design System

## Direction

The public website is a dark, editorial dance portfolio: cinematic photography, oversized type, asymmetric composition, and restrained neon accents. It is intentionally distinct from a SaaS dashboard or student portal.

## Color tokens

| Token | Value | Use |
| --- | --- | --- |
| `--ink-950` | `#0A0A0A` | Main background |
| `--ink-900` | `#050505` | Alternate section background |
| `--ink-800` | `#111111` | Card surface |
| `--ink-700` | `#171717` | Borders and elevated surfaces |
| `--paper` | `#FFFFFF` | Primary text |
| `--muted` | `#9A9A9A` | Secondary text |
| `--pink` | `#E10600` | Primary action and highlight (Brand Red) |
| `--magenta` | `#FF1A14` | Glow and ambient accent (Brand Glow Red) |
| `--brand-hover` | `#c90500` | Primary CTA hover state |

Brand red is reserved for calls to action, active states, editorial rules, and small areas of emphasis. Long-form copy remains white or muted grey.

## Typography

- Display: **Bebas Neue**, uppercase, condensed, used for hero and section titles.
- Body/UI: **Inter**, used for navigation, body copy, labels, and buttons.
- Hero: `clamp(4.75rem, 15vw, 12rem)`.
- Section title: `clamp(3.25rem, 8vw, 7.5rem)`.
- Body: `1rem–1.125rem`, line height `1.65`.

## Layout and spacing

- 4px base spacing scale.
- Content width: `min(1240px, calc(100% - 40px))` on desktop; 24px and 18px side padding on tablet/mobile.
- Sections use 96–160px vertical rhythm on desktop and 72–96px on mobile.
- Editorial grids deliberately mix 5/7 and 4/8 columns; cards may span columns to avoid a uniform dashboard feel.

## Shape, depth, and media

- Small radius: 12px; cards: 20px; feature panels: 28–36px; pills: 999px.
- Hairline borders use translucent white.
- Shadows are soft black with selective red glow on interactive focus and hover.
- Photography is high-contrast, mostly desaturated until hover. Overlays preserve text readability.
- A subtle fixed noise layer reduces the flat digital appearance without obscuring content.

## Motion

- Micro interactions: 150–250ms.
- Image and card transitions: 450ms.
- Hero image receives a small scroll parallax; section content uses subtle reveal motion.
- `prefers-reduced-motion: reduce` removes parallax, reveal, smooth scrolling, and large transitions.

## Responsive behavior

- Mobile baseline: 375px — single-column cards, drawer navigation, readable type, no horizontal overflow.
- Tablet: 768px — two-column class/news layouts and simplified editorial composition.
- Desktop: 1280px+ — full asymmetric grid, sticky editorial title, full navigation.

## Accessibility

- Text and controls maintain WCAG AA contrast on dark surfaces.
- All interactive elements have visible keyboard focus.
- Menu button exposes `aria-expanded` and `aria-controls`.
- Decorative images use empty alt text; content images have descriptive Vietnamese alt text.
- Links describe their destination and external links expose safe `target`/`rel` attributes.
