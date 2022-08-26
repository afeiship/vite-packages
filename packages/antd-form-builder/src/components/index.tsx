import React, { useState, useEffect, useCallback } from 'react';
import { Form } from 'antd';
import FormBuilder, { Meta } from 'antd-form-builder';
import compose from '@jswork/next-promise-compose';
import { processSchema } from './schema';
import { generateSelector, isFunction } from './misc';
import {
  MetaProps,
  AntdFormBuilderProps,
  Processor,
  MetaInOut,
  StandardProcessor,
  CompositeInput
} from './types';

const DEFAULT_META: MetaProps = {
  initialValues: {},
  fields: []
};

const AntdFormBuilder = (inProps: AntdFormBuilderProps) => {
  const { meta, setting, children, form, processors, ...props } = inProps;
  const [processedMeta, setProcessedMeta] = React.useState({ ...DEFAULT_META });
  const [once, setOnce] = useState<boolean>(false);
  const [tick, setTick] = useState<number>(0);
  const forceUpdate = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);

  const getComposite = (inMeta: Meta) => {
    const fns: MetaInOut[] = [];
    const $ = generateSelector(inMeta, 'find');
    const $$ = generateSelector(inMeta, 'filter');
    if (!processors?.length) return Promise.resolve(inMeta);
    processors!.forEach((processor: Processor) => {
      const isFunc = isFunction(processor);
      const normalized = isFunc ? { fn: processor as MetaInOut } : (processor as StandardProcessor);
      const hasOnce = once && normalized.once;
      if (hasOnce) ['fn', 'once'].forEach((key) => delete normalized[key]);
      if (normalized.fn) fns.push(normalized.fn);
    });
    setOnce(true);

    return compose(...fns)({ meta: inMeta, form, $, $$, forceUpdate });
  };

  useEffect(() => {
    const targetMeta = processSchema(meta(), setting);
    if (!processors?.length) return setProcessedMeta(targetMeta);
    try {
      getComposite(targetMeta).then((res: CompositeInput) => setProcessedMeta(res.meta));
    } catch (_) {
      setProcessedMeta(targetMeta);
    }
  }, [tick]);

  return (
    <Form form={form} onValuesChange={forceUpdate} {...props}>
      <FormBuilder meta={processedMeta} form={form} />
      {children}
    </Form>
  );
};

// default props
AntdFormBuilder.defaultProps = {
  setting: { schema: {} },
  processors: []
};

export default AntdFormBuilder;
