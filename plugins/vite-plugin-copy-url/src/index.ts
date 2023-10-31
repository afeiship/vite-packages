import clipboardy from 'clipboardy';

const viteCopyURL = () => {
  return {
    name: 'vite-copy-url',
    configureServer({ config }) {
      const { host, port } = config.server;
      const _host = host || 'localhost';
      const _port = port || 5173;
      const url = `http://${_host}:${_port}`;
      clipboardy.writeSync(url);
      console.log(`[vite-copy-url]: Has been copied to clipboard: ${url}`);
    },
  };
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = viteCopyURL;
}

export default viteCopyURL;
