import fs from 'fs-extra';
import path from 'path';
import json5 from 'json5';

declare var wx: any;

interface Options {
  callback: (content: string) => string;
  filepath: string;
  charset?: BufferEncoding;
}

const defaults: { charset: BufferEncoding } = { charset: 'utf8' };

function vitePluginFileCallback(options: Options) {
  return {
    name: 'vite-plugin-file-callback',
    apply: 'build',

    async buildStart() {
      const { callback, filepath, charset } = { ...defaults, ...options };
      try {
        const filePath = path.resolve(process.cwd(), filepath);
        const extention = path.extname(filePath);
        const fileContent = await fs.readFile(filePath, charset);
        const isJSON = extention === '.json' || extention === '.json5';
        const fileCont = isJSON ? json5.parse(fileContent) : fileContent;
        const processedContent = callback(fileCont);
        const parsed = isJSON ? JSON.stringify(processedContent, null, 2) : processedContent;
        await fs.writeFile(filePath, parsed, charset);
        console.log('File operation successful./hasbuild:');
      } catch (error) {
        console.error('Error performing file operation:', error);
      }
    },
  };
}

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = vitePluginFileCallback;
}

export default vitePluginFileCallback;
