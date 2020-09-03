import noop from '@feizheng/noop';
import ReactList from '@feizheng/react-list';
import { Button, Form, Input } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const CLASS_NAME = 'react-ant-form-schema3';
const submitProps = { type: 'primary', htmlType: 'submit', children: 'Save' };

const DEFAULT_TEMPLATE = ({ index, item }, cb) => {
  return (
    <Form.Item
      className={`${CLASS_NAME}__field`}
      {...item.formLayout}
      key={index}
      label={item.label}
      children={cb()}
    />
  );
};

export default Form.create()(
  class ReactAntForm extends Component {
    static displayName = CLASS_NAME;
    static version = '__VERSION__';
    static propTypes = {
      /**
       * The extended className for component.
       */
      className: PropTypes.string,
      /**
       * Action(submit) filed class name.
       */
      actionsClassName: PropTypes.string,
      /**
       * Default fileds value object.
       */
      initialValue: PropTypes.object,
      /**
       * Form schema.
       */
      items: PropTypes.array,
      /**
       * The form field template.
       */
      template: PropTypes.func,
      /**
       * Default item component.
       */
      defaultComponent: PropTypes.any,
      /**
       * The onSubmit event.
       */
      onSubmit: PropTypes.func,
      /**
       * The form filed onChange event.
       */
      onChange: PropTypes.func,
      /**
       * The item filed onChange event.
       */
      onFieldChange: PropTypes.func,
      /**
       * When component did mount.
       */
      onLoad: PropTypes.func,
      /**
       * The formLayout for antd.Form.
       */
      formLayout: PropTypes.object,
      /**
       * The formLayout for last form item (eg: like actions).
       */
      tailLayout: PropTypes.object,
      /**
       * The submit props.
       */
      submit: PropTypes.object,
      /**
       * The reset props.
       */
      reset: PropTypes.object
    };

    static defaultProps = {
      initialValue: {},
      items: [],
      template: DEFAULT_TEMPLATE,
      defaultComponent: Input,
      onSubmit: noop,
      onChange: noop,
      onFieldChange: noop,
      onLoad: noop,
      submit: submitProps
    };

    get formView() {
      const { items } = this.props;
      return <ReactList items={items} template={this.template} />;
    }

    get actionView() {
      const {
        actionsClassName,
        tailLayout,
        submit,
        reset,
        children
      } = this.props;
      if (!submit && !reset) return children || null;
      return (
        <Form.Item
          {...tailLayout}
          className={`${actionsClassName} ${CLASS_NAME}__actions`}
          colon={false}>
          <Button {...submit} />
          {reset && <Button onClick={this.handleReset} {...reset} />}
        </Form.Item>
      );
    }

    componentDidMount() {
      const { onLoad, initialValue, form } = this.props;
      const { setFieldsValue } = form;
      setFieldsValue(initialValue);
      onLoad({
        target: form
      });
    }

    handleSubmit = (inEvent) => {
      inEvent.preventDefault();
      const { onSubmit, form } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          onSubmit(values);
        }
      });
    };

    handleReset = () => {
      const { initialValue, form } = this.props;
      form.resetFields();
      form.setFieldsValue(initialValue);
    };

    handleItemChange = (inItem, inEvent) => {
      const { onChange, onFieldChange, form } = this.props;
      const value = form.getFieldsValue();
      const { field } = inItem;

      onFieldChange({ target: { field, value: inEvent.target.value } });
      onChange({ target: { field, value } });
    };

    template = ({ index, item }) => {
      const { form, template, defaultComponent } = this.props;
      const { getFieldDecorator } = form;
      const { component, field, props, options } = item;
      const ItemComponent = component || defaultComponent;
      const cb = () => {
        return getFieldDecorator(
          field,
          options
        )(
          <ItemComponent
            onChange={this.handleItemChange.bind(this, item)}
            {...props}
          />
        );
      };
      return template({ index, item }, cb);
    };

    render() {
      const {
        className,
        initialValue,
        items,
        template,
        defaultComponent,
        onSubmit,
        onChange,
        onFieldChange,
        onLoad,
        formLayout,
        tailLayout,
        submit,
        reset,
        form,
        ...props
      } = this.props;
      return (
        <Form
          {...formLayout}
          data-component={CLASS_NAME}
          className={classNames(CLASS_NAME, className)}
          onSubmit={this.handleSubmit}
          {...props}>
          {this.formView}
          {this.actionView}
        </Form>
      );
    }
  }
);
