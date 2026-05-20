import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    env: {
      NEXT_PUBLIC_HOMEVISION_API_URL: "https://api.example.com/houses",
    },
    setupFiles: "./vitest.setup.ts",
    globals: true,
  },
});
