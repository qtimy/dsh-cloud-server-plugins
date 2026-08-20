/**
 * tsdown build for dsh-better-sidebar-skin-yield.
 *
 * Two outputs, kept separate on purpose:
 *
 *   lib/index.js   - node ESM, host face. The plugin's host apply() is a
 *                    no-op (this plugin is browser-only); the bundle still
 *                    has to expose a valid cordis face so the loader can
 *                    resolve the plugin row registered in cordis.patch.yml.
 *                    Format ESM mirrors dsh-better-sidebar's `dsh.better-
 *                    sidebar/index.js` shape: named exports for `name`,
 *                    `inject`, and `apply`.
 *
 *   lib/client.js  - browser IIFE wrapped by the canonical DSH client
 *                    bundle preset (banner `window.__ModuleLoader__.load`,
 *                    footer `return module.exports; } });`) so the web
 *                    plugin roster accepts the file. No React/CSS Modules
 *                    wiring is necessary here -- the plugin only injects
 *                    a single static `<style>` tag at runtime.
 *
 * No `minify` (CI parity with the partner bundle's "keep readable for
 * postmortem diffing"). No external -- the plugin has zero runtime deps
 * and ships nothing but stdlib DOM/CSS APIs.
 */
import type { UserConfig } from 'tsdown'

const PLUGIN_ID = 'dsh-better-sidebar-skin-yield'

export default [
  {
    entry: { index: 'src/index.ts' },
    outDir: 'lib',
    format: ['esm'],
    platform: 'node',
    target: 'es2024',
    fixedExtension: false,
    dts: false,
    sourcemap: true,
    clean: false,
  },
  {
    entry: { client: 'src/client.ts' },
    outDir: 'lib',
    format: 'cjs',
    platform: 'browser',
    dts: false,
    sourcemap: true,
    clean: false,
    outputOptions: {
      entryFileNames: 'client.js',
      intro: 'var module = { exports: {} }; var exports = module.exports;',
      banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(PLUGIN_ID)}, factory: (require) => {`,
      footer: 'return module.exports; } });',
      // The client's host face is a no-op, so the body never reaches
      // __ModuleLoader__.load -- we can leave code splitting/default.
    },
  },
] satisfies UserConfig[]
