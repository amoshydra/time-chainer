// @ts-check
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' assert { type: "json" };

/**
 * @type { import("rollup").OutputOptions }
 */
const commonOutput = {
  sourcemap: true,
  interop: "defaultOnly",
}

/**
 * @type { import("rollup").RollupOptions }
 */
const config = {
  input: 'src/index.ts',
  output: [
    {
      ...commonOutput,
      file: pkg.module,
      format: 'esm',
    },
    {
      ...commonOutput,
      file: pkg.main,
      format: 'cjs',
    },
    {
      ...commonOutput,
      file: pkg.browser,
      format: 'umd',
      name: 'timeMaker',
    },
  ],
  plugins: [
    typescript({
      tsconfig: "tsconfig.build.json",
      sourceMap: false,
    }),
  ],
};

export default config;
