# react-ant-form-schema
> React basic ant form builder.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @feizheng/react-ant-form-schema
```

## update
```shell
npm update @feizheng/react-ant-form-schema
```

## properties
| Name             | Type    | Required | Default                                                   | Description                                           |
| ---------------- | ------- | -------- | --------------------------------------------------------- | ----------------------------------------------------- |
| className        | string  | false    | -                                                         | The extended className for component.                 |
| initialValue     | object  | false    | {}                                                        | Default fileds value object.                          |
| items            | array   | false    | []                                                        | Form schema.                                          |
| template         | func    | false    | -                                                         | The form field template.                              |
| defaultComponent | any     | false    | Input                                                     | Default item component.                               |
| onSubmit         | func    | false    | noop                                                      | The onSubmit event.                                   |
| onSubmitSuccess  | func    | false    | noop                                                      | The submit resolved callback.                         |
| onSubmitFailed   | func    | false    | noop                                                      | The submit rejected callback.                         |
| onLoad           | func    | false    | noop                                                      | When component did mount.                             |
| formLayout       | object  | false    | -                                                         | The formLayout for antd.Form.                         |
| tailLayout       | object  | false    | -                                                         | The formLayout for last form item (eg: like actions). |
| submitProps      | object  | false    | { type: 'primary', htmlType: 'submit', children: 'Save' } | The submit props.                                     |
| resetProps       | object  | false    | -                                                         | The reset props.                                      |
| actions          | element | false    | -                                                         | The actions for form.                                 |


## usage
1. import css
  ```scss
  @import "~@feizheng/react-ant-form-schema/dist/style.scss";

  // customize your styles:
  $react-ant-form-schema-options: ()
  ```
2. import js
  ```js
  import ReactAntForm from '@feizheng/react-ant-form-schema';
  import { Input, Checkbox } from 'antd';
  import ReactDOM from 'react-dom';
  import React from 'react';
  import ReactAntCheckbox from '@feizheng/react-ant-checkbox';
  import noop from '@feizheng/noop';
  import './assets/style.scss';

  const formLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
  const tailLayout = { wrapperCol: { offset: 6, span: 16 } };

  class App extends React.Component {
    state = {
      initialValue: {
        username: 'fei',
        chk: false,
        text: 'etst...'
      },
      items: [
        {
          label: 'username',
          field: 'username',
          options: {
            rules: [{ required: true, message: '用户名为必选' }]
          }
        },
        {
          label: 'password',
          field: 'password',
          options: {
            rules: [{ required: true, message: '密码为必选' }]
          }
        },
        {
          label: 'test-checkbox',
          field: 'chk',
          component: ReactAntCheckbox,
          props: {
            children: 'Agree the agreement'
          }
        },
        {
          label: 'Text',
          field: 'text',
          component: Input.TextArea
        }
      ]
    };

    handleSubmit = (e) => {
      return new Promise((resolve, reject) => {
        console.log('submit:::', e);
        resolve();
      });
    };

    handleSubmitSuccess = (e) => {
      console.log('resolved/success!');
    };

    handleSubmitFailed = (e) => {
      console.log('rejected/failed!');
    };

    render() {
      return (
        <div className="app-container">
          <ReactAntForm
            formLayout={formLayout}
            tailLayout={tailLayout}
            items={this.state.items}
            initialValue={this.state.initialValue}
            onSubmit={this.handleSubmit}
            onSubmitSuccess={this.handleSubmitSuccess}
            onSubmitFailed={this.handleSubmitFailed}
            submitProps={{
              type: 'primary',
              htmlType: 'submit',
              className: 'wp-10',
              children: '保存'
            }}
            resetProps={{
              children: '取消'
            }}
          />
        </div>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));

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
