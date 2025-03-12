import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface Options {
  /**
   * The output directory for version.json file.
   * @default 'public'
   */
  dest?: string;
}

const defaults: Options = {
  dest: 'dist',
};

const PLUGIN_NAME = 'vite-plugin-version';
const LOG_PREFIX = `[${PLUGIN_NAME}]`;

const getGitHash = (): string => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch (error) {
    console.warn(`${LOG_PREFIX} Failed to get git hash:`, error);
    return 'unknown';
  }
};

const getVersion = (root: string): string => {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
    return packageJson.gtcVersion || packageJson.version || 'unknown';
  } catch (error) {
    console.warn(`${LOG_PREFIX} Failed to get version:`, error);
    return 'unknown';
  }
};

const factory = (inOptions?: Options) => {
  const options = {
    ...defaults,
    ...inOptions,
  } as Required<Options>;

  const plugin: Plugin = {
    name: PLUGIN_NAME,
    configResolved(config) {
      const versionInfo = {
        mode: config.mode,
        version: getVersion(config.root),
        githash: getGitHash(),
        build_time: new Date().toISOString(),
      };

      const outputDir = path.join(config.root, options.dest);
      // 确保在构建时创建输出目录
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const outputPath = path.join(outputDir, 'version.json');
      fs.writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2));
      console.log(`${LOG_PREFIX} Generated version.json:`, versionInfo);
    },
  };

  return plugin;
};

export default factory;
