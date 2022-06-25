import React, { useState, useEffect, useCallback } from 'react';
import { Form } from 'antd';
import FormBuilder from 'antd-form-builder';
import compose from '@jswork/next-promise-compose';
import { MetaProps, AntdFormBuilderProps, Processor, MetaInOut } from './types';

const DEFAULT_META: MetaProps = {
  initialValues: {},
  fields: []
};

export default (props: AntdFormBuilderProps) => {
  const { meta, children, form, processors, ...theProps } = props;
  const [theMeta, setTheMeta] = React.useState({ ...DEFAULT_META });
  const [once, setOnce] = useState(false);
  const [tick, setTick] = useState(0);
  const forceUpdate = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);

  const getCompositeMeta = (inMeta: any) => {
    const cbs: MetaInOut[] = [];
    processors.forEach((processor: Processor) => {
      if (once) {
        if (processor.once) {
          delete processor.fn;
          delete processor.once;
        }
      }
      if (processor.fn) cbs.push(processor.fn);
    });
    setOnce(true);
    return compose(...cbs)(inMeta);
  };

  useEffect(() => {
    const cb = getCompositeMeta(meta());
    cb.then(setTheMeta);
  }, [tick]);

  return (
    <Form form={form} onValuesChange={forceUpdate} {...theProps}>
      <FormBuilder meta={theMeta} form={form} />
      {children}
    </Form>
  );
};
