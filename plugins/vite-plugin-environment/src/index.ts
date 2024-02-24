import type { Plugin } from 'vite';
import { loadEnv } from 'vite';
import path from 'path';
import sdf from '@jswork/simple-date-format';
import es8date from '@jswork/east8date';
import { createRequire } from 'module';

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
      // 0. pkg
      const __dirname = path.dirname(new URL(import.meta.url).pathname);
      const require = createRequire(__dirname);
      const pkg = require(path.join(root, 'package.json'));

      // 1.get env
      const envRoot = path.join(root, envDir || '.');
      const env = loadEnv(mode, envRoot, prefix);

      // 2. predefined vars
      const envNameKey = `${prefix}ENVNAME`;
      const envBuildTimeKey = `${prefix}BUILDTIME`;
      const envPackageVersionKey = `${prefix}VERSION`;
      const processVars = {};
      const datetime = sdf('datetime', es8date());
      const version = pkg.gtc?.version || pkg.gtcVersion || pkg.version;

      env[envNameKey] = mode;
      env[envBuildTimeKey] = datetime;
      env[envPackageVersionKey] = version as string;

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
