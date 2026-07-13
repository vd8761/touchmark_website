import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The route bodies are converted static CMS exports. Their raw anchors are
    // upgraded by SubsidiaryUX, while editorial apostrophes remain plain text.
    files: ["app/**/page.tsx"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/no-unescaped-entities": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Checked-in third-party browser bundles are not authored source.
    "public/js/**",
  ]),
]);

export default eslintConfig;
