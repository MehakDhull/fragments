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
        ...globals.node,   // ✅ This is what you need
      },
      sourceType: "commonjs", // ✅ Because you’re using require/module.exports
      ecmaVersion: "latest"
    }
  },
]);