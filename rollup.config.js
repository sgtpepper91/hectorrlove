import nodeResolve from '@rollup/plugin-node-resolve';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import esbuild from 'rollup-plugin-esbuild';

export default {
  input: 'index.html',
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: '[hash].js',
    chunkFileNames: '[hash].js',
    assetFileNames: '[hash][extname]'
  },
  preserveEntrySignatures: false,
  plugins: [
    html({ minify: true }),
    nodeResolve(),
    esbuild({ minify: true, target: 'es2020', tsconfig: 'tsconfig.json' })
  ]
};
