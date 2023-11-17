import type { Plugin } from 'vite';
import { loadEnv } from 'vite';

export type EnvVarDefault = string | null | undefined;

export type EnvVarDefaults = Record<string, EnvVarDefault>;

export type EnvVars = 'all' | string[] | EnvVarDefaults;

export interface EnvOptions {
  /**
   * Only variables that match this prefix will be made available.
   * @default ''
   * @example EnvironmentPlugin('all', { prefix: 'VUE_APP_' })
   */
  prefix?: string;
}

/**
 * Expose `process.env` environment variables to your client code.
 *
 * @param  {EnvVars} vars Provide a list of variables you wish to expose,
 *                        or an object that maps variable names to defaut values
 *                        to use when a variable is not defined.
 *                        Use 'all' to expose all variables that match the prefix.
 * @param  {EnvOptions} options
 */
export default function EnvironmentPlugin(vars: EnvVars, options: EnvOptions = {}): Plugin {
  const { prefix = 'VITE_' } = options;
  // const defineOn = 'process.env';
  return {
    name: 'vite-plugin-environment',
    config({ root = process.cwd(), envDir }, { mode }) {
      return { define: {} };
    },
  };
}
