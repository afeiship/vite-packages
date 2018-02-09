import './dev.scss';
import ReactAntForm from './main';
import { Input, Checkbox } from 'antd';
import antFieldsValue from 'next-ant-fields-value';

/*===example start===*/

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
/*===example end===*/

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
