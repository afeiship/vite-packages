import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: true,
  cjsInterop: true,
  entry: ['src/*.ts'],
  format: ['cjs', 'esm' /*'iife' */],
  external: ['clipboardy'],
  dts: true,
  clean: true,
  sourcemap: true,
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
});
