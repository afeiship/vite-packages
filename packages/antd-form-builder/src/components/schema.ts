import { Meta } from 'antd-form-builder';
import { MetaProps, Setting } from './types';
import { isDefined, deepAssignSetting } from './utility';

export const processSchema = (inMeta: MetaProps, inSetting): Meta => {
  const setting = deepAssignSetting(inSetting, inMeta.setting as Setting);
  const schema = setting.schema;
  const fields = (inMeta.fields as any[]) || [];

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const key = field.key;
    let value = schema[key];
    if (!isDefined(value)) continue;

    field.label ||= value[0];
    field.widget ||= value[1];
    Object.assign(field, value[2]);
  }
  return inMeta;
};
