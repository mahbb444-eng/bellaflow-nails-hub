// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // Public browser configuration must be embedded at build time. Keeping
    // explicit fallbacks prevents a production bundle from being emitted
    // without them when the deployment environment omits VITE_* variables.
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
        process.env["VITE_SUPABASE_URL"] ??
          process.env["SUPABASE_URL"] ??
          "https://ddbfeqawdgbstpxtdoyl.supabase.co",
      ),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
        process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
          process.env["SUPABASE_PUBLISHABLE_KEY"] ??
          "sb_publishable_CAQxK-myvHqjh5Mm0GrWFw_H9Ds7tQC",
      ),
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: { preset: "vercel" },
});
