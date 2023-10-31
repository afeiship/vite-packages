import clipboardy from 'clipboardy';

export default () => {
  return {
    name: 'vite-copy-url',
    configureServer(server) {
      const { host, port } = server.config.server;
      const url = `http://${host}:${port}`;
      clipboardy.writeSync(url);
      console.log(`[vite-copy-url]: Has been copied to clipboard: ${url}`);
    },
  };
};
