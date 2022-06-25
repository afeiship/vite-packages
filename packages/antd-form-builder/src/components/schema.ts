import { Meta } from 'antd-form-builder';
import { MetaProps } from './types';
import { isDefined } from './utility';

export const processSchema = (inMeta: MetaProps, inSetting: any): Meta => {
  const schema = inSetting.schema;
  const fields = inMeta.fields as any[];
  fields.forEach((field: any) => {
    const key = field.key;
    const value = schema[key];
    if (isDefined(value)) {
      field.label ||= value[0];
      field.widget ||= value[1];
    }
  });
  return inMeta;
};
