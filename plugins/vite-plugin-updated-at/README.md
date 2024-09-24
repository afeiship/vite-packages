# vite-plugin-updated-at
> Vite plugin for update updated_at field in comments.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/vite-plugin-updated-at
```

## usage
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePlugin from '@jswork/vite-plugin-updated-at';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePlugin()],
  server: {
    host: '0.0.0.0'
  }
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/vite-plugin-updated-at/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/vite-plugin-updated-at
[version-url]: https://npmjs.org/package/@jswork/vite-plugin-updated-at

[license-image]: https://img.shields.io/npm/l/@jswork/vite-plugin-updated-at
[license-url]: https://github.com/afeiship/vite-plugin-updated-at/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/vite-plugin-updated-at
[size-url]: https://github.com/afeiship/vite-plugin-updated-at/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/vite-plugin-updated-at
[download-url]: https://www.npmjs.com/package/@jswork/vite-plugin-updated-at
