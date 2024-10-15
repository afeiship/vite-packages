import type { Plugin } from 'vite';
import { readFile } from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import crypto from 'crypto';
import { writeFile } from 'node:fs/promises';

interface Options {
  patterns?: string[];
  publicDir?: string;
  buildDir?: string;
}

const defaults: Options = {
  patterns: ['src/**/*.{js,jsx,css,scss,json,ts,tsx,yml}'],
  publicDir: 'public',
  buildDir: 'build',
};

const PLUGIN_NAME = 'vite-public-resource-hash';
const LOG_PREFIX = `[${PLUGIN_NAME}]`;

/**
 * 计算文件内容的哈希值
 * @param {string} filePath 文件的绝对路径
 * @returns {Promise<string>} 哈希值（前8位）
 */
async function computeHash(filePath) {
  const fileBuffer = await readFile(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex').slice(0, 8);
}

/**
 * 提取文件中的资源路径
 * @param {string} content 文件内容
 * @param {RegExp} regex 用于匹配资源路径的正则表达式
 * @returns {Set<string>} 资源的相对路径集合
 */
function extractResourcePaths(content, regex) {
  const resourcePaths = new Set<string>();
  let match;
  while ((match = regex.exec(content)) !== null) {
    const resourcePath = match[0].split('?')[0]; // 只取资源路径部分
    resourcePaths.add(resourcePath);
  }
  return resourcePaths;
}

/**
 * 替换内容中的哈希占位符
 * @param {string} content 文件内容
 * @param {RegExp} regex 用于匹配哈希占位符的正则表达式
 * @param {Map<string, string>} hashMap 资源路径与哈希值的映射
 * @returns {string} 替换后的内容
 */
function replaceHashPlaceholders(content, regex, hashMap) {
  return content.replace(regex, (match) => {
    const resourcePath = match.split('?')[0];
    const absolutePath = path.resolve(process.cwd(), 'public', resourcePath);
    const hash = hashMap.get(absolutePath);
    if (hash) {
      return `${resourcePath}?hash=${hash}`;
    }
    return match; // 如果没有找到哈希值，保持原样
  });
}

const factory = (inOptions?: Options) => {
  const regex = /\/[^'"\s?]+(?:\.[^'"\s?]+)?\?hash=__content_hash__/g;
  const hashCache = new Map();
  let matchedFiles = new Set<string>();
  const { patterns, publicDir, buildDir } = {
    ...defaults,
    ...inOptions,
  } as Required<Options>;

  const plugin: Plugin = {
    name: PLUGIN_NAME,
    /**
     * 在构建开始时执行，扫描源文件中的资源路径并计算哈希值
     */
    async buildStart() {
      // 扫描所有匹配的源文件
      const srcFiles = await fg(patterns, { cwd: process.cwd(), absolute: true });
      srcFiles.forEach((file) => matchedFiles.add(file));

      const resourcePaths = new Set<string>();

      // 遍历所有源文件，提取需要处理的资源路径
      await Promise.all(
        srcFiles.map(async (file) => {
          try {
            const code = await readFile(file, 'utf-8');
            const paths = extractResourcePaths(code, regex);
            paths.forEach((resourcePath) => {
              // 假设资源文件位于 public 目录下
              const absoluteResourcePath = path.resolve(process.cwd(), 'public', resourcePath);
              resourcePaths.add(absoluteResourcePath);
            });
          } catch (err) {
            this.error(`无法读取文件: ${file}`);
          }
        })
      );

      // 计算每个资源文件的哈希值并缓存
      await Promise.all(
        Array.from(resourcePaths).map(async (resourcePath) => {
          try {
            const hash = await computeHash(path.join('public', resourcePath));
            hashCache.set(resourcePath, hash);
          } catch (err) {
            this.error(`无法读取资源文件: ${resourcePath}`);
          }
        })
      );
    },

    /**
     * 在源文件转换时，替换 __content_hash__ 为实际的哈希值
     * @param {string} code 源文件内容
     * @param {string} id 源文件路径
     * @returns {Object|null} 转换后的代码和 source map
     */
    async transform(code, id) {
      // 仅处理预先匹配的源文件
      if (!matchedFiles.has(id)) {
        return null;
      }

      // 替换源文件中的哈希占位符
      const transformedCode = replaceHashPlaceholders(code, regex, hashCache);

      return {
        code: transformedCode,
        map: null, // 如果需要，可以生成 source map
      };
    },

    /**
     * 在构建结束时，处理 public 目录下的文件，替换其中的 __content_hash__
     * @param {Object} options 构建选项
     * @param {Object} bundle 打包结果
     */
    async writeBundle(options, bundle) {
      // 扫描 dist/public 目录下的所有文件
      const publicFiles = await fg(['**/*.{yaml,yml,json,js,css}'], {
        cwd: buildDir,
        absolute: true,
      });

      await Promise.all(
        publicFiles.map(async (file) => {
          try {
            let content = await readFile(file, 'utf-8');
            // 替换 public 目录文件中的哈希占位符
            const updatedContent = replaceHashPlaceholders(content, regex, hashCache);
            if (updatedContent !== content) {
              await writeFile(file, updatedContent, 'utf-8');
            }
          } catch (err) {
            this.error(`无法处理 public 目录文件: ${file}`);
          }
        })
      );
    },
  };

  return plugin;
};

export default factory;
