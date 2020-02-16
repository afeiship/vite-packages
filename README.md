# react-ant-form
> React basic ant form builder.

## installation
```shell
npm install -S @feizheng/react-ant-form
```

## update
```shell
npm update @feizheng/react-ant-form
```

## properties
| Name        | Type   | Default  | Description                           |
| ----------- | ------ | -------- | ------------------------------------- |
| className   | string | -        | The extended className for component. |
| fieldsValue | object | {}       | Default fileds value object.          |
| items       | array  | []       | Form schema.                          |
| onSubmit    | func   | noop     | The onSubmit event.                   |
| onLoad      | func   | noop     | When component did mount.             |
| formLayout  | object | -        | The formLayout for antd.Form.         |
| submitLabel | string | '&nbsp;' | The submit label.                     |
| submitProps | object | -        | The submit props.                     |


## usage
1. import css
  ```scss
  @import "~@feizheng/react-ant-form/dist/style.scss";

  // customize your styles:
  $react-ant-form-options: ()
  ```
2. import js
  ```js
  import ReactAntForm from '@feizheng/react-ant-form';
  import { Input, Checkbox } from 'antd';
  import ReactDOM from 'react-dom';
  import React from 'react';
  import ReactAntCheckbox from '@feizheng/react-ant-checkbox';
  import noop from '@feizheng/noop';
  import '@feizheng/next-ant-fields-value';
  import './assets/style.scss';

  class App extends React.Component {
    state = {
      fieldsValue: nx.antFieldsValue({
        username: 'fei',
        password: 'test',
        chk:false,
        text: 'etst...'
      }),
      items: [
        {
          label: 'username',
          field: 'username',
          component: Input
        },
        {
          label: 'password',
          field: 'password',
          component: Input
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
      console.log(e);
      return {
        then: nx.noop
      };
    };

    render() {
      return (
        <div className="app-container">
          <ReactAntForm
            fieldsValue={this.state.fieldsValue}
            onSubmit={this.handleSubmit}
            items={this.state.items}
            submitProps={{
              type: 'primary',
              htmlType: 'submit',
              className: 'wp-10',
              children: '保存'
            }}
          />
        </div>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));

  ```

## documentation
- https://afeiship.github.io/react-ant-form/
