import type { Plugin } from 'vite';
import { readFile } from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import crypto from 'crypto';

interface Options {
  patterns?: string[];
}

const defaults: Options = {
  patterns: ['src/**/*.{js,jsx,css,scss,json,ts,tsx,yml}'],
};

const PLUGIN_NAME = 'vite-public-resource-hash';
const LOG_PREFIX = `[${PLUGIN_NAME}]`;

const factory = (inOptions?: Options) => {
  const hashCache = new Map();
  let matchedFiles = new Set<string>();
  const { patterns } = {
    ...defaults,
    ...inOptions,
  } as Required<Options>;

  const plugin: Plugin = {
    name: PLUGIN_NAME,
    async buildStart() {
      // 扫描所有匹配的文件并缓存它们
      const files = await fg(patterns, { cwd: process.cwd(), absolute: true });

      files.forEach((file) => matchedFiles.add(file));

      // 预先计算这些文件中引用资源的哈希值
      const resourcePaths = new Set<string>();

      // 遍历所有匹配的文件，提取需要处理的资源路径
      await Promise.all(
        files.map(async (file) => {
          try {
            const code = await readFile(file, 'utf-8');
            // /assets/images/sc-card.png?hash=__content_hash__
            const regex = /\/([^"]+?)\?hash=__content_hash__/g; // 修改为匹配以/开头的资源
            let match;
            while ((match = regex.exec(code)) !== null) {
              const resourcePath = match[1];
              const absoluteResourcePath = path.resolve(process.cwd(), resourcePath);
              resourcePaths.add(absoluteResourcePath);
            }
          } catch (err) {
            this.error(`无法读取文件: ${file}`);
          }
        })
      );

      // 计算每个资源文件的哈希值并缓存
      await Promise.all(
        Array.from(resourcePaths).map(async (resourcePath) => {
          try {
            const fileBuffer = await readFile(resourcePath);
            const hash = crypto.createHash('md5').update(fileBuffer).digest('hex').slice(0, 8); // 获取前8位哈希
            hashCache.set(resourcePath, hash);
          } catch (err) {
            this.error(`无法读取资源文件: ${resourcePath}`);
          }
        })
      );
    },

    async transform(code, id) {
      // 仅处理预先匹配的文件
      if (!matchedFiles.has(id)) {
        return null;
      }

      // 使用更新后的正则表达式匹配 src 中包含 __content_hash__ 的资源
      const regex = /src:\s*"\/([^"]+?)\?hash=__content_hash__/g;
      let match;
      let transformedCode = code;
      const replacements: Array<{ placeholder: string; hash: string }> = [];

      // 收集所有需要替换的资源路径
      while ((match = regex.exec(code)) !== null) {
        const resourcePath = match[1];
        const absolutePath = path.resolve(process.cwd(), 'public', resourcePath);

        if (hashCache.has(absolutePath)) {
          const hash = hashCache.get(absolutePath);
          replacements.push({ placeholder: '__content_hash__', hash });
        } else {
          // 如果资源文件未在缓存中，尝试读取并计算哈希
          try {
            const fileBuffer = await readFile(absolutePath);
            const hash = crypto.createHash('md5').update(fileBuffer).digest('hex').slice(0, 8);
            hashCache.set(absolutePath, hash);
            replacements.push({ placeholder: '__content_hash__', hash });
          } catch (err) {
            this.error(`无法读取文件: ${absolutePath}`);
          }
        }
      }

      // 执行所有替换操作
      replacements.forEach(({ placeholder, hash }) => {
        transformedCode = transformedCode.replace(placeholder, hash);
      });

      return {
        code: transformedCode,
        map: null, // 如果需要，可以生成source map
      };
    },
  };

  return plugin;
};

export default factory;
