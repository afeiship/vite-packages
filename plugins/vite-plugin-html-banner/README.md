# vite-plugin-html-banner
> Vite plugin for html banner comments.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/vite-plugin-html-banner
```

## usage
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import banner from '@jswork/vite-plugin-html-banner';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), banner()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/vite-plugin-html-banner/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/vite-plugin-html-banner
[version-url]: https://npmjs.org/package/@jswork/vite-plugin-html-banner

[license-image]: https://img.shields.io/npm/l/@jswork/vite-plugin-html-banner
[license-url]: https://github.com/afeiship/vite-plugin-html-banner/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/vite-plugin-html-banner
[size-url]: https://github.com/afeiship/vite-plugin-html-banner/blob/master/dist/vite-plugin-html-banner.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/vite-plugin-html-banner
[download-url]: https://www.npmjs.com/package/@jswork/vite-plugin-html-banner
