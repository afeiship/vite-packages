import type { Plugin } from 'vite';
import { loadEnv } from 'vite';
import path from 'path';
import { formatInTimeZone } from 'date-fns-tz';


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
      // 1.get env
      const evnRoot = path.join(root, envDir || '.');
      const env = loadEnv(mode, evnRoot, prefix);

      // 2. predefined vars
      const envNameKey = `${prefix}ENVNAME`;
      const envBuildTimeKey = `${prefix}BUILDTIME`;
      const envPackageVersionKey = `${prefix}VERSION`;
      const processVars = {};
      env[envNameKey] = mode;
      env[envBuildTimeKey] = formatInTimeZone(new Date(), 'Asia/Shanghai', 'yyyy-MM-dd HH:mm:ss');
      env[envPackageVersionKey] = process.env.npm_package_gtcVersion || process.env.npm_package_version || '0.0.0';

      // 3. process.env
      for (const key in env) {
        const value = env[key];
        const processKey = `process.env.${key}`;
        processVars[processKey] = JSON.stringify(value);
      }

      return { define: processVars };
    },
  };
}
