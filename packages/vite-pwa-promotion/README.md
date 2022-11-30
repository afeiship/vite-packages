# vite-pwa-promotion
> A vite pwa promotion component.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/vite-pwa-promotion
```

## usage
1. import css
  ```scss
  @import "~@jswork/vite-pwa-promotion/dist/style.css";

  // or use sass
  @import "~@jswork/vite-pwa-promotion/dist/style.scss";

  // customize your styles:
  $vite-pwa-promotion-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import VitePwaPromotion from '@jswork/vite-pwa-promotion';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default (props: any) => {
    return (
      <Container>
        <VitePwaPromotion />
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/vite-pwa-promotion/

## license
Code released under [the MIT license](https://github.com/afeiship/vite-pwa-promotion/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/vite-pwa-promotion
[version-url]: https://npmjs.org/package/@jswork/vite-pwa-promotion

[license-image]: https://img.shields.io/npm/l/@jswork/vite-pwa-promotion
[license-url]: https://github.com/afeiship/vite-pwa-promotion/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/vite-pwa-promotion
[size-url]: https://github.com/afeiship/vite-pwa-promotion/blob/master/dist/vite-pwa-promotion.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/vite-pwa-promotion
[download-url]: https://www.npmjs.com/package/@jswork/vite-pwa-promotion
