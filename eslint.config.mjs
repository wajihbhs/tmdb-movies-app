import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import prettier from "eslint-plugin-prettier";

export default [
  eslint.configs.recommended,

  {
    ignores: [
      "node_modules/",
      "dist/",
      ".output/",
      ".nuxt/",
      "coverage/",
      "public/",
      "*.config.{js,ts}",
      "*.lock",
      "*.json",
      "*.d.ts"
    ]
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: "module",
        ecmaVersion: "latest",
        extraFileExtensions: [".vue"]
      }
    },
    plugins: {
      vue,
      prettier,
      "@typescript-eslint": tseslint
    },
    rules: {
      "prettier/prettier": "error",
      "vue/multi-word-component-names": "off",
      "vue/no-multiple-template-root": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-unused-vars": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-undef": "off"
    }
  },

  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-unused-vars": "off"
    }
  },

  // Global Nuxt helpers
  {
    name: "nuxt-globals",
    languageOptions: {
      globals: {
        console: "readonly",
        window: "readonly",
        document: "readonly",
        process: "readonly",
        defineNuxtPlugin: "readonly",
        definePageMeta: "readonly",
        defineNuxtRouteMiddleware: "readonly",
        useRuntimeConfig: "readonly",
        useNuxtApp: "readonly",
        useRouter: "readonly",
        useRoute: "readonly",
        useAsyncData: "readonly",
        useFetch: "readonly",
        useState: "readonly",
        ref: "readonly",
        computed: "readonly",
        onMounted: "readonly",
        localStorage: "readonly",
        crypto: "readonly",
        $axios: "readonly",
        navigateTo: "readonly"
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  }
];
