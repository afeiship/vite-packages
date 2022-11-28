export default (inModuleFiles) => {
  return (inFilename: string) => {
    for (const key in inModuleFiles) {
      if (key.includes(inFilename)) {
        return inModuleFiles[key];
      }
    }
    return null;
  };
};
