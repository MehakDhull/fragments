import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, // ✅ Add this line to include Jest test globals
      },
      sourceType: "commonjs",
      ecmaVersion: "latest",
    },
  },
]);

