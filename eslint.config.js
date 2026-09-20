import js from '@eslint/js';
import lit from 'eslint-plugin-lit';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['public/experiments/*/sketch.js', 'public/experiments/shared/*.js', 'public/experiments/mandelbrot/fractal-worker.js'],
    languageOptions: {
      globals: Object.fromEntries([
        'window', 'document', 'performance', 'getComputedStyle', 'matchMedia',
        'Worker', 'ImageData', 'self', 'Lab', 'LabMath', 'pixelDensity',
        'createCanvas', 'saveCanvas', 'background', 'strokeWeight', 'stroke',
        'line', 'noStroke', 'fill', 'circle', 'point', 'rect', 'push', 'pop',
        'translate', 'scale', 'noFill', 'beginShape', 'vertex', 'endShape',
        'width', 'height', 'CLOSE', 'drawingContext', 'text', 'textSize'
      ].map(name => [name, 'readonly']))
    }
  },
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
