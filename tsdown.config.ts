import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs', 'umd'],
  platform: 'neutral',
  target: 'es2016',
  globalName: 'timeMaker',
  dts: {
    sourcemap: false,
  },
  sourcemap: true,
  clean: true,
  hash: false,
  minify: false,
  outputOptions: {
    exports: 'named',
  },
});
