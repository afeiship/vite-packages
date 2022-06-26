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
  {
    fn: (inArgs) => {
      inArgs.meta.fields.forEach((field: any) => {
        if (field.key === 'password') {
          field.disabled = true;
        }
      });
      return inArgs;
    }
  }
];
