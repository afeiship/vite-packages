export default [
  {
    fn: (inArgs) => {
      const meta = inArgs.meta;
      const form = inArgs.form;
      const fields = meta.fields;
      const value = form.getFieldValue('checkbox');
      if (value) fields.splice(3, 1);
      meta.fields = fields;
      return inArgs;
    }
  },
  {
    once: true,
    fn: (inArgs) => {
      const form = inArgs.form;
      setTimeout(() => {
        form.setFieldsValue({ rating: 1 });
      }, 1000);
      return inArgs;
    }
  },
  (inArgs) => {
    const pwd = inArgs.$('password');
    pwd.disabled = true;
    return inArgs;
  },
  (inArgs) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        inArgs.meta.fields[0].label = 'New Label form promise';
        resolve(inArgs);
      }, 100);
    });
  }
];
