import * as React from 'react';
import AntdFormBuilderComponent from '../../src/main';
import styled from 'styled-components';
import { Form, Rate, Button } from 'antd';
// import FormBuilder from 'antd-form-builder';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const [form] = Form.useForm();
  const processors = [
    {
      fn: (inMeta: any) => {
        const fields = inMeta.fields;
        console.log('fields:', fields);
        const value = form.getFieldValue('checkbox');
        if (value) fields.splice(3, 1);
        inMeta.fields = fields;
        return inMeta;
      }
    },
    {
      once: true,
      fn: (inMeta: any) => {
        setTimeout(() => {
          form.setFieldsValue({ rating: 1 });
        }, 1000);
        return inMeta;
      }
    },
    {
      fn: (inMeta: any) => {
        inMeta.fields.forEach((field: any) => {
          if (field.key === 'password') {
            field.disabled = true;
          }
        });
        return inMeta;
      }
    }
  ];
  const getMeta = () => {
    return {
      initialValues: {
        username: 'default-username',
        password: 's1zmD2MEkl92CdVIsUhMUgCK1u0UJzxB'
      },
      fields: [
        { key: 'username', label: 'User Name' },
        {
          key: 'password',
          label: 'Password',
          widget: 'password',
          help: 'Change columns to show layout change'
        },
        {
          key: 'checkbox',
          label: 'Checkbox',
          widget: 'checkbox',
          once: true,
          callback: (newMeta: any) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                const fields = newMeta.fields;
                fields.forEach((field: any) => {
                  if (field.key === 'password') {
                    field.disabled = true;
                  }
                });
                resolve(newMeta);
              }, 1000);
            });
          }
        },
        {
          key: 'rating',
          label: 'Rating',
          widget: Rate,
          callback: (newMeta: any) => {
            const fields = newMeta.fields;
            const value = form.getFieldValue('checkbox');
            if (value) fields.splice(3, 1);
            newMeta.fields = fields;
            return newMeta;
          }
        }
      ]
    };
  };

  return (
    <Container>
      <AntdFormBuilderComponent
        meta={getMeta}
        processors={processors}
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
