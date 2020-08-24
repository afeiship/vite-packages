import ReactAntForm from '../src/main';
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
        label: '用户名',
        field: 'username',
        options: {
          rules: [{ required: true, message: '用户名为必选' }]
        }
      },
      {
        label: '密码',
        field: 'password',
        options: {
          rules: [{ required: true, message: '密码为必选' }]
        }
      },
      {
        label: '用户协议',
        field: 'chk',
        component: ReactAntCheckbox,
        props: {
          children: 'Agree the agreement'
        }
      },
      {
        label: '描述信息',
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

  handleChange = (e) => {
    console.log('change.', e);
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
          onChange={this.handleChange}
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
