# antd-form-builder
> A wrapper for antd-form-builder.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/antd-form-builder
```

## usage
1. import js
  ```js
  import * as React from 'react';
  import AntdFormBuilderComponent, { MetaProps, Setting } from '@jswork/antd-form-builder';
  import styled from 'styled-components';
  import { Form, Rate, Button } from 'antd';
  import processors from './processors';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  const defaultSettings: Setting = {
    schema: {
      username: ['User Name', 'input'],
      password: ['Password', 'password']
    }
  };

  export default () => {
    const [form] = Form.useForm();
    const getMeta = (): MetaProps => {
      return {
        initialValues: {
          username: 'default-username',
          password: 's1zmD2MEkl92CdVIsUhMUgCK1u0UJzxB'
        },
        fields: [
          { key: 'username' },
          { key: 'password' },
          { key: 'checkbox', label: 'Checkbox', widget: 'checkbox' },
          { key: 'rating', label: 'Rating', widget: Rate }
        ]
      };
    };

    return (
      <Container>
        <AntdFormBuilderComponent
          setting={defaultSettings}
          processors={processors}
          meta={getMeta}
          form={form}
          onFinish={(e) => {
            console.log('onFinish:', e);
          }}>
          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </AntdFormBuilderComponent>
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/antd-form-builder/

## license
Code released under [the MIT license](https://github.com/afeiship/antd-form-builder/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/antd-form-builder
[version-url]: https://npmjs.org/package/@jswork/antd-form-builder

[license-image]: https://img.shields.io/npm/l/@jswork/antd-form-builder
[license-url]: https://github.com/afeiship/antd-form-builder/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/antd-form-builder
[size-url]: https://github.com/afeiship/antd-form-builder/blob/master/dist/antd-form-builder.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/antd-form-builder
[download-url]: https://www.npmjs.com/package/@jswork/antd-form-builder
