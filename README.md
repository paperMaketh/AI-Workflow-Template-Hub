# AI Workflow Template Hub

A static, documentation-style command center for storing, browsing, and copying AI-assisted development workflow templates, prompt patterns, and best practices.

## Overview
This platform serves as a personal quick-reference hub to manage standardized interactions with LLMs and coding agents (like Codex, Roo Code, Claude, and Google AI Studio). It enforces a design philosophy where the human is the "technical director" and the AI is the "fast implementer."

## Tech Stack
- React + Vite + TypeScript
- Tailwind CSS v4
- React Router DOM (`HashRouter` for GitHub Pages compatibility)
- Lucide React

## Development

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## GitHub Pages Deployment

This project uses `HashRouter` making it inherently compatible with static deployments like GitHub Pages without needing rewrite rules.

If deploying to a user site or custom domain, set base to `/` in `vite.config.ts`.
```ts
export default defineConfig({
  base: '/',
  // ...
});
```

If deploying to a project page (e.g. `your-username.github.io/repo-name/`), set base to `/repo-name/` in `vite.config.ts`.
```ts
export default defineConfig({
  base: '/repo-name/',
  // ...
});
```

## How to Add New Templates
1. Add the raw markdown prompt string to `src/data/templates.ts` using `export const MY_TEMPLATE = \`...\`;`.
2. Find the relevant page in `src/pages/` (e.g. `ImplementationTemplates.tsx`).
3. Add a `<TemplateCard />` referencing the imported template string, filling out the metadata (tags, context).

## How to Add New Sections
1. Add a new `CategoryId` or `Section` object to `src/data/sections.ts`.
2. Add a new route entry in `src/App.tsx`.
3. Create the corresponding page component in `src/pages/`.
4. The Sidebar will automatically pick up the new section from `sections.ts`.