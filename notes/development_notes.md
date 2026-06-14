# Development Notes

- Keep the scaffolded `src/app/globals.css` root theme block stable. Do not place
  CareerOS branding tokens or font fallbacks inside the default `:root` /
  `@theme inline` block unless explicitly requested.
- Avoid `next/font/google` in this project because restricted build environments
  may fail when fetching Google Fonts. Use local CSS variable fallbacks from
  `src/app/layout.tsx` instead.
