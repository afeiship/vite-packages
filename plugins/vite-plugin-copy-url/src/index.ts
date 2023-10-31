import clipboardy from 'clipboardy';

module.exports = function () {
  return {
    name: 'vite-copy-url',
    configureServer(server) {
      const { host, port } = server.config.server;
      const url = `http://${host}:${port || 5173}`;
      clipboardy.writeSync(url);
      console.log(`[vite-copy-url]: Has been copied to clipboard: ${url}`);
    },
  };
};
