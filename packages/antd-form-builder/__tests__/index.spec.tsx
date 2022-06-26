import * as React from 'react';
import AntdFormBuilder, { MetaProps } from '../src/main';
import { Button, Form } from 'antd';
import { render, waitFor, getByText } from '@testing-library/react';
import { Setting } from '../dist/components/types';
import { act } from 'react-dom/test-utils';

describe('01/basic feature unit testing', () => {
  test('01/simple schema', async () => {
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
  test('02/schema use setting', async () => {
    const App = () => {
      const [form] = Form.useForm();
      const setting: Setting = {
        schema: {
          username: ['User Name', 'input'],
          password: ['Password', 'password']
        }
      };
      const getMeta = (): MetaProps => {
        return {
          fields: [{ key: 'username' }, { key: 'password' }]
        };
      };
      return (
        <AntdFormBuilder meta={getMeta} form={form} setting={setting}>
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
  test('03/schema has sync processor', async () => {
    const App = () => {
      const [form] = Form.useForm();
      const processors = [
        (args: any) => {
          // set username to disabled
          args.meta.fields[0].disabled = true;
          return args;
        }
      ];
      const getMeta = (): MetaProps => {
        return {
          fields: [
            { key: 'username', label: 'User Name' },
            { key: 'password', label: 'Password', widget: 'password' }
          ]
        };
      };
      return (
        <AntdFormBuilder meta={getMeta} form={form} processors={processors}>
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
      // username should be disabled
      const username = getByText(wrapper.container, 'User Name');
      const usernameInput = wrapper.container.querySelector('#username') as HTMLInputElement;

      expect(username.innerHTML).toBe('User Name');
      expect(usernameInput.disabled).toBe(true);
    });
  });
  test('04/schema has async processor', async () => {
    const App = () => {
      const [form] = Form.useForm();
      const processors: any[] = [
        (args: any) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              args.meta.fields[0].label = 'New Label form promise';
              resolve(args);
            }, 100);
          });
        }
      ];
      const getMeta = (): MetaProps => {
        return {
          fields: [
            { key: 'username', label: 'User Name' },
            { key: 'password', label: 'Password', widget: 'password' }
          ]
        };
      };
      return (
        <AntdFormBuilder meta={getMeta} form={form} processors={processors}>
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

    await waitFor(
      async () => {
        await new Promise((r) => setTimeout(r, 2000));
        const username = getByText(wrapper.container, 'New Label form promise');
        expect(username.innerHTML).toBe('New Label form promise');
      },
      { timeout: 10 * 1000 }
    );
  });
  test('05/schema has with checkbox and interactive to change meta fields', async () => {
    const App = () => {
      const [form] = Form.useForm();
      const processors = [
        (args: any) => {
          const { meta } = args;
          if (form.getFieldValue('checkbox')) {
            meta.fields[0].label = 'username:Checked Label';
          }
          return args;
        }
      ];
      const getMeta = (): MetaProps => {
        return {
          fields: [
            { key: 'username', label: 'User Name' },
            { key: 'password', label: 'Password', widget: 'password' },
            {
              key: 'checkbox',
              label: 'Checkbox',
              widget: 'checkbox',
              widgetProps: { 'data-testid': 'chk1' }
            }
          ]
        };
      };
      return (
        <AntdFormBuilder meta={getMeta} form={form} processors={processors}>
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

    await waitFor(
      async () => {
        const promise = Promise.resolve();

        const password = getByText(wrapper.container, 'Password');
        const checkbox = getByText(wrapper.container, 'Checkbox');
        const loginBtn = getByText(wrapper.container, 'Log in');
        expect(password.innerHTML).toBe('Password');
        expect(checkbox.innerHTML).toBe('Checkbox');
        expect(loginBtn.innerHTML).toBe('Log in');
        // todo: check checkbox is checked or not
        await act(() => promise);
      },
      { timeout: 10 * 1000 }
    );
  });
});
