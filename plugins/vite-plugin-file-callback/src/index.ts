import fs from 'fs-extra';
import path from 'path';

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

    async writeBundle() {
      const { callback, filepath, charset } = { ...defaults, ...options };
      try {
        const filePath = path.resolve(process.cwd(), filepath);
        const fileContent = await fs.readFile(filePath, charset);
        const processedContent = callback(fileContent);
        await fs.writeFile(filePath, processedContent, charset);

        console.log('File operation successful.');
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
