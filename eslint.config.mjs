import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import boundaries from "eslint-plugin-boundaries";

import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

// If you use Prettier, uncomment the next line and the config block at the bottom
import prettier from "eslint-config-prettier";

export default [
	// Ignore build outputs and common generated folders
	{
		ignores: [
			"**/dist/**",
			"**/build/**",
			"**/.next/**",
			"**/coverage/**",
			"**/node_modules/**",
			"**/*.d.ts",
		],
	},

	js.configs.recommended,

	// TypeScript (includes type-aware rules if you configure projectService below)
	...tseslint.configs.recommended,

	// Shared config for TS/JS files
	{
		files: ["**/*.{ts,tsx,js,jsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			import: importPlugin,
			"unused-imports": unusedImports,
			boundaries,
		},
		settings: {
			// Helps eslint-plugin-import resolve TS path aliases
			"import/resolver": {
				typescript: {
					project: [
						"./tsconfig.json",
						"./apps/*/tsconfig.json",
						"./packages/*/tsconfig.json",
					],
				},
			},
			react: { version: "detect" },
			// boundaries: map files to “elements” so we can enforce import rules
			"boundaries/elements": [
				{ type: "admin", pattern: "apps/line-manager-admin/*" },
				{ type: "client", pattern: "apps/line-manager-client/*" },
				{ type: "api", pattern: "apps/line-manager-api/*" },

				{ type: "types", pattern: "packages/line-manager-types/*" },
				{ type: "schemas", pattern: "packages/line-manager-schemas/*" },
				{ type: "utils", pattern: "packages/line-manager-utils/*" },
			],
		},
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: __dirname,
			},
		},
		rules: {
			// Keep imports clean
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],

			// Reasonable TS defaults
			"@typescript-eslint/no-unused-vars": "off", // handled by unused-imports
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{ prefer: "type-imports", fixStyle: "inline-type-imports" },
			],

			// Import hygiene
			"import/no-duplicates": "error",
			"import/order": [
				"warn",
				{
					"newlines-between": "always",
					alphabetize: { order: "asc", caseInsensitive: true },
				},
			],

			// Enforce your monorepo boundaries
			"boundaries/element-types": [
				"error",
				{
					default: "disallow",
					rules: [
						// Apps can import from any packages
						{ from: ["admin"], allow: ["types", "schemas", "utils"] },
						{ from: ["client"], allow: ["types", "schemas", "utils"] },
						{ from: ["api"], allow: ["types", "schemas", "utils"] },

						// No cross-app imports
						{ from: ["admin"], disallow: ["client", "api"] },
						{ from: ["client"], disallow: ["admin", "api"] },
						{ from: ["api"], disallow: ["admin", "client"] },

						// Packages must not import from apps
						{
							from: ["types", "schemas", "utils"],
							disallow: ["admin", "client", "api"],
						},

						// Package layering (strict but sane)
						{ from: ["types"], disallow: ["schemas", "utils"] }, // keep types leaf-like
						{ from: ["utils"], allow: ["types"] },
						{ from: ["schemas"], allow: ["types"] },
					],
				},
			],

			// Ban deep imports across package internals (enforce “import from package entry only”)
			"no-restricted-imports": [
				"error",
				{
					patterns: [
						// Prevent importing source internals from workspace packages
						"@line-manager/*/src/*",
						"@line-manager/*/dist/*",
						"@line-manager/*/*/src/*",
					],
				},
			],
		},
	},

	// React rules only for TSX/JSX
	{
		files: ["**/*.{tsx,jsx}"],
		plugins: {
			react,
			"react-hooks": reactHooks,
			"jsx-a11y": jsxA11y,
		},
		rules: {
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,

			// With React 17+ / Vite, no need to import React for JSX
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
		},
	},

	// Nest/Node: loosen browser-specific assumptions if needed
	{
		files: ["apps/line-manager-api/**/*.{ts,js}"],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},

	// If you use Prettier, let Prettier handle formatting concerns:
	prettier,
];
