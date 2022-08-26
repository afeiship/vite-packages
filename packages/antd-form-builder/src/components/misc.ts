import { Processor, SchemaValue, SelectorType, Setting } from './types';
import nx from '@jswork/next';
import FormBuilder, { Meta } from 'antd-form-builder';

export const isFunction = (fn: Processor) => typeof fn === 'function';
export const isDefined = (value) => typeof value !== 'undefined';
const setDefaults = (glb, local) => (local == null ? glb : local);

export const deepAssignSetting = (inGlobalSetting: Setting, inLocalSetting: Setting): Setting => {
  const globalSchema = nx.get(inGlobalSetting, 'schema', {});
  const localSchema = nx.get(inLocalSetting, 'schema', {});

  nx.forIn(localSchema, (key: string, value: SchemaValue) => {
    // local value
    const localLabel = value[0];
    const localWidget = value[1];
    const localOpts = value[2];

    // global value
    const globalValue = globalSchema[key];
    if (globalValue) {
      const globalLabel = globalValue[0];
      const globalWidget = globalValue[1];
      const globalOpts = globalValue[2];

      inGlobalSetting.schema[key] = [
        setDefaults(globalLabel, localLabel),
        setDefaults(globalWidget, localWidget),
        setDefaults(globalOpts, localOpts)
      ];
    } else {
      inGlobalSetting.schema[key] = value;
    }
  });

  return inGlobalSetting;
};

export const generateSelector = (inMeta: Meta, inType: SelectorType) => {
  return (inCallback) => {
    const defaults = (field) => field.key === inCallback;
    const callback = typeof inCallback === 'string' ? defaults : inCallback;
    const fields = (inMeta.fields || []) as FormBuilder.FieldType[];
    return fields[inType](callback);
  };
};
