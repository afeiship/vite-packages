# vite-plugin-environment
> Easily expose environment variables in Vite.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/vite-plugin-environment
```

## usage
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginEnvironment from '@jswork/vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: 'config/environments',
  plugins: [react(), vitePluginEnvironment({ prefix: 'VITE_' })]
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/i18n-helper/blob/main/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/i18n-helper
[version-url]: https://npmjs.org/package/@jswork/i18n-helper

[license-image]: https://img.shields.io/npm/l/@jswork/i18n-helper
[license-url]: https://github.com/afeiship/i18n-helper/blob/main/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/i18n-helper
[size-url]: https://github.com/afeiship/i18n-helper/blob/main/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/i18n-helper
[download-url]: https://www.npmjs.com/package/@jswork/i18n-helper
