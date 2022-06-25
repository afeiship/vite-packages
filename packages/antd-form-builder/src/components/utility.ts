import { Processor } from './types';

export const isFunction = (fn: Processor) => typeof fn === 'function';
export const isDefined = (value) => typeof value !== 'undefined';
