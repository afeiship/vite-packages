import React from 'react';
import { Meta } from 'antd-form-builder';
import { FormInstance, FormProps } from 'antd';

export type MetaInOut = (meta: Meta) => Meta;
export type CompositeInputInOut = (args: CompositeInput) => CompositeInput;
export type StandardProcessor = { fn?: MetaInOut; once?: boolean };
export type Processor = StandardProcessor | MetaInOut | Promise<MetaInOut>;
export type Label = string | React.ReactElement<any>;
export type Widget = string | React.ReactElement<any>;
export type SchemaValue = [Label, Widget?];
export type Setting = {
  schema: {
    [key: string]: SchemaValue;
  };
};

export interface MetaProps extends Meta {
  setting?: Setting;
}

export interface AntdFormBuilderProps extends FormProps {
  form: FormInstance;
  meta: () => MetaProps;
  processors?: Processor[];
  setting?: Setting;
}

export interface CompositeInput {
  meta: MetaProps;
  form: FormInstance;
  forceUpdate: () => void;
}
