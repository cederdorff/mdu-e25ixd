import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve("slides"),
  base: "./",
  build: {
    outDir: resolve("dist/slides"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve("slides/index.html"),
        semesterstart: resolve("slides/semesterstart/index.html"),
      },
    },
  },
});
