import type { Plugin } from 'vite';
import { loadEnv } from 'vite';
import fs from 'fs';

// @thank to: https://github.com/ElMassimo/vite-plugin-environment/

export type EnvVarDefault = string | null | undefined;
export type EnvVarDefaults = Record<string, EnvVarDefault>;

export interface EnvOptions {
  /**
   * Only variables that match this prefix will be made available.
   * @default ''
   * @example EnvironmentPlugin({ prefix: 'VUE_APP_' })
   */
  prefix?: string;
}

/**
 * Expose `process.env` environment variables to your client code.
 * @param  {EnvOptions} options
 */
export default function EnvironmentPlugin(options: EnvOptions = {}): Plugin {
  const { prefix = 'VITE_' } = options;
  // const defineOn = 'process.env';
  return {
    name: 'vite-plugin-environment',
    config({ root = process.cwd(), envDir }, { mode }) {
      // @ts-ignore
      const evnRoot = fs.join(root, envDir);
      const env = loadEnv(mode, evnRoot, prefix);
      // predefined variables
      const envNameKey = `${prefix}ENVNAME`;
      const vars = { [envNameKey]: mode };
      const processVars = {};

      // all variables
      for (const key in env) {
        if (!key.startsWith(prefix)) {
          const newEnvKey = `${prefix}${key}`;
          vars[newEnvKey] = env[key];
        }
      }

      // define to process.env
      for (const key in vars) {
        const value = vars[key];
        const processKey = `process.env.${key}`;
        processVars[processKey] = JSON.stringify(value);
      }

      return { define: processVars };
    },
  };
}
