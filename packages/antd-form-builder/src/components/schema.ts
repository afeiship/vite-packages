import { Meta } from 'antd-form-builder';
import deepAssgin from '@jswork/next-deep-assign';
import { MetaProps } from './types';
import { isDefined, isFunction } from './utility';

export const processSchema = (inMeta: MetaProps, inSetting): Meta => {
  const setting = deepAssgin({}, inSetting, inMeta.setting);
  const schema = setting.schema;
  const fields = (inMeta.fields as any[]) || [];

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const key = field.key;
    let value = schema[key];
    if (!isDefined(value)) continue;
    if (isFunction(value)) value = value(inSetting.schema[key]);

    field.label ||= value[0];
    field.widget ||= value[1];
    Object.assign(field, value[2]);
  }
  return inMeta;
};
