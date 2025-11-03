import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Assumption: main site domain
  site: "https://mohand-hamadouche.info",
  // Inline all CSS into the HTML to avoid extra stylesheet requests
  // and reduce render-blocking round-trips on small styles.
  build: {
    inlineStylesheets: 'always'
  },
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
  // Silence a noisy upstream Vite/Rollup warning from Astro internals
  // Warning example: imported from "@astrojs/internal-helpers/remote" but never used
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          const isUnusedExternalImport = warning?.code === 'UNUSED_EXTERNAL_IMPORT';
          const mentionsRemoteHelper = typeof warning?.message === 'string' && /@astrojs\/internal-helpers\/remote/.test(warning.message);
          const fromAstroAssets = typeof warning?.id === 'string' && /node_modules[\\\/]astro[\\\/]dist[\\\/]assets/.test(warning.id);
          if (isUnusedExternalImport && (mentionsRemoteHelper || fromAstroAssets)) {
            return; // ignore this known benign warning
          }
          defaultHandler(warning);
        }
      }
    }
  }
});