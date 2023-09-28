declare var wx: any;

const viteLoadModules = (moduleFiles, inName: string) => {
  const stores: any = {};
  const moduleRE = new RegExp(`^\.\/${inName}\/(.*)\.\w+$`);
  for (const path in moduleFiles) {
    const name = path.replace(moduleRE, '$1');
    const useStoreFn = moduleFiles[path].default;
    stores[name] = useStoreFn;
  }
  return stores;
};

// ---- UMD DELETE ME ----
// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = viteLoadModules;
}

export default viteLoadModules;
