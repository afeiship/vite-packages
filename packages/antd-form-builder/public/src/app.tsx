import * as React from 'react';
import AntdFormBuilderComponent from '../../src/main';
import styled from 'styled-components';
import { Form, Rate, Button } from 'antd';
import { MetaProps, Setting } from '../../src/components/types';

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
  const processors = [
    {
      fn: (inArgs) => {
        const meta = inArgs.meta;
        const fields = meta.fields;
        const value = form.getFieldValue('checkbox');
        if (value) fields.splice(3, 1);
        meta.fields = fields;
        return inArgs;
      }
    },
    {
      once: true,
      fn: (inArgs) => {
        setTimeout(() => {
          form.setFieldsValue({ rating: 1 });
        }, 1000);
        return inArgs;
      }
    },
    {
      fn: (inArgs) => {
        inArgs.meta.fields.forEach((field: any) => {
          if (field.key === 'password') {
            field.disabled = true;
          }
        });
        return inArgs;
      }
    }
  ];
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
