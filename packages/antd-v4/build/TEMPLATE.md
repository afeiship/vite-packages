# react-ant-form-schema
> React basic ant form builder.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
# antd-v3
npm install -S @feizheng/react-ant-form-schema@1

# antd-v4
npm install -S @feizheng/react-ant-form-schema@2
```

## update
```shell
npm update @feizheng/react-ant-form-schema
```

## properties
__GENERATE_DOCS__

## item options
| Name      | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| label     | string  | The display label.                       |
| filed     | string  | The form field string(name).             |
| component | element | The form field component.                |
| props     | object  | The form field props.                    |
| options   | object  | The get decorator options(like `rules`). |

## usage
1. import css
  ```scss
  @import "~@feizheng/react-ant-form-schema/dist/style.scss";

  // customize your styles:
  $react-ant-form-schema-options: ()
  ```
2. import js
  ```js
__GENERATE_DAPP__
  ```

## documentation
- https://afeiship.github.io/react-ant-form-schema/


## license
Code released under [the MIT license](https://github.com/afeiship/react-ant-form-schema/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@feizheng/react-ant-form-schema
[version-url]: https://npmjs.org/package/@feizheng/react-ant-form-schema

[license-image]: https://img.shields.io/npm/l/@feizheng/react-ant-form-schema
[license-url]: https://github.com/afeiship/react-ant-form-schema/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@feizheng/react-ant-form-schema
[size-url]: https://github.com/afeiship/react-ant-form-schema/blob/master/dist/react-ant-form-schema.min.js

[download-image]: https://img.shields.io/npm/dm/@feizheng/react-ant-form-schema
[download-url]: https://www.npmjs.com/package/@feizheng/react-ant-form-schema
