# vite-require-context
> Require context for vite.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/vite-require-context
```

## usage
```js
import viteRequireContext from '@jswork/vite-require-context';

const moduleFiles = import.meta.glob('./shared/stores/*.ts', { eager: true });
const context = viteRequireContext(moduleFiles);
console.log('moduleFiles: ', moduleFiles, context);
```

## license
Code released under [the MIT license](https://github.com/afeiship/vite-require-context/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/vite-require-context
[version-url]: https://npmjs.org/package/@jswork/vite-require-context

[license-image]: https://img.shields.io/npm/l/@jswork/vite-require-context
[license-url]: https://github.com/afeiship/vite-require-context/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/vite-require-context
[size-url]: https://github.com/afeiship/vite-require-context/blob/master/dist/vite-require-context.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/vite-require-context
[download-url]: https://www.npmjs.com/package/@jswork/vite-require-context
