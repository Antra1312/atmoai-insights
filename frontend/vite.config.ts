// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Build as a client-only SPA: do not generate the server bundle.
// The default config from @lovable.dev/vite-tanstack-config includes TanStack Start
// plugins — we override only the tanstackStart.server option to false so the
// build produces a regular client `dist` output (index.html + assets).
export default defineConfig({
  tanstackStart: {
    server: false,
  },
});
