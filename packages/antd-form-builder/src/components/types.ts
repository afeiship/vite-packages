import { Meta } from 'antd-form-builder';
import { FormInstance, FormProps } from 'antd';

export interface MetaProps extends Meta {}

export interface AntdFormBuilderProps extends FormProps {
  form: FormInstance;
  meta: () => MetaProps;
  processors: any;
  handleFinish?: any;
  children?: any;
}

export type MetaInOut = (meta: Meta) => Meta;
export type Processor = {
  fn?: MetaInOut;
  once?: boolean;
};
