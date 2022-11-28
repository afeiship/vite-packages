type ModuleFile = Record<string, any>;

export default (inModuleFiles: ModuleFile) => {
  const keys = () => Object.keys(inModuleFiles).map((key) => key.split('/').pop())
  const contextFn = (inName: string) => {
    for (const moduleFilesKey in inModuleFiles) {
      if (moduleFilesKey.includes(inName)) {
        return inModuleFiles[moduleFilesKey];
      }
    }
    return { default: null };
  };

  contextFn.keys = keys;
  return contextFn;
};
