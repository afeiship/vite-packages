import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactList from '@feizheng/react-list';
import noop from '@feizheng/noop';
import objectAssign from 'object-assign';
import deepEqual from 'deep-equal';
import { Form, Button, Input } from 'antd';

const CLASS_NAME = 'react-ant-form-schema';
const formLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
const tailLayout = { wrapperCol: { offset: 6, span: 16 } };
const submitProps = { type: 'primary', htmlType: 'submit', children: 'Save' };

const DEFAULT_TEMPLATE = ({ index, item }, cb) => {
  return (
    <Form.Item
      className={`${CLASS_NAME}__field`}
      {...formLayout}
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
       * The submit resolved callback.
       */
      onSubmitSuccess: PropTypes.func,
      /**
       * The submit rejected callback.
       */
      onSubmitFailed: PropTypes.func,
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
      submitProps: PropTypes.object,
      /**
       * The reset props.
       */
      resetProps: PropTypes.object,
      /**
       * Get default field decorator.
       */
      decorator: PropTypes.func
    };

    static defaultProps = {
      initialValue: {},
      items: [],
      template: DEFAULT_TEMPLATE,
      defaultComponent: Input,
      onSubmit: noop,
      onSubmitSuccess: noop,
      onSubmitFailed: noop,
      onLoad: noop,
      formLayout,
      tailLayout,
      submitProps,
      resetProps: null,
      decorator: noop
    };

    componentDidMount() {
      const { onLoad, initialValue, form } = this.props;
      const { setFieldsValue } = form;
      setFieldsValue(initialValue);
      onLoad({
        target: {
          form,
          value: initialValue
        }
      });
    }

    shouldComponentUpdate(inProps) {
      const { setFields } = this.props.form;
      const { fieldsValue } = inProps;
      if (!deepEqual(fieldsValue, this.props.fieldsValue)) {
        setFields(fieldsValue);
      }
      return true;
    }

    handleSubmit = (inEvent) => {
      inEvent.preventDefault();
      const { onSubmit, onSubmitSuccess, onSubmitFailed, form } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          onSubmit(values).then(onSubmitSuccess).catch(onSubmitFailed);
        }
      });
    };

    handleReset = () => {
      const { initialValue, form } = this.props;
      form.setFieldsValue(initialValue);
    };

    template = ({ index, item }) => {
      const { form, template, defaultComponent } = this.props;
      const { getFieldDecorator } = form;
      const { component, field, rules, decorator, props } = item;
      const ItemComponent = component || defaultComponent;
      const cb = () => {
        return getFieldDecorator(field, {
          ...this.props.decorator(),
          ...(decorator && decorator()),
          rules
        })(<ItemComponent {...props} />);
      };
      return template({ index, item }, cb);
    };

    render() {
      const {
        className,
        items,
        tailLayout,
        submitProps,
        resetProps
      } = this.props;

      return (
        <Form
          data-component={CLASS_NAME}
          className={classNames(CLASS_NAME, className)}
          onSubmit={this.handleSubmit}>
          <ReactList items={items} template={this.template} />
          <Form.Item
            {...tailLayout}
            className={`${CLASS_NAME}__actions`}
            colon={false}>
            <Button {...submitProps} />
            {resetProps && (
              <Button onClick={this.handleReset} {...resetProps} />
            )}
          </Form.Item>
        </Form>
      );
    }
  }
);
