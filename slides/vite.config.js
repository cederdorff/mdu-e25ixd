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
        productOptimization01: resolve("slides/product-optimization-01/index.html"),
        productOptimization02: resolve("slides/product-optimization-02/index.html"),
        productOptimization03: resolve("slides/product-optimization-03/index.html"),
        productOptimization04: resolve("slides/product-optimization-04/index.html")
      }
    }
  }
});
