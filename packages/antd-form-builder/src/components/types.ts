import { Meta } from 'antd-form-builder';
import { FormInstance, FormProps } from 'antd';

export type MetaInOut = (meta: Meta) => Meta;
export type StandardProcessor = { fn?: MetaInOut; once?: boolean };
export type Processor = StandardProcessor | MetaInOut;

export interface MetaProps extends Meta {}

export interface AntdFormBuilderProps extends FormProps {
  form: FormInstance;
  meta: () => MetaProps;
  processors: Processor[];
}
