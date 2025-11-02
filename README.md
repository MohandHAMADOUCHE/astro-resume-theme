# Astro Resume Theme

Astro Resume Theme is a fully customizable and responsive portfolio/CV site built with Astro and Tailwind CSS. This repository contains a ready-to-run site you can clone and customize for your personal use.

## Usage (for this repository)

This repository is not published as a public Astro template. To run this project locally, clone the repository, install dependencies, and start the dev server:

```bash
# Clone the repository (replace with your repo URL if different)
git clone <your-repo-url>
cd website-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

If you're already working on the machine that contains the repository, you can skip the clone step.

The dev server runs by default at http://localhost:4321

## Features

- Tailwind CSS for utility-first styling
- Dark mode with a toggle component
- Theme and color customization via `src/styles/theme.css`
- Responsive layout for mobile, tablet, and desktop
- MDX support for content with JSX components
- SEO-friendly and optimized for performance

## Commands

All commands are run from the project root. Examples below use npm.

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `npm install`       | Installs dependencies                            |
| `npm run dev`       | Starts local dev server at `http://localhost:4321` |
| `npm run build`     | Build your production site to `./dist/`          |
| `npm run preview`   | Preview the built site locally                   |
| `npm run astro ...` | Run Astro CLI commands like `astro add`, `astro check` |

## Getting Started

1. Clone this repository and run `npm install`.
2. Edit your resume and site content in `src/config/cv.json`.
3. Customize theme colors in `src/styles/theme.css` and `tailwind.config.mjs`.
4. Replace your CV file by placing a PDF in `public/cv/` and updating `basic.cv_file_name` in `src/config/cv.json`.
5. Set your avatar by placing an image in `public/images/` and setting `basic.avatar` in `src/config/cv.json`.
6. Node version: Node.js >= 18.20.8 is required for Astro 5+. Node >= 20 is recommended. If you use `nvm`, run `nvm use` (a `.nvmrc` is present).
7. Run the development server:

```bash
npm run dev
```

Open http://localhost:4321 in your browser.

## i18n (FR / EN) content model

- Experiences and Education items in `src/config/cv.json` support bilingual fields:
  - `title_en`, `sub_title_en`, `details_en`
  - If the `_en` fields are omitted, the French values are used as a fallback.
- Projects support bilingual fields:
  - `title_en`, `type_en`, `description_en` with the same fallback behavior.
- Skills support bilingual categories/items optionally:
  - `category_en`, `items_en` per group; fall back to FR if missing.

Routes:
- English is the default at `/`
- French is available under `/fr/` (e.g., `/fr/contact`)

## Key files and folders

- `src/config/cv.json` — main data file (experiences, education, projects, avatar, cv file name)
- `src/sections/portfolio/` — portfolio-related components (e.g., `Portfolio.astro`, `CardListItem.astro`)
- `src/components/common/ThemeToggle.astro` & `src/scripts/theme.ts` — theme toggle UI and logic
- `src/styles/theme.css` & `tailwind.config.mjs` — visual customization
- `public/images/` — images (avatar, thumbnails)
- `public/cv/` — PDF CV files (if used)

## Deployment

- Build locally with: `npm run build` (runs `astro check && astro build`).
- Deploy the `dist/` directory to static hosts like Vercel, Netlify, or Cloudflare Pages.
- Ensure the Node version on your hosting platform matches the project requirements.

## Development tips

- `astro check` is included in the `build` script to run basic checks.
- Use `nvm` to manage Node versions if needed (`nvm use`).
- Follow existing component and section patterns in `src/components/` and `src/sections/` when adding or changing UI.

## License

This project is licensed under the MIT License. See `LICENSE` for details.

## Attribution

This README and parts of the project structure are modifications of the original project by Wasut Panyawiphat.