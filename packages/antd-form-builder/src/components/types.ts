import React, { ReactNode } from 'react';
import { FormItemLayoutType, Meta } from 'antd-form-builder';
import { FormInstance, FormProps } from 'antd';

export type MetaInOut = (meta: Meta) => Meta;
export type StandardProcessor = { fn?: MetaInOut; once?: boolean };
export type Processor = StandardProcessor | MetaInOut | Promise<MetaInOut>;
export type Label = string | null | undefined | React.ReactElement<any>;
export type Widget = string | null | undefined | React.ReactElement<any>;
export type SchemaValue = [Label, Widget?, any?];
export type SelectorType = 'find' | 'filter';
export type Setting = {
  schema: {
    [key: string]: SchemaValue;
  };
};

export interface MetaProps extends Omit<Meta, 'formItemLayout'> {
  setting?: Setting;
  formItemLayout?: FormItemLayoutType | FormItemLayoutType[] | null;
}

export interface AntdFormBuilderProps extends FormProps {
  form: FormInstance;
  meta: () => MetaProps;
  header?: ReactNode;
  processors?: Processor[];
  setting?: Setting;
}

export interface CompositeInput {
  meta: MetaProps;
  form: FormInstance;
  forceUpdate: () => void;
}
