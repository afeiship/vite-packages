import React, { useState, useEffect, useCallback } from 'react';
import { Form } from 'antd';
import FormBuilder, { Meta } from 'antd-form-builder';
import compose from '@jswork/next-promise-compose';
import { MetaProps, AntdFormBuilderProps, Processor, MetaInOut, StandardProcessor } from './types';

const DEFAULT_META: MetaProps = {
  initialValues: {},
  fields: []
};

const isFunction = (fn: Processor) => typeof fn === 'function';

export default (inProps: AntdFormBuilderProps) => {
  const { meta, children, form, processors, ...props } = inProps;
  const [theMeta, setTheMeta] = React.useState({ ...DEFAULT_META });
  const [once, setOnce] = useState<boolean>(false);
  const [tick, setTick] = useState<number>(0);
  const forceUpdate = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);

  const getComposite = (inMeta: Meta) => {
    const cbs: MetaInOut[] = [];
    processors.forEach((processor: Processor) => {
      const isFunc = isFunction(processor);
      const normalized = isFunc ? { fn: processor as MetaInOut } : (processor as StandardProcessor);
      if (once) {
        if (normalized.once) {
          delete normalized.fn;
          delete normalized.once;
        }
      }
      if (normalized.fn) cbs.push(normalized.fn);
    });
    setOnce(true);
    return compose(...cbs)(inMeta);
  };

  useEffect(() => {
    getComposite(meta()).then(setTheMeta);
  }, [tick]);

  return (
    <Form form={form} onValuesChange={forceUpdate} {...props}>
      <FormBuilder meta={theMeta} form={form} />
      {children}
    </Form>
  );
};
