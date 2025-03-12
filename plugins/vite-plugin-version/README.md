# vite-plugin-version
> A plugin for vite that generates a version.json file.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/vite-plugin-version
```

## usage
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePlugin from '@jswork/vite-plugin-version';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePlugin()],
  server: {
    host: '0.0.0.0'
  }
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/vite-plugin-version/blob/main/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/vite-plugin-version
[version-url]: https://npmjs.org/package/@jswork/vite-plugin-version

[license-image]: https://img.shields.io/npm/l/@jswork/vite-plugin-version
[license-url]: https://github.com/afeiship/vite-plugin-version/blob/main/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/vite-plugin-version
[size-url]: https://github.com/afeiship/vite-plugin-version/blob/main/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/vite-plugin-version
[download-url]: https://www.npmjs.com/package/@jswork/vite-plugin-version
