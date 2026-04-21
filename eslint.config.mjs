import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const config = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'plugin:jsx-a11y/recommended',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
      project: './tsconfig.json',
    },
    env: {
      browser: true,
      es2021: true,
      jest: false,
    },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
        node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'] },
      },
    },
    rules: {
      'no-console': 'warn',
      'prettier/prettier': ['error'],
    },
    overrides: [
      {
        files: [
          'next.config.ts',
          '*.config.ts',
          '*.config.tsx',
          'eslint.config.mjs',
          '*.config.mjs',
        ],
        parserOptions: {
          project: null,
        },
      },
    ],
  }),
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      'coverage/**',
      'next-env.d.ts',
    ],
  },
]

export default config
