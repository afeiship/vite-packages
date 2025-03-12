# vite-plugin-file-callback
> Vite plugin that allows users to customize file handling and modification through callback functions.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/vite-plugin-file-callback
```

## usage
```js
import fileCallback from '@jswork/vite-plugin-file-callback';

// Get envs:
const env = ENV[process.env.NODE_ENV];

// Use plugin:
fileCallback({
  filepath: 'src/manifest.json',
  callback: (content) => {
    nx.set(content, 'mp-weixin.appid', env['VITE_APP_APPID']);
    return content;
  }
})
```

## license
Code released under [the MIT license](https://github.com/afeiship/vite-plugin-file-callback/blob/main/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/vite-plugin-file-callback
[version-url]: https://npmjs.org/package/@jswork/vite-plugin-file-callback

[license-image]: https://img.shields.io/npm/l/@jswork/vite-plugin-file-callback
[license-url]: https://github.com/afeiship/vite-plugin-file-callback/blob/main/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/vite-plugin-file-callback
[size-url]: https://github.com/afeiship/vite-plugin-file-callback/blob/main/dist/vite-plugin-file-callback.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/vite-plugin-file-callback
[download-url]: https://www.npmjs.com/package/@jswork/vite-plugin-file-callback
