import { readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// Alle mapper i slides/ med en index.html bygges automatisk som et deck.
const decks = readdirSync(resolve("slides"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(resolve("slides", entry.name, "index.html")))
  .map((entry) => entry.name);

export default defineConfig({
  root: resolve("slides"),
  base: "./",
  build: {
    outDir: resolve("dist/slides"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve("slides/index.html"),
        ...Object.fromEntries(decks.map((name) => [name, resolve("slides", name, "index.html")]))
      }
    }
  }
});
