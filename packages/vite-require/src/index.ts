export default (inModuleFiles) => {
  return (inFilename: string) => {
    const value = inModuleFiles[inFilename];
    return value?.default || value;
  };
};
