import * as React from 'react';
import AntdFormBuilder, { MetaProps } from '../src/main';
import { Button, Form } from 'antd';
import { render, waitFor, getByText } from '@testing-library/react';

describe('01/basic props', () => {
  test('001-01 simple schema', async () => {
    const App = () => {
      const [form] = Form.useForm();
      const getMeta = (): MetaProps => {
        return {
          fields: [
            { key: 'username', label: 'User Name' },
            { key: 'password', label: 'Password', widget: 'password' }
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

    const wrapper = render(<App />);
    // wait for 3s

    await waitFor(() => {
      const username = getByText(wrapper.container, 'User Name');
      const password = getByText(wrapper.container, 'Password');
      const loginBtn = getByText(wrapper.container, 'Log in');
      expect(username.innerHTML).toBe('User Name');
      expect(password.innerHTML).toBe('Password');
      expect(loginBtn.innerHTML).toBe('Log in');
    });
  });
});
