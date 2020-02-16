import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '@feizheng/noop';
import objectAssign from 'object-assign';
import { Form, Button } from 'antd';

const CLASS_NAME = 'react-ant-form';
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
      fieldsValue: PropTypes.object,
      /**
       * Form schema.
       */
      items: PropTypes.array,
      /**
       * The onSubmit event.
       */
      onSubmit: PropTypes.func,
      /**
       * When component did mount.
       */
      onLoad: PropTypes.func,
      /**
       * The formLayout for antd.Form.
       */
      formLayout: PropTypes.object,
      /**
       * The submit label.
       */
      submitLabel: PropTypes.string,
      /**
       * The submit props.
       */
      submitProps: PropTypes.object
    };

    static defaultProps = {
      fieldsValue: {},
      items: [],
      onSubmit: noop,
      onLoad: noop,
      formLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      submitLabel: '&nbsp;',
      submitProps: {
        type: 'primary',
        htmlType: 'submit',
        children: 'Save'
      }
    };

    componentDidMount() {
      const { onLoad, fieldsValue, form } = this.props;
      const { getFieldDecorator, setFields } = form;
      objectAssign(this, { $form: form });
      setFields(fieldsValue);
      onLoad({
        target: {
          sender: this,
          value: this.props
        }
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

    render() {
      const {
        className,
        items,
        formLayout,
        submitLabel,
        submitProps
      } = this.props;
      const { getFieldDecorator } = this.props.form;

      return (
        <Form
          data-component={CLASS_NAME}
          className={classNames(CLASS_NAME, className)}
          onSubmit={this.handleSubmit}>
          {items.map((item, index) => {
            return (
              <Form.Item
                className="react-ant-form-field"
                {...formLayout}
                key={index}
                label={item.label}>
                {getFieldDecorator(item.field, {
                  rules: item.rules
                })(<item.component {...item.props} />)}
              </Form.Item>
            );
          })}
          <Form.Item
            {...formLayout}
            className="react-ant-form-submit"
            label={submitLabel}
            colon={false}>
            <Button {...submitProps} />
          </Form.Item>
        </Form>
      );
    }
  }
);
