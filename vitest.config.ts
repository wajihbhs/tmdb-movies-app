import { defineConfig } from "vitest/config";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path"; // 👈 C'est ça qui manquait !

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "./")
    }
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./tests/setup.ts"],
    include: ["**/tests/unit/**/*.test.{js,ts}"],
    deps: {
      inline: ["@vue", "vue-demi"]
    }
  }
});
