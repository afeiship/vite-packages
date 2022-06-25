import * as React from 'react';
import { render } from '@testing-library/react';
import AntdFormBuilder from '../src/main';
import { Button, Form } from 'antd';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

describe('01/basic props', () => {
  test('001-01 simple schema', () => {
    const App = () => {
      const [form] = Form.useForm();
      const getMeta = () => {
        return {
          fields: [
            { key: 'username', label: 'User Name' },
            { key: 'password', label: 'Password' }
          ]
        };
      };
      return (
        <AntdFormBuilder meta={getMeta} form={form}>
          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </AntdFormBuilder>
      );
    };
    render(<App />);
    console.log(document.body.innerHTML);
    expect(document.body.innerHTML.includes('Log in')).toBeTruthy();
  });
});
