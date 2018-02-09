# react-ant-form
> React basic ant form builder.


## properties:
```javascript

    static propTypes = {
      className : PropTypes.string,
      fieldsValue : PropTypes.object,
      items : PropTypes.array,
      onLoad : PropTypes.func,
      onLoad : PropTypes.func,
      formLayout : PropTypes.object,
      submitText : PropTypes.any,
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
      submitText: 'Save'
    };
    
```

## usage:
```jsx

// install: npm install afeiship/react-ant-form --save
// import : import ReactAntForm from 'react-ant-form'

class App extends React.Component{
  state = {
    fieldsValue:nx.antFieldsValue({username:'fei', password:'test', text:'etst...'}),
    items:[
      {
        label:'username',
        field:'username',
        component:Input
      },
      {
        label:'password',
        field:'password',
        component:Input
      },
      {
        label:'test-checkbox',
        field:'chk',
        component:Checkbox,
        props:{
          children:'Agree the agreement'
        }
      },
      {
        label:'Text',
        field:'text',
        component:Input.TextArea
      }
    ]
  };

  constructor(props){
    super(props);
    window.demo = this;
    window.refs = this.refs;
    window.rc = this.refs.rc;
  }

  _onSubmit =e =>{
    console.log(e);
    return {
      then: nx.noop
    }
  };

  render(){
    return (
      <div className="hello-react-ant-form">
        <ReactAntForm fieldsValue={this.state.fieldsValue} onSubmit={this._onSubmit} items={this.state.items} ref='rc' />
      </div>
    );
  }
}

```

## customize style:
```scss
// customize your exception styles:
$react-ant-form-options:(
);

@import '~node_modules/react-ant-form/style.scss';
```
