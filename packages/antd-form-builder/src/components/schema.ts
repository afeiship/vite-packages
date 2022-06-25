import { Meta } from 'antd-form-builder';
import { MetaProps } from './types';
import { isDefined } from './utility';

export const processSchema = (
  inMeta: MetaProps,
  inSetting: any = {
    schema: {}
  }
): Meta => {
  const schema = inSetting.schema;
  const fields = (inMeta.fields as any[]) || [];

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const key = field.key;
    const value = schema[key];
    if (!isDefined(value)) continue;

    field.label ||= value[0];
    field.widget ||= value[1];
  }
  return inMeta;
};
