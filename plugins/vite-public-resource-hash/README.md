# vite-public-resource-hash
> This Vite plugin replaces __content_hash__ in public resources with actual hashes.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/vite-public-resource-hash
```

## usage
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePubliResourceHash from '@jswork/vite-public-resource-hash';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePubliResourceHash()],
  server: {
    host: '0.0.0.0'
  }
});
```

> src/app.tsx

```tsx
<figure>
  <img src="/vite.svg?hash=__content_hash__" alt="Vite Logo" className="logo" />
  <figcaption>Image from public directory</figcaption>
</figure>
```

> dist/assets/vite.svg?hash=`__content_hash__``
```html
<figure>
  <img src="/vite.svg?hash=8e3a10e1" alt="Vite Logo" class="logo">
  <figcaption>Image from public directory</figcaption>
</figure>
```


## license
Code released under [the MIT license](https://github.com/afeiship/vite-public-resource-hash/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/vite-public-resource-hash
[version-url]: https://npmjs.org/package/@jswork/vite-public-resource-hash

[license-image]: https://img.shields.io/npm/l/@jswork/vite-public-resource-hash
[license-url]: https://github.com/afeiship/vite-public-resource-hash/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/vite-public-resource-hash
[size-url]: https://github.com/afeiship/vite-public-resource-hash/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/vite-public-resource-hash
[download-url]: https://www.npmjs.com/package/@jswork/vite-public-resource-hash
