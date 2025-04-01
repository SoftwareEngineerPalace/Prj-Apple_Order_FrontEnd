import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,json}'] },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,json}'],
        languageOptions: { globals: globals.browser },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,json}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        settings: {
            react: {
                version: 'detect', // 自动检测 React 版本
            },
        },
    },
    {
        ignores: ['node_modules', 'src/.umi', 'src/.umi-production', 'dist', 'public', 'package-lock.json', 'build'],
    },
    { rules: { '@typescript-eslint/no-explicit-any': 'off' } },
    eslintConfigPrettier,
    {
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'prettier/prettier': ['error'], // 使用 eslint-plugin-prettier 的规则
            'arrow-body-style': 'off',
            'prefer-arrow-callback': 'off',
        },
    },
]);
