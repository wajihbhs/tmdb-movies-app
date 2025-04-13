import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import prettier from "eslint-plugin-prettier";

export default [
  eslint.configs.recommended,
  {
    ignores: ["node_modules/", "dist/", ".output/", ".nuxt/", "coverage/"],
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: "module",
        ecmaVersion: "latest",
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      vue,
      prettier,
      "@typescript-eslint": tseslint,
    },
    rules: {
      "prettier/prettier": "error",
      "vue/multi-word-component-names": "off",
      "vue/no-multiple-template-root": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-unused-vars": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
  },
  {
    name: "global-settings",
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      globals: {
        console: "readonly",
        window: "readonly",
        document: "readonly",
        process: "readonly",
        defineNuxtPlugin: "readonly",
        useRuntimeConfig: "readonly",
      },
    },
  },
];
