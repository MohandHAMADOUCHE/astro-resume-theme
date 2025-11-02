# Mohand Hamadouche — Portfolio

Personal portfolio/CV website built with Astro and Tailwind CSS. This repository contains the source code for my portfolio, ready for local development and deployment.

## Quick start

To run the project locally, install dependencies and start the development server:

```bash
# Clone the repository
git clone git@github.com:MohandHAMADOUCHE/mhd-portfolio-theme.git
cd mhd-portfolio-theme

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server runs at http://localhost:4321 by default.

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
- Deploy the `dist/` directory to a static host (Cloudflare Pages, Vercel, Netlify, …).
- This repo includes a GitHub Actions workflow for automatic deployment to Cloudflare Pages: `.github/workflows/deploy.yml`.
- If you use this workflow, configure the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in your repo settings.

### Deploying to Cloudflare Pages

You can deploy in two ways: connect the repo directly in Cloudflare Pages, or use the included GitHub Actions workflow.

Option A — Connect Git (recommended for simplicity)
1. In Cloudflare Dashboard → Pages → Create a project → Connect to Git.
2. Select this repository (`mhd-portfolio-theme`).
3. Build settings:
  - Framework preset: Astro (or None)
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Environment variables (Build): `NODE_VERSION=20`
4. Choose your production branch (e.g., `main`). Save and deploy.
5. Cloudflare will build on every push; non-production branches get Preview deployments.

Option B — GitHub Actions (already included in this repo)
1. Create a Cloudflare API token with Pages:Edit permission and note your Account ID.
2. In GitHub → Settings → Secrets and variables → Actions, add:
  - `CLOUDFLARE_ACCOUNT_ID` → your Cloudflare account ID
  - `CLOUDFLARE_API_TOKEN` → the API token created above
3. The workflow `.github/workflows/deploy.yml` will:
  - Build the site
  - Deploy to Cloudflare Pages using `cloudflare/pages-action@v1`
  - Use the repository name automatically as the project name: `${{ github.event.repository.name }}`
  - Publish from the `dist` directory and use the current ref name for the branch
4. In your Cloudflare Pages project settings, ensure the Production branch matches your repo (typically `main`).

Notes
- If you trigger the workflow outside of `push`/`pull_request` (e.g., `workflow_dispatch`), you can set a fallback project name via an env var step:

  ```yaml
  - name: Set repo name env (fallback)
   run: echo "REPO_NAME=${GITHUB_REPOSITORY##*/}" >> $GITHUB_ENV
  ```

  And then set `projectName: ${{ env.REPO_NAME }}` in the deploy step.
- Make sure Cloudflare uses Node 20 during builds (set `NODE_VERSION=20` in Pages → Settings → Environment variables).

## Development tips

- `astro check` is included in the `build` script to run basic checks.
- Use `nvm` to manage Node versions if needed (`nvm use`).
- Follow existing component and section patterns in `src/components/` and `src/sections/` when adding or changing UI.

## License

This project is licensed under the MIT License. See `LICENSE` for details.

## Attribution

This README and parts of the project structure are modifications of the original project by Wasut Panyawiphat.