# Touchmark Website Design & Engineering Standards

You are pair programming to build the Touchmark Website. You must strictly adhere to the following design system tokens and engineering standards.

## 🎨 Design System Tokens

### 1. Typography & Fonts
- **Primary Font**: `Gellix` (Tailwind class: `font-primary`).
  - Use for headings, hero text, and prominent branding.
- **Secondary Font**: `Inter` (Tailwind class: `font-secondary`).
  - Use for body text, descriptions, details, buttons, and navigation.

### 2. Color Palette
- **Primary Color**: `#194F97` (Tailwind class: `text-primary`, `bg-primary`, `border-primary`, etc.).
  - Use for brand elements, primary backgrounds, highlights, and primary buttons.
- **Secondary Color**: `white` / `#ffffff` (Tailwind class: `text-secondary`, `bg-secondary`, `border-secondary`, `text-white`, `bg-white`, etc.).
  - Use for layouts, backgrounds, high-contrast text, secondary buttons.

> [!WARNING]
> Never hardcode arbitrary colors (e.g. `text-[#194F97]`) or fallback fonts. Always use the Tailwind design system classes (`font-primary`, `font-secondary`, `text-primary`, `bg-primary`, etc.).

---

## 🛡️ Engineering Standards

### 1. Folder Structure & Layouts
- Organize files cleanly:
  - Components: `/components/` or `/app/components/`
  - Services/API: `/services/` or `/lib/api/`
  - Utilities: `/utils/` or `/lib/utils/`
  - Hooks: `/hooks/` or `/app/hooks/`

### 2. Naming Conventions
- React components must use **PascalCase** (e.g., `Header.tsx`, `HeroSection.tsx`).
- Helper functions and custom hooks must use **camelCase** (e.g., `useAuth.ts`, `formatDate.ts`).
- Constants must use **UPPER_SNAKE_CASE**.

### 3. API Isolation
- Do not make raw network requests (`fetch`/`axios`) directly inside UI components. Route them through dedicated client modules in `/lib/api/` or `/services/`.

### 4. Image Optimization
- Always use optimized image formats (`*.webp` or `*.avif`). Avoid committing raw PNG/JPG.
