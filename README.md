# RIVA — Wear The Noise

A multi-file Vite + TypeScript + Tailwind CSS version of the supplied RIVA single-file frontend.

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Structure

- `index.html` — page shell and all view markup
- `src/main.ts` — RIVA interactions, routing, product/cart/checkout logic
- `src/style.css` — extracted visual styling + Tailwind entry
- `public/images/` — place real product/fashion images here later
- `package.json` — Vite, TypeScript and Tailwind dependencies
- `vite.config.ts` — Vite + Tailwind integration
- `tsconfig.json` — TypeScript configuration

The existing visual design and functionality were preserved rather than rewritten from scratch.
