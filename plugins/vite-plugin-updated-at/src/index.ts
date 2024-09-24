import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';

interface Options {
  verbose?: boolean;
  extensions?: string[];
  updatedAtRegex?: RegExp;
}

const defaults: Options = {
  verbose: false,
  extensions: ['ts', 'tsx', 'js', 'jsx', 'vue', 'css', 'scss', 'yml', 'yaml'],
  updatedAtRegex: /@updated_at:\s*(.*)/,
};

const PLUGIN_NAME = 'vite-plugin-updated-at';
const LOG_PREFIX = `[${PLUGIN_NAME}]`;

/**
 * 由于 Webstorm 中存在 File Cache Conflict 的问题，导致每次会提示文件冲突，因此这里暂时不使用该插件。
 * @param inOptions
 */

const factory = (inOptions?: Options) => {
  const { verbose, extensions, updatedAtRegex } = {
    ...defaults,
    ...inOptions,
  } as Required<Options>;

  const isVerbose = verbose || process.env.NODE_ENV === 'development';

  const plugin: Plugin = {
    name: PLUGIN_NAME,
    handleHotUpdate: async ({ file, server }) => {
      const fileExt = file.split('.').pop();
      if (fileExt && extensions.includes(fileExt)) {
        const filePath = path.resolve(file);
        const content = fs.readFileSync(filePath, 'utf-8');

        // 正则表达式匹配 updated_at 字段
        const match = content.match(updatedAtRegex);

        if (match) {
          const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
          const updatedContent = content.replace(updatedAtRegex, `@updated_at: ${now}`);

          // 更新文件内容
          fs.writeFileSync(filePath, updatedContent, 'utf-8');

          if (isVerbose) {
            console.log(`${LOG_PREFIX} handleHotUpdate: ${filePath} updated at ${now}`);
          }
        }
      }
    },
  };

  return plugin;
};

export default factory;
