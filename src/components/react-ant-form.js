import {Form, Button} from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssin from 'object-assign';

export default Form.create()(
  class extends React.Component {
    /*===properties start===*/
    static propTypes = {
      className : PropTypes.string,
      fieldsValue : PropTypes.object,
      items : PropTypes.array,
      onSubmit : PropTypes.func,
      onLoad : PropTypes.func,
      submitLabel : PropTypes.string,
      formLayout : PropTypes.object,
      submitProps: PropTypes.object
    };

    static defaultProps = {
      fieldsValue:{},
      onSubmit: noop,
      onLoad: noop,
      formLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      },
      items: [],
      submitLabel:'&nbsp;',
      submitProps : {
        type: 'primary',
        htmlType: 'submit'
      }
    };
    /*===properties end===*/

    componentDidMount() {
      const { onLoad, fieldsValue, form } = this.props;
      const { getFieldDecorator, setFields } = form;
      objectAssin(this, { $form: form });
      setFields(fieldsValue);
      onLoad({
        target: {
          sender: this,
          value: this.props
        }
      });
    }

    _onSubmit = e => {
      e.preventDefault();
      const { onSubmit, form } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          onSubmit(values);
        }
      });
    };

    render() {
      const { className, items, formLayout, submitLabel, submitProps } = this.props;
      const { getFieldDecorator } = this.props.form;
      return (
        <Form
          onSubmit={this.onSubmit}
          className={classNames("react-ant-form", className)}>
          {
            (items.length > 0) && items.map((item, index) => {
              return (
                <Form.Item className="react-ant-form-field" {...formLayout} key={index} label={item.label}>
                  {getFieldDecorator(item.field, {
                    rules: item.rules
                  })(<item.component {...item.props}/>)}
                </Form.Item>
              )
            })
          }
          <Form.Item {...formLayout} className="react-ant-form-submit" label={submitLabel} colon={false}>
            <Button
              {...submitProps}
              onClick={this._onSubmit} />
          </Form.Item>
        </Form>
      );
    }
  }
);
