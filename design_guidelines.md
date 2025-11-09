# Design Guidelines: MVP de Rede Social (The Anti-Social Network)

## Design Approach

**Reference-Based Approach:** Drawing from Instagram and Linear's design philosophies, adapted for a minimalist, mindful social experience. The interface prioritizes clarity and reduces engagement manipulation—finite feeds, no infinite scroll, calm aesthetics.

**Core Principle:** Restrained minimalism with purposeful interactions. Every element serves user goals without distraction.

---

## Color Palette (From Reference Image)

- **Background Primary:** `#0A0A0A` (near-black)
- **Background Secondary:** `#1A1A1A` (cards, elevated surfaces)
- **Accent Primary:** `#4A8FFF` (vibrant blue - CTAs, links, active states)
- **Text Primary:** `#FFFFFF` (headings, important text)
- **Text Secondary:** `#A0A0A0` (body text, metadata)
- **Border/Divider:** `#2A2A2A` (subtle separators)

---

## Typography

**Font Family:** 
- Primary: Inter (via Google Fonts CDN)
- Monospace: JetBrains Mono (for timestamps, metadata)

**Scale:**
- **H1 (Page Headers):** text-3xl font-bold (white)
- **H2 (Section Headers):** text-xl font-semibold (white)
- **Body:** text-base font-normal (secondary gray)
- **Labels/Metadata:** text-sm font-medium (secondary gray)
- **Micro (timestamps):** text-xs font-mono (muted gray)

---

## Layout System

**Spacing Primitives:** Use Tailwind units: `2, 4, 6, 8, 12, 16`
- Component padding: `p-4` or `p-6`
- Section gaps: `gap-6` or `gap-8`
- Large spacing: `py-12` or `py-16`

**Container Strategy:**
- Max-width: `max-w-2xl` for main content (centered feed)
- Full-width: Navigation/header spans entire viewport
- Cards: Consistent `rounded-xl` corners

**Grid Patterns:**
- Single-column feed (mobile-first)
- Sidebar navigation on desktop: `grid grid-cols-[240px_1fr]`

---

## Core Components

### Authentication Screens (Login, Cadastro, Esqueci Senha)
- Centered card layout: `max-w-md mx-auto mt-24`
- Logo/icon at top with `mb-8`
- Form inputs: Full-width, `h-12`, `rounded-lg`, dark background with border
- Primary button: Blue accent, `h-12`, `rounded-lg`, full-width
- "Continuar com Google" button: Outlined variant below primary
- Links: Small, blue accent, positioned below forms

### Navigation (Desktop Sidebar + Mobile Bottom Bar)
**Desktop:** Fixed left sidebar, `w-60`, vertical icon+label navigation
**Mobile:** Fixed bottom bar with icon-only navigation
- Icons: Heroicons (outline for inactive, solid for active)
- Active state: Blue accent color
- Sections: Feed, Atividade, Perfil, Sair

### Feed de Posts
**Post Card Structure:**
- White/light border, `rounded-xl`, `p-6`, `bg-[#1A1A1A]`
- Header: Avatar (48px circle) + Username (bold) + timestamp (mono, small)
- Content area: Text with `mb-4`, followed by media (if present)
- Media: Full-width images/videos, `rounded-lg`, max-height constraint
- Action bar: Horizontal flex with Like (heart icon) + Comment (bubble icon) + counts
- Comment section: Nested below, lighter background, `rounded-lg`

**Feed Layout:**
- Vertical stack with `gap-6`
- Finite scrolling (max 20 posts or 24h limit message at bottom)
- "Criar Post" button fixed/sticky at top right

### Página de Atividade/Notificações
**Notification Item:**
- Horizontal layout: Avatar + Message + Action/Time
- Background hover state: Slightly lighter gray
- Unread indicator: Blue dot on left edge
- Grouped by type: "Curtidas", "Comentários", "Solicitações de Seguir"
- Clear sections with headers

### Criar Post Modal/Overlay
- Dark overlay background: `bg-black/60`
- Centered modal: `max-w-xl`, `rounded-xl`, `bg-[#1A1A1A]`
- Textarea: Auto-expanding, min 3 rows, dark background
- Media upload: Drag-and-drop zone with icon + text
- Preview area: Shows uploaded media with remove option
- Action buttons: Cancel (secondary) + Postar (blue, primary)

### Profile/Perfil
- Header section: Cover area (optional) + avatar (large, 120px)
- Bio/metas section: Card with user's development goals
- Activity grid: User's posts in same feed card format
- Edit button: Top-right, outlined style

---

## Component Library Details

**Buttons:**
- Primary: Blue background, white text, `h-12`, `px-6`, `rounded-lg`
- Secondary: Transparent, border, `h-12`, `px-6`, `rounded-lg`
- Icon-only: 40px square, centered icon, hover background

**Form Inputs:**
- Height: `h-12`
- Background: `bg-[#1A1A1A]`
- Border: `border border-[#2A2A2A]`
- Focus: Blue border, no ring
- Padding: `px-4`

**Avatars:**
- Sizes: 32px (small), 48px (default), 120px (profile)
- Always circular
- Placeholder: Gray background with initials

**Icons:**
- Library: Heroicons (outline/solid variants)
- Size: 20px for UI, 24px for primary actions
- Color: Inherit from parent or secondary gray

---

## Interaction Patterns

**Animations:** Minimal—use only for:
- Button hover: subtle scale or brightness change
- Modal entry: fade + slide from bottom
- Like button: quick scale bounce on click

**Loading States:**
- Skeleton screens matching card structure
- Pulse animation on gray backgrounds
- Never use spinners except for button loading

**Empty States:**
- Centered icon + message
- Subtle call-to-action below
- No decorative illustrations

---

## Images

**Profile Avatars:** Circular user photos, gray placeholder with initials if missing

**Post Media:** User-uploaded images/videos displayed full-width within post cards, aspect ratio preserved with max-height of 500px, `object-cover`

**No Hero Images:** This is a utility-focused social app, not a marketing site. All screens are functional interfaces.

---

## Accessibility

- Maintain WCAG AA contrast (already met with chosen palette)
- All interactive elements: min 44px touch target
- Focus indicators: Blue outline, 2px
- Alt text for all images/avatars
- ARIA labels for icon-only buttons

---

## Responsive Behavior

**Mobile (<768px):**
- Single-column, full-width cards
- Bottom navigation bar (fixed)
- Simplified post creation (bottom sheet)

**Desktop (≥768px):**
- Left sidebar navigation
- Centered feed with max-width
- Richer post creation modal
- Hover states enabled