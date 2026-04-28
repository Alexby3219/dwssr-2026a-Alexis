import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1 que ignaore los buils del front y dependencias

  {
    ignores: ["node_modules/*", "dist/*"],
  },

  // 2 backend: server/** */

  {
    files: ["server/*/.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js.config.recommended"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
  },
  // 3 frontend: src/** */

  {
    files: ["src/*/.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js.config.recommended"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
    },
  },
]);