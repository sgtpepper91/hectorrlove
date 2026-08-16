import js from '@eslint/js';
import lit from 'eslint-plugin-lit';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    plugins: { lit },
    rules: {
      'lit/no-invalid-html': 'error',
      'lit/no-duplicate-template-bindings': 'error'
    }
  }
];
