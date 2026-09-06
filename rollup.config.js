import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import nodeResolve from '@rollup/plugin-node-resolve';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import esbuild from 'rollup-plugin-esbuild';

const imageAssets = {
  name: 'image-assets',
  load(id) {
    if (!id.endsWith('.png')) return null;

    const referenceId = this.emitFile({
      type: 'asset',
      name: basename(id),
      source: readFileSync(id)
    });

    return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
  }
};

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
    imageAssets,
    esbuild({ minify: true, target: 'es2020', tsconfig: 'tsconfig.json' })
  ]
};
